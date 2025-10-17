import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter, Link } from '../context/RouterContext';
import { useAuthApi } from '../hooks/useApi';
import AuthNavbar from '../components/layout/AuthNavbar';

const RegisterPage = () => {
  const { login: authLogin } = useAuth();
  const { navigate } = useRouter();
  const { register, loading, error: apiError } = useAuthApi();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      const result = await register(email, password);
      if (result.token) {
        authLogin(result.token, { email });
        navigate('/');
      }
    } catch (err) {
      setError(apiError || 'Registration failed. Please try again.');
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
              👥
            </div>
            <h2 className="text-2xl font-bold">Register</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Create a new account to get started
          </p>

          <form onSubmit={handleRegister}>
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
                Try: eve.holt@reqres.in or janet.weaver@reqres.in
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
                disabled={loading}
                minLength={6}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
                disabled={loading}
                minLength={6}
              />
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
                'Register'
              )}
            </button>

            <p className="text-center mt-4 text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-gray-900 font-medium hover:underline"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;