import Link from "next/link";
import Layout from "./Layout";
import { Typography, Button } from "@material-ui/core";

const NotAuthorized = () => {
  return (
    <Layout>
      <Typography align="center" variant="h1">
        Not Authorized...
      </Typography>
      <Link href="/login">
        <Button>
          <Typography variant="button">Login</Typography>
        </Button>
      </Link>
    </Layout>
  );
};

export default NotAuthorized;
