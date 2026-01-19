import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Trash2,
  ShoppingBag,
  ArrowRight,
  Minus,
  Plus,
  Loader2,
} from "lucide-react";
import { addToCart, removeFromCart } from "../features/cart/cartSlice";
import { motion, AnimatePresence } from "framer-motion";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  const updateQtyHandler = (item, newQty) => {
    dispatch(addToCart({ ...item, qty: Number(newQty) }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-black text-slate-900 flex items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-2xl text-primary">
            <ShoppingBag className="h-8 w-8" />
          </div>
          Your Shopping Cart
        </h1>
        <span className="text-slate-400 font-bold bg-slate-100 px-4 py-2 rounded-full">
          {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
        </span>
      </div>

      {cartItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white p-16 rounded-[40px] shadow-sm border border-slate-100 space-y-6"
        >
          <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="h-12 w-12 text-slate-300" />
          </div>
          <p className="text-2xl font-bold text-slate-900">
            Your cart is empty
          </p>
          <p className="text-slate-500 max-w-xs mx-auto">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold hover:shadow-lg transition active:scale-95"
          >
            Start Shopping <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.product}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition duration-300"
                >
                  <Link
                    to={`/product/${item.product}`}
                    className="w-24 h-24 rounded-2xl bg-slate-50 flex-shrink-0 p-3 flex items-center justify-center border border-slate-100"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </Link>

                  <div className="flex-grow text-center sm:text-left">
                    <Link
                      to={`/product/${item.product}`}
                      className="text-lg font-bold text-slate-900 hover:text-primary transition truncate block max-w-[250px]"
                    >
                      {item.name}
                    </Link>
                    <p className="text-slate-400 font-bold mt-1">
                      ₹{item.price}
                    </p>
                  </div>

                  <div className="flex items-center bg-slate-50 rounded-2xl p-1 border border-slate-200">
                    <button
                      onClick={() =>
                        updateQtyHandler(item, Math.max(1, item.qty - 1))
                      }
                      className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-primary transition"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-10 text-center font-bold text-slate-900">
                      {item.qty}
                    </span>
                    <button
                      onClick={() =>
                        updateQtyHandler(
                          item,
                          Math.min(item.countInStock, item.qty + 1)
                        )
                      }
                      className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-primary transition"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="text-xl font-black text-slate-900 w-24 text-center sm:text-right">
                    ₹{(item.price * item.qty).toFixed(2)}
                  </div>

                  <button
                    onClick={() => removeFromCartHandler(item.product)}
                    className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition"
                  >
                    <Trash2 className="h-6 w-6" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[40px] shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-24">
              <h3 className="text-2xl font-black text-slate-900 mb-8 border-b border-slate-100 pb-4">
                Order Summary
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)} items)
                  </span>
                  <span className="text-slate-900 font-bold">
                    ₹
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold uppercase tracking-tight">
                    Free
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-10">
                <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                  Total Amount
                </span>
                <span className="text-4xl font-black text-slate-900">
                  ₹
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </span>
              </div>

              <button
                onClick={checkoutHandler}
                className="w-full bg-slate-900 hover:bg-black text-white py-5 rounded-3xl font-black text-lg shadow-2xl shadow-slate-200 transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
              >
                Checkout Now <ArrowRight className="h-6 w-6 text-primary" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
