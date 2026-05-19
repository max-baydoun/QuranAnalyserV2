import masaq from "./MASAQ.json" with { type: "json" };
import segmented from "../output123.json" with { type: "json" };
import quran from "./quran.json" with { type: "json" };
import { writeFile } from "fs/promises";

async function extractSegments() {
    const data = [];

    masaq.forEach((word) => {
        // Find or create surah
        let surah = data.find((s) => s.surahNum === word.Sura_No);
        if (!surah) {
            surah = {
                surahNum: word.Sura_No,
                verses: [],
            };
            data.push(surah);
        }

        // Find or create verse
        let verse = surah.verses.find((v) => v.verseNum === word.Verse_No);
        if (!verse) {
            verse = {
                verseNum: word.Verse_No,
                words: [],
            };
            surah.verses.push(verse);
        }

        // Find or create word
        let wordObj = verse.words.find((w) => w.wordNum === word.Word_No);
        if (!wordObj) {
            wordObj = {
                wordNum: word.Word_No,
                word: word.Word,
                segments: [],
            };
            verse.words.push(wordObj);
        }
        let segmentedObj = {
            morphTag: word.Morph_Tag,
            segmentedWord: word.Segmented_Word,
        };
        // Add segment
        wordObj.segments.push(segmentedObj);
    });

    // Sort for clean output
    data.sort((a, b) => a.surahNum - b.surahNum);
    data.forEach((surah) => {
        surah.verses.sort((a, b) => a.verseNum - b.verseNum);
        surah.verses.forEach((verse) => {
            verse.words.sort((a, b) => a.wordNum - b.wordNum);
        });
    });

    const prettyJsonString = JSON.stringify(data, null, 2);
    await writeFile("output123.json", prettyJsonString, "utf8");
    console.log("✓ Data exported to output.json");
}

function fillSegments(curWord) {
    const tagsToOmit = [
        "DET",
        "NSUFF_MASC_PL_GEN",
        "NSUFF_MASC_PL_ACC",
        "NSUFF_MASC_PL_NOM",
        "NSUFF_FEM_SG",
        "NSUFF_FEM_PL",
        "IVSUFF_SUBJ:MP_MOOD:I",
        "IVSUFF_SUBJ:MP_MOOD:SJ",
        "IMPERF_PREF",
        "SUBJ_PRON",
        "NOON_V5",
        "CASE_DEF_NOM",
        "CASE_DEF_ACC",
        "CASE_DEF_GEN",
        "CASE_INDEF_NOM",
        "CASE_INDEF_ACC",
        "CASE_INDEF_GEN",
        "CASE_INDEF_(ACC_GEN)",
        "IV3MP",
        "PVSUFF_SUBJ:1P",
        "PVSUFF_SUBJ:2MP",
        "PVSUFF_SUBJ:3MP",
        "PVSUFF_SUBJ:3MS",
        "PVSUFF_SUBJ:3FS",
    ];
    let segments = curWord.segments.filter((segment) => !tagsToOmit.includes(segment.morphTag));
    return segments;
}

async function combineData() {
    var finalData = [];
    quran.forEach((surah) => {
        var surahOriginal = surah;
        const surahSegmented = segmented.find((i) => i.surahNum === surah.id);

        surahOriginal.verses.map((verse) => {
            const verseSegmented = surahSegmented.verses.find((i) => i.verseNum === verse.id);
            const result = verseSegmented.words.map((curWord) => ({
                wordNum: curWord.wordNum,
                word: curWord.word,
                segments: fillSegments(curWord),
            }));
            console.log(result);

            verse["words"] = result;
        });
        finalData.push(surahOriginal);
    });
    console.log(finalData);
    const prettyJsonString = JSON.stringify(finalData, null, 2);
    await writeFile("finalSegmentedQurans123.json", prettyJsonString, "utf8");
    console.log("✓ Data exported to finalSegmentedQuran.json");
}

//extractSegments();
combineData();
