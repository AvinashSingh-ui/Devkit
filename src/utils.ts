export const capitalize = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const reverseString = (str: string): string => {
  return Array.from(str).reverse().join("");
};

export const average = (numbers: number[]): number => {
  if (!numbers.length) return 0;
  const sum = numbers.reduce((acc, val) => acc + val, 0);
  return sum / numbers.length;
};

export const removeDuplicates = <T>(arr: T[]): T[] => {
  return Array.from(new Set(arr));
};

export const isObject = (
  val: unknown
): val is Record<string, unknown> => {
  return typeof val === "object" && val !== null && !Array.isArray(val);
};