import { useEffect } from 'react';
import { useRouter } from './context/RouterContext';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const { navigate } = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

function App() {
  const { currentPath } = useRouter();
  const { isAuthenticated } = useAuth();

  // Render based on current path
  const renderPage = () => {
    if (currentPath === '/login') {
      return <LoginPage />;
    }

    if (currentPath === '/register') {
      return <RegisterPage />;
    }

    // Protected routes
    if (currentPath === '/' || currentPath === '/home') {
      return (
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      );
    }

    // Default fallback
    if (isAuthenticated) {
      return (
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      );
    }

    return <LoginPage />;
  };

  return <div className="min-h-screen">{renderPage()}</div>;
}

export default App;