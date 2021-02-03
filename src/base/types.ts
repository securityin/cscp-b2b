export type OrderForm = {
    /**
     * 状态
     * 0: 初始状态
     * 1: 买家(交易员)发起意向后，
     * 2: 买家选中购买意向后。
     * 3: 卖家创建订单并冻结保证金后
     * 4: 买家(交易员)确认后
     * 5: 买家(财务)支付保证金后(公示1期24小时)
     * 6: 公示1期结束后(卖家协调货运，海关，保险)发起服务费支付
     * 7: 买家(交易员)确认支付服务费用。
     * 8: 买家(财务)确认支付服务费用。
     * 9: 
     * 88: 买家(财务)支付服务费用
     */
    status: number;
    // 货品
    name: string,
    // 交付时段
    cycle: string,
    // 仓库
    warehouse: string,
    // 数量
    count: string,
    // 总价
    price: string,
    // 买家
    buyerName: string,
    // 风险等级 0, 1,2
    riskLevel: 0;
    // 买家意向价
    intentionAmount: number,
    // 交际形式
    transType: string,
    // 保证金
    securityDeposit: number,
    // 出库信息
    outInfo: string,
    // 入库信息
    inInfo: string,
    // 运费
    shipping: number,
    // 海关， 海关代理，海关费用
    customs: string,
    customsAgent: string,
    customsFee: number,
    // 保险， 保险费用
    insurance: string,
    insuranceFee: number,
    // 平台服务费
    platformFee: number,
    // 交易条款
    transTerm: string,
    // 长协合同号，
    longTransId: string,
    // 商币，黄金，贷款
    moneyCoin: number,
    moneyGold: number,
    moneyLoan: number,

}

export type DemoData = {
    orderForm: any
}