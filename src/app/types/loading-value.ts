import { Observable, Observer } from 'rxjs';

export interface PendingValue {
  pending: true;
}

export const PENDING_VALUE: PendingValue = {
  pending: true,
};

export function isPendingValue(value: any): value is PendingValue {
  return value === PENDING_VALUE;
}

export interface PendingObserver<T> extends Observer<T> {
  pending: () => void;
}

export function isFunction(value: any): value is (...args: any[]) => any {
  return typeof value === 'function';
}

export class PendingObservable<T> extends Observable<T> {
  override subscribe(
    observerOrNext?: Partial<PendingObserver<T>> | ((value: T) => void) | null,
    error?: ((error: any) => void) | null,
    complete?: (() => void) | null
  ) {
    if (observerOrNext === null) {
      return super.subscribe();
    }
    if (isFunction(observerOrNext)) {
      return super.subscribe(observerOrNext, error, complete);
    }

    if (observerOrNext?.pending) {
      const pending = observerOrNext.pending;
    }
    return super.subscribe(observerOrNext);
  }
}
