A simple, yet customizable, module to add SVG icons in Angular 6+ applications.

The icons are included inline. So, they can be manipulated via CSS.

[Demo](https://ang-svg-icons.stackblitz.io) on StackBlitz.

## Features
* **Small** footprint.
* **No** icon **registration** required.
* Provides a **blank icon** for specified size.
  - Can be used as filler.
* Provides an **error icon** - used when specified SVG icon is not found.
  - Developers can spot missing icons easily.
* **Customizable**
  - Set specific icon size.
  - Scale icon by a factor.
  - Set fill color for error icons.
    - Makes it easy to spot missing icons in any theme.
  - Set own error icon.
    - Use failures as opportunity with _branded_ error icons.

## Stability
Beta
* Features can be demonstrated.
  - Optimization is possible.
* Documentation almost complete.
* No test cases.
  - But sample application covers many usage scenarios.
* Issues/ limitations not known.

## Installation

### npm
```
npm install --save @spremi/ang-svg-icon
```
### yarn
```
yarn add @spremi/ang-svg-icon
```
## Dependencies

```typescript
import { HttpClientModule } from '@angular/common/http';
```
...later, add it to imports:
```
imports: [BrowserModule, HttpClientModule],
```

## How to use

In ``app.module.ts``, import ``SvgIconModule``.
- Also import ``HttpClientModule``, if not already.

```typescript
import { SvgIconModule } from '@spremi/svg-icon';

@NgModule({
  declarations: [...],
  imports: [BrowserModule, HttpClientModule, SvgIconModule.forRoot()],
  providers: [...],
  bootstrap: [...],
})
export class AppModule {}
```

In the HTML template:

Add icon as-is:
```html
<ang-svg-icon url="/assets/my_icon.svg"></ang-svg-icon>
```
Add icon with width and height set as 24 pixels:
```html
<ang-svg-icon url="/assets/my_icon.svg" width="24" height="24"></ang-svg-icon>
```
Add icon and scale it **2x**:
```html
<ang-svg-icon url="/assets/my_icon.svg" scale="2"></ang-svg-icon>
```
Note:
* For ``scale`` to work, original SVG must specify a size (width & height).
* If ``scale`` is specified, it takes precedence over ``width`` and ``height``.

## How to customize
We need to import ``SvgIconService`` as well.

```typescript
import { SvgIconModule, SvgIconService } from '@spremi/svg-icon';
```

### Set custom fill color for **error** icons
```typescript
export class AppModule {
  constructor(private iconSvc: SvgIconService) {
    this.iconSvc.setErrorFill('purple');
  }
}
```

### Set custom **error** SVG
Add markup for the custom error SVG.
- Ensure it has ``viewBox`` defined, so that it scales well.
- Change ``width`` and ``height`` to ``%WIDTH%`` and ``%HEIGHT%`` as shown below.

```typescript
const CUST_ERROR = `<svg xmlns="http://www.w3.org/2000/svg"
  width="%WIDTH%" height="%HEIGHT%" viewBox="0 0 24 24">
  ...
  ...
  </svg >`;

export class AppModule {
  constructor(private iconSvc: SvgIconService) {
    this.iconSvc.setErrorTemplate(CUST_ERROR);
  }
}
```

## License
BSD-3-Clause Copyright [Sanjeev Premi](https://github.com/spremi)
