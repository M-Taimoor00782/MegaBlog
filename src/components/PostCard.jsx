import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiMessageCircle, FiShare2, FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";

function PostCard({ $id, title, featuredImage }) {
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const user = useSelector((state) => state.auth.userData);

  const isLiked = likes.some((like) => like.userId === user?.$id);
  const imageUrl = featuredImage
    ? appwriteService.getFilePreview(featuredImage)
    : null;

  // Fetch likes and comments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const likeRes = await appwriteService.getLikes($id);
        const commentRes = await appwriteService.getComments($id);
        setLikes(likeRes?.documents || []);
        setComments(commentRes?.documents || []);
      } catch (error) {
        console.error("Error fetching likes/comments:", error.message);
      }
    };
    fetchData();
  }, [$id]);

  const handleLike = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please log in to like posts.");

    try {
      if (isLiked) {
        await appwriteService.removeLike({ postId: $id, userId: user.$id });
      } else {
        await appwriteService.addLike({ postId: $id, userId: user.$id });
      }
      const updated = await appwriteService.getLikes($id);
      setLikes(updated?.documents || []);
    } catch (error) {
      console.error("Error liking post:", error.message);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please log in to comment.");
    if (!commentText.trim()) return;

    try {
      await appwriteService.addComment({
        postId: $id,
        userId: user.$id,
        username: user.name || "Anonymous",
        content: commentText.trim(),
      });
      setCommentText("");
      const updatedComments = await appwriteService.getComments($id);
      setComments(updatedComments?.documents || []);
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

  const handleShare = async (e) => {
    e.preventDefault();
    const url = `${window.location.origin}/post/${$id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title, text: "Check out this post!", url });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.warn("Share canceled:", err);
    }
  };

  return (
    <div className="group rounded-xl overflow-hidden bg-black/20 backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.5)] border border-slate-700 mb-4">
      {/* Image + Title */}
      <Link to={`/post/${$id}`} className="block">
        {imageUrl && (
          <div className="w-full aspect-video overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}
        <div className="p-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-300 line-clamp-2 group-hover:text-cyan-500 transition-colors duration-200">
            {title}
          </h2>
        </div>
      </Link>

      {/* Action buttons */}
      <div className="px-4 pb-2 flex items-center justify-between text-gray-300 text-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 transition-colors ${
              isLiked ? "text-red-500" : "hover:text-red-400"
            }`}
          >
            <FiHeart className={isLiked ? "fill-red-400" : "fill-none"} />
            {likes.length}
          </button>

          <button
            onClick={() => setShowComments((prev) => !prev)}
            className="flex items-center gap-1 hover:text-cyan-400"
          >
            <FiMessageCircle /> {comments.length}
          </button>
        </div>

        <button onClick={handleShare} className="hover:text-cyan-500 cursor-pointer">
          <FiShare2 />
        </button>
      </div>

      {/* Comments dropdown below icon */}
      {showComments && (
        <div className="px-2 pb-4">
          <div className="bg-transparent rounded-sm p-4 max-h-60 overflow-y-auto">
            {comments.length === 0 && (
              <p className="text-gray-500 text-sm">No comments yet.</p>
            )}
            {comments.map((c) => (
              <div key={c.$id} className="bg-white/3 p-2 rounded-sm text-sm text-gray-200 mb-2">
                <p className="font-semibold text-cyan-300 text-sm">{c.username || "Anonymous"}</p>
                <p className="text-sm">{c.content}</p>
              </div>
            ))}

            {user && (
              <form onSubmit={handleComment} className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 bg-white/10 p-2 rounded-lg text-white outline-none border border-gray-700 focus:border-cyan-500 text-sm"
                />
                <button
                  type="submit"
                  className="bg-cyan-600 py-2 px-4 rounded-lg text-white hover:bg-cyan-700 transition flex items-center justify-center"
                >
                  <FiSend />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PostCard;
