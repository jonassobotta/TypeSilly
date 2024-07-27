import * as ts from 'typescript';
import identifierRenamer from './idnetifierRenamer';
import booleanSwitcher from './booleanSwitcher';
import stringInverter from './stringInverter';

const transformerCore: ts.TransformerFactory<ts.SourceFile> = context => {
  const transformers = [identifierRenamer, booleanSwitcher, stringInverter].map(transformer => transformer(context));

  return sourceFile => {
    return transformers.reduce((file, transformer) => transformer(file), sourceFile);
  };
};

export default transformerCore;
