"use client";

import ChatWindow from "@/components/chatwindow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const Chat = () => {
  const [videoRequest, setVideoRequest] = useState("");

  const handleRequest = () => {
    if (videoRequest.trim() !== "") {
      alert(`Video chat request sent: ${videoRequest}`);
      setVideoRequest("");
    }
  };

  return (
    <div className="grid grid-cols-2 grid-rows-1 w-screen p-6 bg-background text-foreground">
      <div className="col-span-1 row-span-1 flex items-center justify-center">
        <div className="flex flex-col space-y-4">
          <h1>Request a Video Chat</h1>
          <Input
            placeholder="Enter your request"
            value={videoRequest}
            onChange={(e) => setVideoRequest(e.target.value)}
          />
          <Button onClick={handleRequest}>Request</Button>
        </div>
      </div>
      <div className="col-span-1 row-span-1 h-full flex-col flex items-center justify-center">
        <h1 className="font-bold text-3xl mb-8">Chat with the Caretaker</h1>
        <ChatWindow />
      </div>
    </div>
  );
};

export default Chat;
