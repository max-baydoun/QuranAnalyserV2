import type { QuranLocation } from "@/types/shared";
import { create } from "zustand";

type LocationStore = {
    location: QuranLocation;
    setLocation: (surah: number, ayah: number) => void;
    setSurah: (surah: number) => void;
    setAyah: (ayah: number) => void;
};

export const useLocationStore = create<LocationStore>((set) => ({
    location: {
        surah: 1,
        ayah: 1,
    },
    setLocation: (surah, ayah) => set({ location: { surah, ayah } }),
    setSurah: (surah) => set((state) => ({ location: { ...state.location, surah } })),
    setAyah: (ayah) => set((state) => ({ location: { ...state.location, ayah } })),
}));
