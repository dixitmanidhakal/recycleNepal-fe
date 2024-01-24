"use client";

import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import WrapperDiv from "@/components/layout/WrapperDiv";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import handleRequest from "@/services/apiHandler";
import { registerRoute } from "@/services/routes/auth";
import { Link } from "react-scroll";
import { signIn } from "next-auth/react";
import axios from "axios";

const steps = ["step1", "step2"];
const fields = {
  step1: ["email", "password", "confirmPassword", "role"],
  step2: [
    "firstName",
    "lastName",
    "contact",
    "location",
    "companyName",
    "buyerLocation",
    "panNumber",
    "vehicle",
    "capacity",
  ],
};

const FormField = ({ name, label, register, error, isSubmitted, ...props }) => (
  <>
    <TextField
      label={label}
      fullWidth
      margin="normal"
      {...register(name, { required: `${label} is required`, ...props })}
    />
    {error && <Typography color="error">{error.message}</Typography>}
  </>
);

const SelectField = ({ label, control, error, options, ...props }) => (
  <div className="flex flex-col">
    <FormControl fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <Controller
        name={label.toLowerCase()}
        control={control}
        defaultValue=""
        rules={{ required: `${label} is required` }}
        render={({ field }) => (
          <Select {...field}>
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
    {error && <Typography color="error">{error.message}</Typography>}
  </div>
);

const UserForm = ({ register, errors, isSubmitted }) => (
  <>
    <FormField
      name="firstName"
      label="First Name"
      register={register}
      error={errors.firstName}
      isSubmitted={isSubmitted}
    />
    <FormField
      name="lastName"
      label="Last Name"
      register={register}
      error={errors.lastName}
      isSubmitted={isSubmitted}
    />
    <FormField
      name="contact"
      label="Contact"
      register={register}
      error={errors.contact}
      isSubmitted={isSubmitted}
    />
    <FormField
      name="location"
      label="Location"
      register={register}
      error={errors.location}
      isSubmitted={isSubmitted}
    />
  </>
);

const ItinerantBuyerForm = ({ register, control, errors, isSubmitted }) => (
  <>
    <FormField
      name="companyName"
      label="Company Name"
      register={register}
      error={errors.companyName}
      isSubmitted={isSubmitted}
    />
    <FormField
      name="buyerLocation"
      label="Location"
      register={register}
      error={errors.buyerLocation}
      isSubmitted={isSubmitted}
    />
    <FormField
      name="panNumber"
      label="PAN Number"
      register={register}
      error={errors.panNumber}
      isSubmitted={isSubmitted}
    />
    <div className="flex gap-3">
      <SelectField
        label="vehicle"
        control={control}
        error={errors.vehicle}
        options={[
          "Two wheeler",
          "pick-up truck",
          "logistic truck",
          "mini van",
          "ricksaw",
        ]}
      />
      <SelectField
        label="capacity"
        control={control}
        error={errors.capacity}
        options={[20, 50, 100, 500, 1000, 2000, 5000, 10000]}
      />
    </div>
  </>
);

const getStepContent = (
  handleRoleChange,
  step,
  selectedRole,
  register,
  control,
  errors,
  isSubmitted
) => {
  switch (step) {
    case 0:
      return (
        <>
          <FormField
            name="email"
            label="Email"
            register={register}
            error={errors.email}
            isSubmitted={isSubmitted}
            pattern={/^\S+@\S+$/i}
          />
          <FormField
            name="password"
            type="password"
            label="Password"
            register={register}
            error={errors.password}
            isSubmitted={isSubmitted}
          />
          <FormField
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            register={register}
            error={errors.confirmPassword}
            isSubmitted={isSubmitted}
          />
          <Select
            sx={{ marginTop: "8px" }}
            fullWidth
            label="Age"
            control={control}
            error={errors.role}
            onChange={handleRoleChange}
            value={selectedRole}
          >
            <MenuItem value="User">User</MenuItem>
            <MenuItem value="Itinerant Buyers">Itenirant Buyers </MenuItem>
          </Select>
        </>
      );
    case 1:
      return selectedRole === "User" ? (
        <UserForm
          register={register}
          errors={errors}
          isSubmitted={isSubmitted}
          name={name}
        />
      ) : (
        <ItinerantBuyerForm
          register={register}
          control={control}
          errors={errors}
          isSubmitted={isSubmitted}
          name={name}
        />
      );
    default:
      return "Unknown step";
  }
};

const StepperForm = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState("User");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [axiosError, setAxiosError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
  } = useForm();

  const handleNext = async () => {
    const currentStepName = steps[activeStep];
    const currentStepFields = fields[currentStepName];

    const isValid = await trigger(currentStepFields);

    if (isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      console.log(errors); // Log errors to debug
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const onSubmit = async (data) => {
    console.log("form data", data);

    let formattedData;

    if (selectedRole === "Itinerant Buyers") {
      formattedData = {
        email: data.email,
        password: data.password,
        password_confirm: data.confirmPassword,
        role: selectedRole,
        otherFields: {
          company: data.companyName,
          location: data.buyerLocation,
          PAN: data.panNumber,
          vehicle: [
            {
              model: data.vehicle,
              maximumCapacity: data.capacity,
            },
          ],
        },
      };
    } else if (selectedRole === "User") {
      formattedData = {
        email: data.email,
        password: data.password,
        password_confirm: data.confirmPassword,
        role: selectedRole,
        otherFields: {
          firstName: data.firstName,
          lastName: data.lastName,
          contact: data.contact,
          location: data.location,
        },
      };
    }

    console.log("formated data", formattedData);

    try {
      const response = await axios.post(
        "http://localhost:4009/auth/register",
        formattedData
      );
    } catch (error) {
      setAxiosError(error.response.data.message);
    }

    console.log("success!!!", response);
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    const isValid = await trigger(fields[steps[activeStep]]);

    if (isValid) {
      try {
        await handleSubmit(onSubmit)();
      } catch (error) {
        console.error("Error during form submission:", error);
      }
    }
  };

  const onButtonClick = () => {};

  return (
    <div className="flex flex-col items-center text-center justify-center ">
      <WrapperDiv>
        <form className="p-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 mt-2 inline-flex items-center justify-center gap-3 sm:mx-3">
            <div className="h-[40px] w-[7px] bg-purple-700 font-lato"></div>
            <Typography variant="h4">
              <strong className="sm:text-3xl">Recycle Nepal</strong>
            </Typography>
          </div>
          <Stepper
            style={{ fontWeight: "700" }}
            activeStep={activeStep}
            alternativeLabel
          >
            <Step key="Step1">
              <StepLabel>Email and Role</StepLabel>
            </Step>
            <Step key="Step2">
              <StepLabel>
                {selectedRole === "User" ? "User Details" : "Buyer Details"}
              </StepLabel>
            </Step>
          </Stepper>
          <div className="pt-5">
            {activeStep === 2 ? (
              <Typography variant="h3">All steps completed</Typography>
            ) : (
              <>
                {getStepContent(
                  handleRoleChange,
                  activeStep,
                  selectedRole,
                  register,
                  control,
                  errors,
                  isSubmitted
                )}
                <div className="pt-4 flex items-center justify-center gap-5">
                  <Button
                    style={{
                      text: "white",
                      "&:hover": {
                        backgroundColor: "#006666",
                      },
                    }}
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "#008080",
                      "&:hover": {
                        backgroundColor: "#006666",
                      },
                    }}
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={activeStep === 1 ? handleFinish : handleNext}
                  >
                    {activeStep === 1 ? "Finish" : "Next"}
                  </Button>
                </div>
                {axiosError && (
                  <div className="text-red-600">{axiosError} </div>
                )}
              </>
            )}
          </div>
          <Grid className="mt-4">
            <Button
              onClick={onButtonClick}
              sx={{
                fontSize: "13px", // Adjust the font size as needed
                color: "#008080", // Your desired text color
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              <ArrowBackIcon fontSize="small" />
              Back to Login
            </Button>
          </Grid>
        </form>
      </WrapperDiv>
    </div>
  );
};

export default StepperForm;
