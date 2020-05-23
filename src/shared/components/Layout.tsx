import NavBar from "./NavBar";
import Container from "@material-ui/core/Container";
// import Drawer from "./Drawer";
// import { useState } from "react";

const Layout: React.FunctionComponent = ({ children }) => {
  // const [open, setOpen] = useState(false);

  // const handleClose = () => {
  //   setOpen(prev => !prev);
  // };

  return (
    <div>
      <NavBar />
      <Container component="main" maxWidth="lg">
        {children}
      </Container>
    </div>
  );
};

export default Layout;
