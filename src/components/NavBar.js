"use client";

import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import Link from "next/link";

const pages = [
  {
    name: "Why Recycle Nepal",
    link: "why-recycle-nepal",
  },
  {
    name: "How it works",
    link: "how-it-works",
  },
  {
    name: "Who are we",
    link: "who-are-we",
  },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [showNavbar, setShowNavbar] = useState(true);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const scrollToSection = (section) => {
    scroll.scrollTo(section, {
      duration: 800,
      offset: -50,
      smooth: "easeInOutQuad",
    });
    handleCloseNavMenu();
  };

  const handleScroll = () => {
    // Check the scroll position and update showNavbar state
    const isScrolledDown = window.scrollY > 100; // Adjust the threshold as needed
    setShowNavbar(isScrolledDown || window.scrollY <= 0);
  };

  useEffect(() => {
    // Attach the scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);
    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#008080",
        display: showNavbar ? "block" : "none",
      }}
    >
      <Toolbar disableGutters>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleOpenNavMenu}
          sx={{ mr: 2, display: { xs: "flex", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          sx={{
            mr: 20,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Recycle Nepal
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {pages.map((page) => (
              <MenuItem
                key={page.name}
                onClick={() => scrollToSection(page.link)}
              >
                <Typography textAlign="center" display="flex" gap={8}>
                  {page.name}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Box
          sx={{ flexGrow: 1, display: { xs: "none", md: "flex", gap: "50px" } }}
        >
          {pages.map((page) => (
            <ScrollLink
              key={page.name}
              to={page.link}
              spy
              smooth
              duration={800}
              offset={-50}
            >
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                {page.name}
              </Button>
            </ScrollLink>
          ))}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Login/Register">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="User Avatar" src="/static/images/avatar.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px"}}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem key="Login"  onClick={handleCloseUserMenu}>
              <Link href="/login">
                <Typography textAlign="center">Login</Typography>
              </Link>
            </MenuItem>
            <MenuItem key="Register"  onClick={handleCloseUserMenu}>
              <Link href="/register">
                <Typography textAlign="center">Register</Typography>
              </Link>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default ResponsiveAppBar;
