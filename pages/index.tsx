import useSwr, { useSWRPages } from "swr";
import { NextPage } from "next";

import { MovieDto } from "../src/movie/dto/movie.dto";

import Layout from "../src/shared/components/Layout";
import MovieCard from "../src/movie/components/MovieCard";
import MovieCardSkeleton from "../src/movie/components/MovieCardSkeleton";
import { Button } from "@material-ui/core";
import { useRef, useEffect, useState, useContext } from "react";
import { useOnScreen } from "../src/shared/hooks/useOnScreen";
import { UserDTO } from "../src/user/dto/user.dto";
import { AuthContext } from "../src/auth/context/auth.context";

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

      if (!data) {
        return [...Array(20).keys()].map((num) => (
          <MovieCardSkeleton key={num} />
        ));
      }
      return (
        <div>
          {data?.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      );
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
