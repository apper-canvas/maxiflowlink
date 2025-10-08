import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import AppIcon from "@/components/molecules/AppIcon";
import Badge from "@/components/atoms/Badge";

const AppCard = ({ app, onClick }) => {
  return (
    <Card 
      hover
      onClick={onClick}
      className="p-6 cursor-pointer"
    >
      <div className="flex items-start gap-4 mb-4">
        <AppIcon icon={app.icon} color={app.color} size="lg" />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{app.name}</h3>
          <Badge variant="default" className="mb-2">{app.category}</Badge>
          <p className="text-sm text-gray-600 line-clamp-2">{app.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-500 mb-1 font-medium">Triggers</p>
          <p className="text-sm font-semibold text-primary-600">
            {app.triggers.length} available
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1 font-medium">Actions</p>
          <p className="text-sm font-semibold text-secondary-600">
            {app.actions.length} available
          </p>
        </div>
      </div>
    </Card>
  );
};

export default AppCard;