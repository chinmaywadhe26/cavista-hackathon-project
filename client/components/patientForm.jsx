import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  PainLevels: z.coerce.number().min(1).max(10),
  MobilityIssues: z.coerce.number().min(1).max(10),
  FatigueAppetiteWeight: z.coerce.number().min(1).max(10),
  MemoryIssue: z.coerce.number().min(1).max(10),
  ConfusionDisorientation: z.coerce.number().min(1).max(10),
  MoodSwings: z.coerce.number().min(1).max(10),
  SleepPatterns: z.coerce.number().min(1).max(10),
  BreathingProblems: z.coerce.number().min(1).max(10),
  TremorsShaking: z.coerce.number().min(1).max(10),
  NumbnessTingling: z.coerce.number().min(1).max(10),
  FrequencyOfUrination: z.coerce.number().min(1).max(10),
  userName: z.string().min(1),
});

const symptomFields = [
  { name: "PainLevels", label: "How would you rate your pain?" },
  { name: "MobilityIssues", label: "Are you having trouble walking?" },
  { name: "FatigueAppetiteWeight", label: "Changes in appetite or weight?" },
  { name: "MemoryIssue", label: "Finding it hard to remember things?" },
  { name: "ConfusionDisorientation", label: "Do you know where you are?" },
  { name: "MoodSwings", label: "Feeling unusually sad or irritable?" },
  { name: "SleepPatterns", label: "Did you sleep well last night?" },
  { name: "BreathingProblems", label: "Any shortness of breath?" },
  { name: "TremorsShaking", label: "Noticed any shaking or trembling?" },
  { name: "NumbnessTingling", label: "Experiencing numbness in hands/feet?" },
  { name: "FrequencyOfUrination", label: "Urinating more often than usual?" },
];

export default function SymptomForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: symptomFields.reduce((acc, { name }) => {
      acc[name] = 1;
      return acc;
    }, { userName: "" }),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    setMessage("");
    try {
      console.log("values", values);

      const response = await fetch("http://localhost:5000/predict/ml", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg || "Failed to submit data");
      }

      // Check ML Model Prediction
      if (data.prediction?.["Predicted Health Assessment"] === "No") {
        setMessage("No need to visit doctor!");
      } else {
        setMessage("Patient should visit a doctor.");
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-3xl mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {symptomFields.map(({ name, label }) => (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {label}: {field.value}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={10}
                    step={1}
                    {...field}
                    onChange={(e) => {
                      let val = Number(e.target.value);
                      if (val < 1) val = 1;
                      if (val > 10) val = 10;
                      field.onChange(val);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Submitting..." : "Submit"}
        </Button>

        {message && (
          <div className="mt-4 p-4 border rounded-md">
            {message}
          </div>
        )}
      </form>
    </Form>
  );
}