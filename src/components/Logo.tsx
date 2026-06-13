import logoAsset from "@/assets/purelab-logo.png.asset.json";

export function Logo({ className = "", height = 64 }: { className?: string; height?: number }) {
  return (
    <img
      src={logoAsset.url}
      alt="PureLab Peptides"
      style={{ height }}
      className={`w-auto object-contain block ${className}`}
    />
  );
}
