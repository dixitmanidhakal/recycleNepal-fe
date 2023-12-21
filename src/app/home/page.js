"use client";

import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import User from "@/components/user/User";
import Buyers from "@/components/buyers/Buyers";

const Home = () => {
  const { data: session } = useSession();

  // Check if there is a session and the user has a role
  if (session && session.user && session.user.role) {
    // Store the role in local storage
    localStorage.setItem("role", session.user.role);
  }
  const role = localStorage.getItem("role");

  return (
    <div>
      <Grid container>{role === "User" ? <User /> : <Buyers />}</Grid>
    </div>
  );
};

export default Home;
