import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import FormInput from "@buffbyte/components/form/input";
import FormStep from "@buffbyte/components/form/step";
import AuthLayout from "@buffbyte/components/form/step/auth";
import Button from "@buffbyte/components/ui/button";
import BuffByteLogo from "@buffbyte/components/ui/logo";
import { BsArrowRight } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { getApiErrorMessage } from "../../utils/api/axios";
import { AuthService } from "../../services/auth";
import { showToast } from "../../utils";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation
  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  // Check if current step is valid
  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return validateEmail(formData.email);
      case 2:
        return validatePassword(formData.password);
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
      if (!validateEmail(formData.email)) {
        setErrors({ email: "Please enter a valid email address" });
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
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
      await AuthService.login(formData.email, formData.password);
      showToast.success("Login successful!");
      navigate("/app/dashboard");
    } catch (error) {
      setErrors({ password: getApiErrorMessage(error) });
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
              title="Welcome back"
              subtitle="Sign in to your account"
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
              title="Enter your password"
              subtitle="Welcome back! Please enter your password"
            >
              <FormInput
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                error={errors.password}
                showPasswordToggle
                required
                autoComplete="current-password"
              />

              <div className="flex justify-between items-center">
                <button
                  onClick={handleBack}
                  className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                  type="button"
                >
                  ← Back
                </button>
                <a
                  href="#"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium hidden"
                >
                  Forgot password?
                </a>
              </div>

              <Button
                onClick={handleNext}
                disabled={!isStepValid(2)}
                loading={loading}
                variant="creator"
                fullWidth
                className="mt-6"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </FormStep>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="text-center pt-6 border-t border-gray-200">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/auth/signup"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
