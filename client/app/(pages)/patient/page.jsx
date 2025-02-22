import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Patient = () => {
  return (
    <div className="w-lvw h-dvh flex flex-col space-y-12 items-center justify-center overflow-hidden">
      <h1 className="text-5xl font-bold text-foreground text-center">
        Take a short test to analyse your current health status
      </h1>
      <Link href="/patient/test">
        <Button>Start Test</Button>
      </Link>
    </div>
  );
};

export default Patient;
