import { Tabs, TabsList, TabsPanel, TabsTab } from "@mantine/core";
import { useMemo, useState } from "react";
import Nahw from "@/pages/Nahw";
import Sarf from "@/pages/Sarf";
import Balagha from "@/pages/Balagha";
import { PAGE_HEADING_DATA } from "@/constants/scienceNavigator";
import Comments from "@/pages/Comments";
import { useLocationStore } from "@/stores/useLocationStore";

export default function PageNavigator() {
    const location = useLocationStore((s) => s.location);
    const [tabValue, setTabValue] = useState("نحو");
    const scienceHeadings = useMemo(
        () =>
            PAGE_HEADING_DATA.map((heading) => (
                <TabsTab key={heading.name} value={heading.name} fz={"h1"} fw={"bold"} title={heading.tooltip}>
                    {heading.name}
                </TabsTab>
            )),
        [],
    );
    return (
        <Tabs value={tabValue} onChange={(e) => (e !== null ? setTabValue(e) : null)} keepMounted={false} variant="default">
            <TabsList justify="space-evenly">{scienceHeadings}</TabsList>
            <TabsPanel value="بلاغ">
                <Balagha key={`${location.surah}-${location.ayah}`} />
            </TabsPanel>
            <TabsPanel value="نحو">
                <Nahw key={`${location.surah}-${location.ayah}`} />
            </TabsPanel>
            <TabsPanel value="صرف">{<Sarf key={`${location.surah}-${location.ayah}`} />}</TabsPanel>
            <TabsPanel value="Comments">
                <Comments key={`${location.surah}-${location.ayah}`} />
            </TabsPanel>
        </Tabs>
    );
}
