import { Box, Toolbar } from "@mui/material";
import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";
import PropTypes from "prop-types";

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* navbar */}
      <NavBar drawerWidth={drawerWidth} />

      {/* sidebar */}
      <SideBar drawerWidth={drawerWidth} />

      <Box
        component="main"
        sx={{
          flexGrow: 1, 
          p: 3, 
          bgcolor: "background.default" 
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

JournalLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
