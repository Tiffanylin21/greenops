import { DatabaseSync } from "node:sqlite";

const dbPath = process.env.GREENOPS_DB_PATH ?? "greenops.sqlite";

export const db = new DatabaseSync(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS interval_readings (
    building TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    kwh REAL NOT NULL,
    PRIMARY KEY (building, timestamp)
  )
`);
