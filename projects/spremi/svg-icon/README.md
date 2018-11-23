A simple, yet customizable, module to add SVG icon in Angular 6+ applications.

[Demo](https://ang-svg-icons.stackblitz.io)

## Features
* Small footprint
* No icon registration required.
* Provides blank icon for specified size.
  - Can be used as filler.
* Provides (customizable) error SVG, if specified SVG was not found.
  - Developers can spot missing icons easily.
* Provides (customizable) fill color for error icons
  - Makes it easy to spot the icons in any theme.

## Stability
Alpha
> Early implementation.
> No test cases.
> Documentation may not be complete.
> Issues/ limitations not known.

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
