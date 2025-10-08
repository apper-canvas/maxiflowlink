import { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Header = ({ title, onMenuClick, action }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 backdrop-blur-sm bg-white/95">
      <div className="flex items-center justify-between px-4 lg:px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ApperIcon name="Menu" size={24} className="text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            {title}
          </h1>
        </div>
        {action && <div>{action}</div>}
      </div>
    </header>
  );
};

export default Header;