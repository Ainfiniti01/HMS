import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stethoscope, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { showSuccess } from "@/utils/toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple mock logic based on email
    let role = 'doctor';
    if (email.includes('admin')) role = 'admin';
    if (email.includes('nurse')) role = 'nurse';
    if (email.includes('pharmacist')) role = 'pharmacist';
    
    localStorage.setItem('hms_user_role', role);
    showSuccess(`Logged in as ${role}`);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 mb-4">
            <Stethoscope className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">MediFlow HMS</h1>
          <p className="text-slate-500">Internal Hospital Management System</p>
        </div>

        <Card className="border-none shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Enter your credentials to access the system</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="doctor@hms.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl h-12"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button type="button" className="text-xs text-blue-600 hover:underline">Forgot password?</button>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl h-12"
                />
              </div>
              <Button type="submit" className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-base font-semibold group">
                Sign In
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="bg-slate-50/50 border-t p-6 flex flex-col gap-2">
            <p className="text-xs text-slate-400 text-center">
              Demo accounts: doctor@hms.com, nurse@hms.com, admin@hms.com, pharmacist@hms.com
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;