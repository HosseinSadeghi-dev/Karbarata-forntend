import { Injectable, NgModule } from '@angular/core';
import {
  StyleBuilder,
  StyleDefinition,
  LayoutGapParent,
  LayoutGapStyleBuilder,
} from '@angular/flex-layout';

@Injectable()
export class CustomLayoutGapStyleBuilder extends LayoutGapStyleBuilder {
  buildStyles(gapValue: string, parent: LayoutGapParent): StyleDefinition {
    return super.buildStyles(gapValue || '0 px', parent);
  }

  sideEffect(gapValue, _styles, parent) {
    return super.sideEffect(gapValue || '0 px', _styles, parent);
  }

}
