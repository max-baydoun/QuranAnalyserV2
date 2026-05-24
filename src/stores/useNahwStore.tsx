import { useLocationStore } from "@/stores/useLocationStore";
import type { GraphNode, UserEdge, UserNode } from "@/types/node";
import type { QuranLocation } from "@/types/shared";
import type { UserIraab } from "@/types/traditionalIraabType";
import { applyNodeChanges, type OnNodesChange } from "@xyflow/react";
import { create } from "zustand";

export type QuranicKey = `${number}-${number}`;
export const makeQuranicKey = (location: QuranLocation): QuranicKey => `${location.surah}-${location.ayah}`;

export type GraphHandlers = (() => void)[];

export type AyahData = {
    nodes: GraphNode[];
    edges: UserEdge[];
    iraab: UserIraab[];
};

type NahwStore = {
    data: Record<QuranicKey, AyahData>;

    setNodes: (nodes: GraphNode[]) => void;
    saveNode: (newNode: GraphNode) => void;
    deleteNode: (deletedNode: UserNode) => void;
    onNodesChange: OnNodesChange<GraphNode>;

    saveEdge: (newEdges: UserEdge) => void;
    saveIraabItem: (lnewIraab: UserIraab) => void;
    clear: () => void;

    getNodes: () => GraphNode[];
    getEdges: () => UserEdge[];
    getIraab: () => UserIraab[];
};

export const useNahwStore = create<NahwStore>((set, get) => ({
    data: {},
    onNodesChange: (changes) => {
        const key = makeQuranicKey(useLocationStore.getState().location);
        set((state) => ({
            data: {
                ...state.data,
                [key]: {
                    nodes: applyNodeChanges(changes, get().data[key].nodes),
                    edges: state.data[key] ? state.data[key].edges : [],
                    iraab: state.data[key] ? state.data[key].iraab : [],
                },
            },
        }));
    },

    setNodes: (nodes) => {
        const key = makeQuranicKey(useLocationStore.getState().location);
        set((state) => ({
            data: {
                ...state.data,
                [key]: {
                    nodes: nodes,
                    edges: state.data[key] ? state.data[key].edges : [],
                    iraab: state.data[key] ? state.data[key].iraab : [],
                },
            },
        }));
    },
    saveNode: (newNode) => {
        const key = makeQuranicKey(useLocationStore.getState().location);

        set((state) => {
            const existing = state.data[key] ?? { nodes: [], edges: [], iraab: [] };
            console.log(state);
            const nodes = state.data[key].nodes ?? {};

            const idx = nodes.findIndex((n) => n.id === newNode.id);

            // If it does not exist: add it
            if (idx === -1) {
                return {
                    data: {
                        ...state.data,
                        [key]: {
                            ...existing,
                            nodes: [...nodes, newNode],
                        },
                    },
                };
            }

            const nextNodes = [...nodes];
            nextNodes[idx] = { ...nodes[idx], ...newNode };
            return {
                data: {
                    ...state.data,
                    [key]: {
                        ...existing,
                        nodes: nextNodes,
                    },
                },
            };
        });
    },

    deleteNode: (deletedNode) => {
        const key = makeQuranicKey(useLocationStore.getState().location);

        set((state) => {
            const existing = state.data[key];
            if (!existing) return state;

            return {
                data: {
                    ...state.data,
                    [key]: {
                        ...existing,
                        nodes: (existing.nodes ?? []).filter((n) => n.id !== deletedNode.id),
                    },
                },
            };
        });
    },

    saveEdge: (newEdge) => {
        const key = makeQuranicKey(useLocationStore.getState().location);

        set((state) => {
            const existing = state.data[key] ?? { nodes: [], edges: [], iraab: [] };
            const edges = existing.edges ?? [];

            const idx = edges.findIndex((e) => e.id === newEdge.id);

            // add
            if (idx === -1) {
                return {
                    data: {
                        ...state.data,
                        [key]: {
                            ...existing,
                            edges: [...edges, newEdge],
                        },
                    },
                };
            }

            // update/merge
            const nextEdges = [...edges];
            nextEdges[idx] = { ...edges[idx], ...newEdge };

            return {
                data: {
                    ...state.data,
                    [key]: {
                        ...existing,
                        edges: nextEdges,
                    },
                },
            };
        });
    },

    saveIraabItem: (newItem) => {
        const key = makeQuranicKey(useLocationStore.getState().location);

        set((state) => {
            const existing = state.data[key] ?? { nodes: [], edges: [], iraab: [] };
            const iraab = existing.iraab ?? [];

            const idx = iraab.findIndex((x) => x.id === newItem.id);

            // add
            if (idx === -1) {
                return {
                    data: {
                        ...state.data,
                        [key]: {
                            ...existing,
                            iraab: [...iraab, newItem],
                        },
                    },
                };
            }

            // update/merge
            const nextIraab = [...iraab];
            nextIraab[idx] = { ...iraab[idx], ...newItem };

            return {
                data: {
                    ...state.data,
                    [key]: {
                        ...existing,
                        iraab: nextIraab,
                    },
                },
            };
        });
    },

    getNodes: () => {
        const key = makeQuranicKey(useLocationStore.getState().location);
        const store = get().data[key];
        if (store === undefined) return [];
        return store.nodes;
    },

    getEdges: () => {
        const key = makeQuranicKey(useLocationStore.getState().location);
        const store = get().data[key];
        if (store === undefined) return [];
        return store.edges;
    },

    getIraab: () => {
        const key = makeQuranicKey(useLocationStore.getState().location);
        const store = get().data[key];
        if (store === undefined) return [];
        return store.iraab;
    },

    clear: () => {
        const key = makeQuranicKey(useLocationStore.getState().location);

        set((state) => {
            const existing = state.data[key];
            if (!existing) return state;

            return {
                data: {
                    ...state.data,
                    [key]: {
                        ...existing,
                        nodes: existing.nodes.filter((node) => node.type === "ayahNode"),
                        edges: [],
                    },
                },
            };
        });
    },
}));
