import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function AllPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((res) => {
      if (res) {
        setPosts(res.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap -mx-2">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.$id} className="p-2 w-full sm:w-1/2 lg:w-1/4">
                
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 w-full py-10">
              No posts found.
            </p>
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
