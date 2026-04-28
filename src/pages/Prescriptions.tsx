// TODO(BACKEND): Integrate prescription print/dispense workflows with pharmacy backend services.
import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MOCK_PATIENTS, MOCK_PRESCRIPTIONS } from "@/lib/mock-data";
import { Patient } from "@/types/hms";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Pill, User, Calendar, Printer, CheckCircle } from "lucide-react";
import { showSuccess } from "@/utils/toast";

const Prescriptions = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [recordStatus, setRecordStatus] = useState("Active Record");
  const [showDispenseModal, setShowDispenseModal] = useState(false);
  const [isDispensed, setIsDispensed] = useState(false)

  const handleSearch = () => {
    const patient = MOCK_PATIENTS.find(p => 
      p.id.toLowerCase() === search.toLowerCase() || 
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    setSelectedPatient(patient || null);
    setRecordStatus("Active Record");
  };

  useEffect(() => {
    const patientId = searchParams.get("patientId");
    if (!patientId) return;
    setSearch(patientId);
    const patient = MOCK_PATIENTS.find((p) => p.id.toLowerCase() === patientId.toLowerCase());
    setSelectedPatient(patient || null);
    setRecordStatus("Active Record");
  }, [searchParams]);

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
              <Badge className={`rounded-lg px-4 py-1.5 ${recordStatus === 'Dispensed' ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-emerald-50 text-emerald-700 border-emerald-100'} hover:bg-inherit`}>
                {recordStatus}
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
                        <Button variant="outline" size="sm" className="rounded-lg h-9" onClick={() => window.print()}>
                          <Printer size={16} className="mr-2" /> Print
                        </Button>
                        {!isDispensed ? (
                        <Button
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-700 rounded-lg h-9"
                          onClick={() => {
                            setShowDispenseModal(true)
                            setIsDispensed(true)
                          }}
                        >
                          <CheckCircle size={16} className="mr-2" />
                          Dispense
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          disabled
                          className="bg-gray-300 text-gray-600 rounded-lg h-9 cursor-not-allowed"
                        >
                          Dispensed
                        </Button>
                      )}
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
      {showDispenseModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold">Confirm Dispense</h3>
            <p className="text-sm text-slate-600">Proceed to dispense this prescription? Backend audit trail is required.</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowDispenseModal(false)}>Cancel</Button>
              <Button onClick={() => { setShowDispenseModal(false); setRecordStatus("Dispensed"); showSuccess("Medication dispensed"); }}>Confirm</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prescriptions;