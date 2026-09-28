type Utility = "capitalize" | "reverse" | "average" | "unique" | "isObject";

const snippetsData: Record<Utility, string> = {
  capitalize: `export const capitalize = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};`,

  reverse: `export const reverseString = (str: string): string => {
  return Array.from(str).reverse().join("");
};`,

  average: `export const average = (numbers: number[]): number => {
  if (!numbers.length) return 0;
  const sum = numbers.reduce((acc, val) => acc + val, 0);
  return sum / numbers.length;
};`,

  unique: `export const removeDuplicates = <T>(arr: T[]): T[] => {
  return Array.from(new Set(arr));
};`,

  isObject: `export const isObject = (val: unknown): val is Record<string, unknown> => {
  return typeof val === "object" && val !== null && !Array.isArray(val);
};`
};

const hintsData: Record<Utility, string> = {
  capitalize: "Enter text string to capitalize",
  reverse: "Enter text string to reverse",
  average: "Enter comma-separated numbers (e.g. 10, 20, 30)",
  unique: "Enter comma-separated items (e.g. apple, banana, apple)",
  isObject: 'Enter JSON (e.g. {"name": "DevKit"})'
};

const defaultInputs: Record<Utility, string> = {
  capitalize: "hello devkit world",
  reverse: "TypeScript",
  average: "10, 25, 40, 85",
  unique: "react, vue, react, svelte, vue",
  isObject: '{"status": "ok", "code": 200}'
};

const getOptionalElement = <T extends HTMLElement>(id: string): T | null => {
  return document.getElementById(id) as T | null;
};

const toolSelect = getOptionalElement<HTMLSelectElement>("toolSelect");
const toolInput = getOptionalElement<HTMLInputElement>("toolInput");
const inputHint = getOptionalElement<HTMLSpanElement>("inputHint");
const runBtn = getOptionalElement<HTMLButtonElement>("runBtn");
const toolOutput = getOptionalElement<HTMLParagraphElement>("toolOutput");
const activeSnippetCode = getOptionalElement<HTMLElement>("activeSnippetCode");
const copyOutputBtn = getOptionalElement<HTMLButtonElement>("copyOutputBtn");
const copyActiveSnippetBtn = getOptionalElement<HTMLButtonElement>("copyActiveSnippetBtn");
const toast = getOptionalElement<HTMLDivElement>("toast");

const getSelectedUtility = (): Utility => {
  if (!toolSelect) return "capitalize";
  const value = toolSelect.value;

  if (
    value === "capitalize" ||
    value === "reverse" ||
    value === "average" ||
    value === "unique" ||
    value === "isObject"
  ) {
    return value;
  }

  return "capitalize";
};

const capitalize = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const reverseString = (str: string): string => {
  return Array.from(str).reverse().join("");
};

const average = (numbers: number[]): number => {
  if (!numbers.length) return 0;
  const sum = numbers.reduce((acc, val) => acc + val, 0);
  return sum / numbers.length;
};

const removeDuplicates = <T>(arr: T[]): T[] => {
  return Array.from(new Set(arr));
};

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

const runUtility = (): void => {
  if (!toolInput || !toolOutput) return;

  const selected = getSelectedUtility();
  const inputValue = toolInput.value;
  let result = "";

  switch (selected) {
    case "capitalize":
      result = capitalize(inputValue);
      break;

    case "reverse":
      result = reverseString(inputValue);
      break;

    case "average": {
      const numbers = inputValue
        .split(",")
        .map((value) => value.trim())
        .filter((value) => value !== "")
        .map(Number);

      if (numbers.some((number) => !Number.isFinite(number))) {
        result = "Please enter valid numbers";
      } else {
        result = String(average(numbers));
      }
      break;
    }

    case "unique": {
      const items = inputValue
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      result = JSON.stringify(removeDuplicates(items));
      break;
    }

    case "isObject": {
      try {
        const parsed: unknown = JSON.parse(inputValue);
        result = `isObject: ${isObject(parsed)}`;
      } catch {
        result = "isObject: false (Invalid JSON format)";
      }
      break;
    }
  }

  toolOutput.textContent = result;
};

const updatePlaygroundView = (): void => {
  const selected = getSelectedUtility();

  if (inputHint) inputHint.textContent = hintsData[selected];
  if (toolInput) toolInput.value = defaultInputs[selected];
  if (activeSnippetCode) activeSnippetCode.textContent = snippetsData[selected];

  runUtility();
};

const showToast = (message: string): void => {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");

  window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
};

const handleCopy = async (
  text: string,
  button: HTMLButtonElement
): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);

    const label = button.querySelector("span");
    if (label && !label.dataset.originalText) {
      label.dataset.originalText = label.textContent ?? "Copy";
    }

    button.classList.add("copied");

    if (label) {
      label.textContent = "Copied!";
    }

    showToast("Copied to clipboard!");

    window.setTimeout(() => {
      button.classList.remove("copied");

      if (label) {
        label.textContent = label.dataset.originalText ?? "Copy";
      }
    }, 2000);
  } catch {
    showToast("Copy failed. Please try again.");
  }
};

document.querySelectorAll<HTMLButtonElement>(".copy-btn[data-target]")
  .forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.target;

      if (!targetId) return;

      const codeElement = document.getElementById(targetId);

      if (codeElement) {
        handleCopy(codeElement.textContent ?? "", button);
      }
    });
  });

if (toolSelect) {
  toolSelect.addEventListener("change", updatePlaygroundView);
}

if (runBtn) {
  runBtn.addEventListener("click", runUtility);
}

if (toolInput) {
  toolInput.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      runUtility();
    }
  });
}

if (copyOutputBtn) {
  copyOutputBtn.addEventListener("click", () => {
    if (toolOutput) {
      handleCopy(toolOutput.textContent ?? "", copyOutputBtn);
    }
  });
}

if (copyActiveSnippetBtn) {
  copyActiveSnippetBtn.addEventListener("click", () => {
    if (activeSnippetCode) {
      handleCopy(activeSnippetCode.textContent ?? "", copyActiveSnippetBtn);
    }
  });
}

updatePlaygroundView();