import { isDate } from './is-date.js';

describe('isDate', () => {
  it('should return true for Date objects', () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate(new Date('2023-01-01'))).toBe(true);
    expect(isDate(new Date(2023, 0, 1))).toBe(true);
    expect(isDate(new Date(Date.now()))).toBe(true);
  });

  it('should return false for non-Date values', () => {
    expect(isDate('2023-01-01')).toBe(false);
    expect(isDate(1672531200000)).toBe(false);
    expect(isDate(true)).toBe(false);
    expect(isDate(false)).toBe(false);
    expect(isDate(null)).toBe(false);
    expect(isDate(undefined)).toBe(false);
    expect(isDate([])).toBe(false);
    expect(isDate({})).toBe(false);
    expect(isDate('hello')).toBe(false);
  });
});