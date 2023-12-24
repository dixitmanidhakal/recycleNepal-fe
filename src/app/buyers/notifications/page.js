"use client";

import React, { useState } from "react";
import { Button } from "react-scroll";
import { signOut } from "next-auth/react";
import {
  Box,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ColorPalette from "@/utilis/colorPalette.";
import BuyerNavBar from "@/components/buyers/buyerNavBar/BuyerNavBar";
import ConfirmModal from "@/components/confirmModal/ConfirmModal";

const Buyers = () => {
  const [confirmModal, setConfirmModal] = useState(false);
  const [message, setMessage] = useState("");

  const testData = [
    {
      username: "username 1",
      location: "kathamandu",
      amount: "Rs 2000",
      items: ["newspaper: 20kg", "iron: 13kg"],
    },
    {
      username: "username 2",
      location: "Bhaktapur",
      amount: "Rs 2000",
      items: ["newspaper: 20kg", "iron: 13kg"],
    },
    {
      username: "username3",
      location: "Lalitpur",
      amount: "Rs 2000",
      items: ["newspaper: 20kg", "iron: 13kg"],
    },
  ];
  return (
    <div>
      {confirmModal && (
        <ConfirmModal
          modalOpen={confirmModal}
          onClose={() => setConfirmModal(false)}
          setModalOpen={setConfirmModal}
          message={message}
        />
      )}
      <Box marginBottom={13}>
        <BuyerNavBar />
      </Box>
      <Grid>
        <Box
          sx={{
            margin: "40px",
            maxHeight: "80%",
            overflow: "hidden",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            padding: "20px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginY: "20px",
              color: ColorPalette.teal,
            }}
          >
            Notifications
          </Typography>
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
                <TableRow sx={{ borderBottom: "2px solid #ccc" }}>
                  {["R.N.", "User Name", "Location", "Amount", "Items"].map(
                    (header) => (
                      <TableCell key={header}>
                        <Typography variant="body1" fontWeight="bold">
                          {header}
                        </Typography>
                      </TableCell>
                    )
                  )}
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
                  <TableRow
                    key={index}
                    sx={{ borderBottom: "3px solid #e6fafa" }}
                  >
                    <TableCell>{index}</TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>{row.location}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                    {row.items.map((item, index) => (
                      <TableCell
                        key={index}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          borderBottom: 0,
                        }}
                      >
                        {item}
                      </TableCell>
                    ))}

                    <TableCell>
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: ColorPalette.teal,
                          borderRadius: "8px",
                        }}
                        onClick={() => {
                          setConfirmModal(true);
                          setMessage("acpect order");
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            color: "white",
                            padding: "5px",
                            paddingX: "10px",
                          }}
                        >
                          Accpect
                        </Typography>
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: ColorPalette.danger,
                          borderRadius: "8px",
                        }}
                        onClick={() => {
                          setConfirmModal(true);
                          setMessage("decline order");
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            color: "white",
                            padding: "5px",
                            paddingX: "10px",
                          }}
                        >
                          Decline
                        </Typography>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
    </div>
  );
};

export default Buyers;
