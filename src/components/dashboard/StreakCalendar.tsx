import { dateKey } from "@/lib/progress";

const WEEKS = 12;
const DAYS = WEEKS * 7;

function buildDays(activeDates: Set<string>) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days: { key: string; active: boolean; isToday: boolean }[] = [];
  for (let i = DAYS - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = dateKey(d);
    days.push({ key, active: activeDates.has(key), isToday: i === 0 });
  }
  return days;
}

export default function StreakCalendar({
  activeDates,
}: {
  activeDates: Set<string>;
}) {
  const days = buildDays(activeDates);
  const activeCount = days.filter((d) => d.active).length;

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="eyebrow text-ink/40">Last {WEEKS} weeks</p>
        <p className="text-xs text-ink/40">
          {activeCount === 0
            ? "No activity yet"
            : `${activeCount} active day${activeCount === 1 ? "" : "s"}`}
        </p>
      </div>
      <div className="mt-3 grid grid-flow-col grid-rows-7 gap-1">
        {days.map((day) => (
          <span
            key={day.key}
            title={day.key}
            className={`h-2.5 w-2.5 rounded-[3px] ${
              day.active
                ? "bg-lime"
                : day.isToday
                  ? "border border-ink/25"
                  : "bg-ink/8"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
