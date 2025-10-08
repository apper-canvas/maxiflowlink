import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { formatDistanceToNow } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import StatusBadge from "@/components/molecules/StatusBadge";
import workflowService from "@/services/api/workflowService";

const WorkflowCard = ({ workflow, onUpdate, onDelete }) => {
  const navigate = useNavigate();
  const [isToggling, setIsToggling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleActive = async (e) => {
    e.stopPropagation();
    setIsToggling(true);
    try {
      const updated = await workflowService.toggleActive(workflow.Id);
      onUpdate?.(updated);
      toast.success(updated.isActive ? "Workflow activated" : "Workflow deactivated");
    } catch (error) {
      toast.error("Failed to update workflow status");
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this workflow?")) return;
    
    setIsDeleting(true);
    try {
      await workflowService.delete(workflow.Id);
      onDelete?.(workflow.Id);
      toast.success("Workflow deleted successfully");
    } catch (error) {
      toast.error("Failed to delete workflow");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCardClick = () => {
    navigate(`/workflow/${workflow.Id}`);
  };

  return (
    <Card 
      hover
      onClick={handleCardClick}
      className="p-6 relative overflow-hidden group"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary-500 to-secondary-500" />
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 pr-4">
          <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
{workflow.name || 'Untitled Workflow'}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">{workflow.description || ''}</p>
        </div>
        <StatusBadge status={workflow.isActive ? "active" : "inactive"} />
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <ApperIcon name="Zap" size={16} className="text-primary-500" />
          <span>{workflow.runCount || 0} runs</span>
        </div>
        {workflow.lastRun && (
          <div className="flex items-center gap-1">
            <ApperIcon name="Clock" size={16} className="text-gray-400" />
            <span>{formatDistanceToNow(new Date(workflow.lastRun), { addSuffix: true })}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
        <Button
          variant={workflow.isActive ? "outline" : "primary"}
          size="sm"
          onClick={handleToggleActive}
          disabled={isToggling}
          className="flex-1"
        >
          <ApperIcon 
            name={workflow.isActive ? "Pause" : "Play"} 
            size={16} 
            className="mr-1"
          />
          {workflow.isActive ? "Pause" : "Activate"}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/workflow/${workflow.Id}/edit`);
          }}
        >
          <ApperIcon name="Edit2" size={16} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          <ApperIcon name="Trash2" size={16} className="text-error" />
        </Button>
      </div>
    </Card>
  );
};

export default WorkflowCard;