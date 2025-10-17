import { User } from 'lucide-react';
import { useRouter, Link } from '../../context/RouterContext';

const AuthNavbar = () => {
  const { currentPath } = useRouter();

  return (
    <header className="bg-white border-b px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <User className="w-6 h-6" />
          <span className="font-semibold text-lg">User Management</span>
        </div>
        <div className="flex gap-3">
          <Link
            to="/login"
            className={`px-4 py-2 rounded transition-colors ${
              currentPath === '/login'
                ? 'bg-gray-900 text-white'
                : 'border border-gray-900 hover:bg-gray-50'
            }`}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={`px-4 py-2 rounded transition-colors ${
              currentPath === '/register'
                ? 'bg-gray-900 text-white'
                : 'border border-gray-900 hover:bg-gray-50'
            }`}
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AuthNavbar;