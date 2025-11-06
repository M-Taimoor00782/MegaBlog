import React, { useCallback, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth?.userData);

  const slugTransform = useCallback((value) => {
    if (!value) return "";
    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const submit = async (data) => {
    try {
      const payload = {
        title: data.title,
        slug: data.slug,
        content: String(data.content || ""),
        status: data.status || "active",
      };

      let fileId = post?.featuredImage || "";

      // Upload new image if provided
      if (data.image && data.image[0]) {
        const file = await appwriteService.uploadFile(data.image[0]);
        if (file) {
          fileId = file.$id;

          // Delete old image if updating
          if (post?.featuredImage) {
            await appwriteService.deleteFile(post.featuredImage);
          }
        }
      }

      // Create or update post
      if (post) {
        const updatedPost = await appwriteService.updatePost(post.$id, {
          ...payload,
          featuredImage: fileId,
        });
        if (updatedPost) navigate(`/post/${updatedPost.$id}`);
      } else {
        const createdPost = await appwriteService.createPost({
          ...payload,
          featuredImage: fileId,
          userId: userData?.$id,
        });
        if (createdPost) navigate(`/post/${createdPost.$id}`);
      }
    } catch (err) {
      console.error("Post submission failed:", err);
    }
  };

  return (
    <div className="flex flex-col items-center py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-cyan-500">
          {post ? "Edit Your Post" : "Create a New Post"}
        </h1>
        <p className="mt-2 text-gray-100 text-sm max-w-2xl">
          {post
            ? "Update your content and click 'Update Post' to save changes."
            : "Fill in the details below to share your thoughts with the community."}
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col lg:flex-row gap-8 bg-transparent max-w-6xl w-full p-6 rounded-xl"
      >
        {/* Left side */}
        <div className="flex-1 space-y-4">
          <Input
            label="Title"
            placeholder="Enter post title"
            {...register("title", { required: true })}
          />

          <Input
            label="Slug"
            placeholder="Auto-generated or edit manually"
            {...register("slug", { required: true })}
            onInput={(e) =>
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              })
            }
          />

          <RTE
            label="Content"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>

        {/* Right side */}
        <div className="w-full lg:w-1/3 space-y-4 lg:sticky lg:top-24 self-start">
          <Input
            label="Featured Image"
            type="file"
            accept="image/*"
            {...register("image")}
          />

          {post?.featuredImage && (
            <div className="w-full rounded-lg overflow-hidden shadow">
              <img
                src={
                  appwriteService.getFilePreview(post.featuredImage)?.href ||
                  appwriteService.getFilePreview(post.featuredImage) ||
                  "/placeholder.png"
                }
                alt={post.title}
                className="rounded-lg object-cover w-full"
              />
            </div>
          )}

          <Controller
            name="status"
            control={control}
            defaultValue={post?.status || "active"}
            render={({ field }) => (
              <Select
                label="Status"
                placeholder="Select status"
                options={[
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                ]}
                {...field}
              />
            )}
          />

          <Button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold shadow-md 
                       hover:scale-105 transition-all duration-300 bg-gradient-to-r 
                       from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
          >
            {post ? "Update Post" : "Create Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
