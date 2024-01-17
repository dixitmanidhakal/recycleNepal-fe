"use client";

import { Box, Divider, Grid, Typography, Tab } from "@mui/material";
import React, { useState } from "react";
import UserNavBar from "../../components/user/navBar/UserNavbar";
import CardComponent from "../../components/user/card/CardComponent";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import ColorPalette from "@/utilis/colorPalette.";
import {
  electronicsAndOthersItems,
  glassAndPlasticItems,
  metalItems,
  paperItems,
} from "@/utilis/itemsData";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import handleRequest from "@/services/apiHandler";
import { getCartEndpoint } from "@/services/routes/users/cart";

const User = () => {
  const [value, setValue] = useState("1");

  const handleTabChange = (newValue) => {
    setValue(newValue);
  };
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

  const {
    data: notification,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["completeOrder"],
    queryFn: userNotification,
    enabled: !!token && !!session?.data?.user?._id,
  });

  //searching and fetching client data
  const { data: cartData } = useQuery({
    queryKey: ["addToCart"],
    queryFn: async () => handleRequest(getCartEndpoint, "GET"),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const notificationBadge = notification?.orders?.length;
  const cartBadge = cartData?.length;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <UserNavBar notificationBadge={notificationBadge} cartBadge={cartBadge} />
        </Grid>
      </Grid>
      <Grid container>
        <Box sx={{ width: "100%", typography: "body1", marginTop: "160px" }}>
          <Grid item container justifyContent="center">
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 0,
                  borderColor: "divider",
                }}
              >
                <TabList
                  value={value}
                  onChange={(event, newValue) => handleTabChange(newValue)}
                >
                  <Tab
                    label="Paper"
                    value="1"
                    style={{
                      textTransform: "none",
                      fontSize: "20px",
                      color: "black",
                      fontWeight: value === "1" ? "bold" : "",
                    }}
                  />
                  <Tab
                    label="Glass and Plastic"
                    value="2"
                    style={{
                      textTransform: "none",
                      fontSize: "20px",
                      color: "black",
                      fontWeight: value === "2" ? "bold" : "",
                    }}
                  />
                  <Tab
                    label="Metal"
                    value="3"
                    style={{
                      textTransform: "none",
                      fontSize: "20px",
                      color: "black",
                      fontWeight: value === "3" ? "bold" : "",
                    }}
                  />
                  <Tab
                    label="Electronics"
                    value="4"
                    style={{
                      textTransform: "none",
                      fontSize: "20px",
                      color: "black",
                      fontWeight: value === "4" ? "bold" : "",
                    }}
                  />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Grid container marginLeft={10}>
                  {paperItems.map((item, index) => (
                    <Grid item key={index}>
                      <CardComponent
                        image={item.src}
                        title={item.name}
                        description={item.description}
                        cost={item.price}
                      />
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel value="2">
                <Grid container marginLeft={10}>
                  {glassAndPlasticItems.map((item, index) => (
                    <Grid item key={index}>
                      <CardComponent
                        image={item.src}
                        title={item.name}
                        description={item.description}
                        cost={item.price}
                      />
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel value="3">
                <Grid container marginLeft={10}>
                  {metalItems.map((item, index) => (
                    <Grid item key={index}>
                      <CardComponent
                        image={item.src}
                        title={item.name}
                        description={item.description}
                        cost={item.price}
                      />
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel value="4">
                <Grid container marginLeft={10}>
                  {electronicsAndOthersItems.map((item, index) => (
                    <Grid item key={index}>
                      <CardComponent
                        image={item.src}
                        title={item.name}
                        description={item.description}
                        cost={item.price}
                      />
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
            </TabContext>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

export default User;
