import type { Word } from "@/types/quran";
import { createAyahNode } from "./nodeFactory";
import type { AyahNode } from "@/types/node";
import type { QuranLocation } from "@/types/shared";

export const wordsToNodes = (location: QuranLocation, words: Word[]): AyahNode[] => {
    return words.map((word, i) => createAyahNode(`${location.surah}-${location.ayah}-${i + 1}`, { label: word.word, segments: word.segments }, { x: 150 * i, y: 0 }));
};
