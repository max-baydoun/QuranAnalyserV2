import { useEffect, useState } from "react";
import type { Edge } from "@xyflow/react";
import { loadFlowFromStorage, saveFlowToStorage } from "@/utils/flowStorage";
import type { GraphNode } from "@/types/node";
import type { QuranLocation } from "@/types/shared";

export const useNahwPersistence = (
    location: QuranLocation,
    initialNodes: GraphNode[],
    setNodes: React.Dispatch<React.SetStateAction<GraphNode[]>>,
    setEdges: React.Dispatch<React.SetStateAction<Edge[]>>,
    nodes: GraphNode[],
    edges: Edge[],
) => {
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount or when verse changes
    useEffect(() => {
        const saved = loadFlowFromStorage(location.surah, location.ayah);

        if (saved && saved.nodes.length > 0) {
            // Restore saved state
            setNodes(saved.nodes);
            setEdges(saved.edges);
        } else {
            // Initialize with default word nodes
            setNodes(initialNodes);
            setEdges([]);
        }

        setIsLoaded(true);
    }, [location.surah, location.ayah]);

    // Save to localStorage whenever nodes or edges change
    useEffect(() => {
        if (!isLoaded) return; // Don't save during initial load

        // Debounce to avoid too many writes
        const timeoutId = setTimeout(() => {
            saveFlowToStorage(location.surah, location.ayah, nodes, edges);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [nodes, edges, location.surah, location.ayah, isLoaded]);

    return { isLoaded };
};
