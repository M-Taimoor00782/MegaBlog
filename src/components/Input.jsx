/* eslint-disable no-unused-vars */
import React, { useId, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiEyeOff, FiCheckCircle, FiXCircle, FiAlertCircle } from "react-icons/fi";

const Input = React.forwardRef(function Input(
  { 
    label, 
    type = "text", 
    className = "", 
    error,
    success,
    helperText,
    disabled = false,
    leftIcon,
    rightIcon,
    ...props 
  },
  ref
) {
  const id = useId();
  const [inputType, setInputType] = useState(type);
  const [isFocused, setIsFocused] = useState(false);
  const laserRef = useRef(null);

  const isPassword = type === "password";
  const hasError = !!error;
  const hasSuccess = !!success && !hasError;

  useEffect(() => {
    if (hasError && laserRef.current) {
      const laserElement = laserRef.current;
      
      // Apply animation styles directly
      laserElement.style.backgroundSize = "200% 200%";
      laserElement.style.animation = "laserMove 2s linear infinite";
    }
  }, [hasError]);

  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <div className="w-full flex flex-col space-y-1.5">
      {label && (
        <label
          htmlFor={id}
          className={`text-sm font-medium transition-colors duration-200 ${
            hasError 
              ? "text-red-600 dark:text-red-400" 
              : hasSuccess 
                ? "text-green-600 dark:text-green-400" 
                : "text-gray-200 dark:text-gray-400"
          }`}
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {/* Laser border for error state */}
        {hasError && (
          <div 
            ref={laserRef}
            className="absolute -inset-0.5 rounded-xl z-0 bg-gradient-to-r from-red-500 via-pink-500 to-red-500"
            style={{
              backgroundSize: "200% 200%",
              animation: "laserMove 2s linear infinite"
            }}
          />
        )}
        
        <motion.div
          className={`relative flex items-center rounded-xl border w-full 
            bg-white/90 backdrop-blur-sm text-gray-900 transition-all duration-300
            ${hasError 
              ? "border-transparent shadow-sm" 
              : hasSuccess 
                ? "border-green-500 dark:border-green-400 shadow-sm shadow-green-500/20" 
                : isFocused 
                  ? "border-cyan-400 dark:border-cyan-400 shadow-lg shadow-cyan-500/20" 
                  : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
            }
            ${disabled ? "opacity-60 cursor-not-allowed" : ""}
            ${className}`}
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          style={hasError ? { background: 'transparent' } : {}}
        >
          {leftIcon && (
            <div className="pl-3 text-gray-400 dark:text-gray-500">
              {leftIcon}
            </div>
          )}
          
          <input
            id={id}
            ref={ref}
            type={inputType}
            disabled={disabled}
            className={`w-full px-4 py-3 bg-transparent outline-none placeholder-gray-800  
              ${leftIcon ? "pl-2" : ""} 
              ${rightIcon || isPassword || hasError || hasSuccess ? "pr-10" : ""}
              disabled:cursor-not-allowed`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          
          <div className="absolute right-3 flex items-center space-x-1">
            <AnimatePresence>
              {hasSuccess && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="text-green-500 dark:text-green-400"
                >
                  <FiCheckCircle size={18} />
                </motion.div>
              )}
              
              {hasError && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="text-red-500 dark:text-red-400"
                >
                  <FiXCircle size={18} />
                </motion.div>
              )}
              
              {isPassword && (
                <motion.button
                  type="button"
                  onClick={togglePasswordVisibility}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-600  hover:text-gray-900 transition-colors cursor-pointer"
                >
                  {inputType === "password" ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </motion.button>
              )}
              
              {rightIcon && !isPassword && !hasError && !hasSuccess && (
                <div className="text-gray-400 dark:text-gray-500">
                  {rightIcon}
                </div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      
      {(helperText || error) && (
        <motion.p 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-xs flex items-center space-x-1 ${
            hasError 
              ? "text-red-600 dark:text-red-400" 
              : hasSuccess 
                ? "text-green-600 dark:text-green-400" 
                : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {hasError && <FiAlertCircle size={14} />}
          <span>{error || helperText}</span>
        </motion.p>
      )}
      
      {/* Add the keyframes in a style tag */}
      <style>
        {`
          @keyframes laserMove {
            0% {
              background-position: 0% 0%;
            }
            25% {
              background-position: 100% 0%;
            }
            50% {
              background-position: 100% 100%;
            }
            75% {
              background-position: 0% 100%;
            }
            100% {
              background-position: 0% 0%;
            }
          }
        `}
      </style>
    </div>
  );
});

export default Input;