import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiMessageCircle, FiShare2, FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
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
    : "/placeholder.png";

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

  // Handle like
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

  // Handle comment
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

  // Handle share
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
    <div className="relative group">
      <Link to={`/post/${$id}`} className="block group">
        <div className="w-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-slate-700">
          {/* Image */}
          <div className="w-full aspect-video overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* Title */}
          <div className="p-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 group-hover:text-cyan-500 transition-colors duration-200">
              {title}
            </h2>

            {/* Action bar */}
            <div className="flex items-center justify-between mt-4 text-gray-400 dark:text-gray-400 text-sm">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center cursor-pointer gap-1 transition-colors ${
                    isLiked ? "text-red-500" : "hover:text-red-400"
                  }`}
                >
                  <FiHeart
                    className={`transition-all ${
                      isLiked ? "fill-red-400" : "fill-none"
                    }`}
                  />
                  {likes.length}
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowComments(true);
                  }}
                  className="flex items-center cursor-pointer gap-1 hover:text-cyan-400"
                >
                  <FiMessageCircle /> {comments.length}
                </button>
              </div>

              <button
                onClick={handleShare}
                className="hover:text-cyan-500 cursor-pointer"
              >
                <FiShare2 />
              </button>
            </div>
          </div>
        </div>
      </Link>

      {/* Comments Modal */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-zinc-900 w-full max-w-md rounded-xl p-6 space-y-4 relative"
            >
              <button
                onClick={() => setShowComments(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white"
              >
                <FiX size={20} />
              </button>

              <h2 className="text-lg font-semibold text-cyan-400">
                Comments ({comments.length})
              </h2>

              <div className="max-h-60 overflow-y-auto space-y-2">
                {comments.length === 0 && (
                  <p className="text-gray-500 text-sm">No comments yet.</p>
                )}
                {comments.map((c) => (
                  <div
                    key={c.$id}
                    className="bg-white/10 p-3 rounded-lg text-sm text-gray-200"
                  >
                    <p className="font-semibold text-cyan-300">
                      {c.username || "Anonymous"}
                    </p>
                    <p>{c.content}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleComment} className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 bg-white/10 p-2 rounded-lg text-white outline-none border border-gray-700 focus:border-cyan-500"
                />
                <button
                  type="submit"
                  className="bg-cyan-600 px-3 py-2 rounded-lg text-white hover:bg-cyan-700 transition"
                >
                  Post
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PostCard;
