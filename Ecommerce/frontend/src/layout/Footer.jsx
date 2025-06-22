import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-surface text-color-text font-poppins px-6 py-10 mt-10 border-t border-muted/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-4">EcoMart</h2>
          <p className="text-sm text-muted leading-6">
            Your trusted destination for eco-friendly products and sustainable
            living. Shop smart, live green.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <NavLink
                to="/"
                className="text-muted hover:underline hover:text-primary-hover transition"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className="text-muted hover:underline hover:text-primary-hover transition"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop"
                className="text-muted hover:underline hover:text-primary-hover transition"
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className="text-muted hover:underline hover:text-primary-hover transition"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-4">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <NavLink
                to="/faqs"
                className="text-muted hover:underline hover:text-primary-hover transition"
              >
                FAQs
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shipping"
                className="text-muted hover:underline hover:text-primary-hover transition"
              >
                Shipping
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/returns"
                className="text-muted hover:underline hover:text-primary-hover transition"
              >
                Returns
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/privacy-policy"
                className="text-muted hover:underline hover:text-primary-hover transition"
              >
                Privacy Policy
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-4">Connect with Us</h3>
          <div className="space-y-2 text-sm text-muted">
            <p>Email: support@ecomart.com</p>
            <p>Phone: +92 300 1234567</p>
            <div className="flex gap-4 mt-2 text-lg text-muted ">
              <a href="#" className="hover:underline hover:text-primary-hover transition">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:underline hover:text-primary-hover transition">
                <FaTwitter />
              </a>
              <a href="#" className="hover:underline hover:text-primary-hover transition">
                <FaInstagram />
              </a>
              <a href="#" className="hover:underline hover:text-primary-hover transition">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-muted/30 mt-10 pt-4 text-center text-sm text-muted">
        © {new Date().getFullYear()} EcoMart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
