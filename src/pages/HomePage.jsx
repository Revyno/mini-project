import { useState, useEffect } from 'react';
import { Grid, List, ChevronDown, Filter, HelpCircle } from 'lucide-react';
import { useUserApi } from '../hooks/useApi';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import ProductCard from '../components/Layout/ProductCard';
import UserDetailModal from '../components/Layout/UserDetailModal';

const HomePage = () => {
  const { users, loading, pagination, getUsers } = useUserApi();
  const [page, setPage] = useState(1);
  const [viewLayout, setViewLayout] = useState('grid');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch users on mount and when page changes
  useEffect(() => {
    getUsers(page);
  }, [page,getUsers]);

  // Map users to demo products
  const demoProducts = users.map((u, idx) => ({
    id: u.id,
    userId: u.id,
    name: [
      'Premium Wireless Headphones',
      'Designer Cotton T-Shirt',
      'JavaScript: The Definitive Guide',
      'Smart Home Security Camera',
      'Organic Garden Planter Set',
      'Professional Running Shoes',
      'Luxury Skincare Set',
      'Vintage Denim Jacket',
    ][idx] || `Product ${u.id}`,
    price: [199, 29, 45, 89, 34, 124, 78, 69][idx] || 99,
    oldPrice: idx % 2 === 0 ? [249, null, null, 120, null, null, 98, null][idx] : null,
    reviews: [128, 83, 234, 67, 92, 156, 143, 78][idx] || 50,
    badge: idx === 1 ? 'NEW' : idx % 3 === 0 ? '-20%' : null,
    image: u.avatar,
    seller: `${u.first_name} ${u.last_name}`,
    email: u.email,
  }));

  // Filter products based on search query
  const filteredProducts = demoProducts.filter((product) => {
    const query = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.seller.toLowerCase().includes(query) ||
      product.email.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-4 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5" />
                <h3 className="font-semibold">Filters</h3>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <button className="flex items-center justify-between w-full mb-3 font-medium">
                  Categories
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input type="checkbox" className="rounded" />
                    <span>Electronics</span>
                    <span className="ml-auto text-gray-400">156</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input type="checkbox" className="rounded" />
                    <span>Clothing</span>
                    <span className="ml-auto text-gray-400">89</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input type="checkbox" className="rounded" />
                    <span>Books</span>
                    <span className="ml-auto text-gray-400">234</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input type="checkbox" className="rounded" />
                    <span>Home & Garden</span>
                    <span className="ml-auto text-gray-400">67</span>
                  </label>
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <button className="flex items-center justify-between w-full mb-3 font-medium">
                  Price Range
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="space-y-3">
                  <input type="range" min="0" max="1000" className="w-full accent-gray-900" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>$0</span>
                    <span>$1000</span>
                  </div>
                </div>
              </div>

              {/* Minimum Rating */}
              <div>
                <button className="flex items-center justify-between w-full mb-3 font-medium">
                  Minimum Rating
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input type="checkbox" className="rounded" />
                    <span>4+ Stars</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input type="checkbox" className="rounded" />
                    <span>3+ Stars</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input type="checkbox" className="rounded" />
                    <span>2+ Stars</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <div>
                <h1 className="text-2xl font-bold">
                  Products ({filteredProducts.length})
                </h1>
                {searchQuery && (
                  <p className="text-sm text-gray-600 mt-1">
                    Showing results for "{searchQuery}"
                  </p>
                )}
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewLayout('grid')}
                    className={`p-2 rounded transition-colors ${
                      viewLayout === 'grid'
                        ? 'bg-gray-900 text-white'
                        : 'bg-white border hover:bg-gray-50'
                    }`}
                    title="Grid View"
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewLayout('list')}
                    className={`p-2 rounded transition-colors ${
                      viewLayout === 'list'
                        ? 'bg-gray-900 text-white'
                        : 'bg-white border hover:bg-gray-50'
                    }`}
                    title="List View"
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
                <select className="px-4 py-2 border rounded-lg bg-white flex-1 sm:flex-none focus:outline-none focus:ring-2 focus:ring-gray-900">
                  <option>Sort by: Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                  <option>Rating: High to Low</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                <p className="text-gray-600 mt-4">Loading products...</p>
              </div>
            ) : (
              <>
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="text-6xl mb-4">🔍</div>
                    <p className="text-gray-600 text-lg mb-2">No products found</p>
                    {searchQuery && (
                      <p className="text-gray-500 text-sm">
                        Try searching with different keywords
                      </p>
                    )}
                  </div>
                ) : (
                  <>
                    <div
                      className={`grid ${
                        viewLayout === 'grid'
                          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                          : 'grid-cols-1'
                      } gap-6 mb-8`}
                    >
                      {filteredProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onViewUser={setSelectedUserId}
                        />
                      ))}
                    </div>

                    {/* Pagination - Only show if no search */}
                    {!searchQuery && pagination.total_pages > 1 && (
                      <div className="flex justify-center gap-2 flex-wrap">
                        <button
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          disabled={page === 1}
                          className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50 disabled:hover:bg-white disabled:cursor-not-allowed transition-colors"
                        >
                          Previous
                        </button>
                        {[...Array(pagination.total_pages)].map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                              page === i + 1
                                ? 'bg-gray-900 text-white'
                                : 'border hover:bg-gray-50'
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                        <button
                          onClick={() =>
                            setPage((p) => Math.min(pagination.total_pages, p + 1))
                          }
                          disabled={page === pagination.total_pages}
                          className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50 disabled:hover:bg-white disabled:cursor-not-allowed transition-colors"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      <Footer />

      {/* Help Button */}
      <button className="fixed bottom-6 right-6 w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors z-40">
        <HelpCircle className="w-6 h-6" />
      </button>

      {/* User Detail Modal */}
      {selectedUserId && (
        <UserDetailModal
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}
    </div>
  );
};

export default HomePage;