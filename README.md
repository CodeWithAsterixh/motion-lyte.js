# Motion-Lyte.js

A modular, readable, and maintainable animation framework for the web.

## Features
- **Modular Architecture**: Easy to extend with custom animations.
- **Dynamic Prefixes**: No hardcoded class names; classes are derived from animation names.
- **Cross-IDE Support**: Includes VS Code Custom Data and ESLint configurations.
- **Type Safety**: Full JSDoc/TypeScript support for animation variables.
- **Framework Agnostic**: Works with plain HTML, React, Vue, etc.

## Installation
Simply copy the `motion-lyte.js` folder into your project.

## Usage

### 1. Basic HTML
```html
<div data-hover-animation="underline_animation">Hover me</div>
```

### 2. Using the Factory (JS/React)
```javascript
import { createAttributes } from 'motion-lyte.js';

// Get attributes as an object
const attrs = createAttributes({
  hover: 'character_animation',
  variables: { variant: 'word' }
});

// Pass to an element (React example)
return <div {...attrs}>Animate me</div>;
```

### 3. Direct DOM Setting
```javascript
createAttributes({
  scroll: 'dynamic_toggle',
  scrollVariables: { threshold: 0.5 }
}, { targetElement: document.querySelector('.my-element') });
```

## Documentation
See `usage_guide.md` in the library folder for a complete list of attributes and variables.
