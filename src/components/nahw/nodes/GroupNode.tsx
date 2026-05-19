import { NodeResizer } from "@xyflow/react";
import type { NodeProps } from "@xyflow/react";
import type { GroupNode } from "@/types/node";
import { Box, Text } from "@mantine/core";

export default function GroupNode({ data, selected }: NodeProps<GroupNode>) {
    return (
        <Box bg="accent" bd="1px solid primary" h={"fit-content"}>
            <NodeResizer minWidth={100} minHeight={60} isVisible={selected} />

            <Text className="drag-handle" fz="xl" fw={500} ff="Uthmani" ta="center">
                {data.label}
            </Text>
        </Box>
    );
}
