import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const { wishlistItems } = useSelector((state) => state.wishlist);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-red-50 text-red-500 rounded-2xl">
          <Heart fill="currentColor" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Your Wishlist
          </h1>
          <p className="text-slate-500 font-medium">
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1 ? "item" : "items"} saved for later
          </p>
        </div>
      </div>

      {wishlistItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-12 text-center border border-slate-100 shadow-sm space-y-6"
        >
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
            <Heart size={40} />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">
              Your wishlist is empty
            </h2>
            <p className="text-slate-500 max-w-xs mx-auto">
              Save items that you like in your wishlist, and they will show up
              here.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95"
          >
            <ShoppingBag size={20} />
            Go Shopping
          </Link>
        </motion.div>
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8"
          >
            {wishlistItems.map((item, idx) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <ProductCard product={item} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default WishlistPage;
