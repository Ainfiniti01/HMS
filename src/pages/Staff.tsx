// TODO(BACKEND): Connect staff creation and row-level admin actions to RBAC-enabled backend APIs.
import { useState } from "react";
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { showSuccess } from "@/utils/toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Staff = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewUserId, setViewUserId] = useState<string | null>(null);
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [deactivateUserId, setDeactivateUserId] = useState<string | null>(null);
  const [adminPassword, setAdminPassword] = useState("");
  const [staffForm, setStaffForm] = useState({ name: "", email: "", role: "", specialty: "", username: "", password: "" });
  const viewUser = MOCK_USERS.find(u => u.id === viewUserId);
  const editUser = MOCK_USERS.find(u => u.id === editUserId);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Staff Management</h1>
          <p className="text-slate-500">Manage hospital personnel, roles, and access permissions.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl h-11 px-6" onClick={() => setShowAddModal(true)}>
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <MoreHorizontal size={18} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuItem onClick={() => setViewUserId(user.id)}>View Profile</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { setEditUserId(user.id); setStaffForm({ name: user.name, email: user.email, role: user.role, specialty: user.specialty || "", username: user.email.split('@')[0], password: "" }); }}>Edit Staff</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={() => setDeactivateUserId(user.id)}>Deactivate</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold">Add Staff Member</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><Label>Name</Label><Input value={staffForm.name} onChange={(e) => setStaffForm(p => ({ ...p, name: e.target.value }))} /></div>
              <div><Label>Email</Label><Input value={staffForm.email} onChange={(e) => setStaffForm(p => ({ ...p, email: e.target.value }))} /></div>
              <div><Label>Role</Label><Input value={staffForm.role} onChange={(e) => setStaffForm(p => ({ ...p, role: e.target.value }))} /></div>
              <div><Label>Specialty / Dept</Label><Input value={staffForm.specialty} onChange={(e) => setStaffForm(p => ({ ...p, specialty: e.target.value }))} /></div>
              <div><Label>Username</Label><Input value={staffForm.username} onChange={(e) => setStaffForm(p => ({ ...p, username: e.target.value }))} /></div>
              <div><Label>Password</Label><Input type="password" value={staffForm.password} onChange={(e) => setStaffForm(p => ({ ...p, password: e.target.value }))} /></div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
              <Button onClick={() => { setShowAddModal(false); showSuccess("Staff creation request submitted (mock)"); }}>Add</Button>
            </div>
          </div>
        </div>
      )}
      {viewUser && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"><div className="bg-white w-full max-w-lg rounded-2xl p-6 space-y-2"><h3 className="text-lg font-bold">Staff Profile</h3><p>Name: {viewUser.name}</p><p>Email: {viewUser.email}</p><p>Role: {viewUser.role}</p><p>Specialty: {viewUser.specialty || 'General Ward'}</p><div className="flex justify-end"><Button onClick={() => setViewUserId(null)}>Close</Button></div></div></div>
      )}
      {editUser && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"><div className="bg-white w-full max-w-lg rounded-2xl p-6 space-y-3"><h3 className="text-lg font-bold">Edit Staff</h3><Input value={staffForm.name} onChange={(e) => setStaffForm(p => ({ ...p, name: e.target.value }))} /><Input value={staffForm.email} onChange={(e) => setStaffForm(p => ({ ...p, email: e.target.value }))} /><Input value={staffForm.role} onChange={(e) => setStaffForm(p => ({ ...p, role: e.target.value }))} /><Input value={staffForm.specialty} onChange={(e) => setStaffForm(p => ({ ...p, specialty: e.target.value }))} /><div className="flex justify-end gap-2"><Button variant="outline" onClick={() => setEditUserId(null)}>Cancel</Button><Button onClick={() => { setEditUserId(null); showSuccess('Staff updated (mock)'); }}>Save</Button></div></div></div>
      )}
      {deactivateUserId && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"><div className="bg-white w-full max-w-md rounded-2xl p-6 space-y-3"><h3 className="text-lg font-bold text-red-600">Deactivate Staff</h3><p className="text-sm text-slate-600">Enter admin password to confirm deactivation.</p><Input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} placeholder="Admin password" /><div className="flex justify-end gap-2"><Button variant="outline" onClick={() => { setDeactivateUserId(null); setAdminPassword(''); }}>Cancel</Button><Button variant="destructive" onClick={() => { setDeactivateUserId(null); setAdminPassword(''); showSuccess('Staff deactivated (mock)'); }}>Confirm</Button></div></div></div>
      )}
    </div>
  );
};

export default Staff;