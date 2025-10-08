import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import TemplateCard from "@/components/organisms/TemplateCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import templateService from "@/services/api/templateService";
import workflowService from "@/services/api/workflowService";

const TemplatesPage = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const loadTemplates = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await templateService.getAll();
      setTemplates(data);
      setFilteredTemplates(data);
    } catch (err) {
      setError(err.message || "Failed to load templates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  useEffect(() => {
    let filtered = [...templates];

    if (searchQuery) {
      filtered = filtered.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.apps.some(app => app.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }

    setFilteredTemplates(filtered);
  }, [templates, searchQuery, selectedCategory]);

  const categories = ["all", ...new Set(templates.map(t => t.category))];

  const handleUseTemplate = async (template) => {
    try {
      const workflow = {
        name: template.name,
        description: template.description,
        nodes: template.nodes.map((node, index) => ({
          ...node,
          position: { x: 100 + (index * 300), y: 200 }
        })),
        connections: []
      };

      const created = await workflowService.create(workflow);
      toast.success("Template added to your workflows!");
      navigate(`/workflow/${created.Id}/edit`);
    } catch (error) {
      toast.error("Failed to create workflow from template");
    }
  };

  if (loading) return <Loading message="Loading templates..." />;
  if (error) return <Error message={error} onRetry={loadTemplates} />;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Workflow Templates</h2>
        <p className="text-gray-600">Start quickly with pre-built automation workflows</p>
      </div>

      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="mb-6">
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Search templates..."
            className="mb-4"
          />
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {filteredTemplates.length === 0 ? (
          <Empty
            icon="Layout"
            title="No templates found"
            description="Try adjusting your search or category filter"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map(template => (
              <TemplateCard
                key={template.Id}
                template={template}
                onUse={handleUseTemplate}
              />
            ))}
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <ApperIcon name="Rocket" size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Quick Start</h3>
            <p className="text-gray-700">
              Templates are fully customizable. Use them as starting points and modify the configuration 
              to match your specific workflow requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;