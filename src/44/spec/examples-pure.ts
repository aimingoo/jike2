import { Test, assert, _ } from "spec.ts";

type T1 = Test<never, unknown>; 
type T2 = Test<unknown, never>; 
type T3 = Test<any, never>; 
type T4 = Test<any, unknown>; 
type T5 = Test<never, any>; 
type T6 = Test<unknown, any>; 

assert(true, false); 
assert(false, true); 

assert(1, 1);
assert(1, 2); 
assert(1, _ as number); 
assert(1, _ as any); 

assert({ a: 1 }, { a: 1 });
assert({ a: 1 }, _ as { readonly a: number }); 
assert(_ as { readonly a: number }, { a: 1 }); 

assert(_ as any, _ as any);
assert(_ as any, _ as never); 
assert(_ as any, _ as unknown); 

assert(_ as never, _ as never);
assert(_ as never, _ as unknown); 
assert(_ as never, _ as any); 
assert(_ as never, 2); 

assert(_ as unknown, _ as any); 
assert(_ as unknown, _ as never); 

assert(_ as any[], _ as ReadonlyArray<any>); 
assert(_ as ReadonlyArray<any>, _ as any[]); 

assert(_ as never[], _ as never[]);
assert(_ as never[], _ as [never]); 
assert(_ as [never], _ as [number]); 
