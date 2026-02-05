import { useEffect, useState } from "react";
import ReportSummary from "./ReportSummary";
import Select from "react-select";
import { Link } from "react-router-dom";
import Page from "./components/Page";
import BackIcon from "./icons/back";


const EXHIBIT_URL = "https://exhibit.bluesquare.org";

async function fetchDistinct(field, filters = [], orders = []) {
  const params = new URLSearchParams();
  filters.forEach(([f, op, v]) => {
    params.append("filters", `${f}:${op}:${v}`);
  });

  orders.forEach((order) => {
    params.append("orders", `${order}`);
  });

  const url = `${EXHIBIT_URL}/api/workspaces/niger-extension-couverture-sanitaire/tables/public_model_health_ext/distinct/${encodeURIComponent(
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
      debugger;
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
    {
      key: "region",
      label: "Région",
      deps: [],
      orders: ["region:asc"],
    },
    {
      key: "district",
      label: "District",
      deps: ["region"],
      orders: ["district:asc"],
    },
    {
      key: "methode",
      label: "Méthode",
      deps: ["region", "district"],
      orders: ["methode:asc"],
    },
  ];

  const [selections, setSelections] = useState({});
  const optionsMap = Object.fromEntries(
    fields.map(({ key, deps, orders }) => [
      key,
      // @ts-ignore
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useDistinctField(key, deps, orders, selections, setSelections),
    ])
  );

  return (
    <Page>
      <div className="space-y-8">
        <Link
          to="/"
          className="text-blue-500 hover:font-bold flex items-center gap-2 text-sm md:text-base"
        >
          <BackIcon /> Retour à l&apos;accueil
        </Link>
        <h1 className="text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-bold md:tracking-tight xl:tracking-tighter mt-4">
          Téléchargement de l'atlas d'accessibilité
        </h1>

        <p className="text-sm text-slate-500 2xl:text-base">
          Cet outil permet de créer des <b>atlas d’accessibilité</b> afin d’analyser l’accès géographique des populations aux structures de santé et d’identifier les <b>déserts sanitaires</b>.
          Il s’adresse principalement à la <b>Direction de la Santé</b> et aux responsables du <b>Ministère de la Santé</b> aux niveaux décentralisés, afin de les aider à identifier les emplacements où l’implantation ou l’extension d’une structure de santé aurait le plus fort impact en termes de population couverte.
          L’outil permet notamment d’estimer l’impact, en nombre de personnes concernées, de la <b>transformation d’une Case de Santé (CS) en Centre de Santé Intégré (CSI)</b>.
        </p>

        <h1 className="text-xl font-bold">
          Sélectionner un des rapports disponibles
        </h1>

        <div className="space-y-2">
          {fields.map(({ key, label, formatter }, i) => {
            debugger
            const { options, loaded } = optionsMap[key];
            if (!loaded || options.length === 0) {
              return null; // hide only when fetched and empty
            }
            debugger;
            return (
              <Select
                key={key}
                className="w-full text-sm"
                value={
                  selections[key]
                    ? {
                      value: selections[key],
                      label: formatter
                        ? formatter(selections[key])
                        : selections[key],
                    }
                    : null
                }
                onChange={(selectedOption) => {
                  const value = selectedOption ? selectedOption.value : "";
                  setSelections((prev) => {
                    const next = { ...prev, [key]: value };
                    fields.slice(i + 1).forEach(({ key }) => (next[key] = ""));
                    return next;
                  });
                }}
                options={options.map((o) => ({
                  value: o,
                  label: formatter ? formatter(o) : o,
                }))}
                placeholder={`Sélectionnez ${label}`}
                isClearable
              />
            );
          })}
        </div>
        {fields.slice(0, 2).every(({ key }) => selections[key]) && (
          <ReportSummary exhibitUrl={EXHIBIT_URL} selections={selections} />
        )}
      </div>
    </Page>
  );
}
