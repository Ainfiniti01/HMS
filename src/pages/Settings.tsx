import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MOCK_USERS } from "@/lib/mock-data";

const Settings = () => {
  const role = localStorage.getItem('hms_user_role') || 'doctor';
  const user = MOCK_USERS.find(u => u.role === role) || MOCK_USERS[0];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500">Manage your account preferences and system settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-4">
          <nav className="space-y-1">
            <Button variant="ghost" className="w-full justify-start rounded-xl bg-blue-50 text-blue-600 font-semibold">Profile</Button>
            <Button variant="ghost" className="w-full justify-start rounded-xl text-slate-500">Security</Button>
            <Button variant="ghost" className="w-full justify-start rounded-xl text-slate-500">Notifications</Button>
            <Button variant="ghost" className="w-full justify-start rounded-xl text-slate-500">Preferences</Button>
          </nav>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card className="border-none shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle>Public Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20 border-2 border-white shadow-md">
                  <AvatarFallback className="bg-blue-100 text-blue-700 text-2xl font-bold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" className="rounded-xl">Change Photo</Button>
                  <p className="text-xs text-slate-400">JPG, GIF or PNG. Max size of 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={user.name} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" defaultValue={user.email} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue={user.role} disabled className="rounded-xl capitalize bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialty">Specialty</Label>
                  <Input id="specialty" defaultValue={user.specialty || "N/A"} className="rounded-xl" />
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8">Save Changes</Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle>System Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-slate-500">Receive daily summaries of assigned tasks.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Desktop Alerts</Label>
                  <p className="text-sm text-slate-500">Show browser notifications for urgent tasks.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Dark Mode</Label>
                  <p className="text-sm text-slate-500">Switch the interface to dark theme.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;