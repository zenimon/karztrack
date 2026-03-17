import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Building2, IdCard, Mail, Lock } from "lucide-react";
import AuthCard from "../components/AuthCard";
import InputField from "../components/InputField";
import { authApi, setAuthSession } from "../lib/api";
import { toast } from "../components/ui/sonner";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Signup() {
  const [formValues, setFormValues] = useState({
    ngoId: "",
    ngoName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formValues.ngoId.trim()) newErrors.ngoId = "NGO ID is required.";
    if (!formValues.ngoName.trim())
      newErrors.ngoName = "NGO name is required.";
    if (!formValues.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formValues.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formValues.password.trim()) {
      newErrors.password = "Password is required.";
    }

    if (!formValues.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm your password.";
    } else if (formValues.password !== formValues.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      setIsSubmitting(true);
      const payload = {
        ngoName: formValues.ngoName,
        email: formValues.email,
        password: formValues.password,
      };

      const response = await authApi.ngoSignup(payload);
      const { token, user } = response.data || {};

      if (token) {
        setAuthSession(token, user);
      }

      toast.success("Account created successfully");
      navigate("/ngo/dashboard");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("NGO signup failed", error);
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        "Unable to create account. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="Create your KarzTrack account"
      subtitle="Set up secure access for your NGO to monitor credit performance and repayments."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <InputField
          label="NGO ID"
          name="ngoId"
          icon={IdCard}
          placeholder="Choose a unique NGO ID"
          value={formValues.ngoId}
          onChange={handleChange}
          error={errors.ngoId}
        />

        <InputField
          label="NGO Name"
          name="ngoName"
          icon={Building2}
          placeholder="Registered NGO name"
          value={formValues.ngoName}
          onChange={handleChange}
          error={errors.ngoName}
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          icon={Mail}
          placeholder="you@ngo.org"
          value={formValues.email}
          onChange={handleChange}
          error={errors.email}
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          icon={Lock}
          placeholder="Create a strong password"
          value={formValues.password}
          onChange={handleChange}
          error={errors.password}
        />

        <InputField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          icon={Lock}
          placeholder="Re-enter your password"
          value={formValues.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#7c3aed] px-4 text-sm font-medium text-white shadow-md transition-colors duration-300 hover:bg-[#a78bfa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f14] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <div className="mt-6 flex items-center justify-between text-xs text-[#b3b3c6]">
        <span className="opacity-80">Already have an account?</span>
        <Link
          to="/ngo/login"
          className="font-medium text-[#a78bfa] hover:text-white transition-colors"
        >
          Login
        </Link>
      </div>
    </AuthCard>
  );
}

export default Signup;

