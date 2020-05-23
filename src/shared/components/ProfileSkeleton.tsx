import Skeleton from "@material-ui/lab/Skeleton";
import { Card, CardContent } from "@material-ui/core";

const ProfileSkeleton = () => {
  return (
    <Card>
      <CardContent>
        <Skeleton variant="text" height={30} width={100}></Skeleton>
      </CardContent>
      <CardContent>
        <Skeleton variant="text" height={20} width={250}></Skeleton>
        <Skeleton variant="text" height={20} width={250}></Skeleton>
      </CardContent>
    </Card>
  );
};

export default ProfileSkeleton;
