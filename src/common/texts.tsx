import { Col, Row } from "antd";
import { useDemoData } from "../base/hooks";
import _ from "lodash";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { getOrderStatus } from "../base/utils";
import { GoodsColums } from "../base/constans";
export function TwoText({ label, text, style = {} }) {
  return (
    <Row style={{ width: "100%", padding: '6px 0', ...style }}>
      <span style={{ width: "30%", textAlign: "right" }}>{label}</span>
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
      <TwoText label="真实总价：" text={price} />
      <TwoText label="买家：" text={buyerName} />
    </Col>
  );
}

const titleStyle = {
  fontSize: 16, fontWeight: 600
}

export function OrderInfo({ children = null, rows = GoodsColums }) {
  const { demoData } = useDemoData();
  const orderForm = demoData.orderForm;
  return (
    <Col style={{ width: "70%", marginLeft: '10%', border: '1px solid rgba(0,0,0,0.2)', borderRadius: 10, backgroundColor: 'white' }}>
      <TwoText label="Order status：" text={getOrderStatus(orderForm)} style={{ fontSize: 18, fontWeight: 600}}/>
      { rows.map((item, index) => {
        const text = _.get(orderForm, item.dataIndex)
        if (_.isEmpty(text)) return null
        if (item.dataIndex === 'transType' && text === 'Long-term') {
          const longTransId = _.get(orderForm, "longTransId");
          return <>
            <TwoText label={`${item.title}：`} text={text} key={`goods_info_item_${index}`} />
            <TwoText label={`Long-term agreement contract number：`} text={longTransId} key={`trans_item`} />
          </>
        }
        return <TwoText label={`${item.title}：`} text={text} key={`goods_info_item_${index}`} />
      })}
      { children }
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
