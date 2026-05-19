import type { SarfAnalysis, Word } from "@/types/quran";
import type { MRT_ColumnDef } from "mantine-react-table";

export const SELECT_COLUMNS = new Set(["pos", "derivation", "pattern"]);
export const makeBlankSarfRow = (segmentId: number, wordId: number, w: Word): SarfAnalysis => ({
    segmentId: segmentId,
    wordId: wordId,
    segment: w.word,
    word: null,

    // shared
    pos: null,
    derivation: null,
    root: null,
    pattern: null,
    meaning: null,
    notes: null,

    // ism-only
    ismType: null,
    gender: null,
    properness: null,
    number: null,

    // fi‘l-only
    tense: null,
    voice: null,
    person: null,

    // harf-only
    harfKind: null,
});

export const sharedColumns: MRT_ColumnDef<SarfAnalysis>[] = [
    { accessorKey: "wordId", header: "Word ID", enableEditing: false },
    { accessorKey: "segmentId", header: "Segment ID", enableEditing: false },
    { accessorKey: "segment", header: "Segment", enableEditing: false },
    { accessorKey: "word", header: "Word", editVariant: "text" },
    {
        accessorKey: "pos",
        header: "POS",
        editVariant: "select",
        mantineEditSelectProps: {
            data: [
                { value: "ism", label: "اسم" },
                { value: "fil", label: "فعل" },
                { value: "harf", label: "حرف" },
            ],
            searchable: false,
        },
    },
    {
        accessorKey: "derivation",
        header: "Jāmid/Mushtaq",
        editVariant: "select",
        mantineEditSelectProps: {
            data: [
                { value: "jamid", label: "Jāmid (جامد)" },
                { value: "mushtaq", label: "Mushtaq (مشتق)" },
            ],
            clearable: true,
        },
    },
    { accessorKey: "root", header: "Root" },
    {
        accessorKey: "pattern",
        header: "Pattern",
        editVariant: "select",
        mantineEditSelectProps: {
            searchable: true,
            clearable: true,
            data: [
                { value: "I-1", label: "I-1 — Form I (نَصَرَ)" },
                { value: "I-2", label: "I-2 — Form I (ضَرَبَ)" },
                { value: "I-3", label: "I-3 — Form I (فَتَحَ)" },
                { value: "I-4", label: "I-4 — Form I (سَمِعَ)" },
                { value: "I-5", label: "I-5 — Form I (كَرُمَ)" },
                { value: "I-6", label: "I-6 — Form I (حَسِبَ)" },
                { value: "II", label: "II — فَعَّلَ" },
                { value: "III", label: "III — فَاعَلَ" },
                { value: "IV", label: "IV — أَفْعَلَ" },
                { value: "V", label: "V — تَفَعَّلَ" },
                { value: "VI", label: "VI — تَفَاعَلَ" },
                { value: "VII", label: "VII — اِنْفَعَلَ" },
                { value: "VIII", label: "VIII — اِفْتَعَلَ" },
                { value: "IX", label: "IX — اِفْعَلَّ" },
                { value: "X", label: "X — اِسْتَفْعَلَ" },
            ],
        },
    },
    { accessorKey: "meaning", header: "Meaning", editVariant: "text" },
    { accessorKey: "notes", header: "Notes", editVariant: "text" },
];

export const ismColumns: MRT_ColumnDef<SarfAnalysis>[] = [
    {
        accessorKey: "ismType",
        header: "Type of Ism",
        editVariant: "select",
        mantineEditSelectProps: {
            searchable: true,
            clearable: true,
            data: [
                { value: "jamid", label: "Jāmid (جامد)" },
                { value: "mushtaq", label: "Mushtaq (مشتق)" },
                { value: "ismFa3il", label: "Ism Fā‘il (اسم فاعل)" },
                { value: "ismMaf3ul", label: "Ism Maf‘ūl (اسم مفعول)" },
                { value: "masdar", label: "Maṣdar (مصدر)" },
                { value: "sifaMushabbaha", label: "Ṣifa Mushabbaha" },
                { value: "ismTafdeel", label: "Ism Tafḍīl" },
                { value: "ismZaman", label: "Ism Zamān" },
                { value: "ismMakan", label: "Ism Makān" },
                { value: "ismAla", label: "Ism Āla" },
            ],
        },
    },
    {
        accessorKey: "gender",
        header: "Gender",
        editVariant: "select",
        mantineEditSelectProps: {
            clearable: true,
            data: [
                { value: "m", label: "Masculine" },
                { value: "f", label: "Feminine" },
            ],
        },
    },
    {
        accessorKey: "properness",
        header: "Proper/Common",
        editVariant: "select",
        mantineEditSelectProps: {
            clearable: true,
            data: [
                { value: "proper", label: "Proper" },
                { value: "common", label: "Common" },
            ],
        },
    },
    {
        accessorKey: "number",
        header: "Number",
        editVariant: "select",
        mantineEditSelectProps: {
            clearable: true,
            data: [
                { value: "singular", label: "Singular" },
                { value: "dual", label: "Dual" },
                { value: "plural", label: "Plural" },
            ],
        },
    },
];

export const filColumns: MRT_ColumnDef<SarfAnalysis>[] = [
    {
        accessorKey: "tense",
        header: "Tense",
        editVariant: "select",
        mantineEditSelectProps: {
            clearable: true,
            data: [
                { value: "past", label: "Past (ماض)" },
                { value: "present", label: "Present (مضارع)" },
                { value: "imperative", label: "Imperative (أمر)" },
            ],
        },
    },
    {
        accessorKey: "voice",
        header: "Voice",
        editVariant: "select",
        mantineEditSelectProps: {
            clearable: true,
            data: [
                { value: "active", label: "Active" },
                { value: "passive", label: "Passive" },
            ],
        },
    },
    {
        accessorKey: "person",
        header: "Person",
        editVariant: "select",
        mantineEditSelectProps: {
            clearable: true,
            data: [
                { value: "1", label: "1st" },
                { value: "2", label: "2nd" },
                { value: "3", label: "3rd" },
            ],
        },
    },
];

export const harfColumns: MRT_ColumnDef<SarfAnalysis>[] = [
    {
        accessorKey: "harfKind",
        header: "Harf kind",
        editVariant: "select",
        mantineEditSelectProps: {
            searchable: true,
            clearable: true,
            data: [
                { value: "jarr", label: "Jarr (حرف جر)" },
                { value: "nasb", label: "Naṣb (حرف نصب)" },
                { value: "jazm", label: "Jazm (حرف جزم)" },
                { value: "3atf", label: "‘Aṭf (حرف عطف)" },
                { value: "istifham", label: "Istifhām" },
                { value: "shart", label: "Shart" },
                { value: "tawkid", label: "Tawkīd" },
                { value: "nafy", label: "Nafy" },
                { value: "other", label: "Other" },
            ],
        },
    },
];
