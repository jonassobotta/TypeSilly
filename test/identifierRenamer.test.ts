import * as ts from 'typescript';
import identifierRenamer from '../src/transformers/idnetifierRenamer';

function compile(source: string, transformers: ts.CustomTransformers): string {
    const sourceFile = ts.createSourceFile('test.ts', source, ts.ScriptTarget.Latest);
    const result = ts.transform(sourceFile, transformers.before as ts.TransformerFactory<ts.SourceFile>[] ?? []);
    
    const printer = ts.createPrinter();
    const transformedSourceFile = result.transformed[0] as ts.SourceFile;
    return printer.printFile(transformedSourceFile);
}

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