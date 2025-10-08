import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  className, 
  type = "text",
  ...props 
}, ref) => {
  const baseStyles = "w-full px-4 py-2 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all duration-200 bg-white";
  
  return (
    <input
      ref={ref}
      type={type}
      className={cn(baseStyles, className)}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;