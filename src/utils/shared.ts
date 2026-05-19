export function convertToArabicNumbers(input: number) {
    const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    // Replace 0-9 with the corresponding character in the array
    return input.toString().replace(/[0-9]/g, (digit) => arabicDigits[parseInt(digit)]);
}
