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

const useStyles = makeStyles((_theme) => ({
  rootContainer: {},
  headContainer: {},
  bodyContainer: {},
  mediaContainer: {},
  header: {},
  subHeader: {},
  body: {
    padding: "0px 8px",
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
  const [open, setOpen] = useState(false);
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
      <Grid
        container
        direction="column"
        justify="space-between"
        // spacing={2}
        className={classes.rootContainer}
      >
        <Grid
          container
          item
          xs={12}
          justify="space-between"
          spacing={2}
          className={classes.headContainer}
        >
          <Grid item xs={4} className={classes.header}>
            <Typography align="center" variant="h1" className={classes.title}>
              {data?.title}
            </Typography>
          </Grid>
          <Grid item className={classes.subHeader}>
            <Typography variant="subtitle1">{data?.release_date}</Typography>
          </Grid>
        </Grid>

        <Grid container item spacing={2} className={classes.bodyContainer}>
          <Grid
            container
            item
            direction="column"
            justify="space-between"
            xs={4}
            spacing={2}
            className={classes.mediaContainer}
          >
            <Image
              src={
                !isLoading
                  ? "https://image.tmdb.org/t/p/w500" + data?.poster_path
                  : ""
              }
              aspectRatio={3 / 4}
              className={classes.poster}
            />
            {/* <div style={{ backgroundColor: "red" }}></div> */}

            <Button
              // style={{ marginTop: "8px" }}
              color="secondary"
              variant="contained"
              className={classes.trailerButton}
            >
              Trailer
            </Button>
          </Grid>
          <Grid container item xs={8} className={classes.body}>
            <Typography variant="body1">{data?.overview}</Typography>
            <Modal open={open} onClose={() => setOpen(false)}>
              <iframe
                allowFullScreen
                width="80%"
                height="80%"
                src={`https://www.youtube.com/embed/SUXWAEX2jlg`}
              ></iframe>
            </Modal>
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
