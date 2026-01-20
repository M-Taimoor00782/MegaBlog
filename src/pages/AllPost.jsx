import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import service from "../appwrite/config";
import { Container, PostCard } from "../components";

function AllPost() {
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch all posts without filtering at DB level
        const res = await service.getPosts([]);

        if (res?.documents) {
          // Filter posts: active OR belongs to logged-in user
          const filteredPosts = res.documents.filter(
            (post) => post.status === "active" || post.userId === user?.$id
          );

          // Optionally sort by creation date descending
          filteredPosts.sort(
            (a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)
          );

          setPosts(filteredPosts);
        } else {
          setPosts([]);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setPosts([]);
      }
    };

    fetchPosts();
  }, [user]);

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
