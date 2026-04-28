// TODO(BACKEND): Hook task creation, completion, reporting, and mutations to backend services.
import { useState } from "react";
import { MOCK_TASKS, MOCK_USERS } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ClipboardList, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Filter,
  User as UserIcon,
  MoreVertical
} from "lucide-react";
import { cn } from "@/lib/utils";
import { showSuccess } from "@/utils/toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Tasks = () => {
  const role = localStorage.getItem('hms_user_role') || 'doctor';
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [pendingCompleteId, setPendingCompleteId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showDeleteFor, setShowDeleteFor] = useState<string | null>(null);
  const [deleteReason, setDeleteReason] = useState("");
  const [taskForm, setTaskForm] = useState({ nurseName: "", patientName: "", dueTime: "", priority: "Routine", details: "" });

  const handleComplete = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'completed' } : t));
    showSuccess("Task marked as completed");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Task Management</h1>
          <p className="text-slate-500">
            {role === 'nurse' ? 'View and complete your assigned clinical tasks.' : 'Assign and monitor tasks for nursing staff.'}
          </p>
        </div>
        {role === 'doctor' && (
          <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl h-11 px-6" onClick={() => setShowCreateModal(true)}>
            <Plus className="mr-2" size={18} />
            Create Task
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm rounded-2xl bg-white">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Pending</CardTitle>
              <Badge variant="secondary" className="bg-amber-50 text-amber-700">{tasks.filter(t => t.status === 'pending').length}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {tasks.filter(t => t.status === 'pending').map(task => (
              <div key={task.id} className="p-5 border rounded-2xl hover:border-blue-200 transition-all bg-white shadow-sm group">
                <div className="flex justify-between items-start mb-3">
                  <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-100 rounded-md">
                    {task.patientName}
                  </Badge>
                  <button className="text-slate-400 hover:text-slate-600" onClick={() => setShowDeleteFor(task.id)}>
                    <MoreVertical size={16} />
                  </button>
                </div>
                <p className="font-semibold text-slate-900 mb-4">{task.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock size={14} />
                    <span>Due {task.dueTime.split(' ')[1]}</span>
                  </div>
                  {role === 'nurse' ? (
                    <Button 
                      size="sm" 
                      className="bg-emerald-600 hover:bg-emerald-700 rounded-lg h-8 text-xs"
                      onClick={() => setPendingCompleteId(task.id)}
                    >
                      Mark Done
                    </Button>
                  ) : (
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <UserIcon size={12} />
                      <span>Nurse John</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-2xl bg-white">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Completed</CardTitle>
              <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">{tasks.filter(t => t.status === 'completed').length}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {tasks.filter(t => t.status === 'completed').map(task => (
              <div key={task.id} className="p-5 border rounded-2xl bg-slate-50/50 opacity-80">
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="outline" className="rounded-md">
                    {task.patientName}
                  </Badge>
                  <CheckCircle2 className="text-emerald-500" size={18} />
                </div>
                <p className="font-semibold text-slate-500 line-through mb-4">{task.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Clock size={14} />
                    <span>Completed at 10:45 AM</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-2xl bg-slate-900 text-white">
          <CardHeader>
            <CardTitle className="text-lg">Task Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Completion Rate</span>
                <span className="font-bold">72%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[72%]"></div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Priority Distribution</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="text-sm">Urgent</span>
                  </div>
                  <span className="text-sm font-bold">08</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    <span className="text-sm">Routine</span>
                  </div>
                  <span className="text-sm font-bold">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Follow-up</span>
                  </div>
                  <span className="text-sm font-bold">10</span>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full border-slate-700 text-black hover:bg-slate-800 hover:text-white rounded-xl" onClick={() => setShowReportModal(true)}>
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold">Create Task</h3>
            <Input placeholder="Nurse name" value={taskForm.nurseName} onChange={(e) => setTaskForm(p => ({ ...p, nurseName: e.target.value }))} />
            <Input placeholder="Patient name" value={taskForm.patientName} onChange={(e) => setTaskForm(p => ({ ...p, patientName: e.target.value }))} />
            <Input placeholder="Due time" value={taskForm.dueTime} onChange={(e) => setTaskForm(p => ({ ...p, dueTime: e.target.value }))} />
            <Input placeholder="Priority (Urgent/Routine/Follow-up)" value={taskForm.priority} onChange={(e) => setTaskForm(p => ({ ...p, priority: e.target.value }))} />
            <Textarea placeholder="Task details" value={taskForm.details} onChange={(e) => setTaskForm(p => ({ ...p, details: e.target.value }))} />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>Cancel</Button>
              <Button onClick={() => { setShowCreateModal(false); showSuccess("Task creation request sent (mock)"); }}>Create</Button>
            </div>
          </div>
        </div>
      )}
      {pendingCompleteId && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold">Confirm Completion</h3>
            <p className="text-sm text-slate-600">Are you sure you want to mark this task as done?</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setPendingCompleteId(null)}>Cancel</Button>
              <Button onClick={() => { handleComplete(pendingCompleteId); setPendingCompleteId(null); }}>Confirm</Button>
            </div>
          </div>
        </div>
      )}
      {showDeleteFor && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-red-600">Delete Task</h3>
            <p className="text-sm text-slate-600">Provide reason for deletion.</p>
            <Textarea placeholder="Reason" value={deleteReason} onChange={(e) => setDeleteReason(e.target.value)} />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => { setShowDeleteFor(null); setDeleteReason(""); }}>Cancel</Button>
              <Button variant="destructive" onClick={() => { setTasks(prev => prev.filter(t => t.id !== showDeleteFor)); setShowDeleteFor(null); setDeleteReason(""); showSuccess("Task deleted"); }}>Confirm Delete</Button>
            </div>
          </div>
        </div>
      )}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-bold">Task Report – April 2026</h3>
            <p>Total Tasks: 42</p>
            <p>Completed: 30</p>
            <p>Pending: 12</p>
            <div>
              <p className="font-semibold">Priority Breakdown</p>
              <p>- Urgent: 8</p><p>- Routine: 24</p><p>- Follow-up: 10</p>
            </div>
            <div>
              <p className="font-semibold">Top Performing Nurse</p>
              <p>- Nurse A (12 tasks completed)</p>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setShowReportModal(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;