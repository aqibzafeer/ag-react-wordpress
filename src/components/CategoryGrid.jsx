import { useNavigate } from "react-router-dom";

const categoryData = [
  { name: "Boys", image: "/product-images/category-boys.jpg" },
  { name: "Girls", image: "/product-images/category-girls.jpg" },
  { name: "Men", image: "/product-images/category-men.jpg" },
  { name: "Women", image: "/product-images/category-women.png" },
];

const CategoryGrid = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (name) => {
    navigate(`/products?category=${encodeURIComponent(name)}`);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">
            Shop by Category
          </span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our carefully curated collections
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categoryData.map((cat) => (
          <div
            key={cat.name}
            className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-150 sm:h-120 cursor-pointer"
            onClick={() => handleCategoryClick(cat.name)}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:blur-sm"
              style={{ backgroundImage: `url(${cat.image})` }}
            ></div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 z-10"></div>

            <div className="absolute inset-0 flex items-end p-6 z-20">
              <div className="w-full text-center transform transition-all duration-500 group-hover:-translate-y-2">
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                  {cat.name}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
