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

import { signOut, useSession } from "next-auth/react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ColorPalette from "@/utilis/colorPalette.";
import { Badge, Grid, formLabelClasses } from "@mui/material";
import NotificationModal from "@/components/buyers/notification/notificationModal/NotificationModal";
import axios from "axios";

export default function BuyerNavBar(props) {
  const router = useRouter();
  const [notificationModal, setNotificationModal] = useState(false);
  const [orderList, setOrderList] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const signOutClick = () => {
    signOut();
    sessionStorage.removeItem("role");
  };

  const token = sessionStorage.getItem("token");
  const session = useSession();

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4009/orders/getOrderList/${session?.data?.user?._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          }
        );
        setOrderList(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchOrderList();
  }, [session, token]);
  return (
    <div>
      {notificationModal && (
        <NotificationModal
          modalOpen={notificationModal}
          onClose={() => setNotificationModal(false)}
          setModalOpen={setNotificationModal}
          orderData={orderList}
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
                  <Badge badgeContent={orderList?.orders?.length} color="error">
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
