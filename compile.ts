import * as ts from 'typescript';
import combinedTransformer from './src/index';

const fileNames = process.argv.slice(2);

const program = ts.createProgram(fileNames, {
  outDir: './dist',
  module: ts.ModuleKind.CommonJS,
  target: ts.ScriptTarget.ES5,
});

const transformers: ts.CustomTransformers = {
  before: [combinedTransformer as ts.TransformerFactory<ts.SourceFile>],
  after: []
};

const emitResult = program.emit(undefined, undefined, undefined, undefined, transformers);

const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

allDiagnostics.forEach(diagnostic => {
  if (diagnostic.file) {
    const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
    const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
    console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
  } else {
    console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
  }
});

const exitCode = emitResult.emitSkipped ? 1 : 0;
process.exit(exitCode);
