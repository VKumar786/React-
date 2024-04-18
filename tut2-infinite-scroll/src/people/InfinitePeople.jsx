import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Person } from "./Person";
import { useInfiniteQuery } from "@tanstack/react-query";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  // TODO: get data for InfiniteScroll via React Query
  const {
    isLoading,
    isFetching,
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["peoples"],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam), // in next is become url/?page=2
    getNextPageParam: (lastPage, pages) => lastPage.next || undefined,
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
    <>
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
        {data?.pages?.map((pageData) => {
          return pageData?.results?.map((person) => {
            return <Person {...person} key={person.name} />;
          });
        })}
      </InfiniteScroll>
    </>
  );
}
