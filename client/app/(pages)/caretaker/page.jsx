"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const caretaker = () => {
  const [patients, setPatients] = useState([
    { id: 1, name: "Chad ", consultDoctor: false, callDone: false },
    { id: 2, name: "john", consultDoctor: true, callDone: false },
    { id: 3, name: "hari ", consultDoctor: false, callDone: false },
    { id: 4, name: "chad ", consultDoctor: true, callDone: false },
    // Add more patients as needed
  ]);

  const handleRowClick = (id) => {
    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient.id === id
          ? { ...patient, callDone: !patient.callDone }
          : patient
      )
    );
  };

  const handleRadioChange = (id, value) => {
    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient.id === id ? { ...patient, consultDoctor: value } : patient
      )
    );
  };

  return (
    <div className="flex flex-col w-screen">
      <div className="w-1/2 h-60 rounded-xl m-9 bg-blue-300 flex flex-col justify-between">
        <div className="h-1/2 rounded-xl">
          <h3 className="text-xl ml-6 mt-2">Good morning, caretaker name</h3>
          <p className="text-2xl ml-6 font-semibold">Calls for today</p>
          <p className="text-4xl ml-6 font-semibold">66</p>
        </div>
        <div className="rounded-xl h-1/2 flex items-center gap-4">
          <div className="w-40 bg-blue-200 h-3/4 ml-4 rounded-xl flex flex-col justify-between p-4">
            <div className="text-xl">
              <p>New patients</p>
            </div>
            <div className="">
              <p className="text-2xl">6</p>
            </div>
          </div>
          <div className="w-40 bg-blue-200 h-3/4 rounded-xl flex flex-col justify-between p-4">
            <div className="">
              <p className="text-xl">Old patients</p>
            </div>
            <div>
              <p className="text-2xl">6</p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-lvh rounded-xl m-9 bg-slate-400 p-4">
        <h3 className="text-xl m-2 font-semibold">Patient data</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Sr.no</TableHead>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead className="w-[100px]">Consult Doctor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient, index) => (
              <TableRow
                key={patient.id}
                className={patient.callDone ? "bg-green-200" : ""}
                onClick={() => handleRowClick(patient.id)}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>
                  <label>
                    <input
                      type="radio"
                      name={`consultDoctor-${patient.id}`}
                      checked={patient.consultDoctor === true}
                      onChange={() => handleRadioChange(patient.id, true)}
                    />
                    Yes
                  </label>
                  <label className="ml-2">
                    <input
                      type="radio"
                      name={`consultDoctor-${patient.id}`}
                      checked={patient.consultDoctor === false}
                      onChange={() => handleRadioChange(patient.id, false)}
                    />
                    No
                  </label>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default caretaker;
