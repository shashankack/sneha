import React from "react";
import { AppBar, Toolbar, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const Navbar = () => {
  return (
    <AppBar
      position="absolute"
      sx={{
        background:
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0))",
        boxShadow: "none",
        zIndex: 1000,
        py: 1,
        px: { xs: 0, md: 10 },
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
        {/* Menu Icon - Left */}
        <IconButton
          sx={{
            color: "white",
          }}
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>

        {/* Porsche Logo - Center */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="/logo.svg"
            alt="Porsche"
            style={{
              height: "15px",
              width: "auto",
              filter: "brightness(0) invert(1)",
            }}
          />
        </Box>

        {/* Account Icon - Right */}
        <IconButton
          sx={{
            color: "white",
          }}
          aria-label="account"
        >
          <AccountCircleOutlinedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
