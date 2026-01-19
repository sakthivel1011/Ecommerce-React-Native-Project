import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Package,
  ChevronRight,
  Loader2,
  Save,
  ShoppingBag,
} from "lucide-react";
import { register, clearError } from "../features/auth/authSlice";
import api from "../services/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setAddress(userInfo.address || "");

      const fetchMyOrders = async () => {
        try {
          const { data } = await api.get("/orders/myorders");
          setOrders(data);
          setLoadingOrders(false);
        } catch (error) {
          toast.error("Failed to load orders");
          setLoadingOrders(false);
        }
      };
      fetchMyOrders();
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const { data } = await api.put("/users/profile", {
          _id: userInfo._id,
          name,
          email,
          password,
          address,
        });
        toast.success("Profile updated!");
        // Ideally we should update the store here, but for simplicity:
        localStorage.setItem("userInfo", JSON.stringify(data));
      } catch (error) {
        toast.error(error.response?.data?.message || "Update failed");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[40px] shadow-xl p-10 border border-slate-100"
          >
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center text-4xl font-black mx-auto mb-4 shadow-lg shadow-primary/20">
                {name.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-2xl font-black text-slate-900">{name}</h2>
              <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-1">
                Customer Profile
              </p>
            </div>

            <form onSubmit={submitHandler} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 ml-1 uppercase">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-3 h-5 w-5 text-slate-300" />
                  <input
                    type="text"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-primary transition shadow-inner font-bold text-slate-900"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 ml-1 uppercase">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3 h-5 w-5 text-slate-300" />
                  <input
                    type="email"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-primary transition shadow-inner font-bold text-slate-900"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 ml-1 uppercase">
                  Shipping Address
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-primary transition shadow-inner font-bold text-slate-900 min-h-[100px]"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street, City, Country..."
                />
              </div>

              <div className="pt-4 border-t border-slate-50 space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                  Change Password (Optional)
                </p>
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full px-4 py-3 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-primary transition shadow-inner"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="w-full px-4 py-3 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-primary transition shadow-inner"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-blue-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all duration-300 shadow-xl shadow-primary/20 mt-4 active:scale-95"
              >
                <Save className="h-5 w-5" /> Save Changes
              </button>
            </form>
          </motion.div>
        </div>

        {/* Orders Section */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden"
          >
            <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-2xl font-black text-slate-900 mb-1">
                  Order History
                </h3>
                <p className="text-slate-400 font-bold text-sm tracking-tight">
                  Review all your past Shopping Hub purchases
                </p>
              </div>
              <div className="bg-white p-3 rounded-2xl shadow-sm text-primary">
                <ShoppingBag className="h-8 w-8" />
              </div>
            </div>

            <div className="p-6 overflow-x-auto">
              {loadingOrders ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="h-10 w-10 text-primary animate-spin" />
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-100 m-4">
                  <p className="text-slate-400 font-bold mb-4">
                    You haven't placed any orders yet.
                  </p>
                  <Link
                    to="/"
                    className="text-primary font-black hover:underline"
                  >
                    Start Exploring
                  </Link>
                </div>
              ) : (
                <table className="w-full min-w-[600px]">
                  <thead className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] bg-slate-50/50 rounded-xl overflow-hidden">
                    <tr>
                      <th className="py-4 px-4 text-left first:rounded-l-2xl">
                        Order ID
                      </th>
                      <th className="py-4 px-4 text-left">Date</th>
                      <th className="py-4 px-4 text-left">Total</th>
                      <th className="py-4 px-4 text-left text-center">
                        Payment
                      </th>
                      <th className="py-4 px-4 text-left text-center">
                        Status
                      </th>
                      <th className="py-4 px-4 text-right last:rounded-r-2xl">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {orders.map((order) => (
                      <tr
                        key={order._id}
                        className="hover:bg-slate-50/50 transition duration-300"
                      >
                        <td className="py-5 px-4 font-black text-slate-900 text-sm">
                          #{order._id.slice(-6).toUpperCase()}
                        </td>
                        <td className="py-5 px-4 text-slate-500 font-bold text-sm">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-5 px-4 font-black text-slate-900">
                          ${order.totalPrice.toFixed(2)}
                        </td>
                        <td className="py-5 px-4 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                              order.isPaid
                                ? "bg-green-100 text-green-600"
                                : "bg-orange-100 text-orange-600"
                            }`}
                          >
                            {order.isPaid ? "Paid" : "Pending"}
                          </span>
                        </td>
                        <td className="py-5 px-4 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                              order.isDelivered
                                ? "bg-blue-100 text-blue-600"
                                : "bg-slate-100 text-slate-400"
                            }`}
                          >
                            {order.isDelivered ? "Delivered" : "Processing"}
                          </span>
                        </td>
                        <td className="py-5 px-4 text-right">
                          <Link
                            to={`/order/${order._id}`}
                            className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-black shadow-lg shadow-slate-200 transition hover:bg-black active:scale-95"
                          >
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
