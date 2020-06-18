import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import useSwr from "swr";
import Layout from "../../src/shared/components/Layout";
import { MovieDto } from "../../src/movie/dto/movie.dto";
import api from "../../src/shared/utils/api";

interface Props {
  data: MovieDto;
}

const MoviePage: NextPage<Props> = ({ data: movie }) => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSwr(`/movie/${id}`, {
    initialData: movie,
  });

  if (error) return <h1>Error</h1>;

  return <Layout>{data && <h1>{JSON.stringify(data)}</h1>}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;
  const apiRes = await api.get(`/movie/${id}`);
  return {
    props: {
      data: apiRes.data,
    },
  };
};

export default MoviePage;
