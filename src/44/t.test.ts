import "./t.ts";

type TestKeys1 = Keys<{ a: number, b: string, c: boolean }>;
// Expected: "a" | "b" | "c"

type TestKeys2 = Keys<{ a: number, b: string, c: boolean }, "b" | "c">;
// Expected: "a"

type TestKeys3 = Keys<{ a: number, b: string, c: boolean }, number>;
// Expected: "a" | "b" | "c"

type TestKeys4 = Keys<{ a: number, b: string, c: boolean }, "d">;
// Expected: "a" | "b" | "c"

type TestKeys5 = Keys<{ a: number, b: string, c: boolean, [key: string]: any }, number>;
// Expected: string | number

type TestKeys6 = Keys<{ a: number, b: string, c: boolean, [key: string]: any }, string>;
// Expected: "a" | "b" | "c"

type TestSigns1 = Signs<{ a: number, b: string, c: boolean }>;
// Expected: never

type TestSigns2 = Signs<{ a: number, b: string, c: boolean, [key: string]: any }>;
// Expected: string | number

type TestSigns3 = Signs<{ [key: number]: string }>;
// Expected: number

type TestSigns4 = Signs<{ [key: string]: number }>;
// Expected: string | number