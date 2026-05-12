import { useState, useEffect } from "react";
import Today from "@/pages/Today";
import Week from "@/pages/Week";
import Month from "@/pages/Month";
import Admin from "@/pages/Admin";

type Tab = "today" | "week" | "month" | "admin";

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: "today", label: "오늘", icon: "☀️" },
  { id: "week", label: "이번주", icon: "📅" },
  { id: "month", label: "이번달", icon: "🗓️" },
  { id: "admin", label: "관리", icon: "⚙️" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("today");

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100dvh",
        background: "hsl(var(--background))",
        color: "hsl(var(--foreground))",
        position: "relative",
      }}
    >
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          paddingBottom: "calc(72px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        {activeTab === "today" && <Today />}
        {activeTab === "week" && <Week />}
        {activeTab === "month" && <Month />}
        {activeTab === "admin" && <Admin />}
      </main>

      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "hsl(0 0% 9% / 0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid hsl(var(--border))",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          display: "flex",
          zIndex: 100,
        }}
        data-testid="bottom-nav"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              data-testid={`nav-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "3px",
                paddingTop: "10px",
                paddingBottom: "10px",
                background: "none",
                border: "none",
                cursor: "pointer",
                transition: "all 0.15s ease",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <span
                style={{
                  fontSize: "20px",
                  lineHeight: 1,
                  filter: isActive ? "none" : "grayscale(1) opacity(0.4)",
                  transition: "filter 0.15s ease",
                }}
              >
                {tab.icon}
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                  transition: "color 0.15s ease, font-weight 0.15s ease",
                  letterSpacing: "-0.01em",
                }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
