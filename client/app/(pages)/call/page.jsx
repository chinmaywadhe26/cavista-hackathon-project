'use client';
import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

const Page = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [localPeerConnection, setLocalPeerConnection] = useState(null);
  const [remotePeerConnection, setRemotePeerConnection] = useState(null);
  const [incomingCall, setIncomingCall] = useState(false);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const startButtonRef = useRef(null);
  const hangupButtonRef = useRef(null);
  const answerButtonRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    const startButton = startButtonRef.current;
    const hangupButton = hangupButtonRef.current;
    const answerButton = answerButtonRef.current;

    startButton.addEventListener('click', initiateCall);
    hangupButton.addEventListener('click', hangupCall);
    answerButton.addEventListener('click', answerCall);

    socketRef.current = io('http://localhost:3000');
    socketRef.current.on('incomingCall', handleIncomingCall);
    socketRef.current.on('offer', handleOffer);
    socketRef.current.on('answer', handleAnswer);
    socketRef.current.on('candidate', handleCandidate);
    socketRef.current.on('end', handleEnd);

    return () => {
      startButton.removeEventListener('click', initiateCall);
      hangupButton.removeEventListener('click', hangupCall);
      answerButton.removeEventListener('click', answerCall);
      socketRef.current.disconnect();
    };
  }, []);

  const initiateCall = () => {
    socketRef.current.emit('call', { message: 'Incoming call' });
    startCall();
  };

  const startCall = () => {
    const startButton = startButtonRef.current;
    const hangupButton = hangupButtonRef.current;
    const localVideo = localVideoRef.current;
    const remoteVideo = remoteVideoRef.current;

    startButton.disabled = true;
    hangupButton.disabled = false;

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        setLocalStream(stream);
        localVideo.srcObject = stream;

        const localPC = new RTCPeerConnection();
        setLocalPeerConnection(localPC);

        stream.getTracks().forEach(track => {
          localPC.addTrack(track, stream);
        });

        localPC.createOffer()
          .then(offer => {
            localPC.setLocalDescription(offer);
            signal('offer', offer);
          })
          .catch(error => {
            console.error('Error creating offer:', error);
          });

        const remotePC = new RTCPeerConnection();
        setRemotePeerConnection(remotePC);

        remotePC.ontrack = event => {
          setRemoteStream(event.streams[0]);
          remoteVideo.srcObject = event.streams[0];
        };

        localPC.onicecandidate = event => {
          if (event.candidate) {
            signal('candidate', event.candidate);
          }
        };

        remotePC.onicecandidate = event => {
          if (event.candidate) {
            signal('candidate', event.candidate);
          }
        };
      })
      .catch(error => {
        console.error('Error accessing media devices:', error);
      });
  };

  const answerCall = () => {
    setIncomingCall(false);
    startCall();
  };

  const hangupCall = () => {
    const startButton = startButtonRef.current;
    const hangupButton = hangupButtonRef.current;
    const localVideo = localVideoRef.current;
    const remoteVideo = remoteVideoRef.current;

    localPeerConnection.close();
    remotePeerConnection.close();
    setLocalPeerConnection(null);
    setRemotePeerConnection(null);
    startButton.disabled = false;
    hangupButton.disabled = true;
    localVideo.srcObject = null;
    remoteVideo.srcObject = null;

    signal('end', 'hang-up');
  };

  const signal = (eventName, data) => {
    socketRef.current.emit(eventName, data);
  };

  const handleIncomingCall = (data) => {
    setIncomingCall(true);
  };

  const handleOffer = (offer) => {
    const remotePC = new RTCPeerConnection();
    setRemotePeerConnection(remotePC);

    remotePC.setRemoteDescription(new RTCSessionDescription(offer));
    remotePC.createAnswer()
      .then(answer => {
        remotePC.setLocalDescription(answer);
        signal('answer', answer);
      })
      .catch(error => {
        console.error('Error creating answer:', error);
      });

    remotePC.ontrack = event => {
      setRemoteStream(event.streams[0]);
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    remotePC.onicecandidate = event => {
      if (event.candidate) {
        signal('candidate', event.candidate);
      }
    };
  };

  const handleAnswer = (answer) => {
    localPeerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  };

  const handleCandidate = (candidate) => {
    const iceCandidate = new RTCIceCandidate(candidate);
    if (localPeerConnection) {
      localPeerConnection.addIceCandidate(iceCandidate);
    } else if (remotePeerConnection) {
      remotePeerConnection.addIceCandidate(iceCandidate);
    }
  };

  const handleEnd = () => {
    hangupCall();
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

export default Page;
