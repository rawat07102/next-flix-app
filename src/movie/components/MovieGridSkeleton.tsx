import MovieCardSkeleton from "./MovieCardSkeleton";

const MovieGridSkeleton: React.FunctionComponent = () => {
  return (
    <div>
      {[...Array(20).keys()].map((num) => (
        <MovieCardSkeleton key={num} />
      ))}
    </div>
  );
};

export default MovieGridSkeleton;
