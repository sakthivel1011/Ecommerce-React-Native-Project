import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Users,
  Edit,
  Trash2,
  Shield,
  User,
  Loader2,
  Mail,
  ArrowLeft,
} from "lucide-react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/users"); // Assuming this route exists or we'll add it
      setUsers(data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load users");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login");
    } else {
      // For now, if API is not fully ready for admin user list, we might get 404
      fetchUsers();
    }
  }, [userInfo, navigate]);

  const deleteHandler = async (id) => {
    if (window.confirm("Delete this user?")) {
      try {
        await api.delete(`/users/${id}`);
        toast.success("User removed");
        fetchUsers();
      } catch (error) {
        toast.error("Permission denied");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center gap-4">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-2 text-slate-500 font-bold hover:text-primary transition text-sm"
        >
          <ArrowLeft className="h-4 w-4" /> Dashboard
        </Link>
        <span className="text-slate-300">|</span>
        <Link
          to="/"
          className="text-slate-500 font-bold hover:text-primary transition text-sm"
        >
          Home
        </Link>
      </div>
      <div>
        <h1 className="text-3xl font-black text-slate-900 mb-1 flex items-center gap-3">
          <Users className="text-primary h-8 w-8" /> User Management
        </h1>
        <p className="text-slate-400 font-bold tracking-tight">
          Active accounts on Shopping Hub
        </p>
      </div>

      <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 overflow-x-auto">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] bg-slate-50/50">
                  <th className="py-4 px-4 text-left rounded-l-2xl">Name</th>
                  <th className="py-4 px-4 text-left">Email</th>
                  <th className="py-4 px-4 text-center">Role</th>
                  <th className="py-4 px-4 text-right rounded-r-2xl">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-slate-50/50 transition"
                  >
                    <td className="py-5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-black text-xs">
                          {user.name.charAt(0)}
                        </div>
                        <span className="font-bold text-slate-900">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-5 px-4 text-slate-500 font-medium text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3" /> {user.email}
                      </div>
                    </td>
                    <td className="py-5 px-4 text-center">
                      {user.isAdmin ? (
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1 justify-center w-fit mx-auto">
                          <Shield className="h-3 w-3" /> Admin
                        </span>
                      ) : (
                        <span className="bg-slate-100 text-slate-400 px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1 justify-center w-fit mx-auto">
                          <User className="h-3 w-3" /> User
                        </span>
                      )}
                    </td>
                    <td className="py-5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="p-2 bg-slate-100 text-slate-400 hover:text-red-500 rounded-xl transition"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserListPage;
