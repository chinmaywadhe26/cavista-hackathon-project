"use client";
import React, { useEffect, useState, useRef } from "react";
import { Users, Star } from "lucide-react";
import PatientModal from "@/components/PatientModal";
import PatientCard from "@/components/PatientCard";
import useAuthStore from "@/store/useAuthStore";
import axios from "axios";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";

const socket = io("http://localhost:3000");

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

function PatientCaretaker() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [caretaker, setCaretaker] = useState(null);
  const router = useRouter();
  let user = useAuthStore((state) => state.email);
  if (user === null) {
    user = {
      mail: "user1.gmail.com",
    };
  }

  useEffect(() => {
    socket.emit("check-active-room");

    socket.on("active-room-status", (status) => {
      setCallActive(status);
    });

    return () => {
      socket.off("active-room-status");
    };
  }, []);

  const startCall = async () => {
    const hashkey = Math.random().toString(36).substring(2, 10);
    const data = {
      user: {
        _id: "67b9fbed3dc288ace677a258",
        email: "user1.gmail.com",
      },
      role: "patient",
      hash: hashkey,
    };

    const response = await fetch("http://localhost:5000/createRoom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    if (response.status < 400) {
      router.push(`/call/${hashkey}`);
    } else {
      console.warn(res.message);
    }
  };

  const joinCall = (room) => {
    router.push(`/call/${room}`);
  };

  useEffect(() => {
    const fetchCaretaker = async () => {
      try {
        const response = await axios.post("http://localhost:5000/getCaretakerForUser", { userId: user.mail });

        if (response.status !== 200) {
          console.error("Failed to fetch caretaker data");
          return;
        }

        setCaretaker(response.data.caretaker);
      } catch (error) {
        console.error("Error fetching caretaker:", error);
      }
    };

    fetchCaretaker();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">Caretaker Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="font-semibold">{mockCaretaker.rating}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{mockCaretaker.username}</p>
                <p className="text-sm text-gray-500">{mockCaretaker.email}</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900">Your Caretaker</h2>
          <p className="text-gray-600">Managing {mockCaretaker.patients.length} Caretaker</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caretaker?.patients.map((patient) => (
            <div key={patient._id} className="flex gap-4 items-center">
              <p>{patient.email}</p>
              <button
                onClick={() => (patient.room ? joinCall(patient.room) : startCall())}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                {patient.room ? "Join Call" : "Start Call"}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

const Room = ({ params }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const router = useRouter();
  const [peerConnection, setPeerConnection] = useState(null);
  const room = params.room;

  useEffect(() => {
    const newPeerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    setPeerConnection(newPeerConnection);

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      stream.getTracks().forEach((track) => newPeerConnection.addTrack(track, stream));
    });

    newPeerConnection.ontrack = (event) => {
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
    };

    newPeerConnection.onicecandidate = (event) => {
      if (event.candidate) socket.emit("ice-candidate", { room, candidate: event.candidate });
    };

    socket.emit("join-room", room);

    socket.on("user-joined", async () => {
      if (!peerConnection) return;
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      socket.emit("offer", { room, offer });
    });

    socket.on("offer", async (offer) => {
      if (!peerConnection) return;
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      socket.emit("answer", { room, answer });
    });

    socket.on("answer", async (answer) => {
      if (!peerConnection) return;
      await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on("ice-candidate", (candidate) => {
      peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    });

    socket.on("call-ended", () => {
      endCall();
    });

    return () => {
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
      socket.off("call-ended");
    };
  }, []);

  const endCall = async () => {
    if (peerConnection) peerConnection.close();
    socket.emit("end-call", room);
    const response = await fetch("http://localhost:5000/deleteRoom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: "patient", hash: room }),
    });
    const res = await response.json();
    if (response.status < 400) {
      router.push("/call");
    } else {
      console.error(res.message);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex gap-4">
        <video ref={localVideoRef} autoPlay muted className="w-64 h-48 bg-black rounded-lg"></video>
        <video ref={remoteVideoRef} autoPlay className="w-64 h-48 bg-black rounded-lg"></video>
      </div>
      <button onClick={endCall} className="px-4 py-2 bg-red-500 text-white rounded">
        End Call
      </button>
    </div>
  );
};

export default Room;


