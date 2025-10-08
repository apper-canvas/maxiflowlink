import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const Error = ({ message = "Something went wrong", onRetry, className }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4", className)}>
      <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name="AlertCircle" size={32} className="text-red-600" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Oops!</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          <ApperIcon name="RotateCw" size={18} className="mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
};

export default Error;