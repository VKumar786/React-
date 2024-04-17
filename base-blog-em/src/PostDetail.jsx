import { fetchComments } from "./api";
import "./PostDetail.css";
import { useQuery } from "@tanstack/react-query";

export function PostDetail({ post }) {
  // replace with useQuery
  const { data, isLoading, isError, error } = useQuery({
    // queryKey: [`${post.title}-comment`],
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post.id),
    staleTime: 4500000,
    gcTime: 4500000,
  });

  if (isLoading) return <div>Loading...</div>;
  else if (isError)
    return (
      <div>
        <h2>Some Error Occur</h2>
        <p>{error.toString()}</p>
      </div>
    );

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button>Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
