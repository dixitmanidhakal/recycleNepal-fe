"use client";

import React, { useState } from "react";
import { Button } from "react-scroll";
import { signOut, useSession } from "next-auth/react";
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
  fabClasses,
} from "@mui/material";
import ColorPalette from "@/utilis/colorPalette.";
import BuyerNavBar from "@/components/buyers/buyerNavBar/BuyerNavBar";
import ConfirmModal from "@/components/confirmModal/ConfirmModal";
import InvoiceModal from "@/components/buyers/invoiceModal/InvoiceModal";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Buyers = () => {
  const [invoiceModal, setInvoiceModal] = useState(false);

  const token = sessionStorage.getItem("token");
  const session = useSession();

  


  const completedOrder = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4009/orders/buyer/orderNotification/${session?.data?.user?._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching completed order:", error);
      throw error; // Re-throw the error to let React Query handle it
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["completeOrder"],
    queryFn: completedOrder,
    enabled: !!token && !!session?.data?.user?._id,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }



  return (
    <div>
      {invoiceModal && (
        <InvoiceModal
          modalOpen={invoiceModal}
          onClose={() => setInvoiceModal(false)}
          setModalOpen={setInvoiceModal}
          data={data}
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
                  {["R.N.", "User Name", "Location"].map(
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
                {data?.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ borderBottom: "3px solid #e6fafa" }}
                  >
                    <TableCell>{index}</TableCell>
                    <TableCell>
                      {row?.userDetails?.firstName + row?.userDetails?.lastName}
                    </TableCell>
                    <TableCell>{row?.userDetails?.location}</TableCell>
                    {/* {row.items.map((item, index) => (
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
                    ))} */}

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
