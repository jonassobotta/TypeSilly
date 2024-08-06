
# TypeSilly

TypeSilly transforms your TypeScript code in fun and unexpected ways, making coding more entertaining. Whether you're looking to rename all variables to something amusing, insert random comments, or any other zany transformation, TypeSilly has you covered.

## Installation
To install TypeSilly, you need to have Node.js and npm installed on your machine. You can then install TypeSilly via npm:

``` bash
npm install typesilly
```

## Usage

To use TypeSilly in your project, follow these steps:

1. Create a TypeScript project if you don't already have one.

```bash
mkdir my-typescript-project
cd my-typescript-project
npm init -y
npm install typescript @types/node --save-dev
```
2. Install TypeSilly.
```bash
npm install typesilly
```
3. Create a TypeScript configuration file (tsconfig.json).
```json
{
  "compilerOptions": {
    "target": "ES5",
    "module": "commonjs",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*.ts", "compile.ts"]
}
```
4. Set up your TypeSilly transformer.
Create a compile.ts file in your project root:

```typescript
import * as ts from 'typescript';
import transformer from 'type-silly';

const fileNames = process.argv.slice(2);

const program = ts.createProgram(fileNames, {
  outDir: './dist',
  module: ts.ModuleKind.CommonJS,
  target: ts.ScriptTarget.ES5,
});

program.emit(undefined, undefined, undefined, undefined, {
  before: [transformer],
});
```
5. Create an example TypeScript file to transform.
Create a file examples/test.ts:

```typescript
const myVariable = true;
const anotherVariable = 42;
function greet() {
  const localVar = "Hello!";
  console.log(localVar);
}
greet();
```
6. Compile your TypeScript code using TypeSilly.
Compile your code with the TypeSilly transformer:

```bash
npx tsc
node dist/compile.js examples/test.ts
```

## Contributing
We welcome contributions! If you have any silly transformation ideas or improvements, feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License.
