import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function AllPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await appwriteService.getPosts([]);
        if (response?.documents) {
          setPosts(response.documents);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full py-8 min-h-[80vh]">
      <Container>
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          All Posts
        </h2>

        <div className="flex flex-wrap -mx-2">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.$id}
                className="p-2 w-full sm:w-1/2 lg:w-1/4 transition-transform hover:scale-[1]"
              >
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-300 w-full py-10">
              No posts found.
            </p>
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
