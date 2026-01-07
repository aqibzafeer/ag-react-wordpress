/**
 * Reusable Button Component
 * Consistent button styling across the app
 */

import { memo, forwardRef } from "react";
import { Link } from "react-router-dom";

const Button = memo(forwardRef(({
  children,
  variant = "primary", // "primary" | "secondary" | "outline" | "ghost"
  size = "md", // "sm" | "md" | "lg"
  rounded = "full", // "full" | "lg" | "md" | "none"
  to, // If provided, renders as Link
  href, // If provided, renders as anchor
  className = "",
  disabled = false,
  loading = false,
  icon,
  iconPosition = "right",
  ...props
}, ref) => {
  // Variant styles
  const variants = {
    primary: "bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-gray-900 hover:bg-gray-800 text-white shadow-lg",
    outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50",
    ghost: "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
    white: "bg-white text-gray-900 hover:bg-gray-50 shadow-lg",
  };

  // Size styles
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3 text-lg",
    xl: "px-10 py-4 text-xl",
  };

  // Rounded styles
  const roundedStyles = {
    full: "rounded-full",
    lg: "rounded-lg",
    md: "rounded-md",
    none: "rounded-none",
  };

  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-semibold
    transition-all duration-200
    focus:outline-none focus:ring-4 focus:ring-indigo-500/20
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-95
  `;

  const combinedClassName = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${roundedStyles[rounded]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const content = (
    <>
      {loading ? (
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : icon && iconPosition === "left" ? (
        icon
      ) : null}
      {children}
      {!loading && icon && iconPosition === "right" ? icon : null}
    </>
  );

  // Render as Link
  if (to) {
    return (
      <Link to={to} className={combinedClassName} ref={ref} {...props}>
        {content}
      </Link>
    );
  }

  // Render as anchor
  if (href) {
    return (
      <a href={href} className={combinedClassName} ref={ref} {...props}>
        {content}
      </a>
    );
  }

  // Render as button
  return (
    <button
      ref={ref}
      className={combinedClassName}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
}));

Button.displayName = "Button";

export default Button;
