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

const InvoiceModal = ({ modalOpen, onClose, setModalOpen }) => {
  const companyInfo = {
    name: "RecycleNepal",
    address: "Abc location",
  };

  const user = {
    id: 1,
    name: "John Doe",
    billingAddress: "123 Main St, Cityville",
  };

  const orders = [
    {
      title: "Newspaper",
      quantity: "20kg",
      total: 2000,
    },
    {
      title: "Iron",
      quantity: "10kg",
      total: 500,
    },
  ];

  const calculateOverallTotal = () => {
    return orders.reduce((total, order) => total + order.total, 0);
  };

  // Usage example:
  // const user = users[0];
  // const order = orders[0].items;

  // <InvoiceModal modalOpen={true} onClose={() => {}} setModalOpen={() => {}} user={user} order={order} />

  return (
    <div>
      <CustomModal
        modalOpen={modalOpen}
        onClose={onClose}
        setModalOpen={setModalOpen}
        overflow="hidden"
      >
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
            <Typography>{user.name}</Typography>
            <Typography>{user.billingAddress}</Typography>
          </Grid>
          <Grid container spacing={2} mt={2}>
            {/* User Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                User Information:
              </Typography>
              <Typography>Name: {user.name}</Typography>
              <Typography>Billing Address: {user.billingAddress}</Typography>
            </Grid>
            {/* Company Information */}
            <Grid item xs={12} m={4}>
              <TableContainer
                style={{ maxHeight: "20vh", overflowY: "hidden" }}
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
                      {["title", "quantity", "total"].map((header) => (
                        <TableCell key={header}>
                          <Typography variant="body1" fontWeight="bold">
                            {header}
                          </Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders?.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{ borderBottom: "3px solid #e6fafa" }}
                      >
                        <TableCell>{row.title}</TableCell>
                        <TableCell>{row.quantity}</TableCell>
                        <TableCell>{row.total}</TableCell>
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
                Total:{calculateOverallTotal}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4">Thank You !!!</Typography>
            </Grid>
          </Grid>
        </div>
      </CustomModal>
    </div>
  );
};

export default InvoiceModal;
