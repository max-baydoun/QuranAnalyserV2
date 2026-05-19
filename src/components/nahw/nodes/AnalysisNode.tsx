import { Box, TextInput } from "@mantine/core";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import AnalysisNodeHandle from "@/components/nahw/AnalysisNodeHandle";

export default function AnalysisNode({ id, data }: { id: string; data: any }) {
    const { setNodes } = useReactFlow();

    const [value, setValue] = useState(data?.label ?? "");

    // hidden span for real text measurement
    const spanRef = useRef<HTMLSpanElement>(null);
    const [width, setWidth] = useState(24);

    // measure rendered width
    useLayoutEffect(() => {
        if (!spanRef.current) return;
        setWidth(spanRef.current.offsetWidth + 16); // padding buffer
    }, [value]);

    // persist label into node state
    useEffect(() => {
        setNodes((nds) => nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, label: value } } : n)));
    }, [value, id, setNodes]);

    return (
        <Box
            bg={"graphBackground"}
            pos={"relative"}
            display={"inline-flex"}
            bd={"4px solid primary"}
            style={{
                borderRadius: "5px",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "all",
            }}
        >
            {/* 🔹 hidden measuring span */}
            <span
                ref={spanRef}
                style={{
                    position: "absolute",
                    visibility: "hidden",
                    whiteSpace: "pre",

                    fontSize: 14,
                    direction: "rtl",
                    unicodeBidi: "plaintext",
                }}
            >
                {value || " "}
            </span>

            {/* 🔹 actual input */}
            <TextInput
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
                className="nodrag nopan"
                styles={{
                    input: {
                        width,
                        minWidth: 12,
                        padding: 0,
                        border: "none",
                        background: "transparent",
                        textAlign: "center",

                        // RTL correctness
                        direction: "rtl",
                        unicodeBidi: "plaintext",
                    },
                }}
            />

            {/* 🔹 handles */}
            <AnalysisNodeHandle type="target" connectioncount={1} position={Position.Left} id="in" />
            <AnalysisNodeHandle type="source" connectioncount={1} position={Position.Right} id="out" />
            <Handle type="source" position={Position.Bottom} id="in-group" />
        </Box>
    );
}
