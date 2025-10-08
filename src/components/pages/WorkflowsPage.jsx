import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import WorkflowCard from "@/components/organisms/WorkflowCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import workflowService from "@/services/api/workflowService";

const WorkflowsPage = () => {
  const navigate = useNavigate();
  const [workflows, setWorkflows] = useState([]);
  const [filteredWorkflows, setFilteredWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const loadWorkflows = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await workflowService.getAll();
      setWorkflows(data);
      setFilteredWorkflows(data);
    } catch (err) {
      setError(err.message || "Failed to load workflows");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkflows();
  }, []);

  useEffect(() => {
    let filtered = [...workflows];

    if (searchQuery) {
      filtered = filtered.filter(w =>
        w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter(w =>
        filterStatus === "active" ? w.isActive : !w.isActive
      );
    }

    setFilteredWorkflows(filtered);
  }, [workflows, searchQuery, filterStatus]);

  const handleCreateWorkflow = () => {
    navigate("/workflow/new");
  };

  const handleWorkflowUpdate = (updatedWorkflow) => {
    setWorkflows(prev =>
      prev.map(w => w.Id === updatedWorkflow.Id ? updatedWorkflow : w)
    );
  };

  const handleWorkflowDelete = (id) => {
    setWorkflows(prev => prev.filter(w => w.Id !== id));
  };

  if (loading) return <Loading message="Loading workflows..." />;
  if (error) return <Error message={error} onRetry={loadWorkflows} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">My Workflows</h2>
          <p className="text-gray-600">Manage and monitor your automation workflows</p>
        </div>
        <Button variant="primary" size="lg" onClick={handleCreateWorkflow}>
          <ApperIcon name="Plus" size={20} className="mr-2" />
          Create Workflow
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <SearchBar
              onSearch={setSearchQuery}
              placeholder="Search workflows..."
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === "all" ? "primary" : "outline"}
              onClick={() => setFilterStatus("all")}
            >
              All
            </Button>
            <Button
              variant={filterStatus === "active" ? "primary" : "outline"}
              onClick={() => setFilterStatus("active")}
            >
              <ApperIcon name="Zap" size={16} className="mr-1" />
              Active
            </Button>
            <Button
              variant={filterStatus === "inactive" ? "primary" : "outline"}
              onClick={() => setFilterStatus("inactive")}
            >
              <ApperIcon name="PauseCircle" size={16} className="mr-1" />
              Inactive
            </Button>
          </div>
        </div>

        {filteredWorkflows.length === 0 ? (
          <Empty
            icon="GitBranch"
            title="No workflows found"
            description={searchQuery ? "Try adjusting your search or filters" : "Create your first workflow to get started with automation"}
            actionLabel={!searchQuery ? "Create Workflow" : undefined}
            onAction={!searchQuery ? handleCreateWorkflow : undefined}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredWorkflows.map(workflow => (
              <WorkflowCard
                key={workflow.Id}
                workflow={workflow}
                onUpdate={handleWorkflowUpdate}
                onDelete={handleWorkflowDelete}
              />
            ))}
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <ApperIcon name="Lightbulb" size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Pro Tip</h3>
            <p className="text-gray-700">
              Start with a template to quickly build common automation workflows. 
              You can customize them to fit your specific needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowsPage;