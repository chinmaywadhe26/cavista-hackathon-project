"use client";
import React from "react";
import { socketInit } from "../../components/socket/index";
import { useEffect, useRef, useState } from "react";
export default function page() {
    const [clients, setClients] = useStateWithCallback([]);
	const videoElements = useRef({});
	const connections = useRef({});
	const socket = useRef(null);
	const videoSocket = useRef(null);
	const localMediaStream = useRef(null);
	const videoContext = useRef(new AudioContext());
	const videoElement = useRef(new Audio());
	const videoStream = useRef(null);
	const clientsRef = useRef(null);

  
    useEffect(() => {
        socket.current = socketInit();
        return ()->{
            socket.current.disconnect();
        }
    },[]);
    const addNewClient = useCallback(
		(newClient, cb) => {
			const lookingFor = clients.find((client) => client.id === newClient.id);

			if (lookingFor === undefined) {
				setClients((existingClients) => [...existingClients, newClient], cb);
			}
		},
		[clients, setClients],
	);
    useEffect(() => {
		console.log("render clientsRef.current = clients", 3);
		clientsRef.current = clients;
	}, [clients]);

    useEffect(() => {
		console.log("render startCapture", 4);

		const startCapture = async () => {
			try {
				
				localMediaStream.current = await navigator.mediaDevices.getUserMedia({
					audio: true,
                    video:true,
				});

			} catch (error) {
				console.error("Error capturing audio stream:", error);
				return;
			}
		};

		const emitJoin = () => {
			console.log("Emitting join actions");
			socket.current.emit(ACTIONS.JOIN, {
				roomId,
				user,
			});
			
		};
		const finalizeJoin = () => {
			console.log("render startCapture then", 5);
			
			addNewClient({ ...user, muted: true }, () => {
				console.log("render add new client me", 6, typeof user.id);
				const localElement = videoElements.current[user.id];
				if (localElement) {
					localElement.volume = 1;
					localElement.srcObject = localMediaStream.current;
				}
			});

			
				emitJoin();
			
		};
		startCapture().then(finalizeJoin()); // Leaving the room
		return () => {
			if (localMediaStream.current) {
				localMediaStream.current.getTracks().forEach((track) => track.stop());
			}
			socket.current.emit(ACTIONS.LEAVE, { roomId });
			
		};
	}, []);

    useEffect(() => {
		console.log("render handle new peer useEffect", 8);
		const handleNewPeer = async ({ peerId, createOffer, user: remoteUser }) => {
			// If already connected then prevent connecting again
			console.log("Connections: ", connections.current);
			console.log("render inside handle new peer", remoteUser);
			console.log("peerID", peerId);
			if (peerId in connections.current) {
				return console.warn(
					`You are already connected with ${peerId} (${user.name})`,
				);
			}

			// Store it to connections
			const iceServers = [
				...freeice(),
				{
					urls: "turn:relay1.expressturn.com:3478",
					username: "efRP4CLC6TNZZ0JZ74",
					credential: "1N0fOLTsrfVihnyN",
				},
			];
			connections.current[peerId] = new RTCPeerConnection({
				iceServers,
			});

			console.log("RTCPeerConnection created:", connections.current[peerId]);
			// Handle new ice candidate on this peer connection
			connections.current[peerId].onicecandidate = (event) => {
				console.log("onice");
				socket.current.emit(ACTIONS.RELAY_ICE, {
					peerId,
					icecandidate: event.candidate,
				});
				
			};

			// Handle on track event on this connection
			connections.current[peerId].ontrack = (e) => {
				// Check if remoteUser is defined before proceeding
				console.log("oontrack event: ", e);
				const remoteStream = e.streams[0];
				if (!remoteUser || !remoteUser.id) {
					console.error("remoteUser or remoteUser.id is undefined", remoteUser);
					return; // Exit the function if remoteUser is not defined
				}
				console.log("Inside ontrack");
				// Proceed to add the new client if remoteUser is defined
				addNewClient({ ...remoteUser, muted: true }, () => {
					console.log(
						"render add new client remote",
						9,
						"for user:",
						remoteUser.id,
					);
					console.log("audioElements: ", videoElements.current);
				
						if (videoElements.current[remoteUser.id]) {
							videoElements.current[remoteUser.id].srcObject = e.streams[0];

							console.log("remoteStream 3", e.streams[0]);
						} else {
							let settled = false;
							const interval = setInterval(() => {
								if (videoElements.current[remoteUser.id]) {
									videoElements.current[remoteUser.id].srcObject = e.streams[0];
									console.log("remoteStream 4", e.streams[0]);
									settled = true;
								}

								if (settled) {
									clearInterval(interval);
								}
							}, 300);
						}
					
				});
			};

			console.log("Local media stream tracks:", localMediaStream.current);
			

				if (localMediaStream.current) {
					localMediaStream.current.getTracks().forEach((track) => {
						connections.current[peerId].addTrack(
							track,
							localMediaStream.current,
						);
					});
				}
			}
			console.log("connections:", connections.current);
			// Create an offer if required
			if (createOffer) {
				console.log("Inside offer");
				const offer = await connections.current[peerId].createOffer();

				// Set as local description
				await connections.current[peerId].setLocalDescription(offer);

				// send offer to the server
				socket.current.emit(ACTIONS.RELAY_SDP, {
					peerId,
					sessionDescription: offer,
				});
				
			
		};

		// Listen for add peer event from ws
		socket.current.on(ACTIONS.ADD_PEER, handleNewPeer);
		

		return () => {
			socket.current.off(ACTIONS.ADD_PEER);
			
		};
	}, []);

    useEffect(() => {
		console.log("render handle ice candidate out", 10);
		socket.current.on(ACTIONS.ICE_CANDIDATE, ({ peerId, icecandidate }) => {
			if (icecandidate) {
				connections.current[peerId].addIceCandidate(icecandidate);
			}
		});
		

		return () => {
			socket.current.off(ACTIONS.ICE_CANDIDATE);
			
		};
	}, []);

	// Handle session description

	useEffect(() => {
		console.log("render set remote media", 11);
		const setRemoteMedia = async ({
			peerId,
			sessionDescription: remoteSessionDescription,
		}) => {
			connections.current[peerId].setRemoteDescription(
				new RTCSessionDescription(remoteSessionDescription),
			);

			// If session descrition is offer then create an answer
			if (remoteSessionDescription.type === "offer") {
				const connection = connections.current[peerId];

				const answer = await connection.createAnswer();
				connection.setLocalDescription(answer);

				socket.current.emit(ACTIONS.RELAY_SDP, {
					peerId,
					sessionDescription: answer,
				});
				
			}
		};

		socket.current.on(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia);
		
		return () => {
			socket.current.off(ACTIONS.SESSION_DESCRIPTION);
			
		};
	}, []);

    useEffect(() => {
		console.log("render handle remove peer out", 12);
		const handleRemovePeer = ({ peerId, userId }) => {
			console.log("render inside handle remove peer out", 13);
			// Correction: peerID to peerId
			if (connections.current[peerId]) {
				connections.current[peerId].close();
			}

			delete connections.current[peerId];
			delete videoElements.current[peerId];
			setClients((list) => list.filter((c) => c.id !== userId));
		};

		socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);
		
		return () => {
			for (let peerId in connections.current) {
				connections.current[peerId].close();
				delete connections.current[peerId];
				delete videoElements.current[peerId];
				console.log("removing", connections.current);
			}
			socket.current.off(ACTIONS.REMOVE_PEER);
			if (owner) videoSocket.current.off(ACTIONS.REMOVE_PEER);
		};
	}, []);


  return (
  <>
   <video ref={localVideoRef} autoPlay></video>
   <video ref={remoteVideoRef} autoPlay></video>
  </>
  );
}