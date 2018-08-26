# babel-plugin-component-did-catch-source

> Add fiber source to `componentDidCatch` info argument.

## Installation

```sh
npm install --save-dev babel-plugin-component-did-catch-source
```

## The Problem

Need access to the source fiber but react's `componentDidCatch` does not provide it. Maintaining a fork of React is not as flexible as a compile time change.

## Example

**Before**
```jsx
class ErrorBoundary extends Component {
  componentDidCatch(error, { componentStack }) {
    errorLogger(componentStack)
  }
}
```

**After**
```jsx
class ErrorBoundary extends Component {
  componentDidCatch(error, { componentStack, source }) {
    const { props, state } = source.stateNode

    errorLogger(componentStack, props, state)
  }
}
```

## Usage

### Via `.babelrc.js` (Recommended)

**.babelrc**

```json
{
  "env": {
    "production": {
      "plugins": ["component-did-catch-source"]
    }
  }
}
```

### Via CLI

```sh
babel --plugins component-did-catch-source script.js
```

### Via Node

```js
require('babel-core').transform('code', {
  plugins: [
    'component-did-catch-source',
  ],
});
```

## Options

None yet

## License

MIT
