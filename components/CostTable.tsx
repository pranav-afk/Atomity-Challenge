"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ClusterRow } from "@/hooks/useClusterData";
import { tokens } from "@/tokens";

const fmt = (n: number) => n === 0 ? "$0" : `$${n.toLocaleString()}`;

export function CostTable({ data }: { data: ClusterRow[] }) {
  const ref = useRef<HTMLTableElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const cols = ["CPU", "RAM", "Storage", "Network", "GPU", "Efficiency", "Total"];

  return (
    <table
      ref={ref}
      style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}
    >
      <thead>
        <tr>
          <th style={{ padding: "8px 16px", textAlign: "left" }} />
          {cols.map(col => (
            <th key={col}
              style={{
                padding: "8px 12px",
                color: tokens.colors.textMuted,
                fontWeight: 500,
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                textAlign: "right",
              }}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <motion.tr
            key={row.id}
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
            style={{ borderTop: `1px solid ${tokens.colors.border}` }}
          >
            <td style={{ padding: "14px 16px", fontWeight: 700, color: tokens.colors.textPrimary }}>
              {row.name}
            </td>
            {[row.cpu, row.ram, row.storage, row.network, row.gpu].map((val, j) => (
              <td key={j} style={{ padding: "14px 12px", textAlign: "right", color: tokens.colors.textSecondary }}>
                {fmt(val)}
              </td>
            ))}
            <td style={{ padding: "14px 12px", textAlign: "right", color: tokens.colors.textSecondary }}>
              {row.efficiency}%
            </td>
            <td style={{ padding: "14px 12px", textAlign: "right", fontWeight: 700, color: tokens.colors.textPrimary }}>
              {fmt(row.total)}
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  );
}