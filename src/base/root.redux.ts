import _ from 'lodash';
import { UpdateStoreItem } from './../store';
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
  | 'buyerTab'
  | 'sellerTab'

export declare const BuyerTab: ['goods', 'orders'];
export declare type BuyerTabType = typeof BuyerTab[number];

export declare const SellerTab: ['published', 'orders'];
export declare type SellerTabType = typeof SellerTab[number];

//update action
export const setLoading = (loading: boolean) => createUpdateItem('loading', loading)
export const setDemoData = (data: DemoData) => createUpdateItem('demoData', data)
export const setBuyerTab = (tab: BuyerTabType) => createUpdateItem('buyerTab', tab)
export const setSellerTab = (tab: SellerTabType) => createUpdateItem('sellerTab', tab)

//select
export const selectLoading = getFromState('loading', false)
export const selectDemoData = getFromState<DemoData>('demoData')
export const selectBuyerTab = getFromState<BuyerTabType>('buyerTab', 'goods')
export const selectSellerTab = getFromState<SellerTabType>('sellerTab', 'published')