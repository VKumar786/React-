import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import { useInfiniteQuery } from "@tanstack/react-query";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  // TODO: get data for InfiniteScroll via React Query
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["species"],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
      getNextPageParam: (lastPage, allPage) => lastPage.next || undefined,
  });

  if (isLoading) return <div>Loading...</div>;
  else if (isError)
    return (
      <div>
        <h1>Some Error Occur</h1>
        <p>{error.message.toString()}</p>
      </div>
    );

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={() => {
        if (!isFetching) fetchNextPage();
      }}
      hasMore={hasNextPage}
      loader={
        <div className="loader" key={0}>
          Loading ...
        </div>
      }
    >
      {data?.pages?.map((page) => {
        return page?.results?.map((spice) => {
          return <Species key={spice.name} {...spice} />;
        });
      })}
    </InfiniteScroll>
  );
}
