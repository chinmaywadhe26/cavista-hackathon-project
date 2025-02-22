"use client";
import CallCard from "../../../components/ui/CallCard";
import React, { useState, useEffect } from "react";

const callsArray = [
  {
    patient: "John Doe",
    time: "2025-12-12T10:00:00Z",
    index: 0,
  },
  {
    patient: "Jane Smith",
    time: "2025-12-12T11:00:00Z",
    index: 1,
  },
  {
    patient: "Michael Johnson",
    time: "2025-12-12T13:00:00Z",
    index: 2,
  }
];

const CaretakerCalls = () => {
  const [currentCall, setCurrentCall] = useState(null);
  const [upcomingCalls, setUpcomingCalls] = useState([]);
  const [pastCalls, setPastCalls] = useState([]);

  useEffect(() => {
    const now = new Date();
    const sortedCalls = callsArray.sort((a, b) => new Date(a.time) - new Date(b.time));
    
    const past = [];
    const upcoming = [];
    let current = null;

    sortedCalls.forEach(call => {
      const callTime = new Date(call.time);
      if (callTime < now) {
        past.push(call);
      } else if (!current) {
        current = call;
      } else {
        upcoming.push(call);
      }
    });

    setCurrentCall(current);
    setUpcomingCalls(upcoming);
    setPastCalls(past);
  }, []);

  return (
    <div className="w-screen h-dvh px-8 flex flex-col overflow-x-hidden">
      <h1 className="text-3xl font-bold">Scheduled Calls</h1>
      <div className="flex w-full h-3/4 mt-8 space-x-8">
        <div className="w-1/2 flex flex-col h-full bg-card p-4 text-card-foreground rounded-md border border-slate-300 shadow-md">
          <h1 className="font-semibold">Today's Calls</h1>
          {currentCall ? (
            <div className="w-full h-full mt-4 space-y-1 bg-slate-200 rounded-md p-8">
              <h1 className="text-xl font-semibold">Patient: {currentCall.patient}</h1>
              <h2 className="text-xl font-semibold">Time: {new Date(currentCall.time).toLocaleTimeString()}</h2>
              {/* button on click goes to a page where video call and right mai form */}
            </div>
          ) : (
            <p className="text-gray-500">No calls scheduled for now.</p>
          )}
        </div>
        <div className="w-1/2 flex flex-col h-full bg-card p-4 text-card-foreground rounded-md border border-slate-300 shadow-md">
          <h1 className="font-semibold">Upcoming Calls</h1>
          <div className="w-full h-full mt-4 overflow-y-scroll space-y-1 bg-slate-200 rounded-md">
            {upcomingCalls.length > 0 ? (
              upcomingCalls.map((call) => <CallCard key={call.index} {...call} />)
            ) : (
              <p className="text-gray-500 p-4">No upcoming calls.</p>
            )}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col mt-8 h-3/4 bg-card p-4 text-card-foreground rounded-md border border-slate-300 shadow-md">
        <h1 className="font-semibold">Past Calls</h1>
        <div className="w-full h-full mt-4 overflow-y-scroll space-y-1 bg-slate-200 rounded-md">
          {pastCalls.length > 0 ? (
            pastCalls.map((call) => <CallCard key={call.index} {...call} />)
          ) : (
            <p className="text-gray-500 p-4">No past calls.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaretakerCalls;
