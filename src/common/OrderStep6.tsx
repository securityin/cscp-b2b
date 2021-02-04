import { Button, Col, Form, Input, Row, Select } from "antd";
import _ from "lodash";
import { useDemoData, useTranslation } from "../base/hooks";
import { GoodsInfo, TwoText } from "./texts";

const keysToHidden = ['0', 'key', 'name', 'cycle', 'warehouse', 'price', 'buyerName', 'riskLevel', 'count', 'status']

export default function OrderStep6({ onFinish }: { onFinish: (data) => void }) {
  const { demoData } = useDemoData();
  const { t } = useTranslation()
  const orderForm = demoData.orderForm;


  return (
    <Col style={{ width: "100%" }}>
      <Form style={{ width: "100%", paddingTop: 10 }}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        onFinish={onFinish}>
        <Form.Item name={'freightConsort'} label='货运协调' labelAlign={"right"} wrapperCol={{ offset: 1 }} >
          <Input type='text' placeholder={'货运协调'} style={{width: '50%', margin: 0}}></Input>
        </Form.Item>
        <Form.Item name={'customsConsort'} label='海关协调' labelAlign={"right"} wrapperCol={{ offset: 1 }}>
          <Input type='text' placeholder={'海关协调'} style={{width: '50%', margin: 0}}></Input>
        </Form.Item>
        <Form.Item name={'insuranceConsort'} label='保险任务协调' labelAlign={"right"} wrapperCol={{ offset: 1 }}>
          <Input type='text' placeholder={'保险任务协调'} style={{width: '50%', margin: 0}}></Input>
        </Form.Item>
        <Form.Item labelAlign={"right"} wrapperCol={{ offset: 8 }}>
          <Button type={"primary"} htmlType={"submit"}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </Col>
  );
}
