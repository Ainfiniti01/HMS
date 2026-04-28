import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, User, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Appointments = () => {
  const appointments = [
    { id: 1, patient: "Robert Johnson", doctor: "Dr. Sarah Smith", time: "09:30 AM", date: "2024-03-22", type: "Consultation", status: "Confirmed" },
    { id: 2, patient: "Emily Davis", doctor: "Dr. Sarah Smith", time: "11:00 AM", date: "2024-03-22", type: "Follow-up", status: "Pending" },
    { id: 3, patient: "Michael Brown", doctor: "Dr. Sarah Smith", time: "02:30 PM", date: "2024-03-23", type: "Check-up", status: "Confirmed" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Appointments</h1>
          <p className="text-slate-500">Manage and schedule patient visits.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl h-11 px-6">
          <Plus className="mr-2" size={18} />
          New Appointment
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            placeholder="Search appointments..." 
            className="pl-10 rounded-xl h-11 border-slate-200"
          />
        </div>
        <Button variant="outline" className="rounded-xl h-11 border-slate-200">
          Today
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {appointments.map((apt) => (
          <Card key={apt.id} className="border-none shadow-sm rounded-2xl hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex flex-col items-center justify-center text-blue-600">
                  <span className="text-[10px] font-bold uppercase">{apt.date.split('-')[1]}</span>
                  <span className="text-lg font-bold leading-none">{apt.date.split('-')[2]}</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{apt.patient}</h3>
                  <p className="text-sm text-slate-500">{apt.type}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock size={16} className="text-slate-400" />
                  <span>{apt.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <User size={16} className="text-slate-400" />
                  <span>{apt.doctor}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  apt.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                }`}>
                  {apt.status}
                </span>
                <Button variant="ghost" size="sm" className="rounded-lg">Reschedule</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Appointments;