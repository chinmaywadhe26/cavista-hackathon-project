"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
    // Simulating bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "Hello! How can I help?", sender: "bot" },
      ]);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg">
      <CardContent className="p-4 flex flex-col h-96">
        <ScrollArea className="flex-1 overflow-auto p-2 flex flex-col gap-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex w-full ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}>
              <div
                className={`mb-2 p-2 rounded-lg max-w-xs ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="flex gap-2 mt-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage} className="p-2">
            <Send size={20} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatWindow;
