"use client";

import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function LoginForm() {
  const [credentialError, setCredentialError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();

  const { data: session } = useSession();
  // sessionStorage.setItem("token", session?.user?.token);
  sessionStorage.setItem("token", JSON.stringify(session?.user?.token));

  const router = useRouter();
  const onSubmit = async (data, e) => {
    e?.preventDefault();
    setCredentialError("");
    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (res?.error) {
        setCredentialError(
          "Unable to login! Please check your credentials and confirm you have required privileges"
        );
        setLoading(false);
        return;
      }

      // Extract the access token from the session data
      const accessToken = session?.user?.token;

      if (session && session.user && session.user.role) {
        if (session.user.role === "User") {
          // You can use the accessToken as needed, for example, in API requests
          console.log("Access Token:", accessToken);
          router.push("/user");
          setLoading(true);

          return;
        }

        if (session.user.role === "Itinerant Buyers") {
          router.push("/buyers");
          setLoading(true);
        }
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
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
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email",
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
          onInput={() => {
            setCredentialError("");
            clearErrors("password");
          }}
        />
        {errors?.password && (
          <p className="text-xs text-red-600">{errors.password.message}</p>
        )}
      </div>
      <div>
        {credentialError && (
          <p className="text-xs text-red-600"> {credentialError} </p>
        )}
      </div>
      <div className="mt-4 flex h-10 w-1/4 items-center justify-center rounded-md bg-teal-600 text-white hover:bg-teal-700">
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          <Button type="submit">
            <Typography color="#ffffff">Login</Typography>
          </Button>
        )}
      </div>
      <Grid className="mt-3">
        <Link
          href="/forgot-password"
          className="text-sm text-teal-600 hover:underline"
        >
          Forgot your password?
        </Link>
      </Grid>
      <Grid className="mt-1">
        <Link
          href="/register"
          className="text-sm text-teal-600 hover:underline"
        >
          Reister here
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
