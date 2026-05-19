import type { Edge, Node } from "@xyflow/react";

export type AyahNodeData = {
    label?: string;
    segments: {
        morphTag: string | null;
        segmentedWord: string;
    }[];
    width?: number;
    height?: number;
};

export type AnalysisNodeData = {
    label?: string;
};

export type GroupNodeData = {
    label: string;
};

export type AyahNode = Node<AyahNodeData, "ayahNode">;
export type AnalysisNode = Node<AnalysisNodeData, "analysis">;
export type GroupNode = Node<GroupNodeData, "group">;
export type UserNode = AnalysisNode | GroupNode;
export type GraphNode = AyahNode | UserNode;

export type CustomEdge = Edge;
export type UserEdge = CustomEdge;
