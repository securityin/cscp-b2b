import { Merchant } from './home.api';
import { UpdateStoreItem } from './../store';
import _ from 'lodash'
import { DemoData } from './types';
export const createUpdateItem = (key: Keys, value: any): UpdateStoreItem => {
  return {
    key,
    value
  }
}

export const getFromState = <T>(key: Keys, init?: T) => {
  return (state): T => _.get(state, key, init)
}

export type Keys =
  'loading'
  | 'demoData'
  | 'active'


//update action
export const setLoading = (loading: boolean) => createUpdateItem('loading', loading)
export const setDemoData = (data: DemoData) => createUpdateItem('demoData', data)

//select
export const selectLoading = getFromState('loading', false)
export const selectDemoData = getFromState<DemoData>('demoData')