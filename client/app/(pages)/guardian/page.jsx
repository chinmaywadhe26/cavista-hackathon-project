"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";

// const Guardian = () => {
//   const [patients, setPatients] = useState([]);
//   const [newPatientEmail, setNewPatientEmail] = useState("");
//   const [guardianEmail, setGuardianEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchPatients = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("/api/guardian/patients", {
//           params: { guardianEmail: "guardian@example.com" } // Replace with actual guardian email
//         });
//         setPatients(response.data);
//       } catch (error) {
//         setError("Failed to fetch patients");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPatients();
//   }, []);

//   const handleAddPatient = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const response = await axios.post("/api/guardian/addUser", {
//         userEmail: newPatientEmail,
//         guardianEmail: guardianEmail,
//       });
//       setPatients([...patients, response.data]);
//       setNewPatientEmail("");
//       setGuardianEmail("");
//     } catch (error) {
//       setError("Failed to add patient");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Guardian Dashboard</h1>

//       <form onSubmit={handleAddPatient} className="mb-6">
//         <h2 className="text-xl font-semibold mb-2">Add a New Patient</h2>
//         <div className="mb-2">
//           <label className="block mb-1">Patient Email:</label>
//           <input
//             type="email"
//             value={newPatientEmail}
//             onChange={(e) => setNewPatientEmail(e.target.value)}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <div className="mb-2">
//           <label className="block mb-1">Guardian Email (optional):</label>
//           <input
//             type="email"
//             value={guardianEmail}
//             onChange={(e) => setGuardianEmail(e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
//         >
//           {loading ? "Adding..." : "Add Patient"}
//         </button>
//       </form>

//       {error && <p className="text-red-500">{error}</p>}

//       <h2 className="text-xl font-semibold mb-2">Patients Under Your Supervision</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : patients.length > 0 ? (
//         <ul className="list-disc pl-5">
//           {patients.map((patient) => (
//             <li key={patient._id} className="mb-1">
//               {patient.email} - {patient.name || "No Name"}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No patients found.</p>
//       )}
//     </div>
//   );
// };

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const Guardian = () => {
  const [patients, setPatients] = useState([]);
  const [newPatientEmail, setNewPatientEmail] = useState("");
  const [guardianEmail, setGuardianEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Dummy JSON data for patients
  const dummyPatients = [
    { _id: "1", email: "patient1@example.com", name: "John Doe" },
    { _id: "2", email: "patient2@example.com", name: "Jane Smith" },
    { _id: "3", email: "patient3@example.com", name: "Alice Johnson" },
  ];

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setPatients(dummyPatients);
      } catch (error) {
        setError("Failed to fetch patients");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleAddPatient = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newPatient = {
        _id: String(patients.length + 1),
        email: newPatientEmail,
        name: "New Patient",
      };
      setPatients([...patients, newPatient]);
      setNewPatientEmail("");
      setGuardianEmail("");
    } catch (error) {
      setError("Failed to add patient");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-8">
          Guardian Dashboard
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8"
        >
          <form onSubmit={handleAddPatient}>
            <h2 className="text-2xl font-light text-gray-800 mb-6">Add a New Patient</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patient Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    value={newPatientEmail}
                    onChange={(e) => setNewPatientEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all duration-200 outline-none"
                    required
                    placeholder="patient@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Guardian Email (optional)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    value={guardianEmail}
                    onChange={(e) => setGuardianEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all duration-200 outline-none"
                    placeholder="guardian@example.com"
                  />
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gray-900 text-white py-2 px-4 rounded-xl hover:bg-gray-800 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed mt-4"
              >
                {loading ? (
                  <span className="inline-flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </span>
                ) : (
                  "Add Patient"
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 text-red-500 p-4 rounded-xl mb-6"
          >
            {error}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-2xl font-light text-gray-800 mb-6">
            Patients Under Your Supervision
          </h2>
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <svg className="animate-spin h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : patients.length > 0 ? (
            <div className="space-y-3">
              {patients.map((patient) => (
                <motion.div
                  key={patient._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{patient.name}</h3>
                      <p className="text-sm text-gray-500">{patient.email}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No patients found.</p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Guardian;
