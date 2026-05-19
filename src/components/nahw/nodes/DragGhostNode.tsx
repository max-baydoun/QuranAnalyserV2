import { Box, Text } from "@mantine/core";
import { useDnD, useDnDPosition } from "@/hooks/useDnD";

export function DragGhostNode() {
    const { position } = useDnDPosition();
    const { type } = useDnD();

    if (!position) return null;

    const label = type === "ismi" ? "جملة إسمية" : type === "fili" ? "جملة فعلية" : "مجموعة";

    return (
        <Box
            pos="fixed"
            p="sm"
            bg="accent"
            bd="1px solid primary"
            style={{
                borderRadius: 6,
                transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -80%)`,
                zIndex: 99999,
                pointerEvents: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                top: 0,
                left: 0,
            }}
        >
            <Text size="lg" fw={500}>
                {label}
            </Text>
        </Box>
    );
}
