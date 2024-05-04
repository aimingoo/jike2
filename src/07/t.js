// @ts-nocheck Disables semantic checking in a JavaScript file.

class MyClass {
  // private instance fields, TS3.8, `Class Fields` feature family in ES2022
  #a = 10;
  #f() { };
  get #f2() { return 'a'}

  // private class fields
  //   - Static and instance elements cannot share the same private name
  static #a2 = 10;
  static #foo2() { };

  // public instance fields
  b1 = 100;
  b2 = 'a';
  b3 = ()=>{ };

  // public class fields
  static d1 = 100;
  static d2 = 'a';
  static d3 = ()=>{ };

  constructor() { }

  c1() { }
  // get/set, async and/or *
  get c2() {
    return 1;
  }
  // static members, and more
  // ...

  // class static block, TS4.4, ES2022
  static { }

  // auto-accessor, TS4.9, ES proposal stage 1
  accessor x = 100;
}