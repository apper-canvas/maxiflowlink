import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const Empty = ({ 
  icon = "Inbox",
  title = "No items found", 
  description = "Get started by creating your first item",
  actionLabel,
  onAction,
  className 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4", className)}>
      <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mb-4 animate-float">
        <ApperIcon name={icon} size={36} className="text-primary-600" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">{description}</p>
      {onAction && actionLabel && (
        <Button onClick={onAction} variant="primary" size="lg">
          <ApperIcon name="Plus" size={20} className="mr-2" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default Empty;