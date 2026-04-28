import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  Pill, 
  UserCog, 
  Settings, 
  Calendar,
  Stethoscope,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types/hms";

interface SidebarProps {
  role: UserRole;
}

const Sidebar = ({ role }: SidebarProps) => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard", roles: ["admin", "doctor", "nurse", "pharmacist", "receptionist"] },
    { icon: Users, label: "Patients", path: "/patients", roles: ["admin", "doctor", "nurse", "receptionist"] },
    { icon: ClipboardList, label: "Tasks", path: "/tasks", roles: ["admin", "doctor", "nurse"] },
    { icon: Pill, label: "Prescriptions", path: "/prescriptions", roles: ["admin", "doctor", "pharmacist"] },
    { icon: Calendar, label: "Appointments", path: "/appointments", roles: ["admin", "doctor", "receptionist"] },
    { icon: UserCog, label: "Staff", path: "/staff", roles: ["admin"] },
    { icon: Settings, label: "Settings", path: "/settings", roles: ["admin", "doctor", "nurse", "pharmacist", "receptionist"] },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(role));

  return (
    <div className="w-64 bg-white border-r h-screen flex flex-col sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Stethoscope className="text-white" size={24} />
        </div>
        <span className="font-bold text-xl tracking-tight text-slate-800">MediFlow HMS</span>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {filteredItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
              location.pathname === item.path
                ? "bg-blue-50 text-blue-600 font-semibold"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <item.icon size={20} className={cn(
              "transition-colors",
              location.pathname === item.path ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
            )} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t">
        <button 
          onClick={() => window.location.href = '/login'}
          className="flex items-center gap-3 px-4 py-3 w-full text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;