export interface IntervalReading {
  timestamp: string;
  kwh: number;
}

export async function uploadReadings(file: File): Promise<void> {
  const body = new FormData();
  body.append("file", file);

  const response = await fetch("/api/readings", { method: "POST", body });
  if (!response.ok) {
    throw new Error(`Upload failed: ${response.status}`);
  }
}

export async function fetchDailyPattern(day: string): Promise<IntervalReading[]> {
  const response = await fetch(`/api/daily-pattern?day=${encodeURIComponent(day)}`);
  if (!response.ok) {
    throw new Error(`Failed to load daily pattern: ${response.status}`);
  }
  return response.json();
}
