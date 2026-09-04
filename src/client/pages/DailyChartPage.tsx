import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fetchDailyPattern, type IntervalReading } from "../api";

export function DailyChartPage() {
  const [day, setDay] = useState("");
  const [readings, setReadings] = useState<IntervalReading[] | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function handleDayChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedDay = event.target.value;
    setDay(selectedDay);
    if (!selectedDay) {
      setReadings(null);
      return;
    }

    setStatus("loading");
    try {
      const result = await fetchDailyPattern(selectedDay);
      setReadings(result);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section>
      <h1>Daily Consumption Pattern</h1>
      <label>
        Select a day:{" "}
        <input type="date" value={day} onChange={handleDayChange} />
      </label>

      {status === "loading" && <p>Loading…</p>}
      {status === "error" && <p>Failed to load the daily pattern.</p>}

      {readings && readings.length === 0 && <p>No readings for this day.</p>}

      {readings && readings.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={readings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis label={{ value: "kWh", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Line type="monotone" dataKey="kwh" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </section>
  );
}
