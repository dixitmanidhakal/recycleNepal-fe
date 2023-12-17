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
  Box,
} from "@mui/material";
import WrapperDiv from "@/components/layout/WrapperDiv";
import { useForm, Controller } from "react-hook-form";

const roles = ["User", "Itinerant Buyer"];
const steps = ["step1", "step2", "step3"];
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
  ],
};

const UserForm = ({ register, errors, isSubmitted }) => {
  return (
    <>
      <TextField
        label="First Name"
        fullWidth
        margin="normal"
        {...register("firstName", { required: "First Name is required" })}
      />
      {errors.firstName && isSubmitted && (
        <Typography color="error">{errors.firstName.message}</Typography>
      )}

      <TextField
        label="Last Name"
        fullWidth
        margin="normal"
        {...register("lastName", { required: "Last Name is required" })}
      />
      {errors.lastName && isSubmitted && (
        <Typography color="error">{errors.lastName.message}</Typography>
      )}

      <TextField
        label="Contact"
        fullWidth
        margin="normal"
        {...register("contact", { required: "Contact is required" })}
      />
      {errors.contact && isSubmitted && (
        <Typography color="error">{errors.contact.message}</Typography>
      )}

      <TextField
        label="Location"
        fullWidth
        margin="normal"
        {...register("location", { required: "Location is required" })}
      />
      {errors.location && isSubmitted && (
        <Typography color="error">{errors.location.message}</Typography>
      )}
    </>
  );
};

const ItinerantBuyerForm = ({ register, control, errors, isSubmitted }) => {
  return (
    <>
      <TextField
        label="Company Name"
        fullWidth
        margin="normal"
        {...register("companyName", { required: "Company Name is required" })}
      />
      {errors.companyName && isSubmitted && (
        <Typography color="error">{errors.companyName.message}</Typography>
      )}

      <TextField
        label="Location"
        fullWidth
        margin="normal"
        {...register("buyerLocation", { required: "Location is required" })}
      />
      {errors.buyerLocation && isSubmitted && (
        <Typography color="error">{errors.buyerLocation.message}</Typography>
      )}

      <TextField
        label="PAN Number"
        fullWidth
        margin="normal"
        {...register("panNumber", { required: "PAN Number is required" })}
      />
      {errors.panNumber && isSubmitted && (
        <Typography color="error">{errors.panNumber.message}</Typography>
      )}

      <FormControl fullWidth margin="normal">
        <InputLabel>Select Vehicle</InputLabel>
        <Controller
          name="vehicle"
          control={control}
          defaultValue=""
          rules={{ required: "Vehicle is required" }}
          render={({ field }) => (
            <Select {...field}>
              <MenuItem value="car">Car</MenuItem>
              <MenuItem value="bike">Bike</MenuItem>
            </Select>
          )}
        />
      </FormControl>
    </>
  );
};

const getStepContent = (
  handleRoleChange,
  step,
  selectedRole,
  register,
  control,
  errors,
  touchedFields,
  isSubmitted
) => {
  switch (step) {
    case 0:
      return (
        <>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register("email", {
              required: "Email is required",
              pattern: /^\S+@\S+$/i,
            })}
          />
          {errors.email && (
            <Typography color="error">{errors.email.message}</Typography>
          )}

          <TextField
            type="password"
            label="Password"
            fullWidth
            margin="normal"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <Typography color="error">{errors.password.message}</Typography>
          )}

          <TextField
            type="password"
            label="Confirm Password"
            fullWidth
            margin="normal"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
            })}
          />
          {errors.confirmPassword && (
            <Typography color="error">
              {errors.confirmPassword.message}
            </Typography>
          )}
          <FormControl fullWidth margin="normal">
            <Select value={selectedRole} onChange={handleRoleChange}>
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
            {errors.role && (
              <Typography color="error">{errors.role.message}</Typography>
            )}
          </FormControl>
        </>
      );
    case 1:
      return selectedRole === "User" ? (
        <UserForm
          register={register}
          control={control}
          errors={errors}
          touchedFields={touchedFields}
          isSubmitted={isSubmitted}
        />
      ) : (
        <ItinerantBuyerForm
          register={register}
          control={control}
          errors={errors}
          touchedFields={touchedFields}
        />
      );
    default:
      return "Unknown step";
  }
};

const StepperForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, touchedFields },
    trigger,
  } = useForm();

  const handleNext = async () => {
    const currentStepName = steps[activeStep];
    const currentStepFields = fields[currentStepName];

    // Trigger validation for the current step fields
    const isValid = await trigger(currentStepFields);

    if (isValid) {
      // If the current step fields are valid, go to the next step
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleRoleChange = (event) => {
    console.log("selected role", event.target.value);
    setSelectedRole(event.target.value);
  };

  const onSubmit = (data) => {
    setIsSubmitted(true);
    console.log("submitted data", data);
  };

  const handleFinish = async (e) => {
    e.preventDefault(); // Prevent the form from being submitted
    const isValid = await trigger(fields[steps[activeStep]]); // Validate the current step fields

    if (isValid) {
      handleSubmit(onSubmit)(); // Submit the form
    }
  };

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
                  touchedFields,
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
                    disabled={
                      !selectedRole ||
                      (activeStep === 0 && Object.keys(errors).length > 0)
                    }
                  >
                    {activeStep === 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              </>
            )}
          </div>
        </form>
      </WrapperDiv>
    </div>
  );
};

export default StepperForm;
