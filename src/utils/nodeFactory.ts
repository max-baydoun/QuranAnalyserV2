import type { AyahNode, AnalysisNode, GroupNode, AyahNodeData, AnalysisNodeData, GroupNodeData } from "@/types/node";

export const createAyahNode = (id: string, data: AyahNodeData, position: { x: number; y: number }): AyahNode => ({
    id,
    type: "ayahNode",
    position,
    data,
    deletable: false,
    parentId: undefined,
    zIndex: 1000,
});

export const createAnalysisNode = (id: string, data: AnalysisNodeData, position: { x: number; y: number }, parentId?: string): AnalysisNode => ({
    id,
    type: "analysis",
    position,
    data,
    parentId: parentId,
});

export const createGroupNode = (id: string, data: GroupNodeData, position: { x: number; y: number }): GroupNode => ({
    id,
    type: "group",
    position,
    data,
    zIndex: -1,
});
