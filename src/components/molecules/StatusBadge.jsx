import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

const StatusBadge = ({ status, className }) => {
  const statusConfig = {
    success: {
      variant: "success",
      icon: "CheckCircle2",
      label: "Success"
    },
    failed: {
      variant: "error",
      icon: "XCircle",
      label: "Failed"
    },
    pending: {
      variant: "warning",
      icon: "Clock",
      label: "Pending"
    },
    active: {
      variant: "success",
      icon: "Zap",
      label: "Active"
    },
    inactive: {
      variant: "default",
      icon: "PauseCircle",
      label: "Inactive"
    }
  };

  const config = statusConfig[status] || statusConfig.inactive;

  return (
    <Badge variant={config.variant} className={className}>
      <ApperIcon name={config.icon} size={14} className="mr-1" />
      {config.label}
    </Badge>
  );
};

export default StatusBadge;