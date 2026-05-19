import { useCallback } from "react";
import { type Connection, reconnectEdge } from "@xyflow/react";
import type { AyahNode, GraphNode, UserEdge, UserNode } from "@/types/node";
import { createAnalysisNode } from "@/utils/nodeFactory";
import { useNahwStore } from "@/stores/useNahwStore";
import type { QuranLocation } from "@/types/shared";

const DEFAULT_W = 80;
const DEFAULT_H = 80;

function nodeCenter(n: AyahNode) {
    const w = n.measured?.width ?? n.width ?? DEFAULT_W;
    const h = n.measured?.height ?? n.height ?? DEFAULT_H;

    return {
        cx: n.position.x + w / 2,
        cy: n.position.y + h / 2,
        w,
        h,
    };
}

export const useNahwHandlers = (nodes: GraphNode[], location: QuranLocation) => {
    const store = useNahwStore(); // Helper: Only sync nodes that AREN'T the base Quran words
    const onConnect = useCallback(
        (params: Connection) => {
            const sourceNode = nodes.find((n) => n.id === params.source);
            const targetNode = nodes.find((n) => n.id === params.target);
            if (sourceNode?.type !== "ayahNode" || targetNode?.type !== "ayahNode") return;

            const s = nodeCenter(sourceNode);
            const t = nodeCenter(targetNode);

            const leftToRight = s.cx < t.cx;

            const analysisPos = {
                x: (s.cx + t.cx) / 2,
                y: 0.5 * Math.abs(sourceNode.position.x - targetNode.position.x),
            };

            const id = crypto.randomUUID();
            const analysisNodeId = `analysis-${id}`;

            const analysisNode: UserNode = createAnalysisNode(analysisNodeId, { label: "c" }, analysisPos);

            const incomingEdge: UserEdge = {
                id: `${id}-a`,
                source: leftToRight ? params.source : params.target,
                sourceHandle: "bottom",
                target: analysisNodeId,
                targetHandle: "in",
                deletable: false,
            };

            const outgoingEdge: UserEdge = {
                id: `${id}-b`,
                source: leftToRight ? params.target : params.source,
                sourceHandle: "bottom",
                target: analysisNodeId,
                targetHandle: "out",
                deletable: false,
            };
            store.saveNode(analysisNode);
            store.saveEdge(incomingEdge);
            store.saveEdge(outgoingEdge);
        },
        [nodes, store.saveNode, store.saveEdge, location],
    );

    const onReconnect = useCallback(
        (oldEdge: any, newConnection: Connection) => {
            const nextEdges = reconnectEdge(oldEdge, newConnection, store.getEdges(location));
            nextEdges.forEach((edge) => store.saveEdge(edge));
        },
        [location, store.getEdges],
    );

    const onNodeDragStop = useCallback(
        (_event: React.MouseEvent, node: GraphNode) => {
            if (node.parentId || node.type !== "ayahNode") return;

            const nodeWidth = node.measured?.width || 0;
            const nodeHeight = node.measured?.height || 0;

            const groupNode = nodes.find(
                (n) =>
                    n.type === "group" &&
                    node.position.x >= n.position.x &&
                    node.position.x + nodeWidth <= n.position.x + (n.measured?.width || 0) &&
                    node.position.y >= n.position.y &&
                    node.position.y + nodeHeight <= n.position.y + (n.measured?.height || 0),
            );

            nodes.map((n) => {
                if (n.id !== node.id) return n;
                if (groupNode) {
                    return {
                        ...n,
                        position: { x: node.position.x - groupNode.position.x, y: node.position.y - groupNode.position.y },
                        parentId: groupNode.id,
                        extent: "parent" as const,
                    };
                }
                return { ...n, parentId: undefined, extent: undefined };
            });
        },
        [nodes],
    );

    const onNodesDelete = useCallback(
        (deleted: GraphNode[]) => {
            console.log(deleted);
            // 1. Filter out the deleted nodes from the current list
            const remainingNodes = nodes.filter((n) => !deleted.some((d) => d.id === n.id));

            // 2. Handle the "un-parenting" logic for ayahNodes if their group was deleted
            remainingNodes.map((n) => {
                if (n.type === "ayahNode" && n.parentId && deleted.some((d) => d.id === n.parentId)) {
                    const deletedParent = deleted.find((d) => d.id === n.parentId);
                    return {
                        ...n,
                        parentId: undefined,
                        extent: undefined,
                        position: {
                            x: n.position.x + (deletedParent?.position.x || 0),
                            y: n.position.y + (deletedParent?.position.y || 0),
                        },
                    };
                }
                return n;
            });

            // 3. Clean up store edges if nodes are gone
            const remainingEdges = store.getEdges(location).filter((e) => !deleted.some((d) => d.id === e.source || d.id === e.target));
            remainingEdges.forEach((edge) => store.saveEdge(edge));
        },
        [nodes, location, store],
    );

    return { onConnect, onReconnect, onNodeDragStop, onNodesDelete };
};
