import { default as tstyche, expect } from "tstyche";  // Outside of tstyche, test/describe/it is ignored
import { test } from "node:test";
import assert from "node:assert/strict";

let t!: any;

// 在 tstyche / node 中分别处理两种检测
test("TestKeys1", () => {
    assert(t === undefined, 't current is not undefined');
    expect(t as boolean).type.toBe<"a" | "b" | "c">();
});

// 仅在 tstyche 中处理expect，而 assert 总是被忽略
tstyche.test("throw error in tstyche only.", () => {
    assert(false, 'throw error only.');
    expect(0).type.toBeNumber();
});
