import { useState } from "react";
import { MOCK_PATIENTS, MOCK_PRESCRIPTIONS } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Pill, User, Calendar, Printer, CheckCircle } from "lucide-react";
import { showSuccess } from "@/utils/toast";

const Prescriptions = () => {
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const handleSearch = () => {
    const patient = MOCK_PATIENTS.find(p => 
      p.id.toLowerCase() === search.toLowerCase() || 
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    setSelectedPatient(patient || null);
  };

  const prescriptions = selectedPatient 
    ? MOCK_PRESCRIPTIONS.filter(p => p.patientId === selectedPatient.id)
    : [];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Prescription Retrieval</h1>
        <p className="text-slate-500">Search for patient prescriptions to dispense medication.</p>
      </div>

      <Card className="border-none shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <Input 
                placeholder="Enter Patient ID (e.g. P001) or Name..." 
                className="pl-12 h-14 rounded-2xl text-lg border-slate-200 focus-visible:ring-blue-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button className="h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-lg font-semibold" onClick={handleSearch}>
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {selectedPatient ? (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-none shadow-sm rounded-3xl bg-white">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-xl font-bold text-blue-600 border border-blue-100">
                  {selectedPatient.name[0]}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{selectedPatient.name}</h2>
                  <p className="text-sm text-slate-500">ID: {selectedPatient.id} • {selectedPatient.age} yrs • {selectedPatient.gender}</p>
                </div>
              </div>
              <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-100 rounded-lg px-4 py-1.5">
                Active Record
              </Badge>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 px-2">Prescription History</h3>
            {prescriptions.length > 0 ? (
              prescriptions.map(rx => (
                <Card key={rx.id} className="border-none shadow-sm rounded-3xl overflow-hidden">
                  <CardHeader className="bg-slate-50/50 border-b px-8 py-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Calendar size={16} />
                          <span>{rx.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <User size={16} />
                          <span>Dr. Sarah Smith</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-lg h-9">
                          <Printer size={16} className="mr-2" /> Print
                        </Button>
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 rounded-lg h-9" onClick={() => showSuccess("Medication dispensed")}>
                          <CheckCircle size={16} className="mr-2" /> Dispense
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {rx.medications.map((med, i) => (
                        <div key={i} className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-blue-600 border shadow-sm">
                            <Pill size={24} />
                          </div>
                          <div className="space-y-1">
                            <p className="text-lg font-bold text-slate-900">{med.name}</p>
                            <p className="text-blue-600 font-semibold">{med.dosage}</p>
                            <p className="text-sm text-slate-500 leading-relaxed">{med.instructions}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-3xl border border-dashed">
                <p className="text-slate-500">No prescriptions found for this patient.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-20 space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 text-slate-300">
            <Search size={40} />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900">No Patient Selected</h3>
            <p className="text-slate-500">Enter a patient ID or name above to view their prescriptions.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prescriptions;