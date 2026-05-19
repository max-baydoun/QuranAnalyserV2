// utils/flowStorage.ts
const STORAGE_KEY = "nahw-flow-state";

export const saveFlowToStorage = (surah: number, ayah: number, nodes: any[], edges: any[]) => {
    const key = `${STORAGE_KEY}-${surah}-${ayah}`;
    localStorage.setItem(key, JSON.stringify({ nodes, edges }));
};

export const loadFlowFromStorage = (surah: number, ayah: number) => {
    const key = `${STORAGE_KEY}-${surah}-${ayah}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
};

export const clearFlowStorage = (surah: number, ayah: number) => {
    const key = `${STORAGE_KEY}-${surah}-${ayah}`;
    localStorage.removeItem(key);
};
