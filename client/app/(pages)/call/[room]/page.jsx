'use client'
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

import { useRouter } from "next/navigation";

const socket = io("http://localhost:3000");

const room = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const router = useRouter();
  const [peerConnection, setPeerConnection] = useState(null);
  const room = "video-room"; 

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

  const endCall = async() => {
    if (peerConnection) peerConnection.close();
    socket.emit("end-call", room);
    const resposne = await fetch("http://localhost:5000/deleteRoom", {method:'POST', body:{role, hash:hashkey}});
    const res = await resposne.json();
    if(resposne.status<400){
      router.push("/call");
    }
    else{
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

export default room;
