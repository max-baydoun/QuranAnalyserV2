// Keep the original
export interface QuranLocation {
    surah: number;
    ayah: number;
}

// Add a new wrapper for components
export interface QuranLocationProps {
    location: QuranLocation;
}

// export type QuranKey = `${number}:${number}`;

// export const makeQuranKey = (surah: number, ayah: number): QuranKey => `${surah}:${ayah}`;
