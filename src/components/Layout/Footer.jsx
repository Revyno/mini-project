import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from '../../context/RouterContext';

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gray-900 text-white rounded flex items-center justify-center font-bold">
                E
              </div>
              <span className="font-bold text-xl">EliteStore</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Your one-stop destination for quality products at unbeatable
              prices. Shop with confidence and enjoy fast, reliable delivery.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-8 h-8 border rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 border rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 border rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 border rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/about" className="hover:text-gray-900 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-900 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-gray-900 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-gray-900 transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-gray-900 transition-colors">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/categories/electronics" className="hover:text-gray-900 transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/categories/clothing" className="hover:text-gray-900 transition-colors">
                  Clothing
                </Link>
              </li>
              <li>
                <Link to="/categories/books" className="hover:text-gray-900 transition-colors">
                  Books
                </Link>
              </li>
              <li>
                <Link to="/categories/home" className="hover:text-gray-900 transition-colors">
                  Home & Garden
                </Link>
              </li>
              <li>
                <Link to="/categories/sports" className="hover:text-gray-900 transition-colors">
                  Sports
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-gray-600 mb-4">
              Subscribe to our newsletter for the latest deals and updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <p>© 2025 EliteStore. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-gray-900 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-gray-900 transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-gray-900 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;