export const VIEWS = ["all", "ism", "fil", "harf"] as const;
export type SarfView = (typeof VIEWS)[number];
