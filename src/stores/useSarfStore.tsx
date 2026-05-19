import { useLocationStore } from "@/stores/useLocationStore";
import { makeQuranicKey, type QuranicKey } from "@/stores/useNahwStore";
import type { SarfAnalysis } from "@/types/quran";
import { create } from "zustand";

type SarfStore = {
    data: Record<QuranicKey, SarfAnalysis[]>;
    getRows: () => SarfAnalysis[];
    saveVerseAnalysis: (newRows: SarfAnalysis[]) => void;
    saveRow: (newRow: SarfAnalysis) => void;
};

export const useSarfStore = create<SarfStore>((set, get) => ({
    data: {},
    getRows: () => {
        const key = makeQuranicKey(useLocationStore.getState().location);
        const store = get().data[key];
        if (store === undefined) return [];
        return store;
    },
    saveVerseAnalysis: (newRows) => {
        const key = makeQuranicKey(useLocationStore.getState().location);
        set((state) => ({
            data: {
                ...state.data,
                [key]: newRows,
            },
        }));
    },
    saveRow: (newRow) => {
        const key = makeQuranicKey(useLocationStore.getState().location);
        const oldRowIndex = get().data[key].findIndex((row) => row.segmentId === newRow.segmentId && row.wordId === newRow.wordId, 0);
        set((state) => ({
            data: {
                ...state.data,
                [key]: get().data[key].map((row, index) => {
                    if (index === oldRowIndex) return newRow;
                    return row;
                }),
            },
        }));
    },
}));
