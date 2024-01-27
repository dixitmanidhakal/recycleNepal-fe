"use client";

import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "react-scroll";
import axios from "axios";
import ColorPalette from "@/utilis/colorPalette.";
import ConfirmModal from "@/components/confirmModal/ConfirmModal";
import UserNavBar from "@/components/user/navBar/UserNavbar";
import { useQuery } from "@tanstack/react-query";
import { getCartEndpoint } from "@/services/routes/users/cart";
import handleRequest from "@/services/apiHandler";
import { useSession } from "next-auth/react";

export default function AddToCart() {
  const session = useSession();
  const [checkedItems, setCheckedItems] = useState({});
  const token = sessionStorage.getItem("token");
  const [orderSuccessFull, setOrderSuccessFull] = useState(false);

  //user notification
  const userNotification = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4009/orders/user/orderNotification/${session?.data?.user?._id}`,
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

  const { data: notification, error } = useQuery({
    queryKey: ["completeOrder"],
    queryFn: userNotification,
    enabled: !!token && !!session?.data?.user?._id,
  });
  console.log("notification", notification);

  //searching and fetching client data
  const { data: cartData, isLoading } = useQuery({
    queryKey: ["addToCart"],
    queryFn: async () => handleRequest(getCartEndpoint, "GET"),
  });

  const handleChange = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSelectData = async (id) => {
    console.log("sessiion id", session?.data);

    const sendData = {
      purchased: checkedItems[id] || false,
    };
    const token = sessionStorage.getItem("token");

    try {
      const { data } = await axios.put(
        `http://localhost:4009/users/cart/${session?.data?.user?._id}/${id}`,
        sendData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      console.log("success!!!");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteData = async (id) => {
    console.log("delete id", id);
    const token = sessionStorage.getItem("token");
    try {
      const { data } = await axios.delete(
        `http://localhost:4009/users/cart/${session?.data?.user?._id}/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      console.log("success!!!");
    } catch (error) {
      console.log(error.message);
    }
  };

  const submitOrder = async () => {
    const token = sessionStorage.getItem("token");

    try {
      const { data } = await axios.post(
        `http://localhost:4009/orders/createOrder/${session?.data?.user?._id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      setOrderSuccessFull("Order send Successfully");
      console.log("success!!!");
    } catch (error) {
      console.log(error.message);
    }
  };

  const [confirmModal, setConfirmModal] = useState(false);
  const [message, setMessage] = useState("");
  const cartBadge = cartData?.length;
  const notificationBadge = notification?.orders?.length;

  return (
    <div className="p-10">
      {confirmModal && (
        <ConfirmModal
          modalOpen={confirmModal}
          setModalOpen={setConfirmModal}
          onClose={() => setConfirmModal(false)}
          message={message}
        />
      )}
      <UserNavBar
        data={notification}
        cartBadge={cartBadge}
        notificationBadge={notificationBadge}
      />

      <Typography
        variant="h3"
        style={{
          color: ColorPalette.teal,
          marginTop: "130px",
          display: "flex",
          justifyContent: "center",
          maxWidth: "80%",
        }}
      >
        Add to Cart
      </Typography>
      <Grid
        container
        sx={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          margin: "50px",
          maxHeight: "75%",
          maxWidth: "80%",
          overflowY: "scroll",
        }}
      >
        {!cartData && <h1>Loading...</h1>}
        {cartData?.map((item, index) => (
          <div
            container
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              backgroundColor: "#f5f5f5",
              padding: "30px",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedItems[item._id] || false}
                  onChange={() => handleChange(item._id)}
                />
              }
            />
            {/* <Image src={item.image} height={100} width={200} alt="card image" /> */}
            <Grid
              container
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Typography variant="h5" sx={{ color: ColorPalette.teal }}>
                {item.name}
              </Typography>
              <Typography
                variant="body2"
                paddinLeft={1}
                marginTop={2}
                sx={{ fontWeight: 600 }}
              >
                quantity: {item.quantity}
              </Typography>
              <Typography marginTop={1} sx={{ fontWeight: 600 }}>
                Price per Unit: {item.unitPrice}
              </Typography>
              <Typography marginTop={1} sx={{ fontWeight: 600 }}>
                Total: {item.total}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <Button
                variant="contained"
                style={{
                  backgroundColor: ColorPalette.teal,
                  borderRadius: "8px",
                  width: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => handleSelectData(item?._id)}
              >
                <Typography
                  variant="body1"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "white",
                    padding: "5px",
                  }}
                >
                  Add
                </Typography>
              </Button>
              <Button
                variant="contained"
                style={{
                  backgroundColor: ColorPalette.danger,
                  borderRadius: "8px",
                }}
                onClick={() => handleDeleteData(item?._id)}
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
                  Delete
                </Typography>
              </Button>
            </Grid>
            <Divider sx={{ color: "black" }} />
          </div>
        ))}
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          maxWidth: "80%",
        }}
      >
        <Grid item>
          <Button
            variant="contained"
            style={{ backgroundColor: ColorPalette.teal, borderRadius: "8px" }}
            onClick={submitOrder}
          >
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "white",
                padding: "5px",
              }}
            >
              Place order
            </Typography>
          </Button>
          {orderSuccessFull && (
            <Typography sx={{ color: ColorPalette.teal }}>
              {orderSuccessFull}
            </Typography>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
