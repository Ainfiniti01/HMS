// TODO(BACKEND): Connect dashboard actions and navigation context to backend-fed activity streams.
import { useNavigate } from "react-router-dom";
import { MOCK_USERS, MOCK_PATIENTS, MOCK_TASKS } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, ClipboardCheck, Clock, Activity, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { showSuccess } from "@/utils/toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('hms_user_role') || 'doctor';
  const user = MOCK_USERS.find(u => u.role === role) || MOCK_USERS[0];

  const stats = [
    { label: "Total Patients", value: "1,284", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Tasks", value: "42", icon: ClipboardCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Pending Reports", value: "12", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Avg. Wait Time", value: "18m", icon: Activity, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome, {user.name}</h1>
        <p className="text-slate-500">Here's what's happening in the hospital today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-2xl overflow-hidden">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`${stat.bg} p-3 rounded-xl`}>
                <stat.icon className={stat.color} size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Role Specific Content */}
        <div className="lg:col-span-2 space-y-6">
          {role === 'pharmacist' ? (
            <Card className="border-none shadow-sm rounded-2xl">
              <CardHeader>
                <CardTitle>Quick Prescription Search</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="Enter Patient ID or Name..." className="rounded-xl h-12" />
                  <Button className="h-12 px-6 rounded-xl bg-blue-600">Search</Button>
                </div>
                <div className="pt-4">
                  <h4 className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">Recent Searches</h4>
                  <div className="space-y-2">
                    {MOCK_PATIENTS.slice(0, 3).map(p => (
                      <div key={p.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 cursor-pointer transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-blue-600 border">
                            {p.name[0]}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{p.name}</p>
                            <p className="text-xs text-slate-500">ID: {p.id}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-white cursor-pointer" onClick={() => navigate('/prescriptions')}>View RX</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-none shadow-sm rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{role === 'nurse' ? 'My Assigned Tasks' : 'Recent Patient Activity'}</CardTitle>
                <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50" onClick={() => navigate('/tasks')}>View All</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_TASKS.map(task => (
                    <div key={task.id} className="flex items-center justify-between p-4 border rounded-2xl hover:border-blue-200 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-2 h-12 rounded-full",
                          task.status === 'completed' ? "bg-emerald-400" : "bg-amber-400"
                        )}></div>
                        <div>
                          <p className="font-semibold text-slate-900">{task.description}</p>
                          <p className="text-sm text-slate-500">Patient: {task.patientName} • Due: {task.dueTime.split(' ')[1]}</p>
                        </div>
                      </div>
                      <Badge className={cn(
                        "rounded-full px-3",
                        task.status === 'completed' ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                      )}>
                        {task.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-sm rounded-2xl bg-blue-600 text-white">
            <CardHeader>
              <CardTitle className="text-lg">Hospital Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-blue-100">Occupancy Rate</span>
                <span className="font-bold">84%</span>
              </div>
              <div className="w-full bg-blue-500/50 h-2 rounded-full overflow-hidden">
                <div className="bg-white h-full w-[84%]"></div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-blue-500/30 p-3 rounded-xl">
                  <p className="text-xs text-blue-100">Available Beds</p>
                  <p className="text-xl font-bold">12</p>
                </div>
                <div className="bg-blue-500/30 p-3 rounded-xl">
                  <p className="text-xs text-blue-100">Staff on Duty</p>
                  <p className="text-xl font-bold">48</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex flex-col items-center justify-center text-slate-500">
                    <span className="text-[10px] font-bold uppercase">Mar</span>
                    <span className="text-lg font-bold leading-none">{21 + i}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Patient Consultation</p>
                    <p className="text-xs text-slate-500">09:30 AM • Room 402</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;