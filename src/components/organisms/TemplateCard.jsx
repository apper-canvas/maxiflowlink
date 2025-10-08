import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";

const TemplateCard = ({ template, onUse }) => {
  return (
    <Card hover className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center">
<ApperIcon name={template.icon || 'File'} size={24} className="text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{template.name || ''}</h3>
            <Badge variant="default">{template.category || ''}</Badge>
          </div>
        </div>
      </div>

<p className="text-sm text-gray-600 mb-4 line-clamp-2">{template.description || ''}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {(template.apps || []).map((app, index) => (
          <div key={index} className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 rounded-full px-3 py-1">
            <ApperIcon name="Circle" size={8} className="text-primary-500 fill-current" />
            {app}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1 text-sm text-gray-500">
<ApperIcon name="Users" size={16} />
          <span>{(template.usageCount || 0).toLocaleString()} uses</span>
        </div>
        <Button variant="primary" size="sm" onClick={() => onUse?.(template)}>
          <ApperIcon name="Plus" size={16} className="mr-1" />
          Use Template
        </Button>
      </div>
    </Card>
  );
};

export default TemplateCard;