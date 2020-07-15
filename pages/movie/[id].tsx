import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import useSwr from "swr";

import Image from "material-ui-image";

import { MovieDto } from "../../src/movie/dto/movie.dto";
import api from "../../src/shared/utils/api";

import Layout from "../../src/shared/components/Layout";
import { Typography, Grid, makeStyles, Modal, Button } from "@material-ui/core";
import { useEffect, useState } from "react";

interface Props {
  data: MovieDto;
}

const useStyles = makeStyles((theme) => ({
  rootContainer: {},
  headContainer: {},
  bodyContainer: {
    marginTop: theme.spacing(1),
  },
  mediaContainer: {},
  header: {},
  subHeader: {},
  body: {
    marginLeft: theme.spacing(1),
  },
  title: {
    fontSize: "3rem",
  },
  trailerButton: {
    marginTop: "4px",
  },
  poster: {},
}));

const MoviePage: NextPage<Props> = ({ data: movie }) => {
  // const [open, setOpen] = useState(false);
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
      <Grid container className={classes.rootContainer}>
        <Grid
          container
          item
          justify="space-between"
          className={classes.headContainer}
        >
          <Typography variant="h2">{data?.title}</Typography>
          <Typography variant="subtitle1">{data?.release_date}</Typography>
        </Grid>

        <Grid
          container
          item
          justify="space-between"
          wrap="nowrap"
          className={classes.bodyContainer}
        >
          <Grid item xs={4} className={classes.mediaContainer}>
            <Image
              src={
                !isLoading
                  ? `https://image.tmdb.org/t/p/w500/${data?.poster_path}`
                  : ""
              }
              aspectRatio={3 / 4}
              disableSpinner
            ></Image>
          </Grid>
          <Grid container item className={classes.body}>
            <Typography variant="body">{data?.overview}</Typography>
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
