import { NextPage } from "next";
import { useRef, useEffect, useState } from "react";
import useSwr, { useSWRPages } from "swr";

import { Button } from "@material-ui/core";

import { MovieDto } from "../src/movie/dto/movie.dto";
import { UserDTO } from "../src/user/dto/user.dto";

import { useOnScreen } from "../src/shared/hooks/useOnScreen";
import Layout from "../src/shared/components/Layout";
import MovieGrid from "../src/movie/components/MovieGrid";
import MovieGridSkeleton from "../src/movie/components/MovieGridSkeleton";

interface IResponse {
  results: MovieDto[];
  page: number;
  total_pages: number;
  total_results: number;
}

const IndexPage: NextPage<{ user: UserDTO; api: IResponse }> = () => {
  const loadMoreRef = useRef<HTMLButtonElement>(null);
  const [isScrollEnable, setScroll] = useState(false);
  const isOnScreen = useOnScreen(loadMoreRef, "200px");

  useEffect(() => {
    if (isOnScreen && isScrollEnable) loadMore();
  }, [isOnScreen]);

  const { pages, loadMore, isLoadingMore, isReachingEnd } = useSWRPages<
    number,
    IResponse,
    any
  >(
    "movies-list",
    ({ offset, withSWR }) => {
      const { data } = withSWR(useSwr(`/movie/popular?page=${offset}`));

      return data ? <MovieGrid movies={data.results} /> : <MovieGridSkeleton />;
    },
    ({ data }) => (data ? data.page + 1 : 1),
    []
  );

  return (
    <Layout>
      <div>{pages}</div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          ref={loadMoreRef}
          onClick={() => {
            loadMore();
            setScroll(true);
          }}
          disabled={isLoadingMore || isReachingEnd}
        >
          Load More
        </Button>
      </div>
    </Layout>
  );
};

export default IndexPage;
