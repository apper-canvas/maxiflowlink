import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Sidebar = ({ onClose }) => {
const user = useSelector((state) => state.user?.user);

  const navItems = [
    { path: "/", label: "Workflows", icon: "GitBranch" },
    { path: "/apps", label: "Apps", icon: "Grid3x3" },
    { path: "/templates", label: "Templates", icon: "Layout" },
    { path: "/activity", label: "Activity Log", icon: "Activity" }
  ];

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
            <ApperIcon name="Workflow" size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              FlowLink
            </h1>
            <p className="text-xs text-gray-500">Automation Builder</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium",
                isActive
                  ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              )
            }
          >
            {({ isActive }) => (
              <>
                <ApperIcon name={item.icon} size={20} />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-gray-200 bg-gradient-to-br from-primary-50 to-secondary-50">
<div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-bold">
{user?.firstName?.charAt(0) || ''}{user?.lastName?.charAt(0) || ''}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 truncate">
              {user?.firstName || ''} {user?.lastName || ''}
            </p>
            <p className="text-sm text-gray-500 truncate">{user?.emailAddress || ''}</p>
          </div>
        </div>
      </div>
    </div>
);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
        <NavContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <div className="lg:hidden">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose} />
        <aside className="fixed top-0 left-0 w-64 h-full bg-white shadow-2xl z-50 transform transition-transform duration-300">
          <NavContent />
        </aside>
      </div>
    </>
  );
};

export default Sidebar;