import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Search,
  Loader2,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const AdminProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load products");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login");
    } else {
      fetchProducts();
    }
  }, [userInfo, navigate]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/products/${id}`);
        toast.success("Product deleted");
        fetchProducts();
      } catch (error) {
        toast.error(error.response?.data?.message || "Delete failed");
      }
    }
  };

  const createProductHandler = async () => {
    try {
      const { data } = await api.post("/products");
      navigate(`/admin/product/${data._id}/edit`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Create failed");
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-1 flex items-center gap-3">
            <Package className="text-primary h-8 w-8" /> Product Management
          </h1>
          <p className="text-slate-400 font-bold tracking-tight">
            Total products: {products.length}
          </p>
        </div>
        <button
          onClick={createProductHandler}
          className="bg-slate-900 text-white px-6 py-4 rounded-2xl font-black shadow-xl shadow-slate-200 hover:bg-black transition active:scale-95 flex items-center gap-2"
        >
          <Plus className="h-5 w-5 text-primary" /> Add New Product
        </button>
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
                  <th className="py-4 px-4 text-left rounded-l-2xl">Product</th>
                  <th className="py-4 px-4 text-left">Category</th>
                  <th className="py-4 px-4 text-left">Brand</th>
                  <th className="py-4 px-4 text-left">Price</th>
                  <th className="py-4 px-4 text-center">Stock</th>
                  <th className="py-4 px-4 text-right rounded-r-2xl">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-slate-50/50 transition duration-300"
                  >
                    <td className="py-5 px-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 p-2 flex items-center justify-center border border-slate-100">
                          <img
                            src={product.image}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="font-black text-slate-900 text-sm line-clamp-1 max-w-[200px]">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-5 px-4">
                      <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-5 px-4 text-slate-500 font-bold text-sm">
                      {product.brand}
                    </td>
                    <td className="py-5 px-4 font-black text-slate-900">
                      ₹{product.price.toFixed(2)}
                    </td>
                    <td className="py-5 px-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                          product.countInStock > 0
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {product.countInStock}
                      </span>
                    </td>
                    <td className="py-5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/product/${product._id}/edit`}
                          className="p-2 bg-slate-100 text-slate-400 hover:text-blue-500 rounded-xl transition"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => deleteHandler(product._id)}
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

export default AdminProductListPage;
