import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MOCK_PATIENTS } from "@/lib/mock-data";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter, MoreHorizontal, Eye } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Patients = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredPatients = MOCK_PATIENTS.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Patients</h1>
          <p className="text-slate-500">Manage and view all hospital patient records.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl h-11 px-6">
          <Plus className="mr-2" size={18} />
          Register Patient
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            placeholder="Search by name, ID, or family ID..." 
            className="pl-10 rounded-xl h-11 border-slate-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="rounded-xl h-11 border-slate-200">
          <Filter className="mr-2" size={18} />
          Filters
        </Button>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="font-semibold">Patient Name</TableHead>
              <TableHead className="font-semibold">Age / Gender</TableHead>
              <TableHead className="font-semibold">Family ID</TableHead>
              <TableHead className="font-semibold">Condition</TableHead>
              <TableHead className="font-semibold">Last Visit</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => navigate(`/patients/${patient.id}`)}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold border border-blue-100">
                      {patient.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{patient.name}</p>
                      <p className="text-xs text-slate-500">ID: {patient.id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-slate-700">{patient.age} yrs</p>
                  <p className="text-xs text-slate-500">{patient.gender}</p>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-100 rounded-md font-medium">
                    {patient.familyId}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-100 rounded-md font-medium">
                    {patient.condition}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-600">
                  {patient.lastVisit}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <MoreHorizontal size={18} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => navigate(`/patients/${patient.id}`)}>
                        <Eye className="mr-2" size={16} /> View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit Information</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Archive Record</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Patients;