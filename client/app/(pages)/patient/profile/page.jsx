import React from "react";

const Profile = () => {
  return (
    <div className="w-lvw h-dvh px-8 flex flex-col space-y-12 overflow-hidden">
      <div className="flex p-8 space-x-8 rounded-md border border-slate-500 shadow-md bg-card items-center h-52 text-card-foreground">
        <div className="rounded-full basis-1/4 bg-blue-200 h-full text-center content-center">
          Pic
        </div>
        <div className="flex flex-col space-y-4 basis-3/4">
          <h1 className="font-bold text-2xl text-foreground">John Doe</h1>
          <div className="flex space-x-8 font-medium">
            <h2>DOB: 15/02/2004 </h2>
            <h2>Gender: Male</h2>
            <h2>Phone: 0987654321</h2>
            <h2>Email: xyz@gmail.com</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
