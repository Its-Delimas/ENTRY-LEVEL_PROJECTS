import type { Metadata } from "next";
import LessonWorkspace from "@/components/lesson/LessonWorkspace";
import { rainfallYieldLesson } from "@/lib/lessons/rainfall-yield";

export const metadata: Metadata = {
  title: "Mission 01: Rainfall & Crop Yield — Nurulabs",
};

export default function RainfallYieldLessonPage() {
  return <LessonWorkspace lesson={rainfallYieldLesson} />;
}
