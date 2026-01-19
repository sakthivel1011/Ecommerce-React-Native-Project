import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Package,
  Save,
  ArrowLeft,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const AdminProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setName(data.name);
        setPrice(data.price);
        setImage(data.image);
        setBrand(data.brand);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setDescription(data.description);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load product");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await api.put(`/products/${id}`, {
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      });
      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <Link
        to="/admin/products"
        className="inline-flex items-center gap-2 text-slate-500 font-bold hover:text-primary transition"
      >
        <ArrowLeft className="h-5 w-5" /> Back to Products
      </Link>

      <div className="bg-white rounded-[40px] shadow-xl border border-slate-100 p-10">
        <div className="flex items-center gap-4 mb-10">
          <div className="p-4 bg-primary/10 rounded-3xl text-primary">
            <Package className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900">Edit Product</h1>
            <p className="text-slate-400 font-bold tracking-tight">
              Update inventory details
            </p>
          </div>
        </div>

        <form
          onSubmit={submitHandler}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
              Product Name
            </label>
            <input
              type="text"
              className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-primary transition shadow-inner font-bold"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
              Price (₹)
            </label>
            <input
              type="number"
              className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-primary transition shadow-inner font-bold"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
              Stock Count
            </label>
            <input
              type="number"
              className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-primary transition shadow-inner font-bold"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
              Category
            </label>
            <input
              type="text"
              className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-primary transition shadow-inner font-bold"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
              Brand
            </label>
            <input
              type="text"
              className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-primary transition shadow-inner font-bold"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2 text-white">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 ">
              Image URL
            </label>
            <div className="relative">
              <ImageIcon className="absolute left-6 top-5 h-5 w-5 text-slate-300" />
              <input
                type="text"
                className="w-full pl-14 pr-6 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-primary transition shadow-inner font-bold text-slate-900"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
              Description
            </label>
            <textarea
              className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-primary transition shadow-inner font-bold min-h-[150px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={updating}
            className="md:col-span-2 w-full bg-primary text-white py-5 rounded-3xl font-black text-lg shadow-xl shadow-primary/30 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70 mt-4"
          >
            {updating ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <Save className="h-6 w-6" />
            )}
            {updating ? "Updating..." : "Save Product Details"}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default AdminProductEditPage;
