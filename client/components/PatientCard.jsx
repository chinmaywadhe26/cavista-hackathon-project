import React from "react";
import { UserRound, Mail, Clock } from "lucide-react";

function PatientCard({ patient, onClick }) {
  const activeSymptoms = Object.values(patient?.symptomHistory).filter(
    (value) => value >= 3
  ).length;

  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <UserRound className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{patient.username}</h3>
          <p className="text-gray-600 text-sm">{patient.email}</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-600">
          <Mail className="w-4 h-4" />
          <span className="text-sm">Guardian: {patient.guardianEmail}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span className="text-sm">Last Checkup: {patient.lastCheckup}</span>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {activeSymptoms} Active Symptoms
          </span>
        </div>
      </div>
    </div>
  );
}

export default PatientCard;
