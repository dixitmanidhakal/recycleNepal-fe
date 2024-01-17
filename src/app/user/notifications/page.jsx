"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Box, Grid, Typography, Divider } from "@mui/material";
import ColorPalette from "@/utilis/colorPalette.";
import BuyerNavBar from "@/components/buyers/buyerNavBar/BuyerNavBar";
import ConfirmModal from "@/components/confirmModal/ConfirmModal";
import UserNavBar from "@/components/user/navBar/UserNavbar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import handleRequest from "@/services/apiHandler";
import { getCartEndpoint } from "@/services/routes/users/cart";

const UserNotification = () => {
  const [confirmModal, setConfirmModal] = useState(false);

  const token = sessionStorage.getItem("token");
  const session = useSession();

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

  const { data, isLoading, error } = useQuery({
    queryKey: ["completeOrder"],
    queryFn: userNotification,
    enabled: !!token && !!session?.data?.user?._id,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  //searching and fetching client data
  const { data: cartData } = useQuery({
    queryKey: ["addToCart"],
    queryFn: async () => handleRequest(getCartEndpoint, "GET"),
  });
  const cartBadge = cartData?.length;
  const notificationBadge = data?.orders?.length;

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
        <UserNavBar
          data={data}
          cartBadge={cartBadge}
          notificationBadge={notificationBadge}
        />
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
            {data?.orders?.map((item, index) => (
              <div>
                {item?.buyerDetails?.map((buyer) => (
                  <Typography key={index}>
                    {console.log("ITems", item)}
                    {buyer?.company} accepted your buy request from{" "}
                    {buyer?.location}
                  </Typography>
                ))}
              </div>
            ))}

            <Divider />
          </Box>
        </Box>
      </Grid>
    </div>
  );
};

export default UserNotification;
