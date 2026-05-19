import type { SarfAnalysis } from "@/types/quran";

export function normalizeSarfRowAfterPosChange(row: SarfAnalysis): SarfAnalysis {
    if (row.pos === "ism") {
        return {
            ...row,
            // clear verb-only
            tense: null,
            voice: null,
            person: null,
            // clear harf-only
            harfKind: null,
        };
    }

    if (row.pos === "fil") {
        return {
            ...row,
            // clear ism-only
            ismType: null,
            gender: null,
            properness: null,
            number: null,
            // clear harf-only
            harfKind: null,
        };
    }

    if (row.pos === "harf") {
        return {
            ...row,
            // clear ism-only
            ismType: null,
            gender: null,
            properness: null,
            number: null,
            // clear verb-only
            tense: null,
            voice: null,
            person: null,
            // optional: derivation/pattern usually not applicable to harf
            derivation: null,
            pattern: null,
            root: null,
        };
    }

    // pos is null/unknown
    return row;
}
