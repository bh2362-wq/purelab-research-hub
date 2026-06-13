import ipamorelin from "@/assets/bottle-ipamorelin.png.asset.json";
import cjc1295 from "@/assets/bottle-cjc-1295.png.asset.json";
import ghrp6 from "@/assets/bottle-ghrp-6.png.asset.json";
import hexarelin from "@/assets/bottle-hexarelin.png.asset.json";
import bpc157 from "@/assets/bottle-bpc-157.png.asset.json";
import tb500 from "@/assets/bottle-tb-500.png.asset.json";
import kpv from "@/assets/bottle-kpv.png.asset.json";
import ghkcu from "@/assets/bottle-ghk-cu.png.asset.json";
import selank from "@/assets/bottle-selank.png.asset.json";
import semax from "@/assets/bottle-semax.png.asset.json";
import pt141 from "@/assets/bottle-pt-141.png.asset.json";
import ss31 from "@/assets/bottle-ss-31.png.asset.json";

const map: Record<string, string> = {
  "ipamorelin-5mg": ipamorelin.url,
  "cjc-1295-no-dac-5mg": cjc1295.url,
  "ghrp-6-5mg": ghrp6.url,
  "hexarelin-5mg": hexarelin.url,
  "bpc-157-5mg": bpc157.url,
  "tb-500-5mg": tb500.url,
  "kpv-10mg": kpv.url,
  "ghk-cu-50mg": ghkcu.url,
  "selank-5mg": selank.url,
  "semax-5mg": semax.url,
  "pt-141-10mg": pt141.url,
  "ss-31-5mg": ss31.url,
};

export function getProductImage(slug: string): string | undefined {
  return map[slug];
}
