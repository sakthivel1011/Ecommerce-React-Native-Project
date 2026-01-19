import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, clearError } from "../features/auth/authSlice";
import { User, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { userInfo, loading, error } = useSelector((state) => state.auth);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [navigate, userInfo, redirect, error, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-slate-100"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-slate-900 mb-2">
            Join Shopping Hub
          </h2>
          <p className="text-slate-500 font-medium">
            Create your account to start shopping
          </p>
        </div>

        <form onSubmit={submitHandler} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 ml-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-3 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="John Doe"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-primary transition shadow-inner"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 ml-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3 h-5 w-5 text-slate-400" />
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-primary transition shadow-inner"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 ml-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3 h-5 w-5 text-slate-400" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-primary transition shadow-inner"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 ml-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3 h-5 w-5 text-slate-400" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-primary transition shadow-inner"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-primary/25 disabled:opacity-70 active:scale-[0.98] mt-4"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Register"
            )}
            {!loading && <ArrowRight className="h-5 w-5" />}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 font-medium">
            Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-primary font-bold hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
