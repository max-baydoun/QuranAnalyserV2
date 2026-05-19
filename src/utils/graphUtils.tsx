import { useReactFlow } from "@xyflow/react";
import { useEffect } from "react";
import type { CustomNode } from "@/types/node";

export const ViewResetter = ({ nodes }: { nodes: CustomNode[] }) => {
    const { fitView } = useReactFlow();
    useEffect(() => {
        fitView();
    }, [nodes.length, fitView]);
    return null;
};
