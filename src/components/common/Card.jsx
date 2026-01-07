/**
 * Reusable Card Component
 * Consistent card styling for product cards, feature cards, etc.
 */

import { memo } from "react";
import { Link } from "react-router-dom";

const Card = memo(({
  children,
  className = "",
  to, // If provided, entire card is clickable
  href,
  hover = true,
  shadow = "sm", // "none" | "sm" | "md" | "lg"
  rounded = "2xl", // "none" | "lg" | "xl" | "2xl"
  border = true,
  padding = "", // Let children handle padding
  onClick,
}) => {
  const shadowStyles = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  const hoverStyles = hover
    ? "hover:shadow-xl transition-all duration-300"
    : "";

  const roundedStyles = {
    none: "",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
  };

  const baseStyles = `
    bg-white
    ${shadowStyles[shadow]}
    ${roundedStyles[rounded]}
    ${border ? "border border-gray-100" : ""}
    ${hoverStyles}
    overflow-hidden
    ${padding}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  // Render as Link
  if (to) {
    return (
      <Link to={to} className={`block ${baseStyles}`}>
        {children}
      </Link>
    );
  }

  // Render as anchor
  if (href) {
    return (
      <a href={href} className={`block ${baseStyles}`} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  // Render as clickable div
  if (onClick) {
    return (
      <div className={`cursor-pointer ${baseStyles}`} onClick={onClick} role="button" tabIndex={0}>
        {children}
      </div>
    );
  }

  // Render as div
  return (
    <div className={baseStyles}>
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;
