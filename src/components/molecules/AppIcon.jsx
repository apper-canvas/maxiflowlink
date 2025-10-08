import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const AppIcon = ({ icon, color, size = "md", className }) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  return (
    <div 
      className={cn(
        "rounded-lg flex items-center justify-center shadow-sm",
        sizes[size],
        className
      )}
      style={{ backgroundColor: color + "20" }}
    >
      <ApperIcon 
        name={icon} 
        size={iconSizes[size]}
        style={{ color: color }}
      />
    </div>
  );
};

export default AppIcon;