import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import ExecutionLogItem from "@/components/organisms/ExecutionLogItem";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import executionLogService from "@/services/api/executionLogService";

const ActivityPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const loadLogs = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await executionLogService.getRecent(50);
      setLogs(data);
    } catch (err) {
      setError(err.message || "Failed to load activity logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const filteredLogs = filterStatus === "all" 
    ? logs 
    : logs.filter(log => log.status === filterStatus);

  const stats = {
    total: logs.length,
    success: logs.filter(l => l.status === "success").length,
    failed: logs.filter(l => l.status === "failed").length,
    pending: logs.filter(l => l.status === "pending").length
  };

  if (loading) return <Loading message="Loading activity logs..." />;
  if (error) return <Error message={error} onRetry={loadLogs} />;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Activity Log</h2>
        <p className="text-gray-600">Monitor your workflow execution history</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 font-medium">Total Runs</span>
            <ApperIcon name="Activity" size={20} className="text-primary-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-card p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-700 font-medium">Successful</span>
            <ApperIcon name="CheckCircle2" size={20} className="text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-900">{stats.success}</p>
        </div>
        
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-card p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-red-700 font-medium">Failed</span>
            <ApperIcon name="XCircle" size={20} className="text-red-600" />
          </div>
          <p className="text-3xl font-bold text-red-900">{stats.failed}</p>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl shadow-card p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-yellow-700 font-medium">Pending</span>
            <ApperIcon name="Clock" size={20} className="text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-yellow-900">{stats.pending}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={filterStatus === "all" ? "primary" : "outline"}
            onClick={() => setFilterStatus("all")}
          >
            All
          </Button>
          <Button
            variant={filterStatus === "success" ? "success" : "outline"}
            onClick={() => setFilterStatus("success")}
          >
            <ApperIcon name="CheckCircle2" size={16} className="mr-1" />
            Success
          </Button>
          <Button
            variant={filterStatus === "failed" ? "danger" : "outline"}
            onClick={() => setFilterStatus("failed")}
          >
            <ApperIcon name="XCircle" size={16} className="mr-1" />
            Failed
          </Button>
          <Button
            variant={filterStatus === "pending" ? "outline" : "outline"}
            onClick={() => setFilterStatus("pending")}
          >
            <ApperIcon name="Clock" size={16} className="mr-1" />
            Pending
          </Button>
        </div>

        {filteredLogs.length === 0 ? (
          <Empty
            icon="Activity"
            title="No activity logs"
            description="Workflow execution history will appear here"
          />
        ) : (
          <div className="space-y-4">
            {filteredLogs.map(log => (
              <ExecutionLogItem key={log.Id} log={log} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityPage;