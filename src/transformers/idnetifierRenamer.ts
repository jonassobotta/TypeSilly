import * as ts from 'typescript';
import { v4 as uuidv4 } from 'uuid';

const identifierRenamer: ts.TransformerFactory<ts.SourceFile> = context => {
  const visit: ts.Visitor = node => {
    if (ts.isIdentifier(node)) {
      const uniqueId = `foo_${uuidv4().replace(/-/g, '')}`;
      return ts.factory.createIdentifier(uniqueId);
    }
    return ts.visitEachChild(node, visit, context);
  };

  return sourceFile => ts.visitNode(sourceFile, visit) as ts.SourceFile;
};

export default identifierRenamer;
