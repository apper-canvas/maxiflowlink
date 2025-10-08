import { useState, useEffect } from "react";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import AppCard from "@/components/organisms/AppCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import appIntegrationService from "@/services/api/appIntegrationService";

const AppsPage = () => {
  const [apps, setApps] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const loadApps = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await appIntegrationService.getAll();
      setApps(data);
      setFilteredApps(data);
    } catch (err) {
      setError(err.message || "Failed to load apps");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApps();
  }, []);

  useEffect(() => {
    let filtered = [...apps];

    if (searchQuery) {
      filtered = filtered.filter(app =>
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(app => app.category === selectedCategory);
    }

    setFilteredApps(filtered);
  }, [apps, searchQuery, selectedCategory]);

  const categories = ["all", ...new Set(apps.map(app => app.category))];

  if (loading) return <Loading message="Loading app integrations..." />;
  if (error) return <Error message={error} onRetry={loadApps} />;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">App Integrations</h2>
        <p className="text-gray-600">Connect your favorite apps and services</p>
      </div>

      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="mb-6">
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Search apps..."
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

        {filteredApps.length === 0 ? (
          <Empty
            icon="Grid3x3"
            title="No apps found"
            description="Try adjusting your search or category filter"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApps.map(app => (
              <AppCard key={app.Id} app={app} />
            ))}
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-secondary-50 to-primary-50 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <ApperIcon name="Sparkles" size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Need a specific integration?</h3>
            <p className="text-gray-700 mb-3">
              We're constantly adding new app integrations. If you don't see what you need, let us know!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppsPage;