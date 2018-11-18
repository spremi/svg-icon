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

### Set custom fill color for _error_ icons
```typescript
export class AppModule {
  constructor(private iconSvc: SvgIconService) {
    this.iconSvc.setErrorFill('purple');
  }
}
```

## License
BSD-3-Clause Copyright [Sanjeev Premi](https://github.com/spremi)
