import { useState } from 'react';

const BlogHomepage = () => {
    // Sample blog post data
    const allPosts = [
        {
            id: 1,
            title: 'Getting Started with React Hooks',
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            description: 'Learn how to use React Hooks to simplify your functional components.',
            date: '2023-05-15',
            category: 'Tech'
        },
        {
            id: 2,
            title: 'My Trip to Bali',
            image: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1633&q=80',
            description: 'Exploring the beautiful beaches and culture of Bali.',
            date: '2023-06-22',
            category: 'Travel'
        },
        {
            id: 3,
            title: 'The Perfect Pizza Dough Recipe',
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1681&q=80',
            description: 'My secret recipe for making the perfect pizza dough at home.',
            date: '2023-07-10',
            category: 'Food'
        },
        {
            id: 4,
            title: 'Understanding JavaScript Closures',
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            description: 'A deep dive into one of JavaScripts most powerful features.',
            date: '2023-08-05',
            category: 'Tech'
        },
        {
            id: 5,
            title: 'Hiking the Swiss Alps',
            image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            description: 'My adventure through the breathtaking Swiss Alps.',
            date: '2023-09-18',
            category: 'Travel'
        },
        {
            id: 6,
            title: '5 Healthy Breakfast Ideas',
            image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1453&q=80',
            description: 'Quick and nutritious breakfast recipes to start your day right.',
            date: '2023-10-02',
            category: 'Food'
        }
    ];

    // State for search term, selected category, and pagination
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 4;

    // Get unique categories
    const categories = ['All', ...new Set(allPosts.map(post => post.category))];

    // Filter posts based on search term and selected category
    const filteredPosts = allPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Pagination logic
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-6 py-4">
                    <h1 className="text-3xl font-bold text-gray-600">My Personal Blog</h1>
                </div>
            </header>

            {/* Search and Filter Section */}
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                    {/* Search Input */}
                    <div className="w-full md:w-1/3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search posts..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1); // Reset to first page when searching
                                }}
                            />
                            <i className="fas fa-search absolute right-3 top-3 text-gray-400"></i>
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="w-full md:w-1/3">
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={selectedCategory}
                            onChange={(e) => {
                                setSelectedCategory(e.target.value);
                                setCurrentPage(1); // Reset to first page when changing category
                            }}
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Blog Posts Grid */}
                {currentPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {currentPosts.map(post => (
                            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full mb-2">
                    {post.category}
                  </span>
                                    <h2 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h2>
                                    <p className="text-gray-600 mb-4">{post.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
                                        <button className="text-purple-600 hover:text-purple-800 font-medium">
                                            Read More →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No posts found matching your criteria.</p>
                    </div>
                )}

                {/* Pagination */}
                {filteredPosts.length > postsPerPage && (
                    <div className="flex justify-center mt-8">
                        <nav className="inline-flex rounded-md shadow">
                            <button
                                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 rounded-l-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => paginate(index + 1)}
                                    className={`px-4 py-2 border-t border-b border-gray-300 ${currentPage === index + 1 ? 'bg-purple-100 text-purple-700' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 rounded-r-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </nav>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogHomepage;