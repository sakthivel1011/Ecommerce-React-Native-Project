import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-bold text-primary mb-4 block">
              Shopping Hub
            </Link>
            <p className="text-slate-500 max-w-sm">
              Your one-stop destination for premium products. Quality, trust,
              and excellence delivered to your doorstep.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-slate-600">
              <li>
                <Link to="/" className="hover:text-primary transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-primary transition">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-primary transition">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-primary transition">
                  Shipping
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Categories</h4>
            <ul className="space-y-2 text-slate-600">
              <li>
                <Link
                  to="/?category=Electronics"
                  className="hover:text-primary transition"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link
                  to="/?category=Fashion"
                  className="hover:text-primary transition"
                >
                  Fashion
                </Link>
              </li>
              <li>
                <Link
                  to="/?category=Home"
                  className="hover:text-primary transition"
                >
                  Home & Living
                </Link>
              </li>
              <li>
                <Link
                  to="/?category=Gadgets"
                  className="hover:text-primary transition"
                >
                  Gadgets
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-100 pt-8 text-center text-slate-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Shopping Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
