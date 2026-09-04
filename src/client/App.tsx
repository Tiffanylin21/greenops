import { useState } from "react";
import { UploadPage } from "./pages/UploadPage";
import { DailyChartPage } from "./pages/DailyChartPage";

type View = "upload" | "daily-chart";

export function App() {
  const [view, setView] = useState<View>("upload");

  return (
    <div>
      <nav>
        <button onClick={() => setView("upload")} disabled={view === "upload"}>
          Upload
        </button>
        <button onClick={() => setView("daily-chart")} disabled={view === "daily-chart"}>
          Daily Chart
        </button>
      </nav>
      {view === "upload" ? <UploadPage /> : <DailyChartPage />}
    </div>
  );
}
