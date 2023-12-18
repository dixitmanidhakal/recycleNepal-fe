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
} from "@mui/material";
import WrapperDiv from "@/components/layout/WrapperDiv";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

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

const FormField = ({ label, register, error, isSubmitted, ...props }) => (
  <>
    <TextField
      label={label}
      fullWidth
      margin="normal"
      {...register(label, { required: `${label} is required`, ...props })}
    />
    {error && isSubmitted && (
      <Typography color="error">{error.message}</Typography>
    )}
  </>
);

const SelectField = ({ label, control, error, options, ...props }) => (
  <>
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
  </>
);

const UserForm = ({ register, errors, isSubmitted }) => (
  <>
    <FormField
      label="First Name"
      register={register}
      error={errors.firstName}
      isSubmitted={isSubmitted}
    />
    <FormField
      label="Last Name"
      register={register}
      error={errors.lastName}
      isSubmitted={isSubmitted}
    />
    <FormField
      label="Contact"
      register={register}
      error={errors.contact}
      isSubmitted={isSubmitted}
    />
    <FormField
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
      label="Company Name"
      register={register}
      error={errors.companyName}
      isSubmitted={isSubmitted}
    />
    <FormField
      label="Location"
      register={register}
      error={errors.buyerLocation}
      isSubmitted={isSubmitted}
    />
    <FormField
      label="PAN Number"
      register={register}
      error={errors.panNumber}
      isSubmitted={isSubmitted}
    />
    <SelectField
      label="Select Vehicle"
      control={control}
      error={errors.vehicle}
      options={["car", "bike"]}
    />
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
            label="Email"
            register={register}
            error={errors.email}
            isSubmitted={isSubmitted}
            pattern={/^\S+@\S+$/i}
          />
          <FormField
            type="password"
            label="Password"
            register={register}
            error={errors.password}
            isSubmitted={isSubmitted}
          />
          <FormField
            type="password"
            label="Confirm Password"
            register={register}
            error={errors.confirmPassword}
            isSubmitted={isSubmitted}
          />
          <SelectField
            label="Role"
            control={control}
            error={errors.role}
            options={roles}
            onChange={handleRoleChange}
            value={selectedRole}
          />
        </>
      );
    case 1:
      return selectedRole === "User" ? (
        <UserForm
          register={register}
          errors={errors}
          isSubmitted={isSubmitted}
        />
      ) : (
        <ItinerantBuyerForm
          register={register}
          control={control}
          errors={errors}
          isSubmitted={isSubmitted}
        />
      );
    default:
      return "Unknown step";
  }
};

const StepperForm = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const onSubmit = (data) => {
    setIsSubmitted(true);
    console.log("submitted data", data);
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    const isValid = await trigger(fields[steps[activeStep]]);

    if (isValid) {
      handleSubmit(onSubmit)();
      router.push("/login");
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