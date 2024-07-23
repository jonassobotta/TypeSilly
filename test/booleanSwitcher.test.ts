import * as ts from 'typescript';
import booleanSwitcher from '../src/booleanSwitcher';

function compile(source: string, transformers: ts.CustomTransformers): string {
  const sourceFile = ts.createSourceFile('test.ts', source, ts.ScriptTarget.Latest);
  const result = ts.transform(sourceFile, transformers.before as ts.TransformerFactory<ts.SourceFile>[] ?? []);
  
  const printer = ts.createPrinter();
  const transformedSourceFile = result.transformed[0] as ts.SourceFile;
  return printer.printFile(transformedSourceFile);
}

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
