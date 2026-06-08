export function ResearchFloatingPill() {
  return (
    <div className="fixed bottom-4 right-4 z-40 pointer-events-none">
      <div
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] sm:text-xs font-medium shadow-lg backdrop-blur"
        style={{ background: "rgba(26,18,0,0.92)", borderColor: "rgba(245,181,68,0.4)", color: "#F5B544" }}
      >
        ⚠️ Research Use Only
      </div>
    </div>
  );
}
