import { fetchComments } from "./api";
import "./PostDetail.css";
import { useMutation, useQuery } from "@tanstack/react-query";

export function PostDetail({ post, deleteMutation, updateMutation }) {
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
      <div>
        <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
        {deleteMutation.isPending && (
          <div className="loading">Deleting post...</div>
        )}
        {deleteMutation.isError && (
          <div className="error">
            Error while Deleting post. {deleteMutation.error.toString()}
          </div>
        )}
        {deleteMutation.isSuccess && (
          <div className="success">Post was deleted</div>
        )}
      </div>
      <div>
        <button onClick={() => updateMutation.mutate(post.id)}>
          Update title
        </button>
        {updateMutation.isPending && (
          <div className="loading">Updating post ...</div>
        )}
        {updateMutation.isError && (
          <div className="error">
            Error while Updating post. {updateMutation.error.toString()}
          </div>
        )}
        {updateMutation.isSuccess && (
          <div className="success">Post was Updated</div>
        )}
      </div>
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
