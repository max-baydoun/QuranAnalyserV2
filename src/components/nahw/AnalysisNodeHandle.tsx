import { Handle, useNodeConnections } from "@xyflow/react";

export default function AnalysisNodeHandle(props: { type: "source" | "target"; position: any; id: string; connectioncount: number }) {
    const connections = useNodeConnections({
        handleType: props.type,
        handleId: props.id,
    });

    return <Handle {...props} isConnectable={connections.length < props.connectioncount} />;
}
