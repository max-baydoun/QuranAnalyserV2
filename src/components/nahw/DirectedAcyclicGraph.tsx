import { ControlButton, Panel } from "@xyflow/react";
import { Box, Divider, Stack, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { ConnectionMode, Controls, ReactFlow } from "@xyflow/react";
import { useNahwHandlers } from "@/hooks/useNahwHandlers";
import { ViewResetter } from "@/utils/graphUtils";
import { SentenceMenu } from "./SentenceMenu";
import { IconRowInsertBottom, IconSquareXFilled } from "@tabler/icons-react";
import { wordsToNodes } from "@/utils/nodeUtils";
import { useDisclosure } from "@mantine/hooks";
import type { Word } from "@/types/quran";
import { nodeTypes } from "@/types/nodeTypes";
import { getReactFlowColors } from "@/constants/theme";
import PanelHeading from "@/components/PanelHeading";
import { useNahwStore } from "@/stores/useNahwStore";
import { useLocationStore } from "@/stores/useLocationStore";
import { useEffect } from "react";

export default function DirectedAcyclicGraph({ words }: { words: Word[] }) {
    const location = useLocationStore((s) => s.location);
    const [opened, { open, close }] = useDisclosure(false);
    const { colorScheme } = useMantineColorScheme();
    const theme = useMantineTheme();
    const { getNodes, getEdges, setNodes, onNodesChange } = useNahwStore.getState();
    const nahwStore = useNahwStore();

    const storeNodes = nahwStore.getNodes();

    const nodes = getNodes();
    const edges = getEdges();

    useEffect(() => {
        if (storeNodes.length === 0) setNodes([...storeNodes, ...wordsToNodes(location, words)]);
    }, [location]);

    const handlers = useNahwHandlers(nodes, location);
    const reactFlowColors = getReactFlowColors(colorScheme, theme);

    return (
        <Stack p={20} h={"100%"}>
            <PanelHeading title="الرسوم البيانية للاعتماد" id={2} />
            <Divider />
            <Box w="100%" h="100%" style={{ position: "relative" }} className="reactflow-wrapper">
                <ReactFlow
                    connectionMode={ConnectionMode.Loose}
                    style={{ border: `1px solid ${reactFlowColors.primary}`, fontFamily: "Uthmani", background: `${reactFlowColors.graphBackground}` }}
                    colorMode={colorScheme === "dark" ? "dark" : "light"}
                    {...handlers}
                    onNodesChange={onNodesChange}
                    nodes={nodes}
                    edges={edges}
                    edgesReconnectable
                    connectOnClick={true}
                    onlyRenderVisibleElements={true}
                    nodeTypes={nodeTypes}
                    fitView
                >
                    <Controls style={{ backgroundColor: "red" }} orientation="horizontal" position={"bottom-left"}>
                        <ControlButton title="Clear all" onClick={() => nahwStore.clear()}>
                            <IconSquareXFilled size={20} />
                        </ControlButton>
                        <ControlButton title="Sentence labelling menu" onClick={opened ? close : open}>
                            <IconRowInsertBottom size={20} />
                        </ControlButton>
                    </Controls>
                    <ViewResetter nodes={nodes} />
                </ReactFlow>
                <Panel
                    style={{
                        width: "100%",
                        margin: 0,
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        overflow: "hidden",
                        pointerEvents: "none",
                        zIndex: 10,
                    }}
                >
                    <Box
                        style={{
                            transition: "transform 0.3s ease, opacity 0.3s ease",
                            transform: opened ? "translateY(0)" : "translateY(-100%)",
                            opacity: opened ? 1 : 0,
                            pointerEvents: opened ? "auto" : "none",
                        }}
                    >
                        <aside
                            style={{
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                            }}
                        >
                            <SentenceMenu />
                        </aside>
                    </Box>
                </Panel>
            </Box>
        </Stack>
    );
}
