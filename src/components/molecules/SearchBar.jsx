import { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import { cn } from "@/utils/cn";

const SearchBar = ({ onSearch, placeholder = "Search...", className }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSearch?.(newValue);
  };

  const handleClear = () => {
    setValue("");
    onSearch?.("");
  };

  return (
    <div className={cn("relative", className)}>
      <ApperIcon 
        name="Search" 
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={20}
      />
      <Input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="pl-10 pr-10"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ApperIcon name="X" size={18} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;