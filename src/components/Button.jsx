/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

function Button({
  children,
  type = "button",
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  className = "",
  icon = null,
  iconPosition = "left",
  bgColor = "", // ✅ add bgColor prop here
  ...props
}) {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-5 py-2.5 text-base",
    large: "px-6 py-3 text-lg",
  };

  const variantClasses = {
    primary: `bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md hover:shadow-lg 
              hover:from-cyan-600 hover:to-blue-700 focus:ring-cyan-500 
              ${disabled ? 'opacity-50 cursor-not-allowed from-gray-400 to-gray-500' : ''}`,
    secondary: `bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md hover:shadow-lg 
                hover:from-purple-600 hover:to-pink-700 focus:ring-purple-500 
                ${disabled ? 'opacity-50 cursor-not-allowed from-gray-400 to-gray-500' : ''}`,
    outline: `border-2 border-cyan-500 text-cyan-600 dark:text-cyan-400 bg-transparent 
              hover:bg-cyan-500 hover:text-white dark:hover:text-white 
              focus:ring-cyan-500 ${disabled ? 'opacity-50 cursor-not-allowed border-gray-400 text-gray-400' : ''}`,
    ghost: `text-cyan-600 dark:text-cyan-400 bg-transparent 
            hover:bg-cyan-50 dark:hover:bg-cyan-900/30 
            focus:ring-cyan-500 ${disabled ? 'opacity-50 cursor-not-allowed text-gray-400' : ''}`,
  };

  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.03, y: -2 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.97 } : {}}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${bgColor}   // ✅ dynamically apply background color class
        ${className}
      `}
      {...props}
    >
      {loading && (
        <span className="mr-2">
          <svg
            className="animate-spin h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </span>
      )}

      {icon && iconPosition === "left" && !loading && (
        <span className="mr-2">{icon}</span>
      )}

      {children}

      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </motion.button>
  );
}


export default Button;