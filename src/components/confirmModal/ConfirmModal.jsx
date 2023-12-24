import React from "react";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ColorPalette from "@/utilis/colorPalette.";
import CustomModal from "../modal/CustomModal";

const ConfirmModal = ({ modalOpen, onClose, setModalOpen, message }) => {
  return (
    <div>
      <CustomModal
        modalOpen={modalOpen}
        onClose={onClose}
        setModalOpen={setModalOpen}
        overflow="hidden"
      >
        <div className="w-full rounded-lg bg-white p-5">
          <Grid
            ml={2}
            pr={2}
            container
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography>Are you sure you want to {message}?</Typography>
            <IconButton
              id="button-addGroupCloseIcon"
              size="small"
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid
            pt={3}
            container
            display="flex"
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Button
              // onClick={onDelete}
              style={{
                backgroundColor: ColorPalette.teal,
                borderRadius: "15px",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#ffffff",
                }}
              >
                Yes
              </Typography>
            </Button>
            <Button
              // onClick={() => setModalOpen(false)}
              style={{
                backgroundColor: ColorPalette.danger,
                color: "white",
                borderRadius: 30,
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#ffffff",
                }}
              >
                No
              </Typography>
            </Button>
          </Grid>
        </div>
      </CustomModal>
    </div>
  );
};

export default ConfirmModal;
