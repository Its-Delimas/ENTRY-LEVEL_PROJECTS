"use client";

import { motion } from "framer-motion";
import { dateKey } from "@/lib/progress";

export default function WeekBars({ activeDates }: { activeDates: Set<string> }) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return {
      key: dateKey(d),
      label: d.toLocaleDateString("en-US", { weekday: "narrow" }),
      active: activeDates.has(dateKey(d)),
      isToday: i === 6,
    };
  });

  return (
    <div className="flex h-20 items-end justify-between gap-2">
      {days.map((day, i) => (
        <div key={day.key} className="flex flex-1 flex-col items-center gap-1.5">
          <motion.span
            initial={{ height: 0 }}
            animate={{ height: day.active ? 48 : 8 }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full max-w-[14px] rounded-full ${
              day.active ? "bg-lime" : "bg-white/15"
            }`}
            title={day.active ? `${day.key} — active` : day.key}
          />
          <span
            className={`text-[10px] font-semibold ${
              day.isToday ? "text-white" : "text-white/40"
            }`}
          >
            {day.label}
          </span>
        </div>
      ))}
    </div>
  );
}
