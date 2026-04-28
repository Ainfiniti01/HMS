import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { User } from "@/types/hms";

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: User;
}

const DashboardLayout = ({ children, user }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <Sidebar role={user.role} />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar user={user} />
        <main className="p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;