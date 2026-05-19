import quranJson from "../assets/finalSegmentedQuran.json";
import { QuranSchema, type Quran } from "@/types/quran";

export const quran: Quran = QuranSchema.parse(quranJson);

export const randomiseVerse = () => {
    const randomSurah = Math.round(113 * Math.random()) + 1;
    const totalVerseCount = quran.find((surah) => surah.id === randomSurah)?.total_verses ?? 1;
    const randomAyah = Math.round((totalVerseCount - 1) * Math.random()) + 1;
    return { surah: randomSurah, ayah: randomAyah };
};
