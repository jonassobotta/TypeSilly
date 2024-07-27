import * as ts from 'typescript';

const stringInverter: ts.TransformerFactory<ts.SourceFile> = context => {
  const visit: ts.Visitor = node => {
    if (ts.isStringLiteral(node)) {
      return ts.factory.createStringLiteral(node.text.split('').reverse().join(''));
    }
    return ts.visitEachChild(node, visit, context);
  };

  return sourceFile => ts.visitNode(sourceFile, visit) as ts.SourceFile;
}

export default stringInverter;