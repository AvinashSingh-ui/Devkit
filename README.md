# DevKit

DevKit is a small utility library built using TypeScript as part of my internship training. It includes functions for working with strings, arrays, and objects.

I used Jest to write unit tests and check the output of each function.

## Features

- Capitalize: Converts the first letter of a string to uppercase.
- Reverse String: Reverses a string.
- Average: Calculates the average of numbers.
- Remove Duplicates: Removes duplicate values from an array.
- Is Object: Checks whether a value is a non-null object and not an array.

## Technologies Used

- TypeScript
- Jest
- ts-jest
- Node.js

## Project Structure

```text
DevKit/
├── src/
│   ├── utils.ts
│   └── utils.test.ts
├── jest.config.js
├── package.json
├── package-lock.json
└── README.md
```

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Move into the project directory:

```bash
cd DevKit
```

Install the dependencies:

```bash
npm install
```

## Usage

Import the required functions from `utils.ts`.

```typescript
import {
  capitalize,
  reverseString,
  average,
  removeDuplicates,
  isObject
} from "./utils";

console.log(capitalize("hello"));
console.log(reverseString("DevKit"));
console.log(average([10, 20, 30]));
console.log(removeDuplicates([1, 2, 2, 3]));
console.log(isObject({ name: "DevKit" }));
```

## Testing

Run the unit tests:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

The test cases cover the expected output of utility functions, including empty strings and empty arrays.

I also practised mocking with `jest.fn()` and spying with `jest.spyOn()` to understand how function calls can be tested.

## What I Learned

- Writing typed functions in TypeScript
- Using generics and type guards
- Writing unit tests with Jest
- Testing edge cases
- Using mocks and spies
- Checking test coverage

## Author

Avinash Singh