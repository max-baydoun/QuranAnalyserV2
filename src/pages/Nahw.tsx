import { ReactFlowProvider } from "@xyflow/react";
import { Stack, Text, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import "@xyflow/react/dist/style.css";
import { DnDProvider, useDnD } from "@/hooks/useDnD";
import { DragGhostNode } from "@/components/nahw/nodes/DragGhostNode";
import { Group, Panel, Separator, usePanelRef } from "react-resizable-panels";
import TraditionalIraabView from "@/components/nahw/TraditionalIraabView";
import { useState } from "react";
import DirectedAcyclicGraph from "@/components/nahw/DirectedAcyclicGraph";
import { quran } from "@/utils/quranData";
import { getReactFlowColors } from "@/constants/theme";
import { useLocationStore } from "@/stores/useLocationStore";

function NahwPage() {
    const { surah, ayah } = useLocationStore.getState().location;
    const verse = quran[surah - 1].verses[ayah - 1];
    const words = [...verse.words].reverse();
    const dagGraphPanelRef = usePanelRef();
    const [isDagGraphCollapsed, setIsDagGraphCollapsed] = useState(false);
    const traditionalIraabPanelRef = usePanelRef();
    const [isTraditionalIraabCollapsed, setIsTraditionalIraabCollapsed] = useState(false);
    const { isDragging } = useDnD();
    const { colorScheme } = useMantineColorScheme();
    const theme = useMantineTheme();
    const reactFlowColors = getReactFlowColors(colorScheme, theme);

    return (
        <Stack w={"100%"} h={"85vh"}>
            <Group orientation="vertical">
                {isDragging && <DragGhostNode />}
                <Panel
                    panelRef={dagGraphPanelRef}
                    collapsedSize={90}
                    collapsible
                    minSize={100}
                    onResize={() => {
                        setIsDagGraphCollapsed(dagGraphPanelRef.current?.isCollapsed() ?? false);
                    }}
                >
                    {isDagGraphCollapsed ? (
                        <Text
                            p="sm"
                            ta="center"
                            style={{ cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center" }}
                            onClick={() => {
                                dagGraphPanelRef.current?.expand();
                            }}
                            fz={50}
                            h={"100%"}
                        >
                            الرسوم البيانية للاعتماد
                        </Text>
                    ) : (
                        <DirectedAcyclicGraph words={words} />
                    )}
                </Panel>
                <Separator
                    style={{
                        height: "3px",
                        backgroundColor: "divider",
                        cursor: "row-resize",
                        background: `${reactFlowColors.divider}`,
                    }}
                />
                <Panel
                    panelRef={traditionalIraabPanelRef}
                    collapsedSize={110}
                    collapsible
                    minSize={120}
                    onResize={() => {
                        setIsTraditionalIraabCollapsed(traditionalIraabPanelRef.current?.isCollapsed() ?? false);
                    }}
                >
                    {isTraditionalIraabCollapsed ? (
                        <Text
                            p="sm"
                            ta="center"
                            style={{ cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center" }}
                            onClick={() => {
                                traditionalIraabPanelRef.current?.expand();
                            }}
                            fz={50}
                            h={"100%"}
                        >
                            الإعراب
                        </Text>
                    ) : (
                        <TraditionalIraabView words={words} />
                    )}
                </Panel>
            </Group>
        </Stack>
    );
}

export default function Nahw() {
    return (
        <ReactFlowProvider>
            <DnDProvider>
                <NahwPage />
            </DnDProvider>
        </ReactFlowProvider>
    );
}
