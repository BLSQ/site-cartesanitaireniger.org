import { useEffect, useState } from "react";
import ReportSummary from "./ReportSummary";
import HomePage from "./HomePage";

const EXHIBIT_URL = "https://exhibit.bluesquare.org";

async function fetchDistinct(field, filters = [], orders = []) {
  const params = new URLSearchParams();
  filters.forEach(([f, op, v]) => {
    params.append("filters", `${f}:${op}:${v}`);
  });

  orders.forEach((order) => {
    params.append("orders", `${order}`);
  });

  const url = `${EXHIBIT_URL}/api/workspaces/cod-mashako-3-0/tables/public_reports/distinct/${encodeURIComponent(
    field
  )}/?${params.toString()}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${field}`);
  const data = await res.json();
  return data.rows.map((r) => r[field]).filter((v) => v != null && v !== "");
}

function useDistinctField(
  field,
  dependencies,
  orders,
  selections,
  setSelections
) {
  const [state, setState] = useState({ options: [], loaded: false });

  useEffect(() => {
    if (!dependencies.every((d) => selections[d])) return;

    (async () => {
      const filters = dependencies.map((d) => [d, "eq", selections[d]]);
      const vals = await fetchDistinct(field, filters, orders);

      setState({ options: vals, loaded: true });

      if (vals.length === 1 && !selections[field]) {
        setSelections((prev) => ({ ...prev, [field]: vals[0] }));
      }
    })();
  }, [dependencies.map((d) => selections[d]).join("|")]);

  return state;
}

export default function App() {
  const fields = [
    { key: "report_name", label: "Rapport", deps: [] },
    {
      key: "period",
      label: "Période",
      deps: ["report_name"],
      orders: ["period:desc"],
    },
    {
      key: "level 1",
      label: "Pays",
      deps: ["report_name", "period"],
      orders: [],
    },
    {
      key: "level 2",
      label: "Province",
      deps: ["report_name", "period", "level 1"],
      orders: [],
    },
    {
      key: "level 3",
      label: "Antenne",
      deps: ["report_name", "period", "level 1", "level 2"],
      orders: [],
    },
    {
      key: "level 4",
      label: "Zone de Santé",
      deps: ["report_name", "period", "level 1", "level 2", "level 3"],
      orders: [],
    },
  ];

  const [selections, setSelections] = useState({});
  const optionsMap = Object.fromEntries(
    fields.map(({ key, deps, orders }) => [
      key,
      useDistinctField(key, deps, orders, selections, setSelections),
    ])
  );

  return (
    <div
      style={{
        backgroundImage:
          "url('https://pevrdcongo.cd/wp-content/uploads/2023/03/vaccination-routine.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: " 'Inter', 'Helvetica Neue', Arial, sans-serif;",
        fontSize: "25px",
      }}
    >
      <div className="p-6 max-w-4xl mx-auto space-y-4 bg-white min-h-screen">
        <a href="./">
          <p className="flex items-center justify-center gap-3">
            <img
              width="550"
              alt="image"
              src="https://gist.github.com/user-attachments/assets/269903cc-347f-4288-bd97-f102f4fbca25"
            />
          </p>
        </a>

        <h1 className="text-xl font-bold"> Registre des rapports</h1>

        <p className="text-sm">
          Bienvenue sur la plateforme de téléchargement des rapports de
          performance de la vaccination de routine!
        </p>

        <p className="text-sm">
          Grace aux données collectées par Gestion PEV via le DHIS2, vous avec
          la possibilité de télécharger les rapports mensuels de supervision au
          niveau National, Zone de Santé et Antenne ainsi que les différents
          rapports des réunions de monitorage.
        </p>

        <h1 className="text-xl font-bold">
          Sélectionner un des rapports disponibles
        </h1>

        {fields.map(({ key, label }, i) => {
          const { options, loaded } = optionsMap[key];
          if (!loaded || options.length === 0) {
            return null; // hide only when fetched and empty
          }

          return (
            <select
              key={key}
              className="w-full p-2 border rounded text-sm"
              value={selections[key] || ""}
              onChange={(e) => {
                const value = e.target.value;
                setSelections((prev) => {
                  const next = { ...prev, [key]: value };
                  fields.slice(i + 1).forEach(({ key }) => (next[key] = ""));
                  return next;
                });
              }}
            >
              <option value="">{`Sélectionnez ${label}`}</option>
              {options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          );
        })}

        {fields.slice(0, 3).every(({ key }) => selections[key]) && (
          <ReportSummary exhibitUrl={EXHIBIT_URL} selections={selections} />
        )}
      </div>
    </div>
  );
}
