import { isArray } from './is-array.js';

describe('isArray', () => {
  it('should return true for array values', () => {
    expect(isArray([])).toBe(true);
    expect(isArray([1, 2, 3])).toBe(true);
    expect(isArray(['a', 'b', 'c'])).toBe(true);
    expect(isArray([null, undefined])).toBe(true);
    // eslint-disable-next-line @typescript-eslint/no-array-constructor
    expect(isArray(new Array())).toBe(true);
  });

  it('should return false for non-array values', () => {
    expect(isArray('array')).toBe(false);
    expect(isArray(123)).toBe(false);
    expect(isArray(true)).toBe(false);
    expect(isArray(null)).toBe(false);
    expect(isArray(undefined)).toBe(false);
    expect(isArray({})).toBe(false);
    expect(isArray(new Date())).toBe(false);
    expect(isArray({ length: 0 })).toBe(false);
  });
});