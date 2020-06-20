import { Grid } from "@material-ui/core";
import { MovieDto } from "../dto/movie.dto";
import MovieCard from "./MovieCard";

interface Props {
  movies: MovieDto[];
}

const MovieGrid: React.FunctionComponent<Props> = ({ movies }) => {
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
