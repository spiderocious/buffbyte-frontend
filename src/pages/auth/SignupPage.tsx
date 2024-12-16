import FormInput from "@buffbyte/components/form/input";
import FormStep from "@buffbyte/components/form/step";
import AuthLayout from "@buffbyte/components/form/step/auth";
import Button from "@buffbyte/components/ui/button";
import BuffByteLogo from "@buffbyte/components/ui/logo";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { PasswordStrengthIndicator } from "../../components/feedback/password-strength";

interface FormData {
  fullName: string;
  email: string;
  password: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  terms?: string;
}

const SignupPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordValidity, setPasswordValidity] = useState<boolean>(false);

  const validateName = (name: string): boolean => {
    return name.trim().length >= 2;
  };

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation
  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  // Check if current step is valid
  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return validateName(formData.fullName);
      case 2:
        return validateEmail(formData.email);
      case 3:
        return validatePassword(formData.password) && passwordValidity;
      default:
        return false;
    }
  };

  // Handle input changes
  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Handle next step
  const handleNext = (): void => {
    if (currentStep === 1) {
      if (!validateName(formData.fullName)) {
        setErrors({
          fullName: "Please enter your full name (at least 2 characters)",
        });
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!validateEmail(formData.email)) {
        setErrors({ email: "Please enter a valid email address" });
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      handleSubmit();
    }
  };

  // Handle back step
  const handleBack = (): void => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle form submission
  const handleSubmit = async (): Promise<void> => {
    if (!validatePassword(formData.password)) {
      setErrors({ password: "Password must be at least 6 characters" });
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Handle successful signup here
      console.log("Signup successful:", formData);
      alert("Account created successfully!");
    } catch (error) {
      console.error("Signup error:", error);
      setErrors({ password: "Signup failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  // Handle enter key
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent): void => {
      if (e.key === "Enter" && isStepValid(currentStep)) {
        handleNext();
      }
    };

    document.addEventListener("keypress", handleKeyPress);
    return () => document.removeEventListener("keypress", handleKeyPress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, formData]);
  

  return (
    <AuthLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <BuffByteLogo className="mx-auto" />
        </div>

        {/* Form Steps */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <FormStep
              key="step1"
              title="Let's get started"
              subtitle="What should we call you?"
            >
              <FormInput
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                error={errors.fullName}
                required
                autoComplete="name"
              />

              <Button
                onClick={handleNext}
                disabled={!isStepValid(1)}
                fullWidth
                className="mt-6 flex items-center justify-center"
              >
                Continue <BsArrowRight className="ml-2" />
              </Button>
            </FormStep>
          )}

          {currentStep === 2 && (
            <FormStep
              key="step2"
              title="What's your email?"
              subtitle="We'll use this to create your account"
            >
              <FormInput
                label="Email Address"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                error={errors.email}
                required
                autoComplete="email"
              />

              <div className="flex justify-between items-center">
                <button
                  onClick={handleBack}
                  className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                  type="button"
                >
                  ← Back
                </button>
              </div>

              <Button
                onClick={handleNext}
                disabled={!isStepValid(2)}
                fullWidth
                className="mt-6 flex items-center justify-center"
              >
                Continue <BsArrowRight className="ml-2" />
              </Button>
            </FormStep>
          )}

          {currentStep === 3 && (
            <FormStep
              key="step3"
              title="Secure your account"
              subtitle="Choose a strong password"
            >
              <div>
                <FormInput
                  label="Password"
                  type="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  error={errors.password}
                  showPasswordToggle
                  required
                  autoComplete="new-password"
                />
                <PasswordStrengthIndicator password={formData.password} onChange={(valid) => setPasswordValidity(valid)} />
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={handleBack}
                  className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                  type="button"
                >
                  ← Back
                </button>
              </div>

              <Button
                onClick={handleNext}
                disabled={!isStepValid(3)}
                loading={loading}
                variant="creator"
                fullWidth
                className="mt-6"
              >
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </FormStep>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="text-center pt-6 border-t border-gray-200">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a
              href="#"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignupPage;
