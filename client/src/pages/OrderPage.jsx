import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  CheckCircle,
  Clock,
  MapPin,
  CreditCard,
  Package,
  ChevronLeft,
  Loader2,
  Smartphone,
  QrCode,
} from "lucide-react";
import api from "../services/api";
import { motion } from "framer-motion";

const OrderPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading)
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-red-50 text-red-500 p-6 rounded-3xl border border-red-100 text-center">
          {error}
        </div>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <Link
            to="/profile"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition font-bold text-sm mb-4"
          >
            <ChevronLeft className="h-4 w-4" /> Back to History
          </Link>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            Order{" "}
            <span className="text-slate-400 font-medium">
              #{order._id.slice(-8).toUpperCase()}
            </span>
          </h1>
          <p className="text-slate-500 font-bold bg-slate-100 inline-block px-3 py-1 rounded-lg">
            Placed on {new Date(order.createdAt).toLocaleDateString()} at{" "}
            {new Date(order.createdAt).toLocaleTimeString()}
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-bold border-2 ${
              order.isPaid
                ? "bg-green-50 border-green-200 text-green-600"
                : "bg-orange-50 border-orange-200 text-orange-600"
            }`}
          >
            {order.isPaid ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <Clock className="h-5 w-5" />
            )}
            {order.isPaid
              ? `Paid on ${new Date(order.paidAt).toLocaleDateString()}`
              : "Awaiting Payment"}
          </div>
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-bold border-2 ${
              order.isDelivered
                ? "bg-blue-50 border-blue-200 text-blue-600"
                : "bg-slate-50 border-slate-200 text-slate-400"
            }`}
          >
            <Package className="h-5 w-5" />
            {order.isDelivered
              ? `Delivered on ${new Date(
                  order.deliveredAt
                ).toLocaleDateString()}`
              : "Processing"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
          >
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <MapPin className="text-primary" /> Delivery Destination
            </h2>
            <div className="text-slate-600 font-medium space-y-1">
              <p className="font-black text-slate-900 text-lg mb-2">
                {order.user.name}
              </p>
              <p className="text-sm flex items-center gap-2 mb-4 text-slate-400 font-bold uppercase tracking-wider">
                <span className="w-2 h-2 bg-primary rounded-full"></span>{" "}
                {order.user.email}
              </p>
              <p className="text-slate-900 font-bold">
                {order.shippingAddress.address}
              </p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
          >
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <CreditCard className="text-primary" /> Billing Info
            </h2>
            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <span className="font-bold text-slate-500 uppercase tracking-widest text-xs">
                Method
              </span>
              <span className="font-black text-slate-900">
                {order.paymentMethod}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
          >
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <Package className="text-primary" /> Purchase Summary
            </h2>
            <div className="divide-y divide-slate-50">
              {order.orderItems.map((item, index) => (
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

        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 text-white p-8 rounded-[40px] shadow-2xl sticky top-24"
          >
            <h3 className="text-xl font-black mb-8 border-b border-white/10 pb-4 uppercase tracking-widest text-primary">
              Final Invoice
            </h3>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-white/60 font-medium">
                <span>Net Total</span>
                <span className="text-white font-bold">
                  ₹
                  {(
                    order.totalPrice -
                    order.taxPrice -
                    order.shippingPrice
                  ).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-white/60 font-medium">
                <span>Shipping</span>
                <span className="text-white font-bold">
                  ₹{order.shippingPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-white/60 font-medium">
                <span>GST / Tax</span>
                <span className="text-white font-bold">
                  ₹{order.taxPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-4 pt-4 border-t border-white/10">
              <span className="text-white/40 font-bold uppercase tracking-widest text-[10px]">
                Grand Total
              </span>
              <span className="text-5xl font-black text-primary">
                ₹{order.totalPrice.toFixed(2)}
              </span>
            </div>

            {order.paymentMethod === "UPI" && !order.isPaid && (
              <div className="mt-8 p-6 bg-white rounded-3xl space-y-4">
                <div className="flex items-center gap-3 text-slate-900 border-b border-slate-100 pb-3">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <span className="font-black">Pay via UPI QR</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center gap-4">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                      `upi://pay?pa=sakthivel.p1011@okhdfcbank&pn=ShoppingHub&am=${order.totalPrice}&cu=INR`
                    )}`}
                    alt="UPI QR Code"
                    className="w-48 h-48 rounded-xl shadow-inner bg-white p-2"
                  />
                </div>
                <div className="text-[10px] text-slate-400 font-medium text-center italic">
                  * Note: After payment, please wait for admin to confirm your
                  order.
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
