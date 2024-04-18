# Slate -> expired

# Stale Time

- if user navigate back to same page then it will not refetch after x ms of time

# gcTime

-

# SWR -> Stale Well and Revalidate made by vercel. Fetching in background

const queryClient = useQueryClient();

useEffect(() => {
if (currentPage < maxPostPage) {
const nextPage = currentPage + 1;
queryClient.prefetchQuery({
queryKey: ["posts", nextPage],
queryFn: () => fetchPosts(currentPage),
});
}
}, [currentPage, queryClient]);

const { data, isLoading, isError, error, isFetched } = useQuery({
queryKey: ["posts", currentPage],
queryFn: () => fetchPosts(currentPage),
// staleTime: 1000,
});

const deleteMutation = useMutation({
// mutationKey: ["delete"], not necessary to have it in cash
mutationFn: (postId) => deletePost(postId),
});

const updateMutation = useMutation({
mutationFn: (postId) => updatePost(postId),
});

const { data, isLoading, isError, error } = useQuery({
// queryKey: [`${post.title}-comment`],
queryKey: ["comments", post.id],
queryFn: () => fetchComments(post.id),
staleTime: 4500000,
gcTime: 4500000,
});

# Error

error.toString()
