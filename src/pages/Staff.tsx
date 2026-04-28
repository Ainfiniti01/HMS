import { MOCK_USERS } from "@/lib/mock-data";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, UserCog, Mail, Shield, MoreHorizontal } from "lucide-react";

const Staff = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Staff Management</h1>
          <p className="text-slate-500">Manage hospital personnel, roles, and access permissions.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl h-11 px-6">
          <Plus className="mr-2" size={18} />
          Add Staff Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white rounded-2xl border shadow-sm space-y-2">
          <p className="text-sm text-slate-500 font-medium">Total Staff</p>
          <p className="text-3xl font-bold text-slate-900">124</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border shadow-sm space-y-2">
          <p className="text-sm text-slate-500 font-medium">Doctors on Duty</p>
          <p className="text-3xl font-bold text-blue-600">18</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border shadow-sm space-y-2">
          <p className="text-sm text-slate-500 font-medium">Nurses on Duty</p>
          <p className="text-3xl font-bold text-emerald-600">32</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="font-semibold">Staff Member</TableHead>
              <TableHead className="font-semibold">Role</TableHead>
              <TableHead className="font-semibold">Specialty / Dept</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_USERS.map((user) => (
              <TableRow key={user.id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold border">
                      {user.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{user.name}</p>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Mail size={12} />
                        <span>{user.email}</span>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize rounded-md font-medium">
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-600">
                  {user.specialty || "General Ward"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-sm text-slate-700">Active</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreHorizontal size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Staff;