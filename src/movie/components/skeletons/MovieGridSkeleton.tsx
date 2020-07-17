import MovieCardSkeleton from "./MovieCardSkeleton";
import { Grid } from "@material-ui/core";

const MovieGridSkeleton: React.FunctionComponent = () => {
  return (
    <Grid container justify="space-between" spacing={2}>
      {[...Array(20).keys()].map((num) => (
        <Grid md={3} xs={6} lg={3} key={num} item>
          <MovieCardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieGridSkeleton;
