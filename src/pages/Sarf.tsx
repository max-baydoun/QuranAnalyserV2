import { useEffect, useMemo, useState, type RefAttributes } from "react";
import { MantineReactTable, MRT_EditActionButtons, useMantineReactTable, type MRT_ColumnFiltersState } from "mantine-react-table";
import { quran } from "@/utils/quranData";
import { Box, Divider, Flex, Stack, Tabs, TabsList, TabsTab, TextInput, Title, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import type { QuranLocationProps } from "@/types/shared";
import { getFontSize, getReactFlowColors } from "@/constants/theme";
import PanelHeading from "@/components/PanelHeading";
import { IconPencil, type IconProps } from "@tabler/icons-react";
import type { JSX } from "react/jsx-runtime";
import { filColumns, harfColumns, ismColumns, makeBlankSarfRow, sharedColumns } from "@/constants/sarfTableConstants";
import { type SarfView } from "@/types/sarf/sarfTypes";
import { useSarfStore } from "@/stores/useSarfStore";

export default function Sarf({ location }: QuranLocationProps) {
    const verse = quran[location.surah - 1].verses[location.ayah - 1];
    const [view, setView] = useState<SarfView>("all");
    const { getRows, saveRow, saveVerseAnalysis } = useSarfStore.getState();
    const storedRows = getRows();

    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const reactFlowColors = getReactFlowColors(colorScheme, theme);

    useEffect(() => {
        if (storedRows.length === 0) {
            saveVerseAnalysis(
                verse.words.flatMap((word, i) => {
                    return word.segments.map((_, j) => {
                        return makeBlankSarfRow(1 + i, 1 + j, word);
                    });
                }),
            );
        }
    }, [location]);

    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
    const columns = useMemo(() => {
        if (view === "all") setColumnFilters([]);
        else setColumnFilters([{ id: "pos", value: view }]);
        if (view === "ism") return [...sharedColumns, ...ismColumns];
        if (view === "fil") return [...sharedColumns, ...filColumns];
        if (view === "harf") return [...sharedColumns, ...harfColumns];
        return [...sharedColumns];
    }, [view]);

    const table = useMantineReactTable({
        columns: columns,
        data: storedRows,
        state: { columnFilters },
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: 5,
            },
        },
        columnResizeMode: "onChange",
        onColumnFiltersChange: setColumnFilters,
        enableColumnFilters: true,
        enableSorting: false,
        enableBottomToolbar: false,
        enableTopToolbar: false,
        enableEditing: true,
        enablePagination: false,
        enableColumnActions: false,
        editDisplayMode: "table", // or 'row', 'modal', 'table', 'cell'
        layoutMode: "grid",
        icons: {
            IconEdit: (props: JSX.IntrinsicAttributes & IconProps & RefAttributes<SVGSVGElement>) => <IconPencil color={reactFlowColors.secondary} {...props} />,
        },
        mantineTableContainerProps: {
            style: {
                overflow: "auto",
                width: "100%",
                height: "50vh",
                background: reactFlowColors.graphBackground,
            },
        },
        mantineEditSelectProps: ({ cell, row }) => ({
            styles: {
                input: {
                    textAlign: "center",
                    fontSize: "1.5rem",
                    width: "100%",
                    height: "100%",
                    paddingRight: 10,
                    overflow: "clip",
                },
            },
            clearable: true,
            onChange: (value) => {
                const rowIndex = parseInt(row.id);
                const columnId = cell.column.id;
                const newData = getRows();
                console.log(newData[rowIndex]);
                newData[rowIndex] = { ...newData[rowIndex], [columnId]: value };
                console.log(newData[rowIndex]);
                saveRow(newData[rowIndex]);
                console.log(newData);
            },
        }),
        mantineEditTextInputProps: ({ cell, row }) => ({
            styles: {
                input: {
                    textAlign: "center",
                    fontSize: "1.5rem",
                    width: "100%",
                    height: "100%",
                },
            },
            onChange: (event) => {
                const newValue = event.currentTarget.value;
                const rowIndex = row.index;
                const columnId = cell.column.id;
                const newData = getRows();
                console.log(newData[rowIndex]);
                newData[rowIndex] = { ...newData[rowIndex], [columnId]: newValue };
                console.log(newData[rowIndex]);
                saveRow(newData[rowIndex]);
            },
        }),
        mantineTableBodyCellProps: () => ({
            style: {
                fontSize: getFontSize,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: 0, // important trick for ellipsis in table cells
                direction: "rtl",
            },
        }),
        mantineTableHeadCellProps: () => ({
            // p: 50,
            //         ta: "center",
            //         fz: "1.5rem",
            styles: {
                th: {
                    fontSize: "1.5rem",
                    textAlign: "center",
                    padding: 5,
                    border: "1px solid black",
                },
            },
        }),
        mantineCreateRowModalProps: {
            style: {
                backgroundColor: "green",
            },
        },
        mantineTableProps: {
            style: {
                direction: "rtl",
                tableLayout: "fixed",
            },
        },
        // renderEditRowModalContent: ({ row, table }) => (
        //     <Stack>
        //         <Title order={1} ta={"right"}>
        //             صَرفُ الكَلَامِ
        //         </Title>

        //         {row.getAllCells().map((cell) => (
        //             <TextInput key={cell.id} label={cell.column.columnDef.header} defaultValue={cell.getValue() as string} ff="Uthmani" fz="df" />
        //         ))}

        //         <Flex justify="space-evenly">
        //             <MRT_EditActionButtons row={row} table={table} variant="text" />
        //         </Flex>
        //     </Stack>
        // ),
        // mantineEditRowModalProps: {
        //     style: {
        //         color: reactFlowColors.text,
        //     },
        //     styles: {
        //         content: {
        //             backgroundColor: reactFlowColors.secondary,
        //             border: `1px solid ${reactFlowColors.divider[0]}`,
        //         },
        //         header: {
        //             backgroundColor: reactFlowColors.secondary[0],
        //         },
        //         body: {
        //             backgroundColor: reactFlowColors.secondary[0],
        //         },
        //     },
        // },
    });

    return (
        <Stack p={20} w={"100%"} h={"100%"} style={{ overflow: "auto" }}>
            <PanelHeading title="صرف الأية" id={4} />
            <Divider />
            <Tabs
                value={view}
                onChange={(v) => {
                    if (!v) return;
                    setView(v as SarfView);
                }}
            >
                <TabsList>
                    <TabsTab fz={"df"} value="all">
                        All
                    </TabsTab>
                    <TabsTab fz={"df"} value="ism">
                        اسم
                    </TabsTab>
                    <TabsTab fz={"df"} value="fil">
                        فعل
                    </TabsTab>
                    <TabsTab fz={"df"} value="harf">
                        حرف
                    </TabsTab>
                </TabsList>
            </Tabs>
            <Box h={"100%"}>
                <MantineReactTable table={table} />
            </Box>
        </Stack>
    );
}
