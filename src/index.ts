import * as ts from 'typescript';
import booleanSwitcher from './booleanSwitcher';
import identifierRenamer from './idnetifierRenamer';

const transformer: ts.TransformerFactory<ts.SourceFile> = context => {
  return sourceFile => {
    const identifierTransformed = identifierRenamer(context)(sourceFile);
    return booleanSwitcher(context)(identifierTransformed);
  };
};

export default transformer;