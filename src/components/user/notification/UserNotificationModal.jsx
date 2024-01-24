import React from "react";
import {
  Modal,
  Box,
  Grow,
  Grid,
  Typography,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import "./notificationModal.module.css";
import CloseIcon from "@mui/icons-material/Close";
import ColorPalette from "@/utilis/colorPalette.";
import { useRouter } from "next/navigation";

export default function UserNotificationModal(props) {
  const router = useRouter();
  const data = props.data;

  const handleClose = () => {
    props.setModalOpen(false);
    if (props.onClose) {
      props.onClose();
    }
  };


  return (
    <Modal
      open={props.modalOpen}
      onClose={handleClose}
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-end",
      }}
      BackdropProps={{
        invisible: true,
      }}
    >
      <Grow in={props.modalOpen} {...(props.modalOpen ? { timeout: 400 } : {})}>
        <Box
          maxHeight={"80%"}
          width={props.minWidth ?? "15vw"}
          overflow={"scroll"}
          className="modal-box"
          style={{
            overflow: "hidden",
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "10px",
            margin: "67px",
            marginRight: "155px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              container
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 1, ml: 2, pr: 2 }}
            >
              <Typography variant="h6" style={{ color: ColorPalette.teal }}>
                Notifications
              </Typography>
              <IconButton
                id="button-addGroupCloseIcon"
                size="small"
                onClick={props.onClose}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12} ml={2} pr={2}>
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
            </Grid>
            <Grid
              ml={2}
              pr={2}
              container
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
              sx={{ mt: 1 }}
            >
              <Button
                sx={{ textDecoration: "underline" }}
                onClick={() => router.push("/user/notifications/")}
              >
                View All
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grow>
    </Modal>
  );
}
