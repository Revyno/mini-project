import { useState } from 'react';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useRouter, Link } from '../../context/RouterContext';

const Navbar = ({ searchQuery = '', setSearchQuery = () => {} }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const { navigate } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClear = () => {
    setSearchQuery('');
  };

  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-900 text-white rounded flex items-center justify-center font-bold">
              E
            </div>
            <span className="font-bold text-xl">EliteStore</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="hover:text-gray-600 transition-colors">
              Home
            </Link>
            <Link to="/categories" className="hover:text-gray-600 transition-colors">
              Categories
            </Link>
            <Link to="/deals" className="hover:text-gray-600 transition-colors">
              Deals
            </Link>
            <Link to="/about" className="hover:text-gray-600 transition-colors">
              About
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <div className="relative cursor-pointer hover:text-gray-600 transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 hover:text-gray-600 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm max-w-[150px] truncate">{user?.email}</span>
                </button>
              </>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 border border-gray-900 rounded hover:bg-gray-50 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Search Bar */}
        {isAuthenticated && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="w-full pl-10 pr-12 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
            />
            {searchQuery && (
              <button
                onClick={handleSearchClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4 animate-fadeIn">
            <nav className="flex flex-col gap-4 mb-4">
              <Link
                to="/"
                className="hover:text-gray-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/categories"
                className="hover:text-gray-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/deals"
                className="hover:text-gray-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Deals
              </Link>
              <Link
                to="/about"
                className="hover:text-gray-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </nav>

            {isAuthenticated ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-600 p-2 bg-gray-50 rounded">
                  <User className="w-5 h-5" />
                  <span className="truncate">{user?.email}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2 border border-gray-900 rounded hover:bg-gray-50 text-left transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 border border-gray-900 rounded hover:bg-gray-50 text-center transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 text-center transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;