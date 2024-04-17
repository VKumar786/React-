# Slate -> expired

# Stale Time

- if user navigate back to same page then it will not refetch after x ms of time

# gcTime 

-

# SWR -> Stale Well and Revalidate made by vercel. Fetching in background

const { data, isLoading, isError, error } = useQuery({
  queryKey: ["posts"],
  queryFn: fetchPosts,
  // staleTime: 1000,
  staleTime: 365 * 24 * 60 * 60 * 1000,
});