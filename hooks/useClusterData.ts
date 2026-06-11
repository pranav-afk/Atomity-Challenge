// hooks/useClusterData.ts
import { useQuery } from "@tanstack/react-query";

export interface ClusterRow {
  id: string;
  name: string;
  cpu: number;
  ram: number;
  storage: number;
  network: number;
  gpu: number;
  efficiency: number;
  total: number;
}

const LABELS: Record<string, string[]> = {
  Cluster:   ["Cluster A",   "Cluster B",   "Cluster C",   "Cluster D"],
  Namespace: ["Namespace A", "Namespace B", "Namespace C", "Namespace D"],
  Pod:       ["Pod A",       "Pod B",       "Pod C",       "Pod D"],
};

const mapToRows = (items: any[], groupBy: string): ClusterRow[] => {
  const names = LABELS[groupBy] ?? LABELS["Cluster"];
  return items.slice(0, 4).map((item, i) => {
    const cpu      = 1000 + (item.id * 37) % 1600;
    const ram      = 400  + (item.id * 23) % 1000;
    const storage  = 80   + (item.id * 11) % 200;
    const network  = 100  + (item.id * 17) % 250;
    const gpu      = (item.id % 2 === 0) ? 0 : 400 + (item.id * 13) % 500;
    const efficiency = 10 + (i * 11);
    return {
      id: String(item.id),
      name: names[i],
      cpu, ram, storage, network, gpu, efficiency,
      total: cpu + ram + storage + network + gpu,
    };
  });
};

export function useClusterData(groupBy: string = "Cluster") {
  return useQuery({
    queryKey: ["cluster-costs", groupBy],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=4");
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      return mapToRows(data, groupBy);
    },
    staleTime: 5 * 60 * 1000,
  });
}