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
  Divider,
} from "@mui/material";
import ColorPalette from "@/utilis/colorPalette.";
import BuyerNavBar from "@/components/buyers/buyerNavBar/BuyerNavBar";
import ConfirmModal from "@/components/confirmModal/ConfirmModal";
import UserNavBar from "@/components/user/navBar/UserNavbar";

const UserNotification = () => {
  const [confirmModal, setConfirmModal] = useState(false);

  const buyer = {
    name: "buyer1",
    location: "kathmandu",
  };

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
        <UserNavBar />
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
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              padding: "10px",
              paddingY: "20px",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                backgroundColor: ColorPalette.grey,
              },
            }}
          >
            <Typography>
              {buyer.name} accpected your buy request from
              {buyer.location}
            </Typography>
            <Divider />
          </Box>
        </Box>
      </Grid>
    </div>
  );
};

export default UserNotification;
