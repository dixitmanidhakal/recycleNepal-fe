"use client";

import { Button, Grid, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const onSubmit = async (data, e) => {
    e?.preventDefault();
    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (res?.error) {
        console.log(res.error);
        return;
      }
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="my-10 flex flex-col items-center"
    >
      <div className="mb-1 mt-6 inline-flex items-center justify-center gap-3 sm:mx-3">
        <div className="h-[40px]  w-[7px] bg-purple-700 font-lato"></div>
        <Typography variant="h4">
          <strong className="sm:text-3xl">Recycle Nepal</strong>
        </Typography>
      </div>
      <Typography
        variant="h5"
        sx={{
          marginTop: "1.25rem",
          marginBottom: "0.25rem",
          fontWeight: 500,
        }}
      >
        LOGIN
      </Typography>
      <Typography variant="subtitle2">
        Enter your credentials to access your account
      </Typography>
      <div className="mt-12 flex w-1/2 flex-col gap-4">
        <TextField
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
          })}
          fullWidth
          id="standard-basic"
          label="Email"
          name="email"
          InputLabelProps={{ shrink: true }}
        />
        {errors?.email && (
          <p className="text-xs text-red-600">{errors.email.message}</p>
        )}
        <TextField
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
          sx={{ marginTop: "0.75rem" }}
          fullWidth
          id="outlined-basic"
          label="Password"
          type="password"
          InputLabelProps={{ shrink: true }}
        />
        {errors?.password && (
          <p className="text-xs text-red-600">{errors.password.message}</p>
        )}
      </div>
      <div className="mt-4 flex h-10 w-1/4 items-center justify-center rounded-md bg-teal-600 text-white hover:bg-teal-700">
        <Button type="submit">
          <Typography color="#ffffff">Login</Typography>
        </Button>
      </div>
      <Grid className="mt-3">
        <Link
          href="/forgot-password"
          className="text-sm text-teal-600 hover:underline"
        >
          Forgot your password?
        </Link>
      </Grid>
      <Grid className="mt-3">
        <Link href="/">
          <Button
            sx={{
              fontSize: "14px", // Adjust the font size as needed
              color: "#008080", // Your desired text color
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            <ArrowBackIcon fontSize="small" />
            Back to Home
          </Button>
        </Link>
      </Grid>
    </form>
  );
}
