export const columns = [
  { title: "Goods", dataIndex: "name" },
  { title: "Trading cycle", dataIndex: "cycle" },
  { title: "Warehouse", dataIndex: "warehouse" },
  { title: "Count", dataIndex: "count" },
  { title: "Total price", dataIndex: "price" },
];

export const columns2 = [
  ...columns,
  { title: "Buyer", dataIndex: "buyerName" },
  { title: "Buyer intention price", dataIndex: "intentionAmount" },
];

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
