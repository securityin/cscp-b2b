import { get } from "./api";

export type MerchantsData = {
  totalStorage: number,
  availableStorage: number,
  totalPeers: number,
  totalValidFile: number,
  averageReplica: number,
  realTimeStoragePrice: string
}

export type MarketItem = {
  id: number,
  date: number,
  fileCount: number,
  totalStorage: number,
  totalPeers: number
}

export type MerchantFile = {
  cid: string,
  fileSize: string,
  expiredTime: number,
  expectedReward: string
}

export type Merchant = {
  id: number,
  accountId: string,
  totalStorage: number,
  availableStorage: number,
  rewardToBeClaim: string,
  totalPledge: string,
  effectiveStake: string,
  freeBalance: string,
  stakes: string,
  files: MerchantFile[],
}

export const getMerchantsOverview = () => get<MerchantsData>('/merchantsOverview')
export const getMarketOverview = () => get<MarketItem[]>('/marketOverview')
export const getMerchant = (accountId) => get<Merchant>(`/merchantById?accountId=${accountId}`)