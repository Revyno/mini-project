import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter, Link } from '../context/RouterContext';
import { useAuthApi } from '../hooks/useApi';
import AuthNavbar from '../components/layout/AuthNavbar';

const LoginPage = () => {
  const { login: authLogin } = useAuth();
  const { navigate } = useRouter();
  const { login, loading, error: apiError } = useAuthApi();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await login(email, password);
      if (result.token) {
        authLogin(result.token, { email });
        navigate('/');
      }
    } catch (err) {
      setError(apiError || 'Login failed. Please try again.');
      console.error('An error occurred:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AuthNavbar />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-gray-900 text-white rounded flex items-center justify-center">
              →
            </div>
            <h2 className="text-2xl font-bold">Login</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Enter your credentials to access your account
          </p>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="eve.holt@reqres.in"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-1">
                Try: eve.holt@reqres.in
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-1">
                Any password will work for demo
              </p>
            </div>

            {(error || apiError) && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error || apiError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Loading...
                </span>
              ) : (
                'Login'
              )}
            </button>

            <p className="text-center mt-4 text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-gray-900 font-medium hover:underline"
              >
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;