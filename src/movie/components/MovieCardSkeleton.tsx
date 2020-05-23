import Skeleton from "@material-ui/lab/Skeleton";
import { CardContent, Card } from "@material-ui/core";

const MovieCardSkeleton = () => {
  return (
    <Card>
      <CardContent>
        <Skeleton variant="rect" height={72} width="50%" />
        <Skeleton variant="text" height={72} />
      </CardContent>
    </Card>
  );
};

export default MovieCardSkeleton;
