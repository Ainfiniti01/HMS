export type UserRole = 'admin' | 'doctor' | 'nurse' | 'pharmacist' | 'receptionist';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  specialty?: string;
  avatar?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  familyId: string;
  condition: string;
  contact: string;
  bloodGroup: string;
  lastVisit: string;
  billingSummary: {
    total: number;
    paid: number;
    pending: number;
  };
}

export interface MedicalEntry {
  id: string;
  patientId: string;
  date: string;
  doctorId: string;
  doctorName: string;
  complaint: string;
  observation: string;
  diagnosis: string;
  treatment: string;
  notes: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  medications: {
    name: string;
    dosage: string;
    instructions: string;
  }[];
}

export interface HospitalTask {
  id: string;
  patientId: string;
  patientName: string;
  assignedTo: string; // Nurse ID
  assignedBy: string; // Doctor ID
  description: string;
  status: 'pending' | 'completed';
  dueTime: string;
  createdAt: string;
}