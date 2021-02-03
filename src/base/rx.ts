import { UpdateStoreItem } from './../store';
import { Observable } from 'rxjs';
import { InputFactoryWithInputs, useObservable } from 'rxjs-hooks';
import { RestrictArray } from 'rxjs-hooks/dist/cjs/type';
import { finalize, onErrorResumeNext } from 'rxjs/operators';
import { useUpdateStore } from './hooks';
import { setLoading } from './root.redux';

export function useRxLoading<S, Inputs>(inputFactory: InputFactoryWithInputs<S, Inputs>, initialState?: S, inputs?: RestrictArray<Inputs>) {
  const update = useUpdateStore()
  return useObservable((a, b) => {
    update(setLoading(true))
    return withRxLoading(inputFactory(a, b), update)
  }, initialState, inputs)
}

export function withRxLoading<T>(o: Observable<T>, update: (...list: UpdateStoreItem[]) => void): Observable<T> {
  update(setLoading(true))
  return o.pipe(onErrorResumeNext(), finalize(() => update(setLoading(false))))
}