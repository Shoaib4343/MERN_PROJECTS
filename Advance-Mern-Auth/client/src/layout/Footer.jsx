import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-4 md:px-10 mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Column 1 */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-white">Company</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer transition">About Us</li>
            <li className="hover:text-white cursor-pointer transition">Careers</li>
            <li className="hover:text-white cursor-pointer transition">Press</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-white">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer transition">Contact Us</li>
            <li className="hover:text-white cursor-pointer transition">FAQs</li>
            <li className="hover:text-white cursor-pointer transition">Help Center</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-white">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer transition">Terms of Service</li>
            <li className="hover:text-white cursor-pointer transition">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer transition">Cookies</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
