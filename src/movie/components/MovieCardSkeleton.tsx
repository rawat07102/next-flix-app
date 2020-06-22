import Skeleton from "@material-ui/lab/Skeleton";
import { CardContent, Card } from "@material-ui/core";

const MovieCardSkeleton = () => {
  return (
    <Card>
      <CardContent>
        <Skeleton variant="rect" height="394.6px" width="100%" />
        <Skeleton variant="text" height="100%" width="100%" />
      </CardContent>
    </Card>
  );
};

export default MovieCardSkeleton;
