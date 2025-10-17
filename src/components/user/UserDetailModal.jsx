import { useEffect } from 'react';
import { useUserApi } from '../../hooks/useApi';

const UserDetailModal = ({ userId, onClose }) => {
  const { user, loading, error, getUser } = useUserApi();

  useEffect(() => {
    if (userId) {
      getUser(userId);
    }
  }, [userId, getUser]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
          </div>
          <p className="text-center mt-4">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg p-8 max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center mb-4">
            <div className="text-red-500 text-5xl mb-2">⚠️</div>
            <p className="text-red-600">{error || 'User not found'}</p>
          </div>
          <button
            onClick={onClose}
            className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-8 max-w-md w-full transform transition-all animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold">User Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <img
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            className="w-32 h-32 rounded-full mb-4 border-4 border-gray-100 shadow-lg"
          />
          <h3 className="text-xl font-bold">
            {user.first_name} {user.last_name}
          </h3>
          <p className="text-gray-600">{user.email}</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">First Name</p>
              <p className="font-medium">{user.first_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Last Name</p>
              <p className="font-medium">{user.last_name}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-600 mb-1">Email</p>
              <p className="font-medium break-all">{user.email}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-600 mb-1">User ID</p>
              <p className="font-medium">#{user.id}</p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 font-medium transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserDetailModal;