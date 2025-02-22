"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import io from "socket.io-client";

const call = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [localPeerConnection, setLocalPeerConnection] = useState(null);
  const [remotePeerConnection, setRemotePeerConnection] = useState(null);
  //const [incomingCall, setIncomingCall] = useState(false);
  //const videContext =useContext(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const startButtonRef = useRef(null);
  const hangupButtonRef = useRef(null);
  //const videoElement = useRef(null);
  const answerButtonRef = useRef(null);
  const socketRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const startButton = startButtonRef.current;
    const hangupButton = hangupButtonRef.current;
    const answerButton = answerButtonRef.current;

    startButton.addEventListener("click", initiateCall);
    hangupButton.addEventListener("click", hangupCall);
    answerButton.addEventListener("click", answerCall);

    socketRef.current = io("http://localhost:3000");

    return () => {
      startButton.removeEventListener("click", initiateCall);
      hangupButton.removeEventListener("click", hangupCall);
      answerButton.removeEventListener("click", answerCall);
      socketRef.current.disconnect();
    };
  }, []);

  const initiateCall = () => {
    //emit socket to backend to initiate call
    startCall();
  };

  const startCall = () => {
    const startButton = startButtonRef.current;
    const hangupButton = hangupButtonRef.current;
    const localVideo = localVideoRef.current;
    const remoteVideo = remoteVideoRef.current;

    startButton.disabled = true;
    hangupButton.disabled = false;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
        localVideo.srcObject = stream;

        const localPC = new RTCPeerConnection();
        setLocalPeerConnection(localPC);

        stream.getTracks().forEach((track) => {
          localPC.addTrack(track, stream);
        });

        localPC
          .createOffer()
          .then((offer) => {
            localPC.setLocalDescription(offer);
            //emit socket to backend for creating offer
          })
          .catch((error) => {
            console.error("Error creating offer:", error);
          });

        //hanle additon of new peer
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
      });
  };

  const answerCall = () => {
    startCall();
  };

  const hangupCall = () => {
    const startButton = startButtonRef.current;
    const hangupButton = hangupButtonRef.current;
    const localVideo = localVideoRef.current;
    const remoteVideo = remoteVideoRef.current;

    //localPeerConnection.close();
    //remotePeerConnection.close();
    setLocalPeerConnection(null);
    setRemotePeerConnection(null);
    startButton.disabled = false;
    hangupButton.disabled = true;
    localVideo.srcObject = null;
    remoteVideo.srcObject = null;
    router.push("/profile");
    //emit socket to backend or ending the call
  };

  const handleIncomingCall = (data) => {
    //handle incoming call
  };

  const handleOffer = () => {
    //handle offer functionality
  };

  const handleAnswer = () => {
    //handle answer functionality
  };

  const handleEnd = () => {
    hangupCall();
  };

  const handleCandidate = () => {
    //handle candidate functionality
  };

  return (
    <>
      <video ref={localVideoRef} autoPlay></video>
      <video ref={remoteVideoRef} autoPlay></video>
      <button ref={startButtonRef}>Start Call</button>
      <button ref={hangupButtonRef}>Hang Up</button>
      <button ref={answerButtonRef}>Answer Call</button>
    </>
  );
};

export default call;
