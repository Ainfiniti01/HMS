// TODO(BACKEND): Connect settings sections, dark mode preference, and profile updates to backend APIs.
import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MOCK_USERS } from "@/lib/mock-data";
import { showSuccess } from "@/utils/toast";

const Settings = () => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains("dark"));
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const role = localStorage.getItem('hms_user_role') || 'doctor';
  const user = MOCK_USERS.find(u => u.role === role) || MOCK_USERS[0];

  const handleDarkModeToggle = (checked: boolean) => {
    setIsDarkMode(checked);
    document.documentElement.classList.toggle("dark", checked);
    localStorage.setItem("hms_dark_mode", String(checked));
    showSuccess(`Dark mode ${checked ? "enabled" : "disabled"}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage your account preferences and system settings.</p>
      </div>

      <div className="space-y-6">
          <Card className="border-none shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20 border-2 border-white shadow-md">
                  <AvatarFallback className="bg-blue-100 text-blue-700 text-2xl font-bold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={() => showSuccess("Photo selected (mock)")} />
                  <Button variant="outline" className="rounded-xl" onClick={() => fileInputRef.current?.click()}>Change Photo</Button>
                  <p className="text-xs text-slate-400 dark:text-slate-500">JPG, GIF or PNG. Max size of 2MB.</p>
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
                  <Input id="role" defaultValue={user.role} disabled className="rounded-xl capitalize bg-slate-50 dark:bg-slate-800" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialty">Specialty</Label>
                  <Input id="specialty" defaultValue={user.specialty || "N/A"} className="rounded-xl" />
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8" onClick={() => setShowSaveModal(true)}>Save Changes</Button>
            </CardContent>
          </Card>
            <Card className="border-none shadow-sm rounded-2xl">
              <CardHeader><CardTitle>Security</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-300">Backend required for password updates, 2FA, and session/device management.</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm rounded-2xl">
              <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-300">Backend required for notification channels, templates, and delivery preferences.</p>
              </CardContent>
            </Card>
          <Card className="border-none shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Receive daily summaries of assigned tasks.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Desktop Alerts</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Show browser notifications for urgent tasks.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Dark Mode</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Switch the interface to dark theme.</p>
                </div>
                <Switch checked={isDarkMode} onCheckedChange={handleDarkModeToggle} />
              </div>
            </CardContent>
          </Card>
      </div>
      {showSaveModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold">Confirm Save Changes</h3>
            <p className="text-sm text-slate-600">Save profile updates? This currently needs backend persistence.</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowSaveModal(false)}>Cancel</Button>
              <Button onClick={() => { setShowSaveModal(false); showSuccess("Changes saved (mock)"); }}>Confirm</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;