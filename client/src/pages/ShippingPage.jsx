import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../features/cart/cartSlice";
import {
  MapPin,
  Globe,
  Mail,
  Phone,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const steps = [
    { name: "Login", active: step1, link: "/login" },
    { name: "Shipping", active: step2, link: "/shipping" },
    { name: "Payment", active: step3, link: "/payment" },
    { name: "Place Order", active: step4, link: "/placeorder" },
  ];

  return (
    <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
      {steps.map((step, index) => (
        <React.Fragment key={step.name}>
          <div
            className={`flex items-center gap-2 ${
              step.active ? "text-primary" : "text-slate-300"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                step.active
                  ? "bg-primary text-white"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              {index + 1}
            </div>
            <span className="font-bold hidden sm:block">{step.name}</span>
          </div>
          {index < steps.length - 1 && (
            <ChevronRight className="h-4 w-4 text-slate-200 hidden sm:block" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const ShippingPage = () => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <CheckoutSteps step1 step2 />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[40px] shadow-xl p-10 border border-slate-100"
      >
        <h1 className="text-3xl font-black text-slate-900 mb-8">
          Shipping Address
        </h1>

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">
              Street Address
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="123 Main St"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-primary transition shadow-inner"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                City
              </label>
              <input
                type="text"
                placeholder="New York"
                className="w-full px-4 py-3.5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-primary transition shadow-inner"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Postal Code
              </label>
              <input
                type="text"
                placeholder="10001"
                className="w-full px-4 py-3.5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-primary transition shadow-inner"
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">
              Country
            </label>
            <div className="relative">
              <Globe className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="United States"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-primary transition shadow-inner"
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-blue-600 text-white py-5 rounded-3xl font-black text-lg shadow-xl shadow-primary/30 transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 mt-8"
          >
            Continue to Payment <ArrowRight className="h-6 w-6" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export { CheckoutSteps };
export default ShippingPage;
