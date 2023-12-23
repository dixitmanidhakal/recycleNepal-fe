"use client";

import {} from "@mui/material";
import React from "react";
import { Button } from "react-scroll";
import { signOut } from "next-auth/react";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ColorPalette from "@/utilis/colorPalette.";

const Buyers = () => {
  const signOutClick = () => {
    signOut();
    sessionStorage.removeItem("role");
  };

  const testData = [
    {
      username: "dixit dhakal",
      location: "gatthaghar, bhaktapur",
      amount: "Rs 2000",
      items: ["newspaper: 20kg", "iron: 13kg"],
    },
    {
      username: "dixit dhakal",
      location: "gatthaghar, bhaktapur",
      amount: "Rs 2000",
      items: ["newspaper: 20kg", "iron: 13kg"],
    },
    {
      username: "dixit dhakal",
      location: "gatthaghar, bhaktapur",
      amount: "Rs 2000",
      items: ["newspaper: 20kg", "iron: 13kg"],
    },
  ];
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
        <TableContainer style={{ height: "60vh", overflowY: "scroll" }}>
          <Table>
            <TableHead
              style={{
                position: "sticky",
                top: "0",
                zIndex: 1,
                backgroundColor: ColorPalette.white,
              }}
            >
              <TableRow>
                {["User Name", "Location", "Amount", "Items"].map((header) => (
                  <TableCell key={header}>
                    <Typography variant="body1" fontWeight="bold">
                      {header}
                    </Typography>
                  </TableCell>
                ))}
                <TableCell>
                  <Typography variant="body1" fontWeight="bold"></Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" fontWeight="bold"></Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" fontWeight="bold"></Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {testData?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.items}</TableCell>
                  <TableCell>
                    <Button>Invoice</Button>
                  </TableCell>
                  <TableCell>
                    <Button>Accpect</Button>
                  </TableCell>
                  <TableCell>
                    <Button>Decline</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </div>
  );
};

export default Buyers;
