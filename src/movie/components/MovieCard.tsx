import React, { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { MovieDto } from "../dto/movie.dto";
import { useRouter } from "next/router";

interface Props {
  movie: MovieDto;
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    cursor: "pointer",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const MovieCard: FunctionComponent<Props> = ({ movie }) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push("/movie/[id]", `/movie/${movie.id}`)}
      className={classes.root}
    >
      <CardContent>
        <Typography variant="h2">{movie.title}</Typography>
        <Typography variant="subtitle1">{movie.tagline}</Typography>
        <Typography variant="body1">{movie.overview}</Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
