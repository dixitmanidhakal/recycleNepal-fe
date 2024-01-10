import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, TextField } from "@mui/material";
import Image from "next/image";
import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addToCartEndpoint } from "@/services/routes/users/cart";
import { useForm } from "react-hook-form";
import axios from "axios";

function CardComponent({ image, title, description, cost }) {
  const [inputQuantity, setInputQuantity] = useState();
  console.log("input quaantity", inputQuantity);
  let total = cost * Number(inputQuantity);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleCartSubmit = async () => {
    const sendData = {
      cartItems: [
        {
          name: title,
          quantity: inputQuantity,
          unitPrice: cost,
          total: total,
        },
      ],
    };
    const token = sessionStorage.getItem("token");

    try {
      const { data } = await axios.post(
        "http://localhost:4009/users/cart",
        sendData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      console.log("success!!!");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        padding: "30px",
        boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)",
        marginTop: "20px",
        marginRight: "20px",
        display: "flex-col",
        alignItems: "center",
        justifyContent: "center",
        maxHeight: "550px",
        paddingBottom: "20px",
      }}
    >
      <CardActionArea>
        <div className="flex justify-center max-h-52">
          <Image src={image} height={50} width={300} alt="card image" />
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" marginY={3}>
            {description}
          </Typography>
          <Typography variant="body1" color="text.secondary" marginBottom={1}>
            <strong> Price: </strong> {cost} rs/kg
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            marginBottom={1}
            sx={{ display: "flex", alignItems: "center", gap: "7px" }}
          >
            <strong> Quantity:</strong>
            <TextField
              size="small"
              type="number"
              value={inputQuantity}
              onChange={(e) => setInputQuantity(Number(e.target.value))}
              inputProps={{ min: 0 }}
            />
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <strong> Total:</strong> {total ? total : null}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleCartSubmit}>
          Add To cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default CardComponent;
