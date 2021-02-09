import { Col, Row } from "antd";
import { useDemoData } from "../base/hooks";
import _ from "lodash";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { getOrderStatus } from "../base/utils";
import { GoodsColums } from "../base/constans";
export function TwoText({ label, text, style = {}, text2 = null }) {
  return (
    <Row style={{ width: "100%", padding: '6px 0', ...style }}>
      <span style={{ width: "30%", textAlign: "right" }}>{label}</span>
      <span style={{ flex: 1, textAlign: "left", paddingLeft: 6 }}>{text}{text2}</span>
    </Row>
  );
}

const titleStyle = {
  fontSize: 16, fontWeight: 600
}

export function OrderStatus({ orderForm }) {
  return <TwoText label="Order status：" text={getOrderStatus(orderForm)} style={{ fontSize: 16, fontWeight: 600, color: '#37c414' }} />
}

export function OrderInfo({ children = null, rows = GoodsColums, orderForm }) {
  // const { demoData } = useDemoData();
  // const orderForm = demoData.orderForm;
  const infos = _.filter(rows, (item) => {
    const itemData = _.get(orderForm, item.dataIndex)
    if (itemData) {
      if (typeof itemData === 'number') return true
      return !_.isEmpty(itemData)
    }
    return false
  })
  if (infos.length === 0) return null
  return (
    <Col style={{ width: "100%", border: '1px solid rgba(0,0,0,0.2)', borderRadius: 10, backgroundColor: 'white', padding: 10 }}>
      <OrderStatus orderForm={orderForm} />
      { infos.map((item, index) => {
        const text = _.get(orderForm, item.dataIndex)
        const showPdf = _.get(item, 'showPdf', false)
        if (item.dataIndex === 'transType' && text === 'Long-term') {
          const longTransId = _.get(orderForm, "longTransId");
          return <Col key={`goods_info_item_${index}`}>
            <TwoText label={`${item.title}：`} text={text} />
            <TwoText label={`Long-term agreement contract number：`} text={longTransId} />
          </Col>
        }
        const txt2 = showPdf ? <a
          style={{ color: '#1872e7', marginLeft: 15 , textDecoration: 'underline'}}
          href={'/why-rust.pdf'} target={'_black'}>View agreement</a>
          : null
        return <TwoText label={`${item.title}：`} text={text} text2={txt2} key={`goods_info_item_${index}`} />
      })}
      { children}
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
