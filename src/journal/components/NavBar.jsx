import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import MenuOutlined from "@mui/icons-material/MenuOpenOutlined";

import { AppBar, Grid2, IconButton, Toolbar, Typography } from "@mui/material";
import { startLogout } from "../../store/auth";

export const NavBar = ({ drawerWidth }) => {

  const dispatch = useDispatch();

  const onLogOut = () => {
    dispatch(startLogout());
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: {
          sm: `calc(100% - ${drawerWidth}px)`,
        },
        ml: {
          sm: `${drawerWidth}px`,
        },
        height: 64,
      }}
    >
      <Toolbar sx={{ height: "100%" }}>
        <Grid2
          sx={{
            width: "100%",
            direction: "row",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* menu burger button */}
          <Grid2 display={"flex"} alignItems={"center"}>
            <IconButton
              color="inherit"
              edge="start"
              sx={{
                mr: 2,
                display: { sm: "none" },
              }}
            >
              <MenuOutlined />
            </IconButton>
            <Typography>JournalApp</Typography>
          </Grid2>

          <IconButton color="error" onClick={onLogOut}>
            <LogoutOutlined />
          </IconButton>
        </Grid2>
      </Toolbar>
    </AppBar>
  );
};

NavBar.propTypes = {
  drawerWidth: PropTypes.number.isRequired,
};
