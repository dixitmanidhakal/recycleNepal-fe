"use client";

import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut, useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();

  // Check if there is a session and the user has a role
  if (session && session.user && session.user.role) {
    // Store the role in local storage
    localStorage.setItem("role", session.user.role);
  }
  const role = localStorage.getItem("role");

  const signOutClick = () => {
    signOut();
  };

  return (
    <div>
      <Box>
        <Button
          className=" text-gray-700"
          sx={{
            my: 2,
            display: "block",
          }}
          onClick={signOutClick}
        >
          <LogoutIcon />
          <Typography className="mt-3 text-xs">Sign Out</Typography>
        </Button>
      </Box>
      <Grid container>
        {role === "User" ? (
          <Grid>
            <Typography variant="h1">This is user component</Typography>
          </Grid>
        ) : (
          <Grid>
            <Typography>This is buyer component</Typography>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Home;
