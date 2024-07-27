import * as ts from 'typescript';
import identifierRenamer from '../src/transformers/idnetifierRenamer';
import { compile } from './utils/compile';

describe('identifierRenamer transformer', () => {
    it('should rename all identifiers to "foo" followed by _ and a uuid', () => {
        const source = `
            const a = 1;
            const b = 'hello';
            const c = true;
        `;

        const transformed = compile(source, { before: [identifierRenamer] });

        const identifiers = transformed.match(/foo_[a-z0-9-]+/g);
        expect(identifiers).toHaveLength(3);
    });
});