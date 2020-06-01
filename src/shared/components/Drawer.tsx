import { Drawer as MuiDrawer, makeStyles, Typography } from "@material-ui/core";
import { FunctionComponent } from "react";
import Link from "next/link";
import { TreeView, TreeItem } from "@material-ui/lab";
import { ExpandMore, ChevronRight } from "@material-ui/icons";

interface DrawerProps {
  open: boolean;
  handleClose(): void;
}

const useStyles = makeStyles((_theme) => ({
  drawerPaper: {
    minWidth: "250px",
    width: "12%",
  },
}));

const Drawer: FunctionComponent<DrawerProps> = ({ open, handleClose }) => {
  const classes = useStyles();
  //   const [loggedIn, setLoggedIn] = useState(false);

  //   useEffect(() => {
  //     const userData = localStorage.getItem("userData");
  //     setLoggedIn(!!userData);
  //   });

  return (
    <MuiDrawer
      anchor="left"
      classes={{ paper: classes.drawerPaper }}
      open={open}
      onClose={handleClose}
    >
      <TreeView
        defaultCollapseIcon={<ExpandMore />}
        defaultExpandIcon={<ChevronRight />}
      >
        <TreeItem
          nodeId="1"
          label={
            <Link href="/">
              <Typography variant="h6">Home</Typography>
            </Link>
          }
        ></TreeItem>
        <TreeItem
          nodeId="2"
          label={
            <Link href="/register">
              <Typography variant="h6">SignUp</Typography>
            </Link>
          }
        ></TreeItem>
        {/* {loggedIn && (
          <TreeItem
            nodeId="2"
            label={<Typography variant="h6">Account</Typography>}>
            <TreeItem
              nodeId="3"
              label={
                <Link href="/account/profile">
                  <Typography variant="body1">Profile</Typography>
                </Link>
              }></TreeItem>
            <TreeItem
              nodeId="4"
              label={
                <Link href="/account/add-product">
                  <Typography variant="body1">Add Product</Typography>
                </Link>
              }></TreeItem>
          </TreeItem>
        )} */}
      </TreeView>
    </MuiDrawer>
  );
};

export default Drawer;
