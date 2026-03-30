# Motion-Lyte-JS

A modular, readable, and maintainable animation framework for the web, designed for high-performance and zero-dependency (zero-config optional) usage.

## 📦 Installation

```bash
npm install motion-lyte-js
```

## 🚀 Quick Start

```javascript
import { loadAnimations } from 'motion-lyte-js';

loadAnimations();
```

## 🛠️ Build for Production
The library is optimized using `tsup` to provide minified ESM and CJS bundles. Only the necessary `dist` files are published to keep the package lightweight.

### Vite Plugin
To automatically initialize animations in a Vite project, use the official plugin:

```javascript
// vite.config.js
import { motionLyte } from 'motion-lyte-js/vite';

export default {
  plugins: [motionLyte()]
};
```

## Features
- **Modular Architecture**: Easy to extend with custom animations.
- **Dynamic Prefixes**: No hardcoded class names; classes are derived from animation names.
- **Cross-IDE Support**: Includes VS Code Custom Data and ESLint configurations.
- **Type Safety**: Full JSDoc/TypeScript support for animation variables.
- **Framework Agnostic**: Works with plain HTML, React, Vue, etc.

## Installation
Simply copy the `motion-lyte-js` folder into your project.

## Usage

### 1. Basic HTML
```html
<div data-hover-animation="underline_animation">Hover me</div>
```

### 2. Using the Factory (JS/React)
```javascript
import { createAttributes } from 'motion-lyte-js';

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
