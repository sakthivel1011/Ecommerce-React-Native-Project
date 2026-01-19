import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  listProductDetails,
  clearProductDetails,
} from "../features/products/productSlice";
import { addToCart } from "../features/cart/cartSlice";
import {
  Star,
  ChevronLeft,
  ShoppingCart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const ProductPage = () => {
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(listProductDetails(id));
    return () => dispatch(clearProductDetails());
  }, [dispatch, id]);

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty,
      })
    );
    toast.success("Added to cart!");
    navigate("/cart");
  };

  if (loading)
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 text-red-500 p-4 rounded-xl text-center border border-red-100">
          {error}
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-4 text-slate-600 hover:text-primary transition"
        >
          <ChevronLeft className="h-5 w-5" /> Back to home
        </Link>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 mb-8 text-slate-500 hover:text-primary transition font-medium"
      >
        <ChevronLeft className="h-5 w-5" /> Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-3xl bg-white shadow-sm border border-slate-100 aspect-square p-12 flex items-center justify-center overflow-hidden"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-primary/10 text-primary text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                {product.category}
              </span>
              <span className="text-slate-400 font-medium">•</span>
              <span className="text-slate-400 font-medium">
                {product.brand}
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex text-yellow-400 fill-current">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-current"
                        : "text-slate-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-slate-500 font-bold">
                {product.rating}{" "}
                <span className="text-slate-300 font-normal ml-1">
                  ({product.numReviews} Reviews)
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-5xl font-black text-slate-900">
              ₹{product.price}
            </span>
            <span className="text-slate-400 line-through text-xl">
              ₹{(product.price * 1.2).toFixed(0)}
            </span>
          </div>

          <p className="text-slate-500 leading-relaxed text-lg">
            {product.description}
          </p>

          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">
                Status
              </span>
              <span
                className={`font-black uppercase tracking-tight ${
                  product.countInStock > 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {product.countInStock > 0 && (
              <div className="flex items-center bg-white rounded-2xl border border-slate-200 p-1">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-primary transition font-bold"
                >
                  -
                </button>
                <span className="w-12 text-center font-bold text-slate-900">
                  {qty}
                </span>
                <button
                  onClick={() =>
                    setQty(Math.min(product.countInStock, qty + 1))
                  }
                  className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-primary transition font-bold"
                >
                  +
                </button>
              </div>
            )}
          </div>

          <button
            onClick={addToCartHandler}
            disabled={product.countInStock === 0}
            className="w-full bg-primary hover:bg-blue-600 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-primary/30 disabled:bg-slate-300 disabled:shadow-none active:scale-95"
          >
            <ShoppingCart className="h-6 w-6" />
            Add to Shopping Cart
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
              <Truck className="h-5 w-5 text-primary" />
              Free Delivery
            </div>
            <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
              <RotateCcw className="h-5 w-5 text-primary" />
              Easy Returns
            </div>
            <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Secure Payment
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductPage;
