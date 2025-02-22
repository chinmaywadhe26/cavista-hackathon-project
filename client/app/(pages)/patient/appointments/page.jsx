"use client";

import AppointmentCard from "@/components/appointmentCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const appointmentsArray = [
  {
    hospital: "City Hospital",
    time: "12/12/2021 12:00",
    doctor: "Dr. John Doe",
    index: 0,
  },
  {
    hospital: "Metro Medical Center",
    time: "14/12/2021 10:30",
    doctor: "Dr. Jane Smith",
    index: 1,
  },
  {
    hospital: "Community Health Center",
    time: "16/12/2021 09:00",
    doctor: "Dr. Emily Johnson",
    index: 2,
  },
  {
    hospital: "City Hospital",
    time: "18/12/2021 11:00",
    doctor: "Dr. John Doe",
    index: 3,
  },
  {
    hospital: "Metro Medical Center",
    time: "20/12/2021 10:30",
    doctor: "Dr. Jane Smith",
    index: 4,
  },
  {
    hospital: "Community Health Center",
    time: "22/12/2021 09:00",
    doctor: "Dr. Emily Johnson",
    index: 5,
  },
  {
    hospital: "City Hospital",
    time: "24/12/2021 11:00",
    doctor: "Dr. John Doe",
    index: 6,
  },
];

const Appointments = () => {
  return (
    <div className="w-screen px-16 py-4 bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-6">Appointments</h1>

      <div className="w-full grid grid-cols-2 gap-8">
        <div className="w-full col-span-1">
          <Card className="shadow-lg border border-slate-200">
            <CardHeader>
              <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
            </CardHeader>
            <Separator />
            <CardContent className="p-4">
              <ScrollArea className="h-96 w-full pr-2">
                <div className="space-y-3">
                  {appointmentsArray.map((appointment) => (
                    <AppointmentCard key={appointment.index} {...appointment} />
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="w-full col-span-1">
          <Card className="shadow-lg border border-slate-200">
            <CardHeader>
              <h2 className="text-xl font-semibold">Past Appointments</h2>
            </CardHeader>
            <Separator />
            <CardContent className="p-4">
              <ScrollArea className="h-96 w-full pr-2">
                <div className="space-y-3">
                  {appointmentsArray.map((appointment) => (
                    <AppointmentCard key={appointment.index} {...appointment} />
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
