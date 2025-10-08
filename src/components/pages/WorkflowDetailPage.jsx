import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import StatusBadge from "@/components/molecules/StatusBadge";
import WorkflowCanvas from "@/components/organisms/WorkflowCanvas";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import workflowService from "@/services/api/workflowService";

const WorkflowDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workflow, setWorkflow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadWorkflow = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await workflowService.getById(id);
      setWorkflow(data);
    } catch (err) {
      setError(err.message || "Failed to load workflow");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkflow();
  }, [id]);

  const handleToggleActive = async () => {
    try {
      const updated = await workflowService.toggleActive(workflow.Id);
      setWorkflow(updated);
      toast.success(updated.isActive ? "Workflow activated" : "Workflow deactivated");
    } catch (error) {
      toast.error("Failed to update workflow status");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this workflow?")) return;
    
    try {
      await workflowService.delete(workflow.Id);
      toast.success("Workflow deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete workflow");
    }
  };

  if (loading) return <Loading message="Loading workflow..." />;
  if (error) return <Error message={error} onRetry={loadWorkflow} />;
  if (!workflow) return null;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold text-gray-900">{workflow.name}</h2>
              <StatusBadge status={workflow.isActive ? "active" : "inactive"} />
            </div>
            <p className="text-gray-600">{workflow.description}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={workflow.isActive ? "outline" : "primary"}
              onClick={handleToggleActive}
            >
              <ApperIcon 
                name={workflow.isActive ? "Pause" : "Play"} 
                size={18} 
                className="mr-2"
              />
              {workflow.isActive ? "Pause" : "Activate"}
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate(`/workflow/${workflow.Id}/edit`)}
            >
              <ApperIcon name="Edit2" size={18} className="mr-2" />
              Edit
            </Button>
            <Button
              variant="ghost"
              onClick={handleDelete}
            >
              <ApperIcon name="Trash2" size={18} className="text-error" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <ApperIcon name="Zap" size={18} className="text-primary-600" />
              <span className="text-sm text-primary-700 font-medium">Total Runs</span>
            </div>
            <p className="text-2xl font-bold text-primary-900">{workflow.runCount || 0}</p>
          </div>

          <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <ApperIcon name="Layers" size={18} className="text-secondary-600" />
              <span className="text-sm text-secondary-700 font-medium">Steps</span>
            </div>
            <p className="text-2xl font-bold text-secondary-900">{workflow.nodes.length}</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <ApperIcon name="Link2" size={18} className="text-green-600" />
              <span className="text-sm text-green-700 font-medium">Connections</span>
            </div>
            <p className="text-2xl font-bold text-green-900">{workflow.connections.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-card p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Workflow Canvas</h3>
        <div className="h-[600px]">
          <WorkflowCanvas workflow={workflow} />
        </div>
      </div>
    </div>
  );
};

export default WorkflowDetailPage;