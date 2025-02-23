
"use client";

import ChatWindow from "@/components/chatwindow";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Mail, Phone, VenusAndMars, Pill } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Link from "next/link";

const Patient = () => {
  return (
    <div className="w-screen min-h-screen px-16 py-8 grid grid-cols-2 gap-x-6 gap-y-8 overflow-auto bg-background text-foreground">
      <Card className="p-6 rounded-lg col-span-2 border border-slate-300 shadow-lg bg-card h-full">
        <CardContent className="flex space-x-6 items-center">
          <div className="w-40 h-40 rounded-full bg-blue-200 flex items-center justify-center"></div>
          <div className="flex flex-col space-y-3 w-full">
            <h1 className="text-3xl font-bold">John Doe</h1>
            <div className="flex flex-wrap gap-6 font-medium">
              {[
                { icon: <Calendar />, text: "15/02/2004" },
                { icon: <VenusAndMars />, text: "Male" },
                { icon: <Phone />, text: "0987654321" },
                { icon: <Mail />, text: "xyz@gmail.com" },
              ].map((item, index) => (
                <h2 key={index} className="flex items-center gap-2 text-lg">
                  {item.icon} {item.text}
                </h2>
              ))}
            </div>
            <div className="flex gap-4 mt-3">
              {[
                { label: "BMI", value: "22.4" },
                { label: "Weight", value: "92 kg" },
                { label: "Height", value: "175 cm" },
                { label: "BP", value: "124/80" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col border border-slate-300 rounded-lg p-3 flex-grow items-center shadow-md">
                  <h1 className="text-xl font-bold">{stat.value}</h1>
                  <h3 className="text-slate-500 text-sm">{stat.label}</h3>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {[
        {
          title: "Medical History",
          content: (
            <Accordion type="single" collapsible>
              <AccordionItem value="diagnosis">
                <AccordionTrigger>Past Diagnoses</AccordionTrigger>
                <AccordionContent>Diabetes, Hypertension</AccordionContent>
              </AccordionItem>
              <AccordionItem value="allergies">
                <AccordionTrigger>Allergies</AccordionTrigger>
                <AccordionContent>Peanuts, Dust</AccordionContent>
              </AccordionItem>
            </Accordion>
          ),
        },
        {
          title: "Today's Appointment",
          content: (
            <div className="bg-slate-100 rounded-lg p-6 shadow-sm h-full flex flex-col justify-center">
              <h1 className="text-xl font-semibold">
                🏥 Hospital: Forte Hospital
              </h1>
              <h2 className="text-lg font-medium">
                📅 Date - Time: 03/03/2025 08:00 AM
              </h2>
              <h2 className="text-lg font-medium">👨‍⚕️ Doctor: Dr. K R Reddy</h2>
            </div>
          ),
        },
        {
          title: "Prescriptions",
          content: (
            <div className="flex flex-col space-y-4 h-full justify-center">
              {[
                { name: "Metformin", dosage: "500mg - Twice a Day" },
                { name: "Aspirin", dosage: "75mg - Once a Day" },
              ].map((med, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 bg-slate-100 rounded-lg shadow-sm">
                  <Pill className="w-6 h-6" />
                  <div>
                    <h2 className="font-semibold">{med.name}</h2>
                    <p className="text-sm text-slate-600">{med.dosage}</p>
                  </div>
                </div>
              ))}
            </div>
          ),
        },
        {
          title: "Need Assistance?",
          content: (
            <div className="flex justify-between items-center h-full">
              <p className="text-slate-600">
                Chat with your doctor for quick consultations.
              </p>
              <Link href="/patient/chat">
                <Button>Start Chat</Button>
              </Link>
            </div>
          ),
        },
      ].map((section, index) => (
        <Card
          key={index}
          className="bg-card p-6 rounded-lg border border-slate-300 shadow-lg h-full flex flex-col">
          <CardHeader className="text-lg font-semibold">
            {section.title}
          </CardHeader>
          <Separator />
          <CardContent className="mt-3 flex-grow">
            {section.content}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Patient;