import { Col, Row } from "antd";
import { useDemoData } from "../base/hooks";
import _ from "lodash";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
export function TwoText({ label, text }) {
  return (
    <Row style={{ width: "100%" , padding: '10px 0'}}>
      <span style={{ width: "16.6%", textAlign: "right" }}>{label}</span>
      <span style={{ flex: 1, textAlign: "left" }}>{text}</span>
    </Row>
  );
}

export function GoodsInfo() {
  const { demoData } = useDemoData();
  const orderForm = demoData.orderForm;
  const name = _.get(orderForm, "name");
  const cycle = _.get(orderForm, "cycle");
  const warehouse = _.get(orderForm, "warehouse");
  const count = _.get(orderForm, "count");
  const price = _.get(orderForm, "price");
  const buyerName = _.get(orderForm, "buyerName");
  return (
    <Col style={{ width: "100%" }}>
      <TwoText label="货品：" text={name} />
      <TwoText label="交付周期：" text={cycle} />
      <TwoText label="仓库：" text={warehouse} />
      <TwoText label="数量：" text={count} />
      <TwoText label="买家意向价：" text={price} />
      <TwoText label="买家：" text={buyerName} />
    </Col>
  );
}

const titleStyle = {
  fontSize: 16, fontWeight: 600 
}

export function OrderInfo() {
  const { demoData } = useDemoData();
  const orderForm = demoData.orderForm;
  const transTerm = _.get(orderForm, "transTerm");
  const outInfo = _.get(orderForm, "outInfo");
  const inInfo = _.get(orderForm, "inInfo");
  const transType = _.get(orderForm, "transType");
  const isLongTrans = transType === "长协";
  const longTransId = _.get(orderForm, "longTransId");

  const moneyCoin = _.get(orderForm, "moneyCoin");
  const moneyGold = _.get(orderForm, "moneyGold");
  const moneyLoan = _.get(orderForm, "moneyLoan");
  return (
    <Col style={{ width: "100%" }}>
      <span children="交易条款：" style={titleStyle} />
      <TwoText label="" text={transTerm} />
      <span children="货单：" style={titleStyle} />
      <Col style={{ width: "calc(100% - 20px)", alignSelf: "flex-end" }}>
        <GoodsInfo />
        <TwoText label="出库信息：" text={outInfo} />
        <TwoText label="入库信息：" text={inInfo} />
        <TwoText label="是否长协：" text={isLongTrans ? "是" : "否"} />
        {isLongTrans && <TwoText label="长协合同号：" text={longTransId} />}
      </Col>
      <span children="资金组成：" style={titleStyle} />
      <Col style={{ width: "calc(100% - 20px)", alignSelf: "flex-end" }}>
        <TwoText label="商币：" text={moneyCoin} />
        <TwoText label="黄金：" text={moneyGold} />
        <TwoText label="商币：" text={moneyLoan} />
      </Col>
      <TwoText label="冻结余额：" text={moneyCoin} />
    </Col>
  );
}

export function CTime() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const task = setInterval(() => setT(1 - t), 1000);
    return () => clearInterval(task);
  });
  const time = DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss");
  return <span> {time} </span>;
}
