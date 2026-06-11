// components/ClusterSection.tsx
"use client";
import { useState } from "react";
import { useClusterData } from "@/hooks/useClusterData";
import { BarChart } from "./BarChart";
import { CostTable } from "./CostTable";
import { Badge } from "./Badge";
import { tokens } from "@/tokens";

export function ClusterSection() {
  const [groupBy, setGroupBy] = useState("Cluster");
  const { data, isLoading, isError } = useClusterData(groupBy);

  return (
    <section
      aria-labelledby="cluster-heading"
      style={{
        background: tokens.colors.bgPage,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
      }}
    >
      <div
        style={{
          background: tokens.colors.bgCard,
          borderRadius: tokens.radius.card,
          padding: "32px",
          width: "100%",
          maxWidth: "900px",
          boxShadow: "0 4px 32px rgba(0,0,0,0.06)",
        }}
      >
        {/* Filter Bar */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "32px", alignItems: "flex-start" }}>
          <Badge label="Last 30 Days" />
          <Badge
            label={groupBy}
            active
            showDropdown
            selected={groupBy}
            onSelect={setGroupBy}
          />
        </div>

        {/* States */}
        {isLoading && (
          <div style={{ textAlign: "center", padding: "60px", color: tokens.colors.textMuted }}>
            Loading data…
          </div>
        )}
        {isError && (
          <div style={{ textAlign: "center", padding: "60px", color: "#D93F3F" }}>
            Failed to load data. Please try again.
          </div>
        )}
        {data && (
          <>
            <BarChart data={data} />
            <CostTable data={data} />
          </>
        )}
      </div>
    </section>
  );
}