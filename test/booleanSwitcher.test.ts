import * as ts from 'typescript';
import booleanSwitcher from '../src/transformers/booleanSwitcher';
import { compile } from './utils/compile';

describe('booleanSwitcher transformer', () => {
  it('should switch true to false and false to true', () => {
    const source = `
      const a = true;
      const b = false;
    `;

    const expectedOutput = `
      const a = false;
      const b = true;
    `;

    const transformed = compile(source, { before: [booleanSwitcher] });

    expect(transformed.replace(/\s+/g, '')).toBe(expectedOutput.replace(/\s+/g, ''));
  });
});
