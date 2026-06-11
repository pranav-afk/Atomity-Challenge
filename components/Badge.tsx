// components/Badge.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { tokens } from "@/tokens";

const AGGREGATE_OPTIONS = ["Cluster", "Namespace", "Pod"];

interface BadgeProps {
  label: string;
  active?: boolean;
  showDropdown?: boolean;
  onSelect?: (value: string) => void;
  selected?: string;
}

export function Badge({ label, active, showDropdown, onSelect, selected = "Cluster" }: BadgeProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      {/* Main Badge Button */}
      <div
        onClick={() => showDropdown && setOpen(o => !o)}
        style={{
          padding: "6px 16px",
          borderRadius: "8px",
          background: active ? tokens.colors.accentGreen : "transparent",
          border: `1.5px solid ${active ? tokens.colors.accentGreen : tokens.colors.border}`,
          color: tokens.colors.textPrimary,
          fontWeight: 600,
          fontSize: "0.875rem",
          cursor: showDropdown ? "pointer" : "default",
          userSelect: "none",
        }}
      >
        {label}
      </div>

      {/* Dropdown Panel */}
      {showDropdown && open && (
        <div
          style={{
            position: "absolute",
            top: "110%",
            left: 0,
            background: tokens.colors.bgCard,
            border: `1.5px solid ${tokens.colors.accentGreen}`,
            borderRadius: "10px",
            padding: "10px",
            zIndex: 20,
            minWidth: "160px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{
            fontSize: "0.7rem",
            color: tokens.colors.textMuted,
            marginBottom: "8px",
            paddingLeft: "4px",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}>
            Aggregated by:
          </div>

          {AGGREGATE_OPTIONS.map(option => (
            <div
              key={option}
              onClick={() => { onSelect?.(option); setOpen(false); }}
              style={{
                padding: "7px 12px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "0.85rem",
                fontWeight: selected === option ? 600 : 400,
                color: selected === option ? tokens.colors.textPrimary : tokens.colors.textSecondary,
                background: selected === option
                  ? `color-mix(in srgb, ${tokens.colors.accentGreen} 15%, transparent)`
                  : "transparent",
                transition: "background 0.15s ease",
              }}
              onMouseEnter={e => {
                if (selected !== option)
                  (e.currentTarget as HTMLDivElement).style.background = "var(--color-bg-card-hover)";
              }}
              onMouseLeave={e => {
                if (selected !== option)
                  (e.currentTarget as HTMLDivElement).style.background = "transparent";
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}