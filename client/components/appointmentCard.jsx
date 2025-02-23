import React from "react";

const AppointmentCard = (appointment) => {
  return (
    <div
      className="flex space-x-8 p-4 h-36 border-b flex-col border-slate-300"
      key={appointment.index}>
      <h2>{appointment.hospital}</h2>
      <h2>{appointment.time}</h2>
      <h2>{appointment.doctor}</h2>
    </div>
  );
};

export default AppointmentCard;
