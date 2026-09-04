import { describe, expect, it } from "vitest";
import { ingest } from "./ingest";
import { getDailyPattern } from "./getDailyPattern";

describe("ingest / getDailyPattern", () => {
  it("stores an uploaded reading and returns it for the day it falls on", () => {
    const building = "cycle-1-building";
    const csv = "timestamp,kwh\n2026-01-15T00:00:00,1.5\n";

    ingest(building, csv);

    expect(getDailyPattern(building, "2026-01-15")).toEqual([
      { timestamp: "2026-01-15T00:00:00", kwh: 1.5 },
    ]);
  });

  it("returns only the readings that fall on the requested day, in timestamp order", () => {
    const building = "cycle-2-building";
    const csv = [
      "timestamp,kwh",
      "2026-01-15T00:15:00,2.0",
      "2026-01-16T00:00:00,9.0",
      "2026-01-15T00:00:00,1.5",
    ].join("\n");

    ingest(building, csv);

    expect(getDailyPattern(building, "2026-01-15")).toEqual([
      { timestamp: "2026-01-15T00:00:00", kwh: 1.5 },
      { timestamp: "2026-01-15T00:15:00", kwh: 2.0 },
    ]);
    expect(getDailyPattern(building, "2026-01-16")).toEqual([
      { timestamp: "2026-01-16T00:00:00", kwh: 9.0 },
    ]);
  });

  it("treats a naive local timestamp near midnight as belonging to its literal calendar day (ADR-0003: fixed UTC offset, no timezone reinterpretation)", () => {
    // The building's configured UTC offset means these timestamps are already
    // local wall-clock time. A reading at 23:45 local must stay on the 15th
    // even though re-parsing "2026-01-15T23:45:00" through a timezone-aware
    // Date and reformatting it (e.g. via toISOString) would shift it onto the
    // 16th for any host machine east of UTC.
    const building = "cycle-3-building";
    const csv = [
      "timestamp,kwh",
      "2026-01-15T23:45:00,3.3",
      "2026-01-16T00:00:00,4.4",
    ].join("\n");

    ingest(building, csv);

    expect(getDailyPattern(building, "2026-01-15")).toEqual([
      { timestamp: "2026-01-15T23:45:00", kwh: 3.3 },
    ]);
    expect(getDailyPattern(building, "2026-01-16")).toEqual([
      { timestamp: "2026-01-16T00:00:00", kwh: 4.4 },
    ]);
  });
});
