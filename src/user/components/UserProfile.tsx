import { CardContent, Typography, Card, CardHeader } from "@material-ui/core";
import { UserDTO } from "../../../pages";
import { FunctionComponent } from "react";

interface props {
  user: UserDTO;
}

const UserProfile: FunctionComponent<props> = ({
  user: { email, id, username },
}) => {
  return (
    <Card>
      <CardHeader title={username} />
      <CardContent>
        <Typography variant="subtitle1"> {email}</Typography>
        <Typography variant="subtitle2"> {id}</Typography>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
