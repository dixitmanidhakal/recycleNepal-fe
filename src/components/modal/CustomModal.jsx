import React from "react";
import { Modal, Box, Grow } from "@mui/material";
import "./customModal.module.css";

export default function CustomModal(props) {
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
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grow in={props.modalOpen} {...(props.modalOpen ? { timeout: 400 } : {})}>
        <Box
          maxHeight={"80%"}
          width={props.minWidth ?? "45vw"}
          overflow={"scroll"}
          maxWidth={props.maxWidth}
          className="modal-box"
          style={{ overflow: props.overflow }}
        >
          {props.children}
        </Box>
      </Grow>
    </Modal>
  );
}
