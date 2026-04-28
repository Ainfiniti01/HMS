import { useState } from "react";
import { Search, Bell, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/hms";

interface NavbarProps {
  user: User;
  onToggleMobileNav: () => void;
}

const Navbar = ({ user, onToggleMobileNav }: NavbarProps) => {
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<{ id: number; title: string; message: string } | null>(null);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Lab result ready", message: "CBC report for Robert Johnson is ready for review.", read: false },
    { id: 2, title: "Appointment reminder", message: "Emily Davis has an appointment tomorrow at 11:00 AM.", read: false },
    { id: 3, title: "Inventory update", message: "Paracetamol stock is below minimum threshold.", read: true },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const openNotification = (id: number) => {
    const target = notifications.find((n) => n.id === id);
    if (!target) return;

    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    setSelectedNotification({ id: target.id, title: target.title, message: target.message });
    setShowNotificationModal(true);
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <header className="h-16 border-b dark:border-slate-800 bg-white/80 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-30 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <button
          className="lg:hidden p-2 text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
          onClick={onToggleMobileNav}
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>

        <div className="flex-1 max-w-md relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
          <Input 
            placeholder="Search patients by name or ID..." 
            className="pl-10 bg-slate-50 dark:bg-slate-800 border-none focus-visible:ring-blue-500 rounded-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="p-2 text-slate-500 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full relative outline-none">
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 max-w-[90vw]">
            <DropdownMenuLabel className="flex items-center justify-between gap-3">
              <span>Notifications</span>
              <button
                className="text-xs text-blue-600 hover:text-blue-700"
                onClick={markAllAsRead}
              >
                Mark all as read
              </button>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length === 0 ? (
              <DropdownMenuItem disabled>No notifications</DropdownMenuItem>
            ) : (
              notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="flex flex-col items-start gap-1 py-2"
                  onClick={() => openNotification(notification.id)}
                >
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{notification.title}</span>
                    {!notification.read && <span className="ml-auto w-2 h-2 rounded-full bg-blue-600" />}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{notification.message}</p>
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1 sm:mx-2"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{user.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{user.role}</p>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-blue-100 text-blue-700 font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => window.location.href = '/settings'}>Profile Settings</DropdownMenuItem>
              {/* <DropdownMenuItem>Support</DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600" onClick={() => window.location.href = '/login'}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {showNotificationModal && selectedNotification && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl p-6 space-y-4 border dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{selectedNotification.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">{selectedNotification.message}</p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm"
                onClick={() => setShowNotificationModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;