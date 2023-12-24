"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { signOut } from "next-auth/react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ColorPalette from "@/utilis/colorPalette.";
import { Badge, Grid, formLabelClasses } from "@mui/material";
import NotificationModal from "@/components/buyers/notification/notificationModal/NotificationModal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function BuyerNavBar(props) {
  const router = useRouter();
  const [notificationModal, setNotificationModal] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const signOutClick = () => {
    signOut();
    sessionStorage.removeItem("role");
  };

  return (
    <div>
      {notificationModal && (
        <NotificationModal
          modalOpen={notificationModal}
          onClose={() => setNotificationModal(false)}
          setModalOpen={setNotificationModal}
        />
      )}

      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          component="nav"
          sx={{ padding: 2, backgroundColor: ColorPalette.teal }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" }, fontSize: "large" }}
              >
                <MenuIcon />
              </IconButton>
              <Button onClick={() => router.push("/buyers/")}>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    display: { xs: "none", sm: "block" },
                    fontFamily: "Arial",
                    color: "white",
                  }}
                >
                  Recycle Nepal
                </Typography>
              </Button>
            </Box>
            <Typography
              variant="h6"
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                fontFamily: "Arial",
                fontSize: "1.5rem", // Increase the font size
                color: "white",
              }}
            >
              Buyers Portal
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: "40px" }}>
              <Grid item>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  sx={{ fontSize: "large" }}
                  onClick={() => {
                    setNotificationModal(true);
                  }}
                >
                  <Badge badgeContent={4} color="error">
                    <NotificationsIcon fontSize="large" />
                  </Badge>
                </IconButton>
              </Grid>
              <Grid item>
                <Link href="/login">
                  <Button className="text-gray-700" onClick={signOutClick}>
                    <LogoutIcon style={{ color: "white" }} fontSize="large" />
                  </Button>
                </Link>
              </Grid>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
