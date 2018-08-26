export default function({ types: t }) {
  return {
    visitor: {
      CallExpression(path) {
        const { property } = path.node.callee
        if (property && property.name === 'componentDidCatch') {
          // Path that leads to the `componentDidCatch` call arguments
          const componentDidCatchSecondArgPath = path.get('arguments.1')
          const { properties } = componentDidCatchSecondArgPath.node
          const variableDeclaration = path.getStatementParent().container[1].declarations.find(n =>
            n.type === 'VariableDeclarator' && n.init.property.name === 'stack'
          )
          if (properties && properties[0].key.name === 'componentStack' && variableDeclaration) {
            const sourceObjName = variableDeclaration.init.object.name
            // Modify `componentDidCatch` second argument to add a single line
            componentDidCatchSecondArgPath.replaceWithSourceString(`{
              componentStack: stack !== null ? stack : '',
              source: ${sourceObjName}.source,
            }`)
          }
        }
      }
    }
  };
}
