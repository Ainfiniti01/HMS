// TODO(BACKEND): Connect profile actions and billing details to real API endpoints.
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MOCK_PATIENTS, MOCK_TASKS, MOCK_PRESCRIPTIONS } from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Droplets, 
  FileText, 
  Plus, 
  ArrowLeft,
  ClipboardList,
  Pill,
  History,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { showSuccess } from "@/utils/toast";

const PatientProfile = () => {
  const [showBillingModal, setShowBillingModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [rxForm, setRxForm] = useState({ drugName: "", quantity: "", instructions: "" });
  const { id } = useParams();
  const navigate = useNavigate();
  const patient = MOCK_PATIENTS.find(p => p.id === id);

  if (!patient) return <div>Patient not found</div>;

  const tasks = MOCK_TASKS.filter(t => t.patientId === id);
  const prescriptions = MOCK_PRESCRIPTIONS.filter(p => p.patientId === id);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start sm:items-center gap-3 sm:gap-4">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate('/patients')}>
          <ArrowLeft size={20} />
        </Button>
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 truncate">{patient.name}</h1>
          <p className="text-slate-500 text-sm sm:text-base break-words">Patient ID: {patient.id} • Family ID: {patient.familyId}</p>
        </div>
        <div className="w-full sm:w-auto sm:ml-auto flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="rounded-xl w-full sm:w-auto" onClick={() => navigate(`/patients/${id}/history`)}>
            <History className="mr-2" size={18} />
            Medical History
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl w-full sm:w-auto" onClick={() => navigate(`/patients/${id}/history`)}>
            <Plus className="mr-2" size={18} />
            Add Entry
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-blue-500 to-blue-600"></div>
            <CardContent className="relative pt-12">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                <div className="w-20 h-20 rounded-3xl bg-white p-1 shadow-lg">
                  <div className="w-full h-full rounded-2xl bg-blue-50 flex items-center justify-center text-2xl font-bold text-blue-600 border border-blue-100">
                    {patient.name[0]}
                  </div>
                </div>
              </div>
              <div className="text-center space-y-1 mb-6">
                <h3 className="font-bold text-lg">{patient.name}</h3>
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50">{patient.condition}</Badge>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Age / Gender</p>
                    <p className="font-medium">{patient.age} yrs, {patient.gender}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                    <Droplets size={16} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Blood Group</p>
                    <p className="font-medium">{patient.bloodGroup}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Contact</p>
                    <p className="font-medium">{patient.contact}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* <Card className="border-none shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-wider text-slate-500">Billing Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">Total Cost</span>
                <span className="font-bold text-slate-900">${patient.billingSummary.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">Paid</span>
                <span className="font-bold text-emerald-600">${patient.billingSummary.paid}</span>
              </div>
              <div className="pt-2 border-t flex justify-between items-center">
                <span className="text-slate-900 font-semibold text-sm">Pending</span>
                <span className="font-bold text-red-600">${patient.billingSummary.pending}</span>
              </div>
              <Button variant="outline" className="w-full rounded-xl border-slate-200" onClick={() => setShowBillingModal(true)}>View Details</Button>
            </CardContent>
          </Card> */}
        </div>

        {/* Main Content Tabs */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="summary" className="space-y-6">
            <TabsList className="bg-white border p-1 rounded-2xl h-auto min-h-14 w-full justify-start gap-2 overflow-x-auto no-scrollbar">
              <TabsTrigger value="summary" className="rounded-xl px-4 sm:px-6 whitespace-nowrap shrink-0 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">Summary</TabsTrigger>
              <TabsTrigger value="prescriptions" className="rounded-xl px-4 sm:px-6 whitespace-nowrap shrink-0 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">Prescriptions</TabsTrigger>
              <TabsTrigger value="tasks" className="rounded-xl px-4 sm:px-6 whitespace-nowrap shrink-0 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">Tasks</TabsTrigger>
              <TabsTrigger value="info" className="rounded-xl px-4 sm:px-6 whitespace-nowrap shrink-0 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">Personal Info</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="space-y-6">
              <Card className="border-none shadow-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="text-blue-600" size={20} />
                    Latest Condition Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                    <p className="text-slate-700 leading-relaxed">
                      Patient is currently stable but requires regular monitoring of blood pressure. 
                      Recent tests show improvement in glucose levels. Advised to continue current medication 
                      regime and follow-up in 2 weeks.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-2xl">
                      <p className="text-xs text-slate-500 uppercase font-bold mb-1">Last BP</p>
                      <p className="text-xl font-bold text-slate-900">132/84</p>
                    </div>
                    <div className="p-4 border rounded-2xl">
                      <p className="text-xs text-slate-500 uppercase font-bold mb-1">Heart Rate</p>
                      <p className="text-xl font-bold text-slate-900">72 bpm</p>
                    </div>
                    <div className="p-4 border rounded-2xl">
                      <p className="text-xs text-slate-500 uppercase font-bold mb-1">Weight</p>
                      <p className="text-xl font-bold text-slate-900">78.5 kg</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="prescriptions" className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <h3 className="text-lg font-bold text-slate-900">Active Prescriptions</h3>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button size="sm" variant="outline" className="rounded-lg" onClick={() => navigate(`/prescriptions?patientId=${patient.id}`)}>View RX</Button>
                  <Button size="sm" className="bg-blue-600 rounded-lg" onClick={() => setShowPrescriptionModal(true)}>Add Prescription</Button>
                </div>
              </div>
              {prescriptions.map(rx => (
                <Card key={rx.id} className="border-none shadow-sm rounded-2xl">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">Prescribed on {rx.date}</CardTitle>
                      <Badge variant="outline">ID: {rx.id}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {rx.medications.map((med, i) => (
                        <div key={i} className="flex items-start gap-4 p-3 bg-slate-50 rounded-xl">
                          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-blue-600 border">
                            <Pill size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{med.name} <span className="text-slate-400 font-normal ml-2">{med.dosage}</span></p>
                            <p className="text-sm text-slate-500">{med.instructions}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="tasks" className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <h3 className="text-lg font-bold text-slate-900">Assigned Tasks</h3>
                <Button size="sm" className="bg-blue-600 rounded-lg" onClick={() => setShowTaskModal(true)}>Assign New Task</Button>
              </div>
              <div className="space-y-3">
                {tasks.map(task => (
                  <div key={task.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-white border rounded-2xl shadow-sm gap-3">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                        task.status === 'completed' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                      )}>
                        <ClipboardList size={20} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 break-words">{task.description}</p>
                        <p className="text-xs text-slate-500">Due: {task.dueTime} • Assigned to Nurse</p>
                      </div>
                    </div>
                    <Badge className={cn(
                      "rounded-full",
                      task.status === 'completed' ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                    )}>
                      {task.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="info">
              <Card className="border-none shadow-sm rounded-2xl">
                <CardContent className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-900 border-b pb-2">Personal Details</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-slate-400 uppercase font-bold">Full Name</p>
                        <p className="font-medium">{patient.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase font-bold">Gender</p>
                        <p className="font-medium">{patient.gender}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase font-bold">Date of Birth</p>
                        <p className="font-medium">12 May 1979</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase font-bold">Blood Group</p>
                        <p className="font-medium">{patient.bloodGroup}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-900 border-b pb-2">Contact Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Phone size={16} className="text-slate-400" />
                        <p className="text-sm">{patient.contact}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail size={16} className="text-slate-400" />
                        <p className="text-sm">robert.j@example.com</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin size={16} className="text-slate-400" />
                        <p className="text-sm">123 Medical Way, Health City, HC 54321</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      {showBillingModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold">Billing Details</h3>
            <p className="text-sm text-slate-600">Total: ${patient.billingSummary.total} • Paid: ${patient.billingSummary.paid} • Pending: ${patient.billingSummary.pending}</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowBillingModal(false)}>Close</Button>
              <Button onClick={() => { setShowBillingModal(false); showSuccess("Billing details fetched (mock)"); }}>Acknowledge</Button>
            </div>
          </div>
        </div>
      )}
      {showPrescriptionModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold">Add Prescription</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input className="border rounded-lg px-3 py-2" placeholder="Drug name" value={rxForm.drugName} onChange={(e) => setRxForm(p => ({ ...p, drugName: e.target.value }))} />
              <input className="border rounded-lg px-3 py-2" placeholder="Quantity / Dosage" value={rxForm.quantity} onChange={(e) => setRxForm(p => ({ ...p, quantity: e.target.value }))} />
            </div>
            <textarea className="border rounded-lg px-3 py-2 w-full min-h-24" placeholder="Instructions (e.g. Once daily in the morning)" value={rxForm.instructions} onChange={(e) => setRxForm(p => ({ ...p, instructions: e.target.value }))} />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowPrescriptionModal(false)}>Cancel</Button>
              <Button onClick={() => { setShowPrescriptionModal(false); showSuccess("Prescription added (mock)"); }}>Save</Button>
            </div>
          </div>
        </div>
      )}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold">Create Task</h3>
            <input className="border rounded-lg px-3 py-2 w-full" placeholder="Nurse name" />
            <input className="border rounded-lg px-3 py-2 w-full" placeholder="Patient name" defaultValue={patient.name} />
            <input className="border rounded-lg px-3 py-2 w-full" placeholder="Due time" />
            <textarea className="border rounded-lg px-3 py-2 w-full min-h-24" placeholder="Task details" />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowTaskModal(false)}>Cancel</Button>
              <Button onClick={() => { setShowTaskModal(false); showSuccess("Task assigned (mock)"); }}>Create</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientProfile;