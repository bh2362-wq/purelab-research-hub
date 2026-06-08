export function DisclaimerPill() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-danger/60 bg-danger/10 px-4 py-2 text-xs sm:text-sm text-danger">
      <span>⚠️</span>
      <span>For In Vitro Research Use Only — Not for human or veterinary consumption</span>
    </div>
  );
}

export function ResearchBanner() {
  return (
    <section className="border-y" style={{ background: "#FFF8E6", borderColor: "rgba(180,83,9,0.25)" }}>
      <div className="mx-auto max-w-7xl px-4 py-6 text-sm leading-relaxed" style={{ color: "#92400E" }}>
        <strong className="font-display">IMPORTANT:</strong>{" "}
        All products sold on PureLab Peptides are supplied strictly for in vitro laboratory research purposes.
        They are not licensed medicines, are not for human or veterinary use, and must not be used for any purpose
        other than scientific research. By purchasing from this site you confirm you are a qualified researcher
        and agree to our Terms of Use.
      </div>
    </section>
  );
}
