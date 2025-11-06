import React, { useId } from "react";

function Select(
  {
    options = [],
    label = "",
    placeholder = "Select an option",
    value,
    defaultValue,
    onChange,
    className = "",
    ...props
  },
  ref
) {
  const id = useId();

  // Determine whether it's a controlled or uncontrolled select
  const isControlled = value !== undefined;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block mb-1 text-sm font-medium text-gray-300 dark:text-gray-300"
        >
          {label}
        </label>
      )}

      <select
        {...props}
        id={id}
        ref={ref}
        onChange={onChange}
        {...(isControlled ? { value } : { defaultValue })}
        className={`w-full px-3 py-2 rounded-lg border border-gray-300 
                    bg-white text-gray-900 dark:bg-zinc-800 dark:text-gray-100
                    focus:outline-none focus:ring-2 focus:ring-cyan-400 
                    hover:border-cyan-400 transition duration-200 ease-in-out
                    ${className}`}
      >
        {/* Placeholder */}
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}

        {/* Options */}
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
