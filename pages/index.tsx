import useSwr, { useSWRPages } from "swr";
import { NextPage } from "next";

import { MovieDto } from "../src/movie/dto/movie.dto";
import { useRequest } from "../src/shared/utils/useRequest";

import Layout from "../src/shared/components/Layout";
import MovieCard from "../src/movie/components/MovieCard";
import MovieCardSkeleton from "../src/movie/components/MovieCardSkeleton";
import { pagesWithSWRType } from "swr/dist/types";
import { Button } from "@material-ui/core";

interface IResponse {
  results: MovieDto[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface UserDTO {
  email: string;
  id: string;
  username: string;
}

const IndexPage: NextPage<{ user: UserDTO; api: IResponse }> = () => {
  // const { data, error } = useSwr<IResponse>("/movie/popular");
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
      <div>
        <Button onClick={loadMore} disabled={isLoadingMore || isReachingEnd}>
          load
        </Button>
      </div>
    </Layout>
  );
};

export default IndexPage;
