import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { listProducts } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ChevronRight, Zap } from "lucide-react";

const HomePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword") || "";

  const { products, loading, error } = useSelector((state) => state.products);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    dispatch(
      listProducts({
        keyword,
        category: activeCategory === "All" ? "" : activeCategory,
      })
    );
  }, [dispatch, keyword, activeCategory]);

  const categories = [
    "All",
    "Electronics",
    "Smartphones",
    "Fashion",
    "Home",
    "Gadgets",
    "Beauty",
  ];

  return (
    <div className="relative min-h-screen pb-20">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse"></div>
        <div
          className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Hero Section */}
        {!keyword && (
          <section className="relative group rounded-3xl sm:rounded-[2.5rem] overflow-hidden bg-slate-900 text-white min-h-[350px] sm:min-h-[450px] flex items-center shadow-2xl shadow-primary/20">
            {/* Animated Background Mesh */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-blue-600/20 to-transparent"></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-accent/30 to-transparent rounded-full blur-[100px]"
              ></motion.div>
            </div>

            <div className="relative z-10 px-6 sm:px-12 py-12 max-w-2xl space-y-4 sm:space-y-6">
              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl sm:text-6xl font-black leading-[1.1] sm:leading-tight text-white tracking-tight"
              >
                Elevate Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Lifestyle.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-sm sm:text-lg text-slate-300 font-medium max-w-md"
              >
                Experience the next generation of shopping. Premium quality
                products delivered with excellence.
              </motion.p>
            </div>

            {/* Float Decoration for Desktop - Amazon Style Quality Badge */}
            <div className="absolute right-12 bottom-12 hidden lg:block">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="glass p-6 rounded-3xl shadow-2xl border-white/30 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <ShoppingCart size={20} fill="currentColor" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Premium Selection
                    </div>
                    <div className="text-slate-900 font-black">
                      World Class Quality
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Handy Category Scroll (Mobile Optimized) */}
        {!keyword && (
          <section className="space-y-4">
            <div className="flex items-baseline justify-between overflow-hidden px-1">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                Explore Categories{" "}
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
              </h3>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
              {categories.map((cat, idx) => (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-100"
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </section>
        )}

        {/* Product Grid */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {keyword ? `Results for "${keyword}"` : "Our Bestsellers"}
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl h-[250px] sm:h-[350px] animate-pulse border border-slate-100"
                ></div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-500 p-6 rounded-2xl text-center font-bold border border-red-100">
              {error}
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8"
              >
                {products.map((product, idx) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
