import React from "react";
import CustomModal from "../modal/CustomModal";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";

const AddToCart = ({ modalOpen, onClose, setModalOpen }) => {
  return (
    <div>
      <CustomModal
        modalOpen={modalOpen}
        onClose={onClose}
        setModalOpen={setModalOpen}
        overflow="hidden"
      >
        <Grid container sx={{ backgroundColor: "white", display: "flex" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FormControlLabel control={<Checkbox />} label="" />
            <Image
              src="/images/newspaper.jpg"
              height={100}
              width={200}
              alt="card image"
            />
            <Typography sx={{ marginRight: "1rem" }}>
              Quantity: 5kg * Rs10
            </Typography>
            <Typography sx={{ marginRight: "1rem" }}>Total: Rs100</Typography>
            <Button>
              <CloseIcon />
            </Button>
          </Box>
        </Grid>
      </CustomModal>
    </div>
  );
};

export default AddToCart;
