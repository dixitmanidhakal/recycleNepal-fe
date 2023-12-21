import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { signOut } from "next-auth/react";

import { Badge } from "@mui/material";
import ColorPalette from "@/utilis/colorPalette.";
import AddToCart from "@/components/addToCart/AddToCart";

export default function UserNavBar(props) {
  const [addToCartOpen, setAddToCartOpen] = React.useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const signOutClick = () => {
    signOut();
  };

  return (
    <div>
      {addToCartOpen && (
        <AddToCart
          modalOpen={addToCartOpen}
          onClose={() => addToCartOpen(false)}
          setModalOpen={setAddToCartOpen}
        />
      )}
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav" sx={{ padding: 2, backgroundColor: "#008080" }}>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" }, fontSize: "large" }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  display: { xs: "none", sm: "block" },
                  fontFamily: "Arial",
                }}
              >
                Recycle Nepal
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "40px" }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                sx={{ fontSize: "large" }}
                onClick={() => setAddToCartOpen(true)}
              >
                <Badge badgeContent={4} color="error">
                  <ShoppingCartOutlinedIcon fontSize="large" />
                </Badge>
              </IconButton>
              <Button className="text-gray-700" onClick={signOutClick}>
                <LogoutIcon style={{ color: "white" }} fontSize="large" />
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
