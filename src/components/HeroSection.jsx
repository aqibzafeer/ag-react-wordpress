import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiPlayCircle } from "react-icons/fi";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[calc(100vh-96px)] lg:min-h-[calc(100vh-144px)] pt-6 lg:pt-0">
          <div className="lg:w-1/2 max-w-lg text-center lg:text-left z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 tracking-tight">
              Style That Defines You
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Discover our new collection of curated pieces designed to elevate your everyday look. From timeless classics to the latest trends, find something that truly speaks to you.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => navigate("/products")}
                className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold rounded-full shadow-lg hover:bg-gray-700 transition-all transform hover:-translate-y-1"
              >
                Explore Collection
                <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => {
                  const featured = document.getElementById("featured-products");
                  if (featured) {
                    featured.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-800 font-bold rounded-full shadow-lg hover:bg-gray-100 transition-all border border-gray-200"
              >
                <FiPlayCircle className="w-5 h-5 text-gray-500" />
                How it works
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative lg:w-1/2 mt-10 lg:mt-0 h-[55vh] lg:h-[calc(100vh-144px)]">
            <div className="absolute inset-0">
              <img
                src="/banner-img.jpeg"
                alt="Fashion model"
                className="w-full h-full object-cover object-top"
                style={{ clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;