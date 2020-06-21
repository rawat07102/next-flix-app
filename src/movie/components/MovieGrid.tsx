import { Grid } from "@material-ui/core";
import { MovieDto } from "../dto/movie.dto";
import MovieCard from "./MovieCard";

interface Props {
  movies: MovieDto[];
}

const MovieGrid: React.FunctionComponent<Props> = ({ movies }) => {
  return (
    <div>
      <Grid container justify="space-between" spacing={2}>
        {movies.map((movie) => (
          <Grid md={3} xs={6} lg={3} item key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MovieGrid;
