import * as ts from 'typescript';
import { v4 as uuidv4 } from 'uuid';

const identifierRenamer: ts.TransformerFactory<ts.SourceFile> = context => {
    return sourceFile => {
        function visitor(node: ts.Node): ts.Node {
            if (ts.isIdentifier(node)) {
            const uniqueId = `foo_${uuidv4().replace(/-/g, '')}`;
            return ts.factory.createIdentifier(uniqueId);
            }
            return ts.visitEachChild(node, visitor, context);
        }
  
        return ts.visitNode(sourceFile, visitor) as ts.SourceFile;
    };
};

export default identifierRenamer;
