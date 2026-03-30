import { describe, it, expect } from 'vitest';
import { clsx_stringarray } from '../animations/core/utils.js';

describe('utils', () => {
  describe('clsx_stringarray', () => {
    it('should split space-separated strings into arrays', () => {
      expect(clsx_stringarray('a b c')).toEqual(['a', 'b', 'c']);
    });

    it('should handle nested arrays', () => {
      expect(clsx_stringarray(['a', ['b', 'c']])).toEqual(['a', 'b', 'c']);
    });

    it('should filter out empty strings and non-string values', () => {
      expect(clsx_stringarray(['a', '', null, undefined, 'b'])).toEqual(['a', 'b']);
    });
  });
});
