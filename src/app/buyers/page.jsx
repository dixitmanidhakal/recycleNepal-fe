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
import InvoiceModal from "@/components/buyers/invoiceModal/InvoiceModal";

const Buyers = () => {
  const [invoiceModal, setInvoiceModal] = useState(false);

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
      {invoiceModal && (
        <InvoiceModal
          modalOpen={invoiceModal}
          onClose={() => setInvoiceModal(false)}
          setModalOpen={setInvoiceModal}
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
            Users order
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
                          backgroundColor: ColorPalette.primary,
                          borderRadius: "8px",
                        }}
                        onClick={() => {
                          setInvoiceModal(true);
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
                          Invoice
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
