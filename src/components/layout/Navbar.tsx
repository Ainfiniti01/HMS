import { Search, Bell, User as UserIcon } from "lucide-react";
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
}

const Navbar = ({ user }: NavbarProps) => {
  return (
    <header className="h-16 border-b bg-white/80 backdrop-blur-md sticky top-0 z-30 px-8 flex items-center justify-between">
      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <Input 
          placeholder="Search patients by name or ID..." 
          className="pl-10 bg-slate-50 border-none focus-visible:ring-blue-500 rounded-full"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900">{user.name}</p>
            <p className="text-xs text-slate-500 capitalize">{user.role}</p>
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
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600" onClick={() => window.location.href = '/login'}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;