import { Stack, Text } from "@mantine/core";
import { quran } from "@/utils/quranData";
import { convertToArabicNumbers } from "@/utils/shared";
import { MobileQuranNavigator } from "@/components/QuranNavigator";
import { useLocationStore } from "@/stores/useLocationStore";

export default function Verse() {
    const surah = useLocationStore((s) => s.location.surah);
    const ayah = useLocationStore((s) => s.location.ayah);
    return (
        <Stack p={10} h={"95%"} align="center">
            <MobileQuranNavigator />
            <Text
                bd={"1px solid divider"}
                bg={"graphBackground"}
                p={30}
                display={"flex"}
                style={{ overflowY: "auto", alignItems: "center", justifyContent: "center" }}
                h={"100%"}
                fz={"2rem"}
                ta={"center"}
                dir="rtl"
            >
                {quran[surah - 1].verses[ayah - 1].text} {convertToArabicNumbers(ayah)}
            </Text>
        </Stack>
    );
}
