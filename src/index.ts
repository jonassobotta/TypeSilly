import * as ts from 'typescript';
import identifierRenamer from './idnetifierRenamer';
import booleanSwitcher from './booleanSwitcher';

const combinedTransformer: ts.TransformerFactory<ts.SourceFile> = context => {
  const identifierTransformer = identifierRenamer(context);
  const booleanTransformer = booleanSwitcher(context);

  return sourceFile => {
    const transformedSourceFile = identifierTransformer(sourceFile) as ts.SourceFile;
    return booleanTransformer(transformedSourceFile) as ts.SourceFile;
  };
};

export default combinedTransformer;
