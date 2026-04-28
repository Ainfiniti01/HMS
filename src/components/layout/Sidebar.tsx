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
  isMobileNavOpen?: boolean;
  onCloseMobileNav?: () => void;
}

const Sidebar = ({ role, isMobileNavOpen = false, onCloseMobileNav }: SidebarProps) => {
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
    <>
      {isMobileNavOpen && (
        <button
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onCloseMobileNav}
          aria-label="Close navigation menu"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-white dark:bg-slate-900 border-r dark:border-slate-800 flex flex-col transform transition-transform duration-300 ${
          isMobileNavOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
      <div className="p-6 flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Stethoscope className="text-white" size={24} />
        </div>
        <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-slate-100">MediFlow HMS</span>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {filteredItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={onCloseMobileNav}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
              location.pathname === item.path
                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 font-semibold"
                : "text-slate-500 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
            )}
          >
            <item.icon size={20} className={cn(
              "transition-colors",
               location.pathname === item.path ? "text-blue-600 dark:text-blue-300" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300"
            )} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t dark:border-slate-800">
        <button 
          onClick={() => window.location.href = '/login'}
          className="flex items-center gap-3 px-4 py-3 w-full text-slate-500 dark:text-slate-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
      </aside>
    </>
  );
};

export default Sidebar;