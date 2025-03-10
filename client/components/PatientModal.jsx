import React from "react";
import { UserRound, X, Mail, Activity, Brain, Moon } from "lucide-react";
import SymptomBar from "./SymptomBar";

function PatientModal({ patient, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <UserRound className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {patient.username}
                </h2>
                <p className="text-gray-600">{patient.email}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  Contact Information
                </h3>
                <p className="text-gray-700">
                  Guardian Email: {patient.guardianEmail}
                </p>
                <p className="text-gray-700">
                  Last Checkup: {patient.date ? patient.date[0] : "N/A"}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  Physical Symptoms
                </h3>
                <SymptomBar
                  label="Pain Levels"
                  value={patient.symptomHistory? patient.symptomHistory.painLevels : 0}
                />
                <SymptomBar
                  label="Mobility Issues"
                  value={patient.symptomHistory? patient.symptomHistory.mobilityIssues : 0}
                />
                <SymptomBar label="Fatigue" value={patient.symptomHistory ? patient.symptomHistory.fatigue : 0} />
                <SymptomBar
                  label="Breathing Problems"
                  value={patient.symptomHistory ? patient.symptomHistory.breathingProblems : 0}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-blue-600" />
                  Cognitive Symptoms
                </h3>
                <SymptomBar
                  label="Memory Issues"
                  value={patient.symptomHistory ? patient.symptomHistory.memoryIssues : 0}
                />
                <SymptomBar
                  label="Confusion/Disorientation"
                  value={patient.symptomHistory ? patient.symptomHistory.confusionDisorientation : 0}
                />
                <SymptomBar
                  label="Mood Swings"
                  value={patient.symptomsymptomHistory ? patient.symptomHistory.moodSwings : 0}
                />
                <SymptomBar
                  label="Tremors/Shaking"
                  value={patient.symptomHistory ? patient.symptomHistory.tremorsShaking : 0}
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Moon className="w-5 h-5 text-blue-600" />
                  Other Symptoms
                </h3>
                <SymptomBar
                  label="Sleep Patterns"
                  value={patient.symptomHistory ? patient.symptomHistory.sleepPatterns : 0}
                />
                <SymptomBar
                  label="Appetite/Weight"
                  value={patient.symptomHistory ?   patient.symptomHistory.appetiteWeight : 0}
                />
                <SymptomBar
                  label="Numbness/Tingling"
                  value={patient.symptomHistory ? patient.symptomHistory.numbnessTingling : 0}
                />
                <SymptomBar
                  label="Urination Frequency"
                  value={patient.symptomHistory ? patient.symptomHistory.frequencyOfUrination : 0}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientModal;
