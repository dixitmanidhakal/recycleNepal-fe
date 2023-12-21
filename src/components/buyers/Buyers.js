import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { Button } from "react-scroll";
import { signOut } from "next-auth/react";
import LogoutIcon from "@mui/icons-material/Logout";

const Buyers = () => {
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
      <Grid>
        <Typography variant="h1">This is buyer component</Typography>
      </Grid>
    </div>
  );
};

export default Buyers;
