/**
 * Reusable Section Component
 * Consistent section wrapper with title and subtitle
 */

import { memo } from "react";

const Section = memo(({
  children,
  title,
  subtitle,
  className = "",
  titleClassName = "",
  containerClassName = "max-w-7xl mx-auto",
  background = "white", // "white" | "gray" | "gradient"
  padding = "py-12 md:py-16 lg:py-20",
  id,
}) => {
  const bgClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    gradient: "bg-gradient-to-b from-gray-50 to-white",
  };

  return (
    <section
      id={id}
      className={`${padding} ${bgClasses[background]} ${className}`}
    >
      <div className={`px-4 sm:px-6 lg:px-8 ${containerClassName}`}>
        {(title || subtitle) && (
          <div className="text-center mb-10 md:mb-12">
            {title && (
              <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-3 ${titleClassName}`}>
                <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-pink-500">
                  {title}
                </span>
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
});

Section.displayName = "Section";

export default Section;
