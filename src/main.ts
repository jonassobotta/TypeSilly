import * as ts from 'typescript';
import transformerCore from './transformers/transformerCore';

function compile(sourceFiles: string[], outDir: string) {
  const program = ts.createProgram(sourceFiles, {
    outDir,
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES5,
  });

  const emitResult = program.emit(undefined, undefined, undefined, undefined, {
    before: [transformerCore]
  });

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
}

const sourceFiles = process.argv.slice(2);
const outDir = './dist';
compile(sourceFiles, outDir);
