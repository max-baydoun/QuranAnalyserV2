import { z } from "zod";

export const SegmentSchema = z.object({
    morphTag: z.string().nullable(),
    segmentedWord: z.string(),
});

// Zod Schemas
export const WordSchema = z.object({
    wordNum: z.number(),
    word: z.string(),
    segments: z.array(SegmentSchema),
});

export const VerseSchema = z.object({
    id: z.number(),
    text: z.string(),
    words: z.array(WordSchema),
});

export const SurahSchema = z.object({
    id: z.number(),
    name: z.string(),
    transliteration: z.string(),
    type: z.enum(["meccan", "medinan"]),
    total_verses: z.number(),
    verses: z.array(VerseSchema),
});

export const QuranSchema = z.array(SurahSchema);

export const SarfAnalysisSchema = z.object({
    segmentId: z.number(),
    wordId: z.number(),
    segment: z.string(),
    word: z.string().nullable,

    // shared
    pos: z.enum(["ism", "fil", "harf"]).nullable().default(null),
    derivation: z.enum(["jamid", "mushtaq"]).nullable().default(null),
    root: z.string().nullable().default(null),
    pattern: z.enum(["I-1", "I-2", "I-3", "I-4", "I-5", "I-6", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]).nullable().default(null),
    meaning: z.string().nullable().default(null),
    notes: z.string().nullable().default(null),

    // ism-only
    ismType: z.enum(["jamid", "mushtaq", "ismFa3il", "ismMaf3ul", "sifaMushabbaha", "ismTafdeel", "masdar", "ismZaman", "ismMakan", "ismAla"]).nullable().default(null),
    gender: z.enum(["m", "f"]).nullable().default(null),
    properness: z.enum(["proper", "common"]).nullable().default(null),
    number: z.enum(["singular", "dual", "plural"]).nullable().default(null),

    // fi‘l-only
    tense: z.enum(["past", "present", "imperative"]).nullable().default(null),
    voice: z.enum(["active", "passive"]).nullable().default(null),
    person: z.enum(["1", "2", "3"]).nullable().default(null),

    // harf-only
    harfKind: z.enum(["jarr", "nasb", "jazm", "3atf", "istifham", "shart", "tawkid", "tanfis", "nafy", "istithna", "other"]).nullable().default(null),
});

// TypeScript Types (inferred from Zod)
export type Word = z.infer<typeof WordSchema>;
export type Verse = z.infer<typeof VerseSchema>;
export type Surah = z.infer<typeof SurahSchema>;
export type Quran = z.infer<typeof QuranSchema>;
export type SarfAnalysis = z.infer<typeof SarfAnalysisSchema>;
