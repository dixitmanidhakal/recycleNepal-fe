import { Box, Divider, Grid, Typography, Tab } from "@mui/material";
import React, { useState } from "react";
import UserNavBar from "./navBar/UserNavbar";
import CardComponent from "./card/CardComponent";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import ColorPalette from "@/utilis/colorPalette.";

const User = () => {
  const [value, setValue] = useState("1");

  const handleTabChange = (newValue) => {
    setValue(newValue);
  };
  console.log("value", value);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <UserNavBar />
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
                  <Grid item>
                    <CardComponent
                      image="/images/newspaper.jpg"
                      title="newspapers"
                      description="any types of news paper"
                      cost={10}
                    />
                  </Grid>
                  <Grid item>
                    <CardComponent
                      image="/images/newspaper.jpg"
                      title="newspapers"
                      description="any types of news paper"
                      cost={10}
                    />
                  </Grid>
                  <Grid>
                    <CardComponent
                      image="/images/newspaper.jpg"
                      title="newspapers"
                      description="any types of news paper"
                      cost={10}
                    />
                  </Grid>
                  <Grid>
                    <CardComponent
                      image="/images/newspaper.jpg"
                      title="newspapers"
                      description="any types of news paper"
                      cost={10}
                    />
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value="2">
                <Grid container marginLeft={10}>
                  <Grid item>
                    <CardComponent
                      image="/images/newspaper.jpg"
                      title="newspapers"
                      description="any types of news paper"
                      cost={10}
                    />
                  </Grid>
                  <Grid item>
                    <CardComponent
                      image="/images/newspaper.jpg"
                      title="newspapers"
                      description="any types of news paper"
                      cost={10}
                    />
                  </Grid>
                  <Grid>
                    <CardComponent
                      image="/images/newspaper.jpg"
                      title="newspapers"
                      description="any types of news paper"
                      cost={10}
                    />
                  </Grid>
                  <Grid>
                    <CardComponent
                      image="/images/newspaper.jpg"
                      title="newspapers"
                      description="any types of news paper"
                      cost={10}
                    />
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value="3">
                <Grid container marginLeft={10}>
                  <Grid item>
                    <CardComponent
                      image="/images/newspaper.jpg"
                      title="newspapers"
                      description="any types of news paper"
                      cost={10}
                    />
                  </Grid>
                  <Grid item>
                    <CardComponent
                      image="/images/newspaper.jpg"
                      title="newspapers"
                      description="any types of news paper"
                      cost={10}
                    />
                  </Grid>
                  <Grid>
                    <CardComponent
                      image="/images/newspaper.jpg"
                      title="newspapers"
                      description="any types of news paper"
                      cost={10}
                    />
                  </Grid>
                  <Grid>
                    <CardComponent
                      image="/images/newspaper.jpg"
                      title="newspapers"
                      description="any types of news paper"
                      cost={10}
                    />
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value="4">
                <Grid container marginLeft={10}>
                  <Grid item>
                    <CardComponent
                      image="/images/newspaper.jpg"
                      title="newspapers"
                      description="any types of news paper"
                      cost={10}
                    />
                  </Grid>
                  <Grid item>
                    <CardComponent
                      image="/images/newspaper.jpg"
                      title="newspapers"
                      description="any types of news paper"
                      cost={10}
                    />
                  </Grid>
                  <Grid>
                    <CardComponent
                      image="/images/newspaper.jpg"
                      title="newspapers"
                      description="any types of news paper"
                      cost={10}
                    />
                  </Grid>
                  <Grid>
                    <CardComponent
                      image="/images/newspaper.jpg"
                      title="newspapers"
                      description="any types of news paper"
                      cost={10}
                    />
                  </Grid>
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
