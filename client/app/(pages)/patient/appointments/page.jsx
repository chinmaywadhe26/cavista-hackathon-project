import AppointmentCard from "@/components/appointmentCard";
import { hospital } from "lucide-react";
import React from "react";

const appointmentsArray = [
  {
    hospital: "hospital",
    time: "12/12/2021 12:00",
    doctor: "Dr. John Doe",
    index: 0,
  },
  {
    hospital: "hospital",
    time: "12/12/2021 12:00",
    doctor: "Dr. John Doe",
    index: 1,
  },
  {
    hospital: "hospital",
    time: "12/12/2021 12:00",
    doctor: "Dr. John Doe",
    index: 2,
  },
  {
    hospital: "hospital",
    time: "12/12/2021 12:00",
    doctor: "Dr. John Doe",
    index: 3,
  },
  {
    hospital: "hospital",
    time: "12/12/2021 12:00",
    doctor: "Dr. John Doe",
    index: 4,
  },
  {
    hospital: "hospital",
    time: "12/12/2021 12:00",
    doctor: "Dr. John Doe",
    index: 5,
  },
  {
    hospital: "hospital",
    time: "12/12/2021 12:00",
    doctor: "Dr. John Doe",
    index: 6,
  },
  {
    hospital: "hospital",
    time: "12/12/2021 12:00",
    doctor: "Dr. John Doe",
    index: 7,
  },
  {
    hospital: "hospital",
    time: "12/12/2021 12:00",
    doctor: "Dr. John Doe",
    index: 8,
  },
];

const Appointments = () => {
  return (
    <div className="w-screen h-dvh px-8 flex flex-col space-y-12 overflow-x-hidden">
      <h1 className="text-3xl font-bold">Appointments</h1>
      <div className="flex w-full h-screen space-x-8">
        <div className="w-1/2 flex flex-col h-3/4 bg-card p-4 text-card-foreground rounded-md border border-slate-300 shadow-md">
          <h1 className="font-semibold">Today Appointment</h1>
          <div className="w-full h-full mt-4 space-y-1 bg-slate-200 rounded-md p-8">
            <h1 className="text-xl font-semibold">Hospital: Forte Hospital</h1>
            <h2 className="text-xl font-semibold">Time: 03/03/2025</h2>
            <h2 className="text-xl font-semibold">Doctor: Dr. K R Reddy</h2>
          </div>
        </div>
        <div className="w-1/2 flex flex-col h-3/4 bg-card p-4 text-card-foreground rounded-md border border-slate-300 shadow-md">
          <h1 className="font-semibold">Upcoming appointments</h1>
          <div className="w-full h-full mt-4 overflow-y-scroll space-y-1 bg-slate-200 rounded-md">
            {appointmentsArray.map((appointment) => (
              <AppointmentCard key={appointment.index} {...appointment} />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col h-3/4 bg-card p-4 text-card-foreground rounded-md border border-slate-300 shadow-md">
        <h1 className="font-semibold">Past appointments</h1>
        <div className="w-full max-h-full mt-4 overflow-y-scroll space-y-1 bg-slate-200 rounded-md">
          {appointmentsArray.map((appointment) => (
            <div
              className="flex space-x-8 h-44 border-b border-slate-300"
              key={appointment.index}>
              <h2>{appointment.date}</h2>
              <h2>{appointment.time}</h2>
              <h2>{appointment.doctor}</h2>
            </div>
          ))}
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default Appointments;
