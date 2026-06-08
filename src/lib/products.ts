export type SizeVariant = { size: string; price: number };
export type Product = {
  slug: string;
  name: string;
  size: string;
  price: number;
  originalPrice?: number;
  purity: string;
  category: string;
  shortDesc: string;
  description: string;
  batch: string;
  inStock: boolean;
  sizes?: SizeVariant[];
};

export const CATEGORIES = [
  "GH Secretagogue Research",
  "Regulatory & Repair Research",
  "Neuropeptide Research",
  "Melanocortin Research",
  "Copper Peptide Research",
  "Mitochondrial Research",
] as const;

export const products: Product[] = [
  {
    slug: "ipamorelin-5mg", name: "Ipamorelin", size: "5mg", price: 29.95, purity: "99.1%",
    category: "GH Secretagogue Research",
    shortDesc: "Selective GH secretagogue for in vitro receptor research.",
    description: "Selective GH secretagogue used in in vitro receptor binding and signalling research.",
    batch: "IPA0426B", inStock: true,
    sizes: [{ size: "2mg", price: 19.95 }, { size: "5mg", price: 29.95 }, { size: "10mg", price: 54.95 }],
  },
  {
    slug: "cjc-1295-no-dac-5mg", name: "CJC-1295 (no DAC)", size: "5mg", price: 34.95, purity: "99.3%",
    category: "GH Secretagogue Research",
    shortDesc: "GHRH analogue for in vitro pituitary signalling research.",
    description: "Modified GHRH analogue without DAC, used in in vitro pituitary signalling research.",
    batch: "CJC0426G", inStock: true,
    sizes: [{ size: "2mg", price: 22.95 }, { size: "5mg", price: 34.95 }],
  },
  {
    slug: "ghrp-6-5mg", name: "GHRP-6", size: "5mg", price: 27.95, purity: "98.8%",
    category: "GH Secretagogue Research",
    shortDesc: "Hexapeptide ghrelin receptor agonist for in vitro research.",
    description: "Ghrelin receptor agonist hexapeptide for in vitro receptor binding research.",
    batch: "GHR0426J", inStock: true,
    sizes: [{ size: "5mg", price: 27.95 }, { size: "10mg", price: 49.95 }],
  },
  {
    slug: "hexarelin-5mg", name: "Hexarelin", size: "5mg", price: 32.95, purity: "99.0%",
    category: "GH Secretagogue Research",
    shortDesc: "Synthetic hexapeptide for in vitro GH receptor research.",
    description: "Synthetic hexapeptide used in in vitro GH receptor research.",
    batch: "HEX0426K", inStock: true,
  },
  {
    slug: "bpc-157-5mg", name: "BPC-157", size: "5mg", price: 34.95, purity: "99.4%",
    category: "Regulatory & Repair Research",
    shortDesc: "Body Protection Compound for in vitro regulatory models.",
    description: "Synthetic pentadecapeptide fragment used in in vitro regulatory and repair research.",
    batch: "BPC0426A", inStock: true,
    sizes: [{ size: "2mg", price: 19.95 }, { size: "5mg", price: 34.95 }, { size: "10mg", price: 62.95 }],
  },
  {
    slug: "tb-500-5mg", name: "TB-500 (Thymosin Beta-4)", size: "5mg", price: 44.95, purity: "98.9%",
    category: "Regulatory & Repair Research",
    shortDesc: "Thymosin Beta-4 fragment for in vitro cytoskeletal research.",
    description: "Thymosin Beta-4 fragment for in vitro cytoskeletal and migration research.",
    batch: "TB50426C", inStock: true,
    sizes: [{ size: "5mg", price: 44.95 }, { size: "10mg", price: 79.95 }],
  },
  {
    slug: "kpv-10mg", name: "KPV", size: "10mg", price: 38.95, purity: "99.2%",
    category: "Regulatory & Repair Research",
    shortDesc: "α-MSH tripeptide fragment for in vitro inflammation research.",
    description: "α-MSH (11-13) tripeptide fragment for in vitro inflammation research.",
    batch: "KPV0426L", inStock: true,
  },
  {
    slug: "ghk-cu-50mg", name: "GHK-Cu", size: "50mg", price: 39.95, purity: "99.5%",
    category: "Copper Peptide Research",
    shortDesc: "Copper tripeptide complex for in vitro ECM research.",
    description: "Copper tripeptide complex for in vitro fibroblast and extracellular matrix research.",
    batch: "GHK0426D", inStock: true,
    sizes: [{ size: "50mg", price: 39.95 }, { size: "100mg", price: 69.95 }],
  },
  {
    slug: "selank-5mg", name: "Selank", size: "5mg", price: 32.95, purity: "99.1%",
    category: "Neuropeptide Research",
    shortDesc: "Heptapeptide analogue for in vitro neuropeptide research.",
    description: "Synthetic heptapeptide analogue used in in vitro neuropeptide research.",
    batch: "SEL0426E", inStock: true,
  },
  {
    slug: "semax-5mg", name: "Semax", size: "5mg", price: 34.95, purity: "98.7%",
    category: "Neuropeptide Research",
    shortDesc: "ACTH(4-10) analogue for in vitro neuropeptide research.",
    description: "ACTH(4-10) analogue used in in vitro neuropeptide research models.",
    batch: "SEM0426F", inStock: true,
  },
  {
    slug: "pt-141-10mg", name: "PT-141 (Bremelanotide)", size: "10mg", price: 49.95, purity: "99.0%",
    category: "Melanocortin Research",
    shortDesc: "Melanocortin receptor agonist for in vitro research.",
    description: "Cyclic heptapeptide melanocortin receptor agonist for in vitro receptor research.",
    batch: "PT10426M", inStock: true,
    sizes: [{ size: "5mg", price: 29.95 }, { size: "10mg", price: 49.95 }],
  },
  {
    slug: "ss-31-5mg", name: "SS-31 (Elamipretide)", size: "5mg", price: 54.95, purity: "99.3%",
    category: "Mitochondrial Research",
    shortDesc: "Mitochondria-targeted tetrapeptide for bioenergetic research.",
    description: "Mitochondria-targeted tetrapeptide for in vitro bioenergetic research.",
    batch: "SS30426I", inStock: true,
  },
];

export const categories = [
  { slug: "gh-secretagogue", name: "GH Secretagogue Research", icon: "flask" },
  { slug: "regulatory-repair", name: "Regulatory & Repair Research", icon: "shield" },
  { slug: "neuropeptide", name: "Neuropeptide Research", icon: "brain" },
  { slug: "melanocortin", name: "Melanocortin Research", icon: "sun" },
  { slug: "copper-peptide", name: "Copper Peptide Research", icon: "atom" },
  { slug: "mitochondrial", name: "Mitochondrial Research", icon: "zap" },
];
