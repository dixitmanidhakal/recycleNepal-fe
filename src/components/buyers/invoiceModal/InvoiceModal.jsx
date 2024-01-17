import CustomModal from "@/components/modal/CustomModal";
import {
  Button,
  Grid,
  IconButton,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import ColorPalette from "@/utilis/colorPalette.";

const InvoiceModal = ({ modalOpen, onClose, setModalOpen, data }) => {
  const calculateOverallTotal = (data) => {
    // Flatten the array of orders
    const flattenedOrders = data.flat();

    return flattenedOrders.reduce((total, item) => {
      return total + (item?.details?.total || 0);
    }, 0);
  };

  return (
    <div>
      <CustomModal
        modalOpen={modalOpen}
        onClose={onClose}
        setModalOpen={setModalOpen}
        overflow="hidden"
      >
        {data?.map((row, index) => (
          <div className="w-full rounded-lg bg-white p-5 ">
            <Grid
              pr={2}
              container
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h3">Invoice</Typography>
              <IconButton
                id="button-addGroupCloseIcon"
                size="small"
                onClick={onClose}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography
                variant="h5"
                sx={{
                  marginTop: "10px",
                  display: "flex",
                  justifyItems: "center",
                }}
              >
                Billed To:
              </Typography>
              <Typography>
                {console.log("userDetaulks", row)}
                {row?.userDetails?.firstName + "" + row?.userDetails?.lastName}
              </Typography>
              <Typography>{row?.userDetails?.location}</Typography>
            </Grid>
            <Grid container spacing={2} mt={2}>
              {/* Company Information */}
              <Grid item xs={12} m={4}>
                <TableContainer
                  style={{ maxHeight: "20vh", overflowY: "scroll" }}
                >
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
                        {["name", "quantity", "volume", "total"].map(
                          (header) => (
                            <TableCell key={header}>
                              <Typography variant="body1" fontWeight="bold">
                                {header}
                              </Typography>
                            </TableCell>
                          )
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row?.orders?.map((item, index) => (
                        <TableRow
                          key={index}
                          sx={{ borderBottom: "3px solid #e6fafa" }}
                        >
                          <TableCell>
                            {item?.details?.name} 
                          </TableCell>
                          <TableCell>{item?.details?.quantity}</TableCell>
                          <TableCell>{item?.volume}</TableCell>
                          <TableCell>{item?.details?.total}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12} mr={8}>
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    fontWeight: "bold",
                  }}
                >
                  Total:{calculateOverallTotal(row?.orders)}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4">Thank You !!!</Typography>
              </Grid>
            </Grid>
          </div>
        ))}
      </CustomModal>
    </div>
  );
};

export default InvoiceModal;
