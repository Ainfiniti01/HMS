import { Patient, User, MedicalEntry, HospitalTask, Prescription } from "@/types/hms";

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Dr. Sarah Smith', email: 'doctor@hms.com', role: 'doctor', specialty: 'Cardiology' },
  { id: 'u2', name: 'Nurse John Doe', email: 'nurse@hms.com', role: 'nurse' },
  { id: 'u3', name: 'Admin User', email: 'admin@hms.com', role: 'admin' },
  { id: 'u4', name: 'Pharma Mike', email: 'pharmacist@hms.com', role: 'pharmacist' },
  { id: 'u5', name: 'Receptionist Jane', email: 'receptionist@hms.com', role: 'receptionist' },
];

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'P001',
    name: 'Robert Johnson',
    age: 45,
    gender: 'Male',
    familyId: 'FAM-101',
    condition: 'Hypertension',
    contact: '+1 234 567 890',
    bloodGroup: 'A+',
    lastVisit: '2024-03-15',
    billingSummary: { total: 1250, paid: 1000, pending: 250 }
  },
  {
    id: 'P002',
    name: 'Emily Davis',
    age: 28,
    gender: 'Female',
    familyId: 'FAM-102',
    condition: 'Type 2 Diabetes',
    contact: '+1 234 567 891',
    bloodGroup: 'O-',
    lastVisit: '2024-03-18',
    billingSummary: { total: 800, paid: 800, pending: 0 }
  },
  {
    id: 'P003',
    name: 'Michael Brown',
    age: 62,
    gender: 'Male',
    familyId: 'FAM-101',
    condition: 'Post-Op Recovery',
    contact: '+1 234 567 892',
    bloodGroup: 'B+',
    lastVisit: '2024-03-20',
    billingSummary: { total: 5400, paid: 3000, pending: 2400 }
  }
];

export const MOCK_HISTORY: MedicalEntry[] = [
  {
    id: 'H1',
    patientId: 'P001',
    date: '2024-03-15 10:30 AM',
    doctorId: 'u1',
    doctorName: 'Dr. Sarah Smith',
    complaint: 'Persistent headaches and dizziness for 3 days.',
    observation: 'Blood pressure 160/100. Patient appears fatigued.',
    diagnosis: 'Stage 2 Hypertension',
    treatment: 'Prescribed Lisinopril 10mg daily. Advised low sodium diet.',
    notes: 'Patient needs to monitor BP at home twice daily.'
  }
];

export const MOCK_TASKS: HospitalTask[] = [
  {
    id: 'T1',
    patientId: 'P001',
    patientName: 'Robert Johnson',
    assignedTo: 'u2',
    assignedBy: 'u1',
    description: 'Check blood pressure every 4 hours and record.',
    status: 'pending',
    dueTime: '2024-03-21 14:00',
    createdAt: '2024-03-21 08:00'
  },
  {
    id: 'T2',
    patientId: 'P003',
    patientName: 'Michael Brown',
    assignedTo: 'u2',
    assignedBy: 'u1',
    description: 'Administer post-op pain medication.',
    status: 'completed',
    dueTime: '2024-03-21 10:00',
    createdAt: '2024-03-21 07:30'
  }
];

export const MOCK_PRESCRIPTIONS: Prescription[] = [
  {
    id: 'RX1',
    patientId: 'P001',
    doctorId: 'u1',
    date: '2024-03-15',
    medications: [
      { name: 'Lisinopril', dosage: '10mg', instructions: 'Once daily in the morning' },
      { name: 'Amlodipine', dosage: '5mg', instructions: 'Once daily at night' }
    ]
  }
];