export default function({ types: t }) {
  return {
    visitor: {
      FunctionDeclaration(path) {
        // Method where errors get handled for classes
        if (path.node.id.name === 'createClassErrorUpdate') {
          // Path that leads to the `componentDidCatch` call arguments
          const componentDidCatchSecondArgPath = path.get('body.body.5.consequent.body.0.expression.right.body.body.4.expression.arguments.1')

          // Modify `componentDidCatch` second argument to add a single line
          componentDidCatchSecondArgPath.replaceWithSourceString(`{
            componentStack: stack !== null ? stack : '',
            source: errorInfo.source,
          }`)
        }
      }
    }
  };
}
