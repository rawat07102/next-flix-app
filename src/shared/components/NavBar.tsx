import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "./Drawer";
import { NextComponentType } from "next";
import { useRouter } from "next/router";

import {
  AppBar,
  IconButton,
  makeStyles,
  Container,
  Button,
} from "@material-ui/core";
import Link from "next/link";
import axios from "../utils/axios";
import { mutate } from "swr";

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
  const router = useRouter();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen((prevState) => !prevState);
  };

  const handleLogout = async () => {
    await axios.post("auth/logout");
    mutate("/user/profile", null, true);
    router.replace("/");
  };

  return (
    <AppBar position="static">
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
        {/* {loginButton} */}
        <Link href="/login">
          <Button>Login</Button>
        </Link>
        <Button onClick={handleLogout}>Logout</Button>
      </Container>
    </AppBar>
  );
};

export default NavBar;
