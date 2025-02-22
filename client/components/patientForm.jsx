"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";

const formSchema = z.object({
  pain_levels: z.number().min(0).max(10),
  mobility_issues: z.number().min(0).max(10),
  fatigue: z.number().min(0).max(10),
  appetite_weight: z.number().min(0).max(10),
  memory_issues: z.number().min(0).max(10),
  disorientation: z.number().min(0).max(10),
  mood_swings: z.number().min(0).max(10),
  sleep_patterns: z.number().min(0).max(10),
  breathing: z.number().min(0).max(10),
  tremors_shaking: z.number().min(0).max(10),
  numbness_tingling: z.number().min(0).max(10),
  urination: z.number().min(0).max(10),
  consultation: z.number().min(0).max(10),
});

export default function MyForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <div className="max-w-md space-y-8 mx-auto py-10">
      <h1 className="text-3xl font-bold">Health Assessment</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl mx-auto py-10">
          <FormField
            control={form.control}
            name="pain_levels"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>
                  Pain Levels: How severe is your pain? * - {value}
                </FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={10}
                    step={1}
                    defaultValue={[5]}
                    onValueChange={(vals) => {
                      onChange(vals[0]);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Adjust the intensity by sliding.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mobility_issues"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>
                  Mobility Issues: Are you having trouble moving around? * -{" "}
                  {value}
                </FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={10}
                    step={1}
                    defaultValue={[5]}
                    onValueChange={(vals) => {
                      onChange(vals[0]);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Adjust the intensity by sliding.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fatigue"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>
                  Fatigue: How tired you been feeling lately? * - {value}
                </FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={10}
                    step={1}
                    defaultValue={[5]}
                    onValueChange={(vals) => {
                      onChange(vals[0]);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Adjust the intensity by sliding.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="appetite_weight"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>
                  Appetite & Weight: How you notices changes in your weight and
                  appetite? * - {value}
                </FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={10}
                    step={1}
                    defaultValue={[5]}
                    onValueChange={(vals) => {
                      onChange(vals[0]);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Adjust the intensity by sliding.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="memory_issues"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>
                  Memory Issues: Have you been having trouble remembering things
                  lately? * - {value}
                </FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={10}
                    step={1}
                    defaultValue={[5]}
                    onValueChange={(vals) => {
                      onChange(vals[0]);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Adjust the intensity by sliding.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="disorientation"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>
                  Disorientation: Are you having problems understanding what
                  people are saying? * - {value}
                </FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={10}
                    step={1}
                    defaultValue={[5]}
                    onValueChange={(vals) => {
                      onChange(vals[0]);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Adjust the intensity by sliding.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mood_swings"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>
                  Mood Swings: Do you feel more irritable, sad, or anxious than
                  usual? * - {value}
                </FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={10}
                    step={1}
                    defaultValue={[5]}
                    onValueChange={(vals) => {
                      onChange(vals[0]);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Adjust the intensity by sliding.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sleep_patterns"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>
                  Sleep Patterns: How many hours of sleep do you get each night?
                  * - {value}
                </FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={10}
                    step={1}
                    defaultValue={[5]}
                    onValueChange={(vals) => {
                      onChange(vals[0]);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Adjust the intensity by sliding.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="breathing"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>
                  Breathing: Do you feel short of breath, especially when you're
                  active? * - {value}
                </FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={10}
                    step={1}
                    defaultValue={[5]}
                    onValueChange={(vals) => {
                      onChange(vals[0]);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Adjust the intensity by sliding.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tremors_shaking"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>
                  Tremors/Shaking: Have you noticed any shaking or trembling in
                  your hands or other parts of your body? * - {value}
                </FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={10}
                    step={1}
                    defaultValue={[5]}
                    onValueChange={(vals) => {
                      onChange(vals[0]);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Adjust the intensity by sliding.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numbness_tingling"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>
                  Numbness/Tingling: Are you experiencing any numbness or
                  tingling in your hands, feet, or other parts of your body? * -{" "}
                  {value}
                </FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={10}
                    step={1}
                    defaultValue={[5]}
                    onValueChange={(vals) => {
                      onChange(vals[0]);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Adjust the intensity by sliding.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="urination"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>
                  Urination: Do you have any pain or burning when you urinate? *
                  - {value}
                </FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={10}
                    step={1}
                    defaultValue={[5]}
                    onValueChange={(vals) => {
                      onChange(vals[0]);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Adjust the intensity by sliding.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="consultation"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>
                  Consultation: Do you feel like you need to see a doctor soon?
                  * - {value}
                </FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={10}
                    step={1}
                    defaultValue={[5]}
                    onValueChange={(vals) => {
                      onChange(vals[0]);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Adjust the intensity by sliding.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
