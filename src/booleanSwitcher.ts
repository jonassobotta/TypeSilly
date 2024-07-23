import * as ts from 'typescript';

const booleanSwitcher: ts.TransformerFactory<ts.SourceFile> = context => {
  return sourceFile => {
    function visitor(node: ts.Node): ts.Node {
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
        return ts.visitEachChild(node, visitor, context);
    }

    return ts.visitNode(sourceFile, visitor) as ts.SourceFile;
  };
};

export default booleanSwitcher;
