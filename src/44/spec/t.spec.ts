import { test, assert, _ } from "spec.ts";
import "../t";

test('TestKeys1', () => {
    assert(_ as Keys<{ a: number, b: string, c: boolean }>, _ as "a");
});
// Expected: "a" | "b" | "c"

type TestKeys1 = Keys<{ a: number, b: string, c: boolean }>;
// Expected: "a" | "b" | "c"



// more tests
// ...