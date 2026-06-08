export function ResearchFloatingPill() {
  return (
    <div className="fixed bottom-4 right-4 z-40 pointer-events-none">
      <div
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] sm:text-xs font-medium shadow-lg backdrop-blur"
        style={{ background: "rgba(255,248,230,0.95)", borderColor: "rgba(180,83,9,0.35)", color: "#92400E" }}
      >
        ⚠️ Research Use Only
      </div>
    </div>
  );
}
