// TODO(BACKEND): Connect appointment creation/rescheduling with scheduling APIs.
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, User, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { showSuccess } from "@/utils/toast";

const Appointments = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [rescheduleId, setRescheduleId] = useState<number | null>(null);
  const [appointmentForm, setAppointmentForm] = useState({
    patient: "",
    doctor: "",
    date: "",
    time: "",
    type: "",
    notes: "",
  });
  const [appointments, setAppointments] = useState([
    { id: 1, patient: "Robert Johnson", doctor: "Dr. Sarah Smith", time: "09:30 AM", date: "2024-03-22", type: "Consultation", status: "Active" },
    { id: 2, patient: "Emily Davis", doctor: "Dr. Sarah Smith", time: "11:00 AM", date: "2024-03-22", type: "Follow-up", status: "Pending" },
    { id: 3, patient: "Michael Brown", doctor: "Dr. Sarah Smith", time: "02:30 PM", date: "2024-03-23", type: "Check-up", status: "Completed" },
  ]);

  const selectedAppointment = appointments.find((apt) => apt.id === rescheduleId) ?? null;

  const closeAppointmentModal = () => {
    setShowCreateModal(false);
    setRescheduleId(null);
    setAppointmentForm({ patient: "", doctor: "", date: "", time: "", type: "", notes: "" });
  };

  const openCreateModal = () => {
    setRescheduleId(null);
    setAppointmentForm({ patient: "", doctor: "", date: "", time: "", type: "", notes: "" });
    setShowCreateModal(true);
  };

  const openRescheduleModal = (id: number) => {
    const apt = appointments.find((item) => item.id === id);
    if (!apt) return;

    setShowCreateModal(false);
    setRescheduleId(id);
    setAppointmentForm({
      patient: apt.patient,
      doctor: apt.doctor,
      date: apt.date,
      time: apt.time,
      type: apt.type,
      notes: "",
    });
  };

  const saveAppointment = () => {
    if (rescheduleId !== null) {
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === rescheduleId
            ? {
                ...apt,
                patient: appointmentForm.patient,
                doctor: appointmentForm.doctor,
                date: appointmentForm.date,
                time: appointmentForm.time,
                type: appointmentForm.type,
                status: "Active",
              }
            : apt
        )
      );
      showSuccess("Appointment rescheduled (mock)");
      closeAppointmentModal();
      return;
    }

    const nextId = Math.max(...appointments.map((apt) => apt.id), 0) + 1;
    setAppointments((prev) => [
      {
        id: nextId,
        patient: appointmentForm.patient || "New Patient",
        doctor: appointmentForm.doctor || "Unassigned Doctor",
        date: appointmentForm.date || new Date().toISOString().slice(0, 10),
        time: appointmentForm.time || "09:00 AM",
        type: appointmentForm.type || "Consultation",
        status: "Pending",
      },
      ...prev,
    ]);
    showSuccess("Appointment created (mock)");
    closeAppointmentModal();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Appointments</h1>
          <p className="text-slate-500">Manage and schedule patient visits.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl h-11 px-6" onClick={openCreateModal}>
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
                  apt.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : apt.status === 'Pending' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-700'
                }`}>
                  {apt.status}
                </span>
                 <Button variant="ghost" size="sm" className="rounded-lg" onClick={() => openRescheduleModal(apt.id)}>Reschedule</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {(showCreateModal || rescheduleId !== null) && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold">{rescheduleId !== null ? "Reschedule Appointment" : "Create New Appointment"}</h3>
            {rescheduleId !== null && selectedAppointment ? (
              <p className="text-sm text-slate-600">Editing last details for appointment #{selectedAppointment.id}. Update any field and confirm.</p>
            ) : (
              <p className="text-sm text-slate-600">Fill details for the new appointment.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input className="rounded-lg" placeholder="Patient name" value={appointmentForm.patient} onChange={(e) => setAppointmentForm((p) => ({ ...p, patient: e.target.value }))} />
              <Input className="rounded-lg" placeholder="Doctor name" value={appointmentForm.doctor} onChange={(e) => setAppointmentForm((p) => ({ ...p, doctor: e.target.value }))} />
              <Input className="rounded-lg" type="date" value={appointmentForm.date} onChange={(e) => setAppointmentForm((p) => ({ ...p, date: e.target.value }))} />
              <Input className="rounded-lg" placeholder="Time (e.g. 10:30 AM)" value={appointmentForm.time} onChange={(e) => setAppointmentForm((p) => ({ ...p, time: e.target.value }))} />
              <Input className="rounded-lg sm:col-span-2" placeholder="Appointment type" value={appointmentForm.type} onChange={(e) => setAppointmentForm((p) => ({ ...p, type: e.target.value }))} />
              <textarea className="border rounded-lg px-3 py-2 w-full min-h-24 sm:col-span-2" placeholder="Notes (optional)" value={appointmentForm.notes} onChange={(e) => setAppointmentForm((p) => ({ ...p, notes: e.target.value }))} />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={closeAppointmentModal}>{rescheduleId !== null ? "Close" : "Cancel"}</Button>
              <Button onClick={saveAppointment}>{rescheduleId !== null ? "Confirm Reschedule" : "Create"}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;