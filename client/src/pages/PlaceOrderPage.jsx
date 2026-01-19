import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CheckoutSteps } from "./ShippingPage";
import {
  ShoppingBag,
  MapPin,
  CreditCard,
  ArrowRight,
  Loader2,
  Package,
} from "lucide-react";
import { clearCart } from "../features/cart/cartSlice";
import api from "../services/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  // Calculate prices
  const itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

  const placeOrderHandler = async () => {
    try {
      const { data } = await api.post("/orders", {
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      dispatch(clearCart());
      toast.success("Order placed successfully!");
      navigate(`/order/${data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, navigate]);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <CheckoutSteps step1 step2 step3 step4 />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Review */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
          >
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <MapPin className="text-primary" /> Shipping Details
            </h2>
            <div className="text-slate-600 font-medium">
              <p className="font-bold text-slate-900 mb-1">
                {cart.shippingAddress.address}
              </p>
              <p>
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
              </p>
              <p>{cart.shippingAddress.country}</p>
            </div>
          </motion.div>

          {/* Payment Review */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
          >
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <CreditCard className="text-primary" /> Payment Method
            </h2>
            <div className="inline-flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100 text-slate-900 font-bold">
              {cart.paymentMethod}
            </div>
          </motion.div>

          {/* Items Review */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
          >
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <Package className="text-primary" /> Order Items
            </h2>
            <div className="divide-y divide-slate-50">
              {cart.cartItems.map((item, index) => (
                <div
                  key={index}
                  className="py-4 flex items-center justify-between first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-contain bg-slate-50 p-2"
                    />
                    <div>
                      <Link
                        to={`/product/${item.product}`}
                        className="font-bold text-slate-900 hover:text-primary transition line-clamp-1 max-w-[200px]"
                      >
                        {item.name}
                      </Link>
                      <span className="text-slate-400 text-sm font-bold">
                        {item.qty} x ₹{item.price}
                      </span>
                    </div>
                  </div>
                  <div className="font-black text-slate-900">
                    ₹{(item.qty * item.price).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Price Breakdown */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 sticky top-24"
          >
            <h3 className="text-2xl font-black text-slate-900 mb-8 border-b border-slate-100 pb-4">
              Checkout Summary
            </h3>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Items Subtotal</span>
                <span className="text-slate-900 font-bold">
                  ₹{itemsPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Shipping Fee</span>
                <span
                  className={
                    shippingPrice === 0
                      ? "text-green-600 font-bold uppercase tracking-tight"
                      : "text-slate-900 font-bold"
                  }
                >
                  {shippingPrice === 0
                    ? "Free"
                    : `₹${shippingPrice.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Estimated Tax (15%)</span>
                <span className="text-slate-900 font-bold">
                  ₹{taxPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-10 pt-4 border-t border-slate-50">
              <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                Final Total
              </span>
              <span className="text-4xl font-black text-slate-900">
                ₹{totalPrice.toFixed(2)}
              </span>
            </div>

            <button
              onClick={placeOrderHandler}
              className="w-full bg-primary hover:bg-blue-600 text-white py-5 rounded-3xl font-black text-lg shadow-xl shadow-primary/30 transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
            >
              Confirm Order <ArrowRight className="h-6 w-6" />
            </button>
            <p className="text-center text-[10px] text-slate-400 mt-6 font-bold uppercase tracking-widest px-4">
              By placing order you agree to our terms and conditions
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
