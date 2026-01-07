/**
 * Reusable ProductImage Component
 * Handles image loading, errors, and fallbacks consistently
 */

import { useState, memo } from "react";
import { getImageUrl } from "../../api";
import { FALLBACK_IMAGES } from "../../constants";

const ProductImage = memo(({
  src,
  alt,
  className = "",
  fallback = FALLBACK_IMAGES.PRODUCT,
  aspectRatio = "square", // "square" | "portrait" | "landscape" | "auto"
  lazy = true,
  crossOrigin = "anonymous",
  onClick,
  fetchPriority = "auto", // "high" | "low" | "auto"
  srcSet = null, // For responsive images
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const imageSrc = hasError ? fallback : getImageUrl(src);

  const aspectClasses = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    auto: "",
  };

  return (
    <div className={`relative overflow-hidden bg-gray-100 ${aspectClasses[aspectRatio]}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <img
        src={imageSrc}
        alt={alt || "Product image"}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        } ${className}`}
        onError={handleError}
        onLoad={handleLoad}
        loading={lazy ? "lazy" : "eager"}
        crossOrigin={crossOrigin}
        onClick={onClick}
        fetchPriority={fetchPriority}
        {...(srcSet && { srcSet })}
      />
    </div>
  );
});

ProductImage.displayName = "ProductImage";

export default ProductImage;
