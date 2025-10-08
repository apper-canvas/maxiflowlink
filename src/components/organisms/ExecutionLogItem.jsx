import { formatDistanceToNow, format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import StatusBadge from "@/components/molecules/StatusBadge";
import { cn } from "@/utils/cn";

const ExecutionLogItem = ({ log, onExpand }) => {
  const isSuccess = log.status === "success";
  const isFailed = log.status === "failed";

  return (
    <Card 
      hover
      onClick={() => onExpand?.(log)}
      className="p-4 cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0",
          isSuccess && "bg-gradient-to-br from-green-100 to-green-200",
          isFailed && "bg-gradient-to-br from-red-100 to-red-200",
          log.status === "pending" && "bg-gradient-to-br from-yellow-100 to-yellow-200"
        )}>
          <ApperIcon 
            name={isSuccess ? "CheckCircle2" : isFailed ? "XCircle" : "Clock"}
            size={24}
            className={cn(
              isSuccess && "text-green-600",
              isFailed && "text-red-600",
              log.status === "pending" && "text-yellow-600"
            )}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
<h3 className="font-semibold text-gray-900 mb-1">{log.workflowName || ''}</h3>
              <p className="text-sm text-gray-500">
                {log.timestamp ? formatDistanceToNow(new Date(log.timestamp), { addSuffix: true }) : ''}
              </p>
            </div>
            <StatusBadge status={log.status || ''} />
          </div>

{isFailed && log.error && (
            <div className="mt-2 p-3 bg-red-50 border border-red-100 rounded-lg">
              <p className="text-sm text-red-700 flex items-start gap-2">
                <ApperIcon name="AlertCircle" size={16} className="flex-shrink-0 mt-0.5" />
                <span>{log.error || ''}</span>
              </p>
            </div>
          )}

          <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <ApperIcon name="Layers" size={16} className="text-primary-500" />
<span>{log.stepResults?.length || 0} steps</span>
            </div>
            <div className="flex items-center gap-1">
              <ApperIcon name="Clock" size={14} />
              <span>{log.duration || 0}ms</span>
            </div>
            <div className="flex items-center gap-1">
              <ApperIcon name="Calendar" size={14} />
              <span>{log.timestamp ? format(new Date(log.timestamp), "MMM d, yyyy h:mm a") : ''}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ExecutionLogItem;