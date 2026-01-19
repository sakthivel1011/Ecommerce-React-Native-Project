import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ShoppingCart,
  User,
  LogOut,
  Search,
  Menu,
  X,
  Heart,
} from "lucide-react";
import { logout } from "../features/auth/authSlice";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/?keyword=${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-primary flex items-center gap-2"
          >
            <span className="bg-primary text-white p-1 rounded-lg">SH</span>
            Shopping Hub
          </Link>

          {/* Search bar - Desktop */}
          <form
            onSubmit={submitHandler}
            className="hidden md:flex flex-grow max-w-md mx-8"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-slate-400 h-5 w-5" />
            </div>
          </form>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/wishlist"
              className="relative text-slate-600 hover:text-red-500 transition p-2"
            >
              <Heart className="h-6 w-6" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 rounded-full ring-2 ring-white">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative text-slate-600 hover:text-primary transition p-2"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] font-bold px-1.5 rounded-full ring-2 ring-white">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {userInfo ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/profile"
                  className="flex items-center gap-1 text-slate-600 hover:text-primary transition font-medium"
                >
                  <User className="h-5 w-5" />
                  {userInfo.name.split(" ")[0]}
                </Link>
                {userInfo.isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600 hover:bg-slate-200"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={logoutHandler}
                  className="text-slate-600 hover:text-red-500 transition"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1 text-slate-600 hover:text-primary transition font-medium"
              >
                <User className="h-5 w-5" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-slate-600 p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-4 animate-in slide-in-from-top duration-300">
            <form onSubmit={submitHandler} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200"
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-slate-400 h-5 w-5" />
            </form>
            <div className="flex flex-col gap-4">
              <Link
                to="/wishlist"
                className="flex items-center gap-2 text-slate-600"
                onClick={() => setIsOpen(false)}
              >
                <Heart className="h-5 w-5" />
                Wishlist ({wishlistItems.length})
              </Link>
              <Link
                to="/cart"
                className="flex items-center gap-2 text-slate-600"
                onClick={() => setIsOpen(false)}
              >
                <ShoppingCart className="h-5 w-5" />
                Cart ({cartItemsCount})
              </Link>
              {userInfo ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 text-slate-600"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logoutHandler();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2 text-red-500 text-left"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-slate-600"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-5 w-5" />
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
