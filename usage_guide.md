# Animation Framework: HTML Usage Guide

This guide defines the structure for using the animation framework via HTML `data-` attributes.

## 1. Trigger Attributes
Use these attributes to define which animation should play and what trigger should start it. You can specify multiple animations separated by commas.

| Attribute | Description | Values (examples) |
| :--- | :--- | :--- |
| `data-hover-animation` | Triggered on `mouseenter` / `mouseleave` | `underline_animation`, `character_animation` |
| `data-play-animation` | Triggered immediately on load | `dynamic_toggle` |
| `data-toggle-animation` | Triggered on `click` | `dynamic_toggle` |
| `data-scroll-animation` | Triggered when scrolled into view | `dynamic_toggle`, `underline_animation` |

---

## 2. Variable Attributes
Variables are passed as JSON-like strings. Special characters like single quotes are automatically fixed by the framework.

| Attribute | Description |
| :--- | :--- |
| `data-animation-variables` | Global variables for all triggers on this element. |
| `data-hover-variables` | variables specific to the hover trigger. |
| `data-play-variables` | variables specific to the play trigger. |
| `data-toggle-variables` | variables specific to the toggle trigger. |
| `data-scroll-variables` | variables specific to the scroll trigger. |

> [!NOTE]
> Style-specific variables (e.g., `data-scroll-variables`) will override global ones (`data-animation-variables`) for that specific trigger.

---

## 3. Supported Variable Properties

| Property | Type | Description | Animations |
| :--- | :--- | :--- | :--- |
| `enterClass` | `string` | Class added when entering the "active" state. | All |
| `leaveClass` | `string` | Class added when leaving the "active" state. | All |
| `prefix` | `string` | Override the dynamic class prefix (replaces name-driven defaults). | All |
| `receiver-id` | `string` | ID matching a `data-toggle-receiver-id` on another element. | `dynamic_toggle` |
| `text` | `string` | The text content to be animated. | `character_animation` |
| `variant` | `'char' \| 'word'` | How to split the text. Defaults to `char`. | `character_animation` |
| `type` | `'scrollTo' \| 'scrolling'` | Scroll behavior. Defaults to `scrollTo`. | Scroll trigged |
| `threshold` | `number` | Intersection ratio (0.0 to 1.0). | Scroll trigged |

---

## 4. Examples

### Hover Underline
```html
<a href="#" 
   data-hover-animation="underline_animation"
   data-animation-variables="{prefix: 'custom-underline'}">
   Link Text
</a>
```

### Scroll Reveal
```html
<section 
   data-scroll-animation="dynamic_toggle"
   data-scroll-variables="{enterClass: 'opacity-100', leaveClass: 'opacity-0', threshold: 0.5}">
   Content
</section>
```

### Mobile Menu Toggle
```html
<button 
   data-toggle-animation="dynamic_toggle"
   data-toggle-variables="{receiver-id: 'mobile_nav', enterClass: 'open', leaveClass: 'closed'}">
   Menu
</button>

<nav data-toggle-receiver-id="mobile_nav" class="closed">
   ...
</nav>
```
