import { inject, InjectionToken } from '@angular/core';
import { WINDOW } from './window-token';

export const NAVIGATOR = new InjectionToken<Navigator>(
  'An abstraction over global window.navigator object',
  {
    factory: () => inject(WINDOW).navigator!,
  }
);
