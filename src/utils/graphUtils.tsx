import { useReactFlow } from "@xyflow/react";
import { useEffect } from "react";
import type { GraphNode } from "@/types/node";

export const ViewResetter = ({ nodes }: { nodes: GraphNode[] }) => {
    const { fitView } = useReactFlow();
    useEffect(() => {
        fitView();
    }, [nodes.length, fitView]);
    return null;
};
