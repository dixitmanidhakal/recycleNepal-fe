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
import CloseIcon from "@mui/icons-material/Close";
import ColorPalette from "@/utilis/colorPalette.";
import ConfirmModal from "@/components/confirmModal/ConfirmModal";
import UserNavBar from "@/components/user/navBar/UserNavbar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCartEndpoint } from "@/services/routes/users/cart";
import handleRequest from "@/services/apiHandler";

export default function AddToCart() {
  const queryClient = useQueryClient();

  //searching and fetching client data
  const { data: cartData, isLoading } = useQuery({
    queryKey: ["addToCart"],
    queryFn: async () => handleRequest(getCartEndpoint, "GET"),
  });
  console.log("cart data", cartData);
  const [confirmModal, setConfirmModal] = useState(false);
  const [message, setMessage] = useState("");

  // Sample data
  const data = [
    {
      title: "newspaper",
      quantity: "5kg",
      price: "Rs10",
      total: "Rs100",
      image: "/images/paper/newspaper.jpg",
    },
    {
      title: "newspaper",
      quantity: "6kg",
      price: "Rs12",
      total: "Rs 120",
      image: "/images/paper/newspaper.jpg",
    },
    {
      title: "newspaper",
      quantity: "7kg",
      price: "Rs14",
      total: "Rs140",
      image: "/images/paper/newspaper.jpg",
    },
    {
      title: "newspaper",
      quantity: "8kg",
      price: "Rs16",
      total: "Rs160",
      image: "/images/paper/newspaper.jpg",
    },
    {
      title: "newspaper",
      quantity: "9kg",
      price: "Rs18",
      total: "Rs180",
      image: "/images/paper/newspaper.jpg",
    },
  ];

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
      <UserNavBar />

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
        {data.map((item, index) => (
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
            <FormControlLabel control={<Checkbox />} label="" />
            <Image src={item.image} height={100} width={200} alt="card image" />
            <Grid
              container
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Typography variant="h5" sx={{ color: ColorPalette.teal }}>
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                paddinLeft={1}
                marginTop={2}
                sx={{ fontWeight: 600 }}
              >
                quantity: {item.quantity}
              </Typography>
              <Typography marginTop={5} sx={{ fontWeight: 600 }}>
                Total: {item.total}
              </Typography>
            </Grid>
            <Button>
              <CloseIcon />
            </Button>
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
            onClick={() => {
              setConfirmModal(true);
              setMessage("place order");
            }}
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
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            style={{
              backgroundColor: ColorPalette.danger,
              borderRadius: "8px",
            }}
            onClick={() => {
              setConfirmModal(true);
              setMessage("cancel");
            }}
          >
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "white",
                padding: "5px",
                paddingX: "10px",
              }}
            >
              Cancel
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
