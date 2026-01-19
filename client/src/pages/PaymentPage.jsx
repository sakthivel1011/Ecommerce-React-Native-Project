import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../features/cart/cartSlice";
import { CheckoutSteps } from "./ShippingPage";
import { CreditCard, Wallet, ArrowRight, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

const PaymentPage = () => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const navigate = useNavigate();

  if (!shippingAddress.address) {
    navigate("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  const methods = [
    {
      id: "UPI",
      name: "UPI / GPay / PhonePe",
      icon: <Smartphone className="h-6 w-6" />,
    },
    {
      id: "PayPal",
      name: "PayPal or Credit Card",
      icon: <CreditCard className="h-6 w-6" />,
    },
    {
      id: "Stripe",
      name: "Stripe (Credit Card)",
      icon: <Wallet className="h-6 w-6" />,
    },
  ];

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <CheckoutSteps step1 step2 step3 />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[40px] shadow-xl p-10 border border-slate-100"
      >
        <h1 className="text-3xl font-black text-slate-900 mb-8">
          Payment Method
        </h1>

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="space-y-4">
            {methods.map((method) => (
              <label
                key={method.id}
                className={`relative flex items-center justify-between p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 ${
                  paymentMethod === method.id
                    ? "border-primary bg-primary/5"
                    : "border-slate-100 hover:border-slate-200"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-2xl ${
                      paymentMethod === method.id
                        ? "bg-primary text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {method.icon}
                  </div>
                  <div>
                    <span className="font-black text-slate-900 block">
                      {method.name}
                    </span>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                      Safe & Secure
                    </span>
                  </div>
                </div>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  className="w-5 h-5 text-primary border-slate-300 focus:ring-primary h-0 w-0 opacity-0"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === method.id
                      ? "border-primary"
                      : "border-slate-200"
                  }`}
                >
                  {paymentMethod === method.id && (
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  )}
                </div>
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-blue-600 text-white py-5 rounded-3xl font-black text-lg shadow-xl shadow-primary/30 transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 mt-8"
          >
            Review Order <ArrowRight className="h-6 w-6" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default PaymentPage;
