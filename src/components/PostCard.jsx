import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  let imageUrl = "/placeholder.png";

  try {
    if (featuredImage) {
      const preview = appwriteService.getFilePreview(featuredImage);
      // ✅ ensure string (Appwrite SDK sometimes returns URL object)
      imageUrl = typeof preview === "string" ? preview : preview.href;
    }
  } catch (err) {
    console.warn("Error generating file preview:", err);
  }

  return (
    <Link to={`/post/${$id}`} className="block group">
      <div
        className="
          w-full rounded-xl overflow-hidden bg-gradient-to-br
          from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700
          shadow-md hover:shadow-xl transition-shadow duration-300
          border border-gray-200 dark:border-slate-700
        "
      >
        {/* Image */}
        <div className="w-full aspect-video overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="
              w-full h-full object-cover transition-transform duration-300
              group-hover:scale-105
            "
          />
        </div>

        {/* Title */}
        <div className="p-4">
          <h2
            className="
              text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100
              line-clamp-2 group-hover:text-cyan-500 transition-colors duration-200
            "
          >
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
