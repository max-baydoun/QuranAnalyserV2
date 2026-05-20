import { useReactFlow, type XYPosition } from "@xyflow/react";
import { useCallback } from "react";
import { type OnDropAction, useDnD } from "@/hooks/useDnD";
import { Box, Text } from "@mantine/core";
import { createGroupNode } from "@/utils/nodeFactory";
import { useNahwStore } from "@/stores/useNahwStore";

export function SentenceMenu() {
    const saveNode = useNahwStore((s) => s.saveNode);
    const { onDragStart, setType } = useDnD();
    const { setNodes } = useReactFlow();
    const getId = () => `group-${id++}`;
    let id = 0;

    const createAddNewNode = useCallback(
        (nodeType: string): OnDropAction => {
            return ({ position }: { position: XYPosition }) => {
                const newNode = createGroupNode(getId(), { label: nodeType === "ismi" ? "جملة إسمية" : "جملة فعلية" }, position);
                setNodes((nds) => nds.concat(newNode));
                saveNode(newNode);
                setType(null);
            };
        },
        [setNodes, setType],
    );

    return (
        <Box bg="secondary" bd={"1px solid primary"} style={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
            <Text size="xs" fz={"md"} p="md" ta="center">
                Sentence level labels
            </Text>
            <Box style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                {["ismi", "fili"].map((nodeType) => (
                    <Box
                        key={nodeType}
                        onPointerDown={(event) => {
                            setType(nodeType);
                            onDragStart(event, createAddNewNode(nodeType));
                        }}
                        w={"fit-content"}
                        bd={"1px solid primary"}
                        bg={"accent"}
                        p={5}
                        style={{
                            borderRadius: 6,
                            cursor: "grab",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            touchAction: "none",
                        }}
                    >
                        <Text fz={"lg"} fw={500}>
                            {nodeType === "ismi" ? "جملة إسمية" : "جملة فعلية"}
                        </Text>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
