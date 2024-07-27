import * as ts from 'typescript';

export function compile(source: string, transformers: ts.CustomTransformers): string {
    const sourceFile = ts.createSourceFile('test.ts', source, ts.ScriptTarget.Latest);
    const result = ts.transform(sourceFile, transformers.before as ts.TransformerFactory<ts.SourceFile>[] ?? []);
    
    const printer = ts.createPrinter();
    const transformedSourceFile = result.transformed[0] as ts.SourceFile;
    return printer.printFile(transformedSourceFile);
}