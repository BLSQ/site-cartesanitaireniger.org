import { useEffect, useState } from "react";
import ReportsIcon from "./icons/reports";
import DownloadIcon from "./icons/download";


/* eslint-disable react/prop-types */
const FieldValue = ({ value, className }) => {
  return (
    <div className={className}>
      <span className="col-span-1">{value}</span>
    </div>
  );
};

/* eslint-disable react/prop-types */
function ReportSummary({ exhibitUrl, selections }) {
  // eslint-disable-next-line no-unused-vars
  const entries = Object.entries(selections).filter(([_, v]) => v);

  const [data, setData] = useState(null);

  useEffect(() => {
    const url =
      `${exhibitUrl}/api/workspaces/niger-extension-couverture-sanitaire/tables/public_model_health_ext/rows?limit=10&` +
      entries.map(([k, v]) => `filters=${k}:eq:${v}`).join("&");

    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        if (json.rows && json.rows.length <= 10) {
          setData(json.rows);
        } else {
          setData(null);
        }
      })
      .catch((e) => {
        console.error("Fetch error:", e);
        setData(null);
      });
  }, [JSON.stringify(selections)]);

  if (!data) return null;

  return data
    .slice(0, 4)
    .map((row) => <ReportToDownload report={row} key={row["report_name"]} />);
}

const ReportToDownload = ({ report }) => {
  const levels = [
    report["region"],
    report["district"],
  ].filter((r) => r);
  const lastLevel = levels[levels.length - 1];
  return (
    <a
      href={report["folder_download_url"]}
      target="_blank"
      rel="noopener noreferrer"
      key={report["report_name"]}
      className=" group p-4 bg-slate-100 rounded text-sm mb-2 flex items-center gap-4  transition-colors duration-300"
    >
      <div className="w-8 h-8 2xl:h-12 2xl:w-12 rounded-lg bg-[#5FBFF2] group-hover:bg-[#8BD5FD] flex items-center justify-center text-[#002878] transition-all duration-300">
        <ReportsIcon />
      </div>
      <div className="flex-1">
        <div className="flex gap-4 font-bold">
          <FieldValue value={lastLevel} className="font-bold" />
        </div>

        <FieldValue
          className="text-xs text-slate-500"
          value={levels.slice(0, -1).join(" / ")}
        />
        <div className="flex gap-4">
          <FieldValue
            className="text-xs text-slate-500"
            value={report["report_name"] || "Atlas d'Accessibilité"}
          />       
        </div>
      </div>

      <span className="text-blue-500 hover:font-bold">
        <span className="hidden 2xl:inline mr-2">Télécharger </span>
        <span className="inline-block">
          <DownloadIcon />
        </span>
      </span>
    </a>
  );
};

export default ReportSummary;
