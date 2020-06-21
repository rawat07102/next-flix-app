import React, { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { MovieDto } from "../dto/movie.dto";
import { useRouter } from "next/router";
import { CardMedia } from "@material-ui/core";

interface Props {
  movie: MovieDto;
}

const useStyles = makeStyles((_theme) => ({
  root: {
    cursor: "pointer",
    minHeight: "394.6px",
    height: "100%",
  },
  title: {
    fontSize: "1.3rem",
  },
  media: {
    height: "394.6px",
  },
}));

const MovieCard: FunctionComponent<Props> = ({ movie }) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push("/movie/[id]", `/movie/${movie.id}`)}
      className={classes.root}
    >
      <CardMedia
        image={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
        className={classes.media}
        title={movie.title}
      />
      <CardContent>
        <Typography noWrap={true} className={classes.title} variant="h2">
          {movie.title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
