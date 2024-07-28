import { test, expect } from "tstyche"; // @see https://github.com/tstyche/tstyche
import "../t";

let t!: any;

test("TestKeys1", () => {
    expect(t as Keys<{ a: number, b: string, c: boolean }>).type.toBe<"a" | "b" | "c">();
});
// Expected: "a" | "b" | "c"

type TestKeys1 = Keys<{ a: number, b: string, c: boolean }>;
// Expected: "a" | "b" | "c"

test("TestKeys2", () => {
    expect(t as Keys<{ a: number, b: string, c: boolean }, "b" | "c">).type.toBe<"a">();
});
// Expected: "a"

test("TestKeys3", () => {
    expect(t as Keys<{ a: number, b: string, c: boolean }, number>).type.toBe<"a" | "b" | "c">();
});
// Expected: "a" | "b" | "c"

test("TestKeys4", () => {
    expect(t as Keys<{ a: number, b: string, c: boolean }, "d">).type.toBe<"a" | "b" | "c">();
});
// Expected: "a" | "b" | "c"

test("TestKeys5", () => {
    expect(t as Keys<{ a: number, b: string, c: boolean, [key: string]: any }, number>).type.toBe<string | number>();
});
// Expected: string | number

test("TestKeys6", () => {
    expect(t as Keys<{ a: number, b: string, c: boolean, [key: string]: any }, string>).type.toBe<"a" | "b" | "c">();
});
// Expected: "a" | "b" | "c"

test("TestSigns1", () => {
    expect(t as Signs<{ a: number, b: string, c: boolean }>).type.toBe<never>();
});
// Expected: never

test("TestSigns2", () => {
    expect(t as Signs<{ a: number, b: string, c: boolean, [key: string]: any }>).type.toBe<string | number>();
});
// Expected: string | number

test("TestSigns3", () => {
    expect(t as Signs<{ [key: number]: string }>).type.toBe<number>();
});
// Expected: number

test("TestSigns4", () => {
    expect(t as Signs<{ [key: string]: number }>).type.toBe<string | number>();
});
// Expected: string | number
