import { memo } from "react";
import { Position, Handle, type NodeProps, type Node } from "@xyflow/react";
import { Box, Text } from "@mantine/core";

export type CustomNodeData = Node<{
    segments: Array<string>;
    label: string;
}>;

const AyahNode = memo(({ data }: NodeProps<CustomNodeData>) => {
    return (
        <Box bg={"secondary"} pt={"2"} pb={"5"} bd={"1px solid primary"} style={{ borderRadius: "5%" }}>
            <Box pl="sm" pr="sm">
                <Text style={{ fontSize: 40, direction: "rtl", unicodeBidi: "plaintext" }}>{data.label}</Text>
                <Handle id="bottom" type="source" position={Position.Bottom} />
            </Box>
        </Box>
    );
});

export default AyahNode;
