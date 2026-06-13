import bpc157 from "@/assets/bottle-bpc-157.png.asset.json";

export function Vial() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <img
        src={bpc157.url}
        alt="PureLab BPC-157 5mg research peptide vial"
        className="w-full h-auto object-contain drop-shadow-[0_25px_50px_rgba(0,212,255,0.25)]"
      />
    </div>
  );
}
