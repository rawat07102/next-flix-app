import useSwr from "swr";
import { NextPage } from "next";

import { MovieDto } from "../src/movie/dto/movie.dto";
import { useRequest } from "../src/shared/utils/useRequest";

import Layout from "../src/shared/components/Layout";
import MovieCard from "../src/movie/components/MovieCard";
import MovieCardSkeleton from "../src/movie/components/MovieCardSkeleton";

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
  const { data, error } = useSwr<IResponse>("/movie/popular", useRequest);

  if (error) <h1>Error...</h1>;

  return (
    <Layout>
      <div>
        {data
          ? data.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie}></MovieCard>
            ))
          : [...Array(20).keys()].map((num) => <MovieCardSkeleton key={num} />)}
      </div>
    </Layout>
  );
};

export default IndexPage;