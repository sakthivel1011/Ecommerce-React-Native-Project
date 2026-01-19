import React from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Heart } from "lucide-react";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const isWishlisted = wishlistItems.some((x) => x._id === product._id);

  const addToCartHandler = (e) => {
    e.preventDefault();
    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: 1,
      })
    );
    toast.success(`${product.name} added to cart!`);
  };

  const wishlistHandler = (e) => {
    e.preventDefault();
    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
      toast.success(`${product.name} removed from wishlist!`);
    } else {
      dispatch(addToWishlist(product));
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group relative bg-white rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border border-slate-100/50 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col h-full"
    >
      {/* Image Container */}
      <Link
        to={`/product/${product._id}`}
        className="relative block aspect-square overflow-hidden bg-slate-50"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.countInStock > 0 ? (
            <div className="glass px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider text-green-600 flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></div>
              Stock
            </div>
          ) : (
            <div className="bg-red-500 text-white px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">
              Sold Out
            </div>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={wishlistHandler}
          className={`absolute top-2 right-2 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-all shadow-sm translate-y-2 group-hover:translate-y-0 duration-300 ${
            isWishlisted
              ? "bg-red-500 text-white opacity-100 translate-y-0"
              : "bg-white/80 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100"
          }`}
        >
          <Heart
            size={14}
            className="sm:w-4 sm:h-4"
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button>
      </Link>

      {/* Content */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-grow bg-white">
        <div className="flex justify-between items-start mb-0.5">
          <Link to={`/product/${product._id}`} className="flex-grow">
            <h3 className="text-sm sm:text-base font-bold text-slate-800 line-clamp-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
        </div>

        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">
          {product.brand}
        </p>

        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 sm:h-3.5 sm:3.5 ${
                  i < Math.floor(product.rating)
                    ? "fill-current"
                    : "text-slate-200"
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] text-slate-400 font-medium">
            ({product.numReviews})
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-1 sm:gap-2">
          <div className="flex flex-col min-w-0">
            <span className="text-base sm:text-xl font-black text-slate-900 tracking-tight truncate">
              ₹{product.price.toLocaleString()}
            </span>
          </div>

          <button
            onClick={addToCartHandler}
            disabled={product.countInStock === 0}
            className="flex-shrink-0 bg-slate-900 hover:bg-primary disabled:bg-slate-200 text-white p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl transition-all duration-500 shadow-lg shadow-slate-900/10 active:scale-90"
          >
            <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 group-hover/cart:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
