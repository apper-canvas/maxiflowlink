import { useState, useRef, useEffect } from "react";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import AppIcon from "@/components/molecules/AppIcon";
import { cn } from "@/utils/cn";

const WorkflowCanvas = ({ workflow, onNodeAdd, onNodeRemove, onNodeSelect }) => {
  const [selectedNode, setSelectedNode] = useState(null);
  const canvasRef = useRef(null);

  const handleNodeClick = (node) => {
    setSelectedNode(node.id);
    onNodeSelect?.(node);
  };

  const getNodeColor = (type) => {
    switch (type) {
      case "trigger":
        return "#7C3AED";
      case "action":
        return "#2563EB";
      case "condition":
        return "#F59E0B";
      default:
        return "#6B7280";
    }
  };

  const getNodeIcon = (appName) => {
    const iconMap = {
      "Gmail": { icon: "Mail", color: "#EA4335" },
      "Slack": { icon: "MessageSquare", color: "#4A154B" },
      "Google Sheets": { icon: "Sheet", color: "#34A853" },
      "Trello": { icon: "Trello", color: "#0079BF" },
      "Typeform": { icon: "FormInput", color: "#262627" },
      "Schedule": { icon: "Clock", color: "#2563EB" },
      "Twitter": { icon: "Twitter", color: "#1DA1F2" },
      "Google Drive": { icon: "HardDrive", color: "#4285F4" },
      "Stripe": { icon: "CreditCard", color: "#635BFF" },
      "Airtable": { icon: "Database", color: "#18BFFF" }
    };
    return iconMap[appName] || { icon: "Circle", color: "#6B7280" };
  };

  return (
    <div className="relative h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden">
      <div 
        ref={canvasRef}
        className="absolute inset-0 p-8 overflow-auto"
        style={{
          backgroundImage: "radial-gradient(circle, #e5e7eb 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }}
      >
        {workflow.nodes.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="GitBranch" size={36} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Start Building Your Workflow</h3>
              <p className="text-gray-600 mb-6">Add triggers and actions to create your automation</p>
              <Button variant="primary" onClick={onNodeAdd}>
                <ApperIcon name="Plus" size={20} className="mr-2" />
                Add Trigger
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative">
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              {workflow.connections.map((conn) => {
                const sourceNode = workflow.nodes.find(n => n.id === conn.sourceNodeId);
                const targetNode = workflow.nodes.find(n => n.id === conn.targetNodeId);
                if (!sourceNode || !targetNode) return null;

                const x1 = sourceNode.position.x + 100;
                const y1 = sourceNode.position.y + 50;
                const x2 = targetNode.position.x;
                const y2 = targetNode.position.y + 50;

                return (
                  <g key={conn.id}>
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#2563EB"
                      strokeWidth="2"
                      className="connection-line"
                    />
                    <circle cx={x2} cy={y2} r="4" fill="#2563EB" />
                  </g>
                );
              })}
            </svg>

            {workflow.nodes.map((node) => {
              const appInfo = getNodeIcon(node.appName);
              return (
                <div
                  key={node.id}
                  className={cn(
                    "node-card absolute bg-white rounded-xl shadow-card p-4 w-[200px] cursor-pointer",
                    node.type,
                    selectedNode === node.id && "selected"
                  )}
                  style={{
                    left: node.position.x,
                    top: node.position.y,
                    zIndex: 2
                  }}
                  onClick={() => handleNodeClick(node)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <AppIcon icon={appInfo.icon} color={appInfo.color} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">{node.appName}</p>
                      <p className="text-xs text-gray-500 truncate">{node.eventType}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <ApperIcon 
                      name={node.type === "trigger" ? "Zap" : "ArrowRight"} 
                      size={12}
                      style={{ color: getNodeColor(node.type) }}
                    />
                    <span className="capitalize">{node.type}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <Button variant="outline" size="sm">
          <ApperIcon name="ZoomIn" size={16} />
        </Button>
        <Button variant="outline" size="sm">
          <ApperIcon name="ZoomOut" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default WorkflowCanvas;