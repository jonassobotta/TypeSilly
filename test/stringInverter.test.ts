import * as ts from 'typescript';
import stringInverter from '../src/transformers/stringInverter';
import { compile } from './utils/compile';

describe('stringInverter transformer', () => {
    it('should invert the string', () => {
        const source = `
            const a = 'hello';
        `;

        const expectedOutput = `
            const a = "olleh";
        `;

        const transformed = compile(source, { before: [stringInverter] });

        expect(transformed.replace(/\s+/g, '')).toBe(expectedOutput.replace(/\s+/g, ''));
    });
});