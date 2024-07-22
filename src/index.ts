import * as ts from 'typescript';

const transformer: ts.TransformerFactory<ts.SourceFile> = context => {
  return sourceFile => {
    function visitor(node: ts.Node): ts.Node {
      // Rename all identifiers to "foo"
      if (ts.isIdentifier(node)) {
        return ts.factory.createIdentifier('foo');
      }

      return ts.visitEachChild(node, visitor, context);
    }

    return ts.visitNode(sourceFile, visitor) as ts.SourceFile;
  };
};

export default transformer;
