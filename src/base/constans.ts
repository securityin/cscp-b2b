export const columns = [
  { title: "货品", dataIndex: "name" },
  { title: "交易周期", dataIndex: "cycle" },
  { title: "仓库", dataIndex: "warehouse" },
  { title: "数量", dataIndex: "count" },
  { title: "总价", dataIndex: "price" },
];

export const columns2 = [
  ...columns,
  { title: "买家", dataIndex: "buyerName" },
  { title: "买家意向价", dataIndex: "intentionAmount" },
];

export const data = [
  {
    key: "scpc-0",
    name: "汽油",
    cycle: "2021-02-02~2021-03-03",
    warehouse: "珠海xx码头",
    count: "1000桶",
    price: 100000,
    buyerName: "蓝天公司",
    riskLevel: 0,
  },
  {
    key: "scpc-1",
    name: "汽油",
    cycle: "2021-02-02~2021-03-03",
    warehouse: "上海xx码头",
    count: "500桶",
    price: 10000,
    buyerName: "上恒公司",
    riskLevel: 1,
  },
];

export const title = "Petro B2B Trading Platform";
