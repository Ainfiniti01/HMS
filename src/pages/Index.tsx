import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stethoscope, Loader2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const role = localStorage.getItem('hms_user_role');
      if (role) {
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="text-center space-y-6 animate-pulse">
        <div className="inline-flex items-center justify-center p-4 bg-blue-600 rounded-3xl shadow-xl shadow-blue-200">
          <Stethoscope className="text-white" size={48} />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">MediFlow HMS</h1>
          <p className="text-slate-500 text-lg">Initializing secure hospital environment...</p>
        </div>
        <div className="flex justify-center">
          <Loader2 className="text-blue-600 animate-spin" size={32} />
        </div>
      </div>
    </div>
  );
};

export default Index;