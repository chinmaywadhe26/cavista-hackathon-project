"use client";

import React, { useEffect, useState } from "react";
  import { useRouter } from "next/navigation";
import { io } from "socket.io-client";


const socket = io("http://localhost:3000"); 






const Call = () => {
  const [callActive, setCallActive] = useState(false);
  const [patients, setPatients] = useState([]);
  const router = useRouter();
  useEffect(() => {
    socket.emit("check-active-room");

    socket.on("active-room-status", (status) => {
      setCallActive(status);
    });

    return () => {
      socket.off("active-room-status");

    };
  }, []);
  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch("http://localhost:5000/getUsers");
      const data = await response.json();
      setPatients(data.users);
    };
    fetchPatients();
  });
  const startCall = async () => {
    const hashkey = Math.random().toString(36).substring(2, 10);
    const data = {
      user:{
        _id:  "67b9c79b4f43b1fad8e52bc5",
        email: "test@gmail.com",
        "password": "$2b$10$K1UqMmcjQenZ0Nh9bNk67uVYBr11RkBntt6IhbkoCsa7ZkDbihZZ.",
        "symptomHistory": [],
        "createdAt": {
          "$date": "2025-02-22T12:48:27.735Z"
        },
        "updatedAt": {
          "$date": "2025-02-22T12:48:27.735Z"
        },
        "__v": 0,
        "username": "test1"
      },
      role:"patient",
      hash:hashkey
      }
    
    const response = await fetch("http://localhost:5000/createRoom", {method:'POST',headers:{'Content-Type': 'application/json'}, body:JSON.stringify(data)});
    const res= await response.json();
    if(response.status<400){
      router.push(`/call/${hashkey}`);
    }
    else{
      console.warn(res.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl mb-4">Video Call App</h1>
     
        <button onClick={startCall} className="px-4 py-2 bg-blue-500 text-white rounded">
          Start Call
        </button>
      
    </div>
  );
};

export default Call;

