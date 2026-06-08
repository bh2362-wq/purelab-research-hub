export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-bold text-2xl tracking-tight text-white ${className}`}>
      PureLab<sup className="text-accent text-xs ml-0.5 font-semibold">UK</sup>
    </span>
  );
}
