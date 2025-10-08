import { cn } from "@/utils/cn";

const Loading = ({ className, message = "Loading..." }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12", className)}>
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-primary-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-primary-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="text-gray-600 font-medium">{message}</p>
    </div>
  );
};

export default Loading;