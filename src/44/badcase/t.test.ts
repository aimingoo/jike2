import { expect } from 'chai';
import sinon from 'sinon';

describe('Keys', () => {
  it('should return the keys of the target type excluding the specified property type', () => {
    type TestType = {
      a: number;
      b: string;
      c: boolean;
    };

    type Result = Keys<TestType, string>;

    const keys: Result = null as any;

    expect(keys).to.be.an('string');
    expect(keys).to.not.include('b');
  });
});

describe('Signs', () => {
  it('should return the keys of the target type excluding the inherited properties', () => {
    class Parent {
      parentProp: number;
    }

    class Child extends Parent {
      childProp: string;
    }

    type Result = Signs<Child>;

    const keys: Result = null as any;

    expect(keys).to.be.an('string');
    expect(keys).to.not.include('parentProp');
  });
});