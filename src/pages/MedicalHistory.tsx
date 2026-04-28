import { useParams, useNavigate } from "react-router-dom";
import { MOCK_PATIENTS, MOCK_HISTORY } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Plus, 
  Calendar, 
  User, 
  FileText, 
  Stethoscope, 
  Search,
  ChevronRight
} from "lucide-react";
import { Input } from "@/components/ui/input";

const MedicalHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const patient = MOCK_PATIENTS.find(p => p.id === id);

  if (!patient) return <div>Patient not found</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate(`/patients/${id}`)}>
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Medical History</h1>
            <p className="text-slate-500">Clinical timeline for {patient.name}</p>
          </div>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl h-12 px-6 shadow-lg shadow-blue-200">
          <Plus className="mr-2" size={20} />
          Add New Entry
        </Button>
      </div>

      {/* Patient Header Card */}
      <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
        <CardContent className="p-6 flex flex-wrap items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl font-bold text-blue-600 border border-blue-100">
              {patient.name[0]}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{patient.name}</h2>
              <p className="text-sm text-slate-500">ID: {patient.id} • {patient.age} yrs • {patient.gender}</p>
            </div>
          </div>
          <div className="h-10 w-[1px] bg-slate-100 hidden md:block"></div>
          <div className="space-y-1">
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Primary Condition</p>
            <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-100 rounded-lg">{patient.condition}</Badge>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Blood Group</p>
            <p className="font-bold text-slate-900">{patient.bloodGroup}</p>
          </div>
          <div className="ml-auto relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <Input placeholder="Search entries..." className="pl-10 rounded-xl bg-slate-50 border-none" />
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-200 before:via-slate-200 before:to-transparent">
        
        {MOCK_HISTORY.map((entry, index) => (
          <div key={entry.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            {/* Dot */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-600 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 -translate-x-1/2 z-10">
              <Stethoscope size={18} />
            </div>

            {/* Content Card */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <time className="font-bold text-slate-900 block">{entry.date.split(' ')[0]}</time>
                    <span className="text-xs text-slate-500">{entry.date.split(' ').slice(1).join(' ')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full">
                  <User size={14} className="text-blue-600" />
                  <span className="text-xs font-bold text-blue-700">{entry.doctorName}</span>
                </div>
              </div>

              <div className="space-y-6">
                <section>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Chief Complaint</h4>
                  <p className="text-slate-700 leading-relaxed font-medium">{entry.complaint}</p>
                </section>

                <section>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Clinical Observation</h4>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-slate-600 leading-relaxed italic">{entry.observation}</p>
                  </div>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <section>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Diagnosis</h4>
                    <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-100 rounded-lg px-3 py-1">
                      {entry.diagnosis}
                    </Badge>
                  </section>
                  <section>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Treatment Plan</h4>
                    <p className="text-sm text-slate-600">{entry.treatment}</p>
                  </section>
                </div>

                <section className="pt-4 border-t border-slate-50">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Clinical Notes</h4>
                  <div className="prose prose-slate prose-sm max-w-none text-slate-600">
                    <p>{entry.notes}</p>
                  </div>
                </section>
              </div>

              <div className="mt-8 flex justify-end">
                <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl">
                  Edit Entry
                  <ChevronRight size={16} className="ml-1" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State / End of Timeline */}
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-400 mb-4">
            <FileText size={24} />
          </div>
          <p className="text-slate-500 font-medium">End of medical history records</p>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;