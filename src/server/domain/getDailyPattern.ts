import { db } from "../db";

export interface IntervalReading {
  timestamp: string;
  kwh: number;
}

const selectDay = db.prepare(
  "SELECT timestamp, kwh FROM interval_readings WHERE building = ? AND substr(timestamp, 1, 10) = ? ORDER BY timestamp ASC",
);

export function getDailyPattern(building: string, day: string): IntervalReading[] {
  return selectDay.all(building, day) as unknown as IntervalReading[];
}
