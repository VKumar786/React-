# Global Loading

# Fetching
const isFetching = useIsFetching();

# Error 
export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err) => {
      errorHandler(err.message);
    },
  }),
});

# Prefetch & Pagination