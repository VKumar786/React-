import { useEffect, useState } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPosts, deletePost, updatePost } from "./api";
import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage < maxPostPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ["posts", nextPage],
        queryFn: () => fetchPosts(currentPage),
        // staleTime: 365 * 24 * 60 * 60 * 1000,
      });
    }
  }, [currentPage, queryClient]);

  // replace with useQuery
  const { data, isLoading, isError, error, isFetched } = useQuery({
    queryKey: ["posts", currentPage],
    queryFn: () => fetchPosts(currentPage),
    // staleTime: 1000,
    // staleTime: 365 * 24 * 60 * 60 * 1000,
  });

  if (isLoading) return <p>Loading...</p>;
  // else if (isFetched) return <p>Fetching...</p >;
  else if (isError)
    return (
      <div>
        <h2>Error fetching posts</h2>
        <p>{error.toString()}</p>
      </div>
    );

  return (
    <>
      <ul>
        {data?.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage <= 1}
          onClick={() => {
            setCurrentPage((prev) => Math.max(0, prev - 1));
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          // disabled
          disabled={currentPage >= maxPostPage}
          onClick={() => {
            setCurrentPage((prev) => prev + 1);
          }}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
