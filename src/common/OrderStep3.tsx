import { Button, Col, Form, Input, Row, Select } from "antd";
import { useDemoData } from "../base/hooks";
import { GoodsInfo, TwoText } from "./texts";
import _ from "lodash";

export default function OrderStep3({ onFinish }: { onFinish: (data) => void }) {
  const { demoData } = useDemoData();

  const outInfo = _.get(demoData.orderForm, "outInfo");
  const inInfo = _.get(demoData.orderForm, "inInfo");
  const transType = _.get(demoData.orderForm, "transType");
  const isLongTrans = transType === "Long-term";
  return (
    <Col>
      <TwoText label="出库信息：" text={outInfo} />
      <TwoText label="入库信息：" text={inInfo} />
      <TwoText label="是否长协：" text={isLongTrans ? "是" : "否"} />
      <Form
        style={{ width: "100%" }}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        onFinish={onFinish}
      >
        {isLongTrans && (
          <Form.Item
            label="长协合同号："
            rules={[{ required: true }]}
            name={"longTransId"}
          >
            <Input type="text"></Input>
          </Form.Item>
        )}

        <Form.Item labelAlign={"right"} wrapperCol={{ offset: 10 }}>
          <Button type={"primary"} htmlType={"submit"}>
            确认货单
          </Button>
        </Form.Item>
      </Form>
    </Col>
  );
}
