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

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { signOut } from "next-auth/react";

import { Badge } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NotificationsIcon from "@mui/icons-material/Notifications";
import UserNotificationModal from "../notification/UserNotificationModal";
import { useState } from "react";

export default function UserNavBar(props) {
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
        <UserNotificationModal
          modalOpen={notificationModal}
          onClose={() => setNotificationModal(false)}
          setModalOpen={setNotificationModal}
        />
      )}
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav" sx={{ padding: 2, backgroundColor: "#008080" }}>
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
              <Button onClick={() => router.push("/user/")}>
                <Typography
                  variant="h6"
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
            <Box sx={{ display: "flex", alignItems: "center", gap: "40px" }}>
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
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                sx={{ fontSize: "large" }}
                onClick={() => router.push("user/add-to-cart")}
              >
                <Badge badgeContent={4} color="error">
                  <ShoppingCartOutlinedIcon fontSize="large" />
                </Badge>
              </IconButton>
              <Link href="/login">
                <Button className="text-gray-700" onClick={signOutClick}>
                  <LogoutIcon style={{ color: "white" }} fontSize="large" />
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
