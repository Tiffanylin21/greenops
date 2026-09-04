import { db } from "../db";

const insertReading = db.prepare(
  "INSERT INTO interval_readings (building, timestamp, kwh) VALUES (?, ?, ?)",
);

export function ingest(building: string, fileContents: string): void {
  const [, ...rows] = fileContents.trim().split("\n");

  for (const row of rows) {
    const [timestamp, kwh] = row.split(",").map((cell) => cell.trim());
    insertReading.run(building, timestamp, Number(kwh));
  }
}
