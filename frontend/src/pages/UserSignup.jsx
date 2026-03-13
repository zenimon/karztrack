import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import AuthCard from "../components/AuthCard";
import InputField from "../components/InputField";
import { authApi, setAuthSession } from "../lib/api";
import { toast } from "../components/ui/sonner";

function UserSignup() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
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
    if (!formValues.name.trim()) newErrors.name = "Name is required.";
    if (!formValues.email.trim()) newErrors.email = "Email is required.";
    if (!formValues.password.trim()) newErrors.password = "Password is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      setIsSubmitting(true);
      const response = await authApi.userSignup(formValues);
      const { token, user } = response.data || {};

      if (token) {
        setAuthSession(token, user);
      }

      toast.success("Account created successfully");
      navigate("/home");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("User signup failed", error);
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
      title="User Sign Up"
      subtitle="Create your personal KarzTrack account to track your active loans."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <InputField
          label="Name"
          name="name"
          icon={User}
          placeholder="Your full name"
          value={formValues.name}
          onChange={handleChange}
          error={errors.name}
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          icon={Mail}
          placeholder="you@example.com"
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
          to="/user/login"
          className="font-medium text-[#a78bfa] hover:text-white transition-colors"
        >
          Login
        </Link>
      </div>
    </AuthCard>
  );
}

export default UserSignup;

