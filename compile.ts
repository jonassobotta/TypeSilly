import * as ts from 'typescript';
import transformer from './src/index';

const fileNames = process.argv.slice(2);

const program = ts.createProgram(fileNames, {
  outDir: './dist',
  module: ts.ModuleKind.CommonJS,
  target: ts.ScriptTarget.ES5,
});

program.emit(undefined, undefined, undefined, undefined, {
  before: [transformer],
});
