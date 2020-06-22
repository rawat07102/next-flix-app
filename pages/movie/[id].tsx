import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import useSwr from "swr";

import Image from "material-ui-image";

import { MovieDto } from "../../src/movie/dto/movie.dto";
import api from "../../src/shared/utils/api";

import Layout from "../../src/shared/components/Layout";
import { Typography, Grid, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";

interface Props {
  data: MovieDto;
}

const useStyles = makeStyles((_theme) => ({
  title: {
    fontSize: "3rem",
  },
}));

const MoviePage: NextPage<Props> = ({ data: movie }) => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSwr(`/movie/${id}`, {
    initialData: movie,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (error) return <h1>Error</h1>;

  return (
    <Layout>
      <Grid container direction="column" justify="space-between">
        {/**** title ****/}
        <Grid item xs={12}>
          <Typography variant="h1" className={classes.title}>
            {data?.title}
          </Typography>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Image
              src={
                !isLoading
                  ? "https://image.tmdb.org/t/p/w500" + data?.poster_path
                  : ""
              }
              aspectRatio={3 / 4}
            />
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">{data?.overview}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
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
