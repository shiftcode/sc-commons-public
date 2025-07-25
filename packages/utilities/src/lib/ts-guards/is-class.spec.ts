import { isClass } from './is-class.js';

class TestClass {
  constructor() {}

  x(){}
}

describe('isClass', () => {
  it('should return true for classes', () => {
    expect(isClass(TestClass)).toBe(true);
  });
  

  it('should return false for non-class values', () => {
    expect(isClass('string')).toBe(false);
    expect(isClass(123)).toBe(false);
    expect(isClass(true)).toBe(false);
    expect(isClass(null)).toBe(false);
    expect(isClass(undefined)).toBe(false);
    expect(isClass([])).toBe(false);
    expect(isClass({})).toBe(false);
    expect(isClass(function y(){})).toBe(false);
    expect(isClass(new TestClass().x)).toBe(false);
  });
});