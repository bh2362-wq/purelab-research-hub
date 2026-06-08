export type Product = {
  slug: string;
  name: string;
  size: string;
  price: number;
  purity: string;
  category: string;
  description: string;
  batch: string;
};

export const products: Product[] = [
  { slug: "bpc-157-5mg", name: "BPC-157", size: "5mg", price: 34.95, purity: "99.2%", category: "Regulatory & Repair Research", description: "Body Protection Compound 157 — a synthetic peptide fragment used in in vitro regulatory and repair research models.", batch: "BPC0426A" },
  { slug: "ipamorelin-5mg", name: "Ipamorelin", size: "5mg", price: 29.95, purity: "99.4%", category: "GH Secretagogue Research", description: "Selective GH secretagogue used in in vitro receptor binding and signalling research.", batch: "IPA0426B" },
  { slug: "tb-500-5mg", name: "TB-500", size: "5mg", price: 44.95, purity: "99.1%", category: "Regulatory & Repair Research", description: "Thymosin Beta-4 fragment for in vitro cytoskeletal and migration research.", batch: "TB50426C" },
  { slug: "ghk-cu-50mg", name: "GHK-Cu", size: "50mg", price: 39.95, purity: "99.6%", category: "Copper Peptide Research", description: "Copper tripeptide complex for in vitro fibroblast and ECM research.", batch: "GHK0426D" },
  { slug: "selank-5mg", name: "Selank", size: "5mg", price: 32.95, purity: "99.3%", category: "Neuropeptide Research", description: "Heptapeptide analogue used in in vitro neuropeptide research.", batch: "SEL0426E" },
  { slug: "semax-5mg", name: "Semax", size: "5mg", price: 34.95, purity: "99.2%", category: "Neuropeptide Research", description: "ACTH(4-10) analogue used in in vitro neuropeptide research models.", batch: "SEM0426F" },
  { slug: "cjc-1295-no-dac-5mg", name: "CJC-1295 No-DAC", size: "5mg", price: 31.95, purity: "99.0%", category: "GH Secretagogue Research", description: "GHRH analogue for in vitro pituitary signalling research.", batch: "CJC0426G" },
  { slug: "melanotan-ii-10mg", name: "Melanotan II", size: "10mg", price: 27.95, purity: "99.1%", category: "Melanocortin Research", description: "Melanocortin receptor agonist for in vitro pigmentation research.", batch: "MT20426H" },
  { slug: "ss-31-10mg", name: "SS-31", size: "10mg", price: 89.95, purity: "99.4%", category: "Mitochondrial Research", description: "Mitochondria-targeted tetrapeptide for in vitro bioenergetic research.", batch: "SS30426I" },
];

export const categories = [
  { slug: "gh-secretagogue", name: "GH Secretagogue Research", icon: "flask" },
  { slug: "regulatory-repair", name: "Regulatory & Repair Research", icon: "shield" },
  { slug: "neuropeptide", name: "Neuropeptide Research", icon: "brain" },
  { slug: "melanocortin", name: "Melanocortin Research", icon: "sun" },
  { slug: "copper-peptide", name: "Copper Peptide Research", icon: "atom" },
  { slug: "mitochondrial", name: "Mitochondrial Research", icon: "zap" },
];
