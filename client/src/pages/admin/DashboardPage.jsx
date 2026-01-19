import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  BarChart3,
  Package,
  Users,
  ShoppingBag,
  ArrowUpRight,
  Plus,
  Settings,
  TrendingUp,
  CreditCard,
  CheckCircle2,
  Clock,
  Loader2,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import api from "../../services/api";
import { motion } from "framer-motion";

const StatCard = ({ title, value, icon, color, trend }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex items-center justify-between group overflow-hidden relative"
  >
    <div
      className={`absolute top-0 right-0 w-32 h-32 bg-${color}-50 rounded-full translate-x-16 -translate-y-16 opacity-50 group-hover:scale-125 transition-transform duration-500`}
    ></div>
    <div className="relative z-10 space-y-2">
      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
        {title}
      </p>
      <h3 className="text-3xl font-black text-slate-900">{value}</h3>
      {trend && (
        <div className="flex items-center gap-1 text-green-500 text-xs font-black">
          <TrendingUp className="h-3 w-3" /> {trend}%
        </div>
      )}
    </div>
    <div
      className={`relative z-10 p-4 rounded-3xl bg-${color}-50 text-${color}-500 shadow-lg shadow-${color}-500/5 transition-transform duration-300 group-hover:rotate-12`}
    >
      {icon}
    </div>
  </motion.div>
);

const DashboardPage = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [stats, setStats] = useState({
    productsCount: 0,
    ordersCount: 0,
    usersCount: 0,
    totalSales: 0,
    recentOrders: [],
    loading: true,
  });

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login");
    }

    const fetchStats = async () => {
      try {
        const { data: products } = await api.get("/products");
        const { data: orders } = await api.get("/orders");
        // Note: For real users count we'd need an admin user list API
        // For now, we simulate or use partial data

        setStats({
          productsCount: products.products.length,
          ordersCount: orders.length,
          usersCount: 5, // Mock
          totalSales: orders.reduce((acc, order) => acc + order.totalPrice, 0),
          recentOrders: orders.slice(0, 5),
          loading: false,
        });
      } catch (error) {
        console.error(error);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };
    fetchStats();
  }, [userInfo, navigate]);

  if (stats.loading)
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-slate-500 font-bold hover:text-primary transition"
      >
        <ArrowLeft className="h-5 w-5" /> Back to Home
      </Link>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2 flex items-center gap-3">
            <BarChart3 className="text-primary h-10 w-10" /> Admin Dashboard
          </h1>
          <p className="text-slate-400 font-bold tracking-tight">
            Overview of Shopping Hub business performance
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            to="/admin/products"
            className="bg-primary text-white p-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] transition active:scale-95 flex items-center gap-2"
          >
            <Package className="h-5 w-5" /> Products
          </Link>
          <button className="bg-white text-slate-600 p-4 rounded-2xl font-black shadow-sm border border-slate-100 hover:bg-slate-50 transition active:scale-95">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard
          title="Total Sales"
          value={`₹${stats.totalSales.toFixed(2)}`}
          icon={<CreditCard />}
          color="blue"
          trend="12"
        />
        <StatCard
          title="Orders"
          value={stats.ordersCount}
          icon={<ShoppingBag />}
          color="sky"
          trend="5"
        />
        <StatCard
          title="Products"
          value={stats.productsCount}
          icon={<Package />}
          color="indigo"
        />
        <StatCard
          title="Total Users"
          value={stats.usersCount}
          icon={<Users />}
          color="green"
          trend="2"
        />
      </div>

      {/* Recent Orders & Quick Actions */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900">
                Recent Orders
              </h3>
              <Link
                to="/admin/orders"
                className="text-primary text-sm font-black hover:underline flex items-center gap-1"
              >
                See All <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="p-4 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] bg-slate-50/50">
                    <th className="py-4 px-4 text-left rounded-l-2xl">
                      Customer
                    </th>
                    <th className="py-4 px-4 text-left">Date</th>
                    <th className="py-4 px-4 text-left">Total</th>
                    <th className="py-4 px-4 text-center">Status</th>
                    <th className="py-4 px-4 text-right rounded-r-2xl">
                      Invoice
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {stats.recentOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-slate-50/50 transition"
                    >
                      <td className="py-5 px-4 font-bold text-slate-900">
                        {order.user?.name || "Guest"}
                      </td>
                      <td className="py-5 px-4 text-slate-500 font-bold text-sm tracking-tight">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-5 px-4 font-black text-slate-900">
                        ${order.totalPrice.toFixed(2)}
                      </td>
                      <td className="py-5 px-4 text-center">
                        {order.isDelivered ? (
                          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                            Delivered
                          </span>
                        ) : (
                          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="py-5 px-4 text-right">
                        <Link
                          to={`/order/${order._id}`}
                          className="p-2 bg-slate-100 rounded-xl inline-block text-slate-400 hover:text-primary transition"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 space-y-8">
          <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-primary/20 rounded-full blur-3xl"></div>
            <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
              <Package className="text-primary" /> Management
            </h3>
            <div className="space-y-4 relative z-10">
              <Link
                to="/admin/products"
                className="flex items-center justify-between p-5 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition group"
              >
                <div className="flex items-center gap-4">
                  <CheckCircle2 className="text-primary h-6 w-6" />
                  <span className="font-bold">Inventory Control</span>
                </div>
                <ChevronRight className="h-5 w-5 text-white/20 group-hover:text-white transition" />
              </Link>
              <Link
                to="/admin/users"
                className="flex items-center justify-between p-5 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition group"
              >
                <div className="flex items-center gap-4">
                  <Users className="text-primary h-6 w-6" />
                  <span className="font-bold">User Access</span>
                </div>
                <ChevronRight className="h-5 w-5 text-white/20 group-hover:text-white transition" />
              </Link>
              <Link
                to="/admin/analytics"
                className="flex items-center justify-between p-5 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition group"
              >
                <div className="flex items-center gap-4">
                  <Clock className="text-primary h-6 w-6" />
                  <span className="font-bold">Live Traffic</span>
                </div>
                <ChevronRight className="h-5 w-5 text-white/20 group-hover:text-white transition" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
