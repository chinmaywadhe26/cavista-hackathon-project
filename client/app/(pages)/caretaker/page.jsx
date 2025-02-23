"use client";
import React, { useEffect, useState } from "react";
import { Users, Star } from "lucide-react";
import PatientModal from "@/components/PatientModal";
import PatientCard from "@/components/PatientCard";
import useAuthStore from "@/store/useAuthStore";

const mockCaretaker = {
  username: "dr.smith",
  email: "dr.smith@example.com",
  rating: 4.8,
  patients: [
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      guardianEmail: "guardian1@example.com",
      lastCheckup: "2024-03-10",
      symptoms: {
        painLevels: 3,
        mobilityIssues: 2,
        fatigue: 4,
        appetiteWeight: 2,
        memoryIssue: 1,
        confusionDisorientation: 2,
        moodSwings: 3,
        sleepPatterns: 4,
        breathingProblems: 1,
        tremorsShaking: 2,
        numbnessTingling: 3,
        frequencyOfUrination: 2,
      },
    },
    {
      id: 2,
      username: "jane_smith",
      email: "jane@example.com",
      guardianEmail: "guardian2@example.com",
      lastCheckup: "2024-03-12",
      symptoms: {
        painLevels: 2,
        mobilityIssues: 1,
        fatigue: 3,
        appetiteWeight: 1,
        memoryIssue: 2,
        confusionDisorientation: 1,
        moodSwings: 2,
        sleepPatterns: 3,
        breathingProblems: 1,
        tremorsShaking: 1,
        numbnessTingling: 2,
        frequencyOfUrination: 1,
      },
    },
  ],
};

function caretaker() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [caretaker,setCaretaker] = useState(null);
  const [patients, setPatients] = useState([]);
  const user = useAuthStore((state)=>state.user);
  useEffect(() => {
      const fetchPatients = async () => {
        const response = await fetch("http://localhost:5000/getUsers");
        const data = await response.json();
        setPatients(data.users);
      };
      fetchPatients();
      console.log(patients);
    },[]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">
                Caretaker Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="font-semibold">{mockCaretaker.rating}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {mockCaretaker.username}
                </p>
                <p className="text-sm text-gray-500">{mockCaretaker.email}</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900">Your Patients</h2>
          <p className="text-gray-600">
            Managing {mockCaretaker.patients.length} patients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map((patient) => (
            <PatientCard
              key={patient._id}
              patient={patient}
              onClick={() => setSelectedPatient(patient)}
            />
          ))}
        </div>
      </main>
      {selectedPatient && (
        <PatientModal
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}
    </div>
  );
}

export default caretaker;
