
export const columns = [
  { title: "Goods Type", dataIndex: "name" },
  { title: "Time of validity", dataIndex: "cycle" },
  { title: "From warehouse", dataIndex: "warehouse" },
  { title: "Quantity", dataIndex: "count" },
  { title: "Total amount", dataIndex: "price" },
];

export const columns2 = [
  ...columns,
  { title: "Buyer", dataIndex: "buyerName" },
  { title: "Buyer intention amount", dataIndex: "intentionAmount" },
];

export const GoodsColums = [
  ...columns2,
  { title: 'Transaction agreement', dataIndex: 'transTerm' },
  { title: 'Port of shipment', dataIndex: 'outInfo' },
  { title: 'Port of destination', dataIndex: 'inInfo' },
  { title: 'Order type', dataIndex: 'transType' },
  { title: 'Payment component 1(Currency)', dataIndex: 'moneyCoin' },
  { title: 'Payment component 2(Gold)', dataIndex: 'moneyGold' },
  { title: 'Payment component 3(Loan)', dataIndex: 'moneyLoan' },
  { title: 'Actual total amount', dataIndex: 'finalTotalPrice' },
  { title: 'Shipment coordination', dataIndex: 'freightConsort' },
  { title: 'Customs coordination', dataIndex: 'customsConsort' },
  { title: 'Insurance coordination', dataIndex: 'insuranceConsort' },
  { title: 'Logistics information', dataIndex: 'logisticsInfo' },
]

export const data = [
  {
    key: "scpc-0",
    name: "Petro",
    cycle: "2021-02-02~2021-03-03",
    warehouse: "ShangHai xx wharf",
    count: "1000 Bucket",
    price: 100000,
    buyerName: "xxx Company",
    riskLevel: 0,
  },
  {
    key: "scpc-1",
    name: "Oil",
    cycle: "2021-02-02~2021-03-03",
    warehouse: "ShangHai xx wharf",
    count: "500 Bucket",
    price: 10000,
    buyerName: "xxx Company",
    riskLevel: 1,
  },
];

export const title = "Petro B2B Trading Platform";


export const wharfInfos = [
  'ZhuHai xxx wharf',
  'ShangHai xxx wharf',
  'QingDao xxx wharf',
]

export const customsList = [
  'ZhuHai xxx port',
  'ShangHai xxx port',
  'QingDao xxx port',
]

export const agencyCompanys = [
  'A Agency company',
  'B Agency company',
  'C Agency company',
]

export const insuranceCompanys = [
  'A Insurance company',
  'B Insurance company',
  'C Insurance company',
]

export const statusMap = {
  0: '',
  1: 'Intending',
  2: 'Intent received',
  3: 'Pending deposit payment',
  4: 'Pending deposit payment(Settlement)',
  5: 'First order acknowledgement',
  6: 'Pending service fee payment',
  7: 'Pending service fee(Settlement)',
  8: 'Secend order acknowledgement',
  9: 'Pending final payment',
  10: 'Pending final payment(Settlement)',
  88: 'Completed',
}