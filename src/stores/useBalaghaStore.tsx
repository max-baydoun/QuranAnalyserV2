import { useLocationStore } from "@/stores/useLocationStore";
import { makeQuranicKey, type QuranicKey } from "@/stores/useNahwStore";
import type { BalaghaState } from "@/types/balagha";
import { create } from "zustand";

type BalaghaStore = {
    data: Record<QuranicKey, BalaghaState[]>;
    getBalagha: () => BalaghaState[];
    saveEntry: (newBalagha: BalaghaState) => void;
    deleteEntry: (entry: BalaghaState) => void;
};

export const useBalaghaStore = create<BalaghaStore>((set, get) => ({
    data: {},
    getBalagha: () => {
        const key = makeQuranicKey(useLocationStore.getState().location);
        const store = get().data[key];
        if (store === undefined) return [];
        return store;
    },
    saveEntry: (newBalagha) => {
        const key = makeQuranicKey(useLocationStore.getState().location);
        const store = get().data[key];
        console.log(store, newBalagha);
        if (store === undefined) {
            set((state) => ({
                data: {
                    ...state.data,
                    [key]: [newBalagha],
                },
            }));
        } else {
            const oldEntryIndex = store.findIndex((entry) => entry.id === newBalagha.id, 0);
            const newArray =
                oldEntryIndex === -1
                    ? [...store, newBalagha]
                    : store.map((entry, index) => {
                          if (index === oldEntryIndex) return newBalagha;
                          return entry;
                      });
            console.log(oldEntryIndex);
            set((state) => ({
                data: {
                    ...state.data,
                    [key]: newArray,
                },
            }));
        }
    },
    deleteEntry: (oldEntry) => {
        const key = makeQuranicKey(useLocationStore.getState().location);
        const oldEntryIndex = get().data[key].findIndex((entry) => entry.id === oldEntry.id, 0);
        const newArray = get().data[key];
        newArray.splice(oldEntryIndex, 1);
        set((state) => ({
            data: {
                ...state.data,
                [key]: newArray,
            },
        }));
    },
}));
