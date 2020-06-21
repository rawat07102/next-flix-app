import NavBar from "./NavBar";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core";
// import Drawer from "./Drawer";
// import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
}));

const Layout: React.FunctionComponent = ({ children }) => {
  const classes = useStyles();

  return (
    <div>
      <NavBar />
      <Container className={classes.container} component="main" maxWidth="lg">
        {children}
      </Container>
    </div>
  );
};

export default Layout;
