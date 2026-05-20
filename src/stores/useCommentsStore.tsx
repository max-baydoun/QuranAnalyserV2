import { useLocationStore } from "@/stores/useLocationStore";
import { makeQuranicKey, type QuranicKey } from "@/stores/useNahwStore";
import { create } from "zustand";

type CommentsStore = {
    data: Record<QuranicKey, string>;
    getComment: () => string;
    saveComment: (newComment: string) => void;
};

export const useCommentsStore = create<CommentsStore>((set, get) => ({
    data: {},
    getComment: () => {
        const key = makeQuranicKey(useLocationStore.getState().location);
        const store = get().data[key];
        if (store === undefined) return "";
        return store;
    },
    saveComment: (newComment: string) => {
        const key = makeQuranicKey(useLocationStore.getState().location);
        set(() => ({
            data: {
                [key]: newComment,
            },
        }));
    },
}));
