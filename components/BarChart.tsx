"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ClusterRow } from "@/hooks/useClusterData";
import { tokens } from "@/tokens";

interface BarChartProps { data: ClusterRow[] }

export function BarChart({ data }: BarChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const maxTotal = Math.max(...data.map(d => d.total));

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${data.length}, 1fr)`,
        gap: "24px",
        alignItems: "flex-end",
        height: "180px",
        padding: "0 40px",
        marginBottom: "16px",
      }}
    >
      {data.map((cluster, i) => {
        const heightPct = (cluster.total / maxTotal) * 100;
        return (
          <div key={cluster.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={inView ? { scaleY: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: "100%",
                maxWidth: "90px",
                height: `${heightPct}%`,
                background: tokens.colors.barFill,
                borderRadius: "12px 12px 8px 8px",
                transformOrigin: "bottom",
                boxShadow: `0 8px 24px ${tokens.colors.barShadow}`,
              }}
            />
            <span style={{ fontSize: "0.8rem", color: tokens.colors.textSecondary, fontWeight: 500 }}>
              {cluster.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}