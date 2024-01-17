"use client";

import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import ColorPalette from "@/utilis/colorPalette.";
import BuyerNavBar from "@/components/buyers/buyerNavBar/BuyerNavBar";
import ConfirmModal from "@/components/confirmModal/ConfirmModal";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Buyers = () => {
  const [confirmModal, setConfirmModal] = useState(false);
  const [message, setMessage] = useState("");
  const [acceptedOrders, setAcceptedOrders] = useState([]);

  const token = sessionStorage.getItem("token");
  const session = useSession();

  const fetchOrderList = async () => {
    const response = await axios.get(
      `http://localhost:4009/orders/getOrderList/${session?.data?.user?._id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      }
    );
    return response.data;
  };

  const { data: orderList, isLoading } = useQuery({
    queryKey: ["orderList"],
    queryFn: fetchOrderList,
    enabled: !!token && !!session?.data?.user?._id,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }


  const handleSelectData = async (id) => {
    const sendData = {
      isComplete: true,
    };
    const token = sessionStorage.getItem("token");

    try {
      const { data } = await axios.post(
        `http://localhost:4009/orders/accpectedOrder/${session?.data?.user?._id}`,
        sendData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      console.log("success!!!");
      setAcceptedOrders([...acceptedOrders, id]);
    } catch (error) {
      console.log(error.message);
    }
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
                  {["User Name", "Location", "Items"].map((header) => (
                    <TableCell key={header}>
                      <Typography variant="h6" fontWeight="bold">
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
                {orderList?.orders?.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ borderBottom: "3px solid #e6fafa" }}
                  >
                    <TableCell>
                      <Typography variant="body1">
                        {row?.userInfo?.firstName +
                          "" +
                          row?.userInfo?.lastName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        {row?.userInfo?.location}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Table>
                        <TableHead>
                          <TableRow>
                            {[
                              "Volume",
                              "Item",
                              "Quantity",
                              "Price",
                              "Total",
                            ].map((header) => (
                              <TableCell key={header}>
                                <Typography variant="body1" fontWeight="bold">
                                  {header}
                                </Typography>
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {row?.orderDetails?.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item?.volume}</TableCell>
                              <TableCell>{item?.details?.name}</TableCell>
                              <TableCell>{item?.details?.quantity}</TableCell>
                              <TableCell>{item?.details?.unitPrice}</TableCell>
                              <TableCell>{item?.details?.total}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableCell>
                    {!acceptedOrders.includes(row._id) && (
                      <>
                        <TableCell>
                          <Button
                            variant="contained"
                            style={{
                              backgroundColor: ColorPalette.teal,
                              borderRadius: "8px",
                            }}
                            onClick={() => {
                              handleSelectData(row._id);
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
                              Accept
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
                      </>
                    )}
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
