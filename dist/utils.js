export const capitalize = (str) => {
    if (!str)
        return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
};
export const reverseString = (str) => {
    return Array.from(str).reverse().join("");
};
export const average = (numbers) => {
    if (!numbers.length)
        return 0;
    const sum = numbers.reduce((acc, val) => acc + val, 0);
    return sum / numbers.length;
};
export const removeDuplicates = (arr) => {
    return Array.from(new Set(arr));
};
export const isObject = (val) => {
    return typeof val === "object" && val !== null && !Array.isArray(val);
};
