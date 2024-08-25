/** NOTE ONLY
  amd           => tsc --module amd --outFile ./lib/index.js --declaration index.ts
  esm1          => npx tsup --outDir ./lib --format esm --dts index.ts --dts-only --entry.index index.ts --tsconfig tsconfig.json
  esm2          => npx tsup --outDir ./lib --format esm --experimental-dts index.ts --entry.index index.ts --tsconfig tsconfig.json
*/

/// <reference path="lib/globalDefs.d.ts" />



export * from "./src/a";
export * from "./src/b";
