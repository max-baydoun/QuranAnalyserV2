import type { MantineColorsTuple } from "@mantine/core";

const createColorTuple = (color: string): MantineColorsTuple => Array(10).fill(color) as unknown as MantineColorsTuple;

export const primaryDark = createColorTuple("#96c4d4");
export const secondaryDark = createColorTuple("#314a79");
export const accentDark = createColorTuple("#5d7abd");
export const textDark = createColorTuple("#e9f3f6");
export const backgroundDark = createColorTuple("#0a1619");
export const dividerDark = createColorTuple("#96c5d4");
export const graphBackgroundDark = createColorTuple("#314a7733");
export const buttonDark = createColorTuple("#314a7733");

export const primaryLight = createColorTuple("#1a1c1d");
export const secondaryLight = createColorTuple("#88a0ce");
export const accentLight = createColorTuple("#435fa3");
export const textLight = createColorTuple("#0a171a");
export const backgroundLight = createColorTuple("#e5f2f5");
export const dividerLight = createColorTuple("#2b5969");
export const graphBackgroundLight = createColorTuple("#88a0ce33");
export const buttonLight = createColorTuple("#88a0ce33");
