import React, { useState, useContext } from "react";
import { NextComponentType } from "next";
import useSwr from "swr";

import Drawer from "./Drawer";

import {
  AppBar,
  IconButton,
  makeStyles,
  Container,
  Button,
  SvgIcon,
} from "@material-ui/core";
import Link from "next/link";
import axios from "../utils/axios";
import { AuthContext } from "../../auth/context/auth.context";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    padding: `0, ${theme.spacing(1)}`,
  },
  iconButton: {
    marginRight: "auto",
    paddingLeft: theme.spacing(1),
    fontSize: "1.5rem",
  },
  loginButton: {
    marginLeft: "auto",
    fontSize: "1.2rem",
    paddingRight: 0,
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const NavBar: NextComponentType = () => {
  const user = useContext(AuthContext);
  const router = useRouter();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { mutate } = useSwr("/user/profile", {
    shouldRetryOnError: false,
  });

  const toggleDrawer = () => {
    setOpen((prevState) => !prevState);
  };

  const handleLogout = async () => {
    await axios.post("auth/logout");
    mutate(null, true);
    localStorage.removeItem("userId");
    router.replace("/");
  };

  const authButton = user ? (
    <Button className={classes.loginButton} onClick={handleLogout}>
      Logout
    </Button>
  ) : (
    <Link href="/login">
      <Button className={classes.loginButton} size="large">
        Login
      </Button>
    </Link>
  );

  return (
    <AppBar position="sticky">
      <Drawer open={open} handleClose={toggleDrawer}></Drawer>
      <Container className={classes.container} maxWidth="lg">
        <IconButton
          onClick={toggleDrawer}
          edge="start"
          className={classes.iconButton}
        >
          <SvgIcon fontSize="inherit">
            <path
              fill="currentColor"
              d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"
            />
          </SvgIcon>
        </IconButton>
        {user && (
          <Link href="/profile">
            <Button>Profile</Button>
          </Link>
        )}
        {authButton}
      </Container>
    </AppBar>
  );
};

export default NavBar;
