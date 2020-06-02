import React, { useState, useContext } from "react";
import { NextComponentType } from "next";
import useSwr from "swr";

import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "./Drawer";

import {
  AppBar,
  IconButton,
  makeStyles,
  Container,
  Button,
} from "@material-ui/core";
import Link from "next/link";
import axios from "../utils/axios";
import { AuthContext } from "../../auth/context/auth.context";

const useStyles = makeStyles((_theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  iconButton: {
    marginRight: "auto",
  },
  loginButton: {
    marginLeft: "auto",
  },
}));

const NavBar: NextComponentType = () => {
  const user = useContext(AuthContext);
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
  };

  const authButton = user ? (
    <Button onClick={handleLogout}>Logout</Button>
  ) : (
    <Link href="/login">
      <Button>Login</Button>
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
          <MenuIcon />
        </IconButton>
        <Link href="/profile">
          <Button>Profile</Button>
        </Link>
        {authButton}
      </Container>
    </AppBar>
  );
};

export default NavBar;
