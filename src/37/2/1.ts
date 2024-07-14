/**
 * > tsc --module amd --moduleResolution node --outFile dist/1.js 1.ts
 **/

import x from './2';

console.log('1.ts');
console.log('x from 2.ts', x);
