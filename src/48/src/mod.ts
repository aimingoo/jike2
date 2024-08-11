export let s: string = 'abcd';
export let x: string | number | boolean = '';

import * as exp from "express";
console.log('typeof request in express', typeof exp.text);

console.log('mod.ts loaded, length of x is', x.length);
