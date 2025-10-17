import { Heart } from 'lucide-react';

const ProductCard = ({ product, onViewUser }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative">
        <div className="aspect-square bg-gray-200 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = `https://i.pravatar.cc/300?img=${product.id}`;
            }}
          />
        </div>
        {product.badge && (
          <span
            className={`absolute top-3 left-3 px-3 py-1 rounded text-white text-xs font-medium ${
              product.badge === 'NEW' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {product.badge}
          </span>
        )}
        <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100">
          <Heart className="w-4 h-4" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex text-yellow-400">
            {'★'.repeat(4)}{'☆'.repeat(1)}
          </div>
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">${product.price}</span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.oldPrice}
            </span>
          )}
        </div>
        <button
          onClick={() => onViewUser(product.userId)}
          className="mt-3 w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 text-sm font-medium"
        >
          View Seller Profile
        </button>
      </div>
    </div>
  );
};

export default ProductCard;