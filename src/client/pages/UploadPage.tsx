import { useState } from "react";
import { uploadReadings } from "../api";

export function UploadPage() {
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setStatus("uploading");
    try {
      await uploadReadings(file);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section>
      <h1>Upload Interval Readings</h1>
      <p>Upload a CSV file of Interval Readings (timestamp, kWh) for your Building.</p>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {status === "uploading" && <p>Uploading…</p>}
      {status === "done" && <p>Upload complete.</p>}
      {status === "error" && <p>Upload failed. Please try again.</p>}
    </section>
  );
}
