import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { FiHeart, FiMessageCircle, FiShare2, FiTrash2 } from "react-icons/fi";

function Post() {
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);

  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;
  const isLiked = likes.some((like) => like.userId === userData?.$id);

  // ---------------------- FETCH POST ----------------------
  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((res) => {
        if (res) setPost(res);
        else navigate("/");
      });
    }
  }, [slug, navigate]);

  // ---------------------- FETCH LIKES ----------------------
  useEffect(() => {
    if (post?.$id) {
      appwriteService.getLikes(post.$id).then((res) => {
        if (res?.documents) setLikes(res.documents);
      });
    }
  }, [post]);

  // ---------------------- FETCH COMMENTS ----------------------
  useEffect(() => {
    if (post?.$id) {
      appwriteService.getComments(post.$id).then((res) => {
        if (res?.documents) setComments(res.documents);
      });
    }
  }, [post]);

  // ---------------------- LIKE HANDLER ----------------------
  const handleLike = async () => {
    if (!userData) return alert("Please log in to like posts.");

    if (isLiked) {
      await appwriteService.removeLike({ postId: post.$id, userId: userData.$id });
    } else {
      await appwriteService.addLike({ postId: post.$id, userId: userData.$id });
    }

    const updatedLikes = await appwriteService.getLikes(post.$id);
    setLikes(updatedLikes.documents);
  };

  // ---------------------- COMMENT HANDLER ----------------------
  const handleComment = async (e) => {
    e.preventDefault();
    if (!userData) return alert("Please log in to comment.");
    if (!commentText.trim()) return;

    await appwriteService.addComment({
      postId: post.$id,
      userId: userData.$id,
      username: userData.name,
      content: commentText,
    });

    setCommentText("");
    const updatedComments = await appwriteService.getComments(post.$id);
    setComments(updatedComments.documents);
  };

  // ---------------------- DELETE COMMENT ----------------------
  const handleDeleteComment = async (id, userId) => {
    if (userData?.$id !== userId && !isAuthor) return;
    await appwriteService.deleteComment(id);
    setComments((prev) => prev.filter((c) => c.$id !== id));
  };

  // ---------------------- SHARE HANDLER ----------------------
  const handleShare = async () => {
    const shareData = {
      title: post?.title || "Blog Post",
      text: "Check out this amazing post!",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.warn("Share canceled:", err);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // ---------------------- DELETE POST ----------------------
  const deletePost = async () => {
    try {
      const status = await appwriteService.deletePost(post.$id);
      if (status) {
        await appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const imageUrl = post?.featuredImage
    ? appwriteService.getFilePreview(post.featuredImage)
    : "/placeholder.png";

  // ---------------------- UI ----------------------
  return post ? (
    <div className="py-8">
      <Container>
        {/* IMAGE */}
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={imageUrl}
            alt={post.title}
            className="rounded-xl w-full max-h-[500px] object-cover"
          />
          {isAuthor && (
            <div className="absolute right-6 top-6 flex space-x-3">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500">Edit</Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* TITLE */}
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>

        {/* CONTENT */}
        <div className="browser-css mb-10">{parse(post.content)}</div>

        {/* ACTION BAR */}
        <div className="flex items-center gap-8 mb-8 border-t border-gray-700 pt-4">
          <button
            onClick={handleLike}
            className={`flex items-center cursor-pointer gap-2 text-lg ${
              isLiked ? "text-red-500 " : "text-gray-300"
            } hover:text-red-400`}
          >
            <FiHeart size={20} className={`${ isLiked ? "fill-red-400" : 'fill:none' }`} /> {likes.length}
          </button>

          <button
            onClick={() => setShowComments((prev) => !prev)}
            className="flex items-center cursor-pointer gap-2 text-lg text-gray-300 hover:text-cyan-400"
          >
            <FiMessageCircle size={20} /> {comments.length}
          </button>

          <button
            onClick={handleShare}
            className="flex items-center cursor-pointer gap-2 text-lg text-gray-300 hover:text-cyan-400"
          >
            <FiShare2 size={20} /> Share
          </button>
        </div>

        {/* COMMENTS SECTION */}
        {showComments && (
          <div className="space-y-6 bg-white/5 p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-cyan-400">Comments</h2>

            {/* Add comment form */}
            <form onSubmit={handleComment} className="flex gap-3">
              <input
                type="text"
                placeholder="Write a comment..."
                className="flex-1 bg-white/10 text-white p-3 rounded-lg outline-none border border-gray-600 focus:border-cyan-500"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <Button type="submit" bgColor="bg-cyan-600">
                Post
              </Button>
            </form>

            {/* Comment list */}
            <div className="space-y-4">
              {comments.length === 0 && (
                <p className="text-gray-400 text-sm">No comments yet.</p>
              )}
              {comments.map((c) => (
                <div
                  key={c.$id}
                  className="flex justify-between items-start bg-white/10 p-3 rounded-lg"
                >
                  <div>
                    <p className="text-sm text-gray-200 font-medium">
                      {c.username || "Anonymous"}
                    </p>
                    <p className="text-gray-400 text-sm">{c.content}</p>
                  </div>
                  {(userData?.$id === c.userId || isAuthor) && (
                    <button
                      onClick={() => handleDeleteComment(c.$id, c.userId)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  ) : null;
}

export default Post;
