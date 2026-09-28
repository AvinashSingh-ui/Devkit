import { jest,describe, test, expect } from "@jest/globals";
import { capitalize,reverseString,average } from "./utils";

test("checking the result of captialize function",()=>{
    expect(capitalize("hello")).toBe("Hello");
})

describe("reverseString", () => {
  test("reverses a string", () => {
    expect(reverseString("hello")).toBe("olleh");
  });

  test("returns empty string when input is empty", () => {
    expect(reverseString("")).toBe("");
  });
});

describe("average",()=>{
  test("average of an array",()=>{
    expect(average([10,20,30])).toBe(20);
  });
  test("average of an empty array",()=>{
    expect(average([])).toBe(0);
  });
});



describe("Mocking", () => {
  test("checks if copy function was called", () => {
    const mockCopy = jest.fn();

    mockCopy("Hello DevKit");

    expect(mockCopy).toHaveBeenCalled();
    expect(mockCopy).toHaveBeenCalledWith("Hello DevKit");
  });
});

describe("Spying", () => {
  test("checks if console.log was called", () => {
    const spy = jest.spyOn(console, "log")
      .mockImplementation(() => {});

    console.log("DevKit");

    expect(spy).toHaveBeenCalledWith("DevKit");

    spy.mockRestore();
  });
});