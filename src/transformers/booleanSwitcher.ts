import * as ts from 'typescript';

const booleanSwitcher: ts.TransformerFactory<ts.SourceFile> = context => {
  const visit: ts.Visitor = node => {
    if (ts.isVariableDeclaration(node) && node.initializer) {
      if (node.initializer.kind === ts.SyntaxKind.TrueKeyword) {
        return ts.factory.updateVariableDeclaration(
          node,
          node.name,
          node.exclamationToken,
          node.type,
          ts.factory.createFalse()
        );
      }
      if (node.initializer.kind === ts.SyntaxKind.FalseKeyword) {
        return ts.factory.updateVariableDeclaration(
          node,
          node.name,
          node.exclamationToken,
          node.type,
          ts.factory.createTrue()
        );
      }
    }
    return ts.visitEachChild(node, visit, context);
  };

  return sourceFile => ts.visitNode(sourceFile, visit) as ts.SourceFile;
};

export default booleanSwitcher;
