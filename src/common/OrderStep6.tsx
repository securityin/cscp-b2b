import { Button, Col, Form, Input } from "antd";
import _ from 'lodash'
import { insuranceTypes } from "../base/constans";

export default function OrderStep6({ onFinish, orderForm }: { onFinish: (data) => void, orderForm }) {
  return (
    <Col style={{ width: "100%" }}>
      <Form style={{ width: "100%", paddingTop: 10 }}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        onFinish={onFinish}>
        <Form.Item name={'freightConsort'} label='Freight coordination' labelAlign={"right"} wrapperCol={{ offset: 1 }}  rules={[{ required: true }]}>
          <Input type='text' placeholder={'Freight coordination'} style={{ width: '50%', margin: 0 }}></Input>
        </Form.Item>
        <Form.Item
          label="Shipping："
          rules={[{ required: true }]}
          name={"shipping"}
          labelAlign={"right"}
          wrapperCol={{ offset: 1, span: 8 }}>
          <Input type="number"></Input>
        </Form.Item>
        <Form.Item name={'customsConsort'} label='Customs coordination' labelAlign={"right"} wrapperCol={{ offset: 1 }}  rules={[{ required: true }]}>
          <Input type='text' placeholder={'Customs coordination'} style={{ width: '50%', margin: 0 }}></Input>
        </Form.Item>
        <Form.Item
          labelAlign={"right"}
          wrapperCol={{ offset: 1, span: 8 }}
          label={'Customs Fee'}
          rules={[{ required: true }]}
          name={'customsFee'}>
          <Input type={"number"}></Input>
        </Form.Item>
        <Form.Item name={'insuranceConsort'} label='Insurance task coordination' labelAlign={"right"} wrapperCol={{ offset: 1 }} rules={[{ required: true }]}>
          <Input type='text' placeholder={'Insurance task coordination'} style={{ width: '50%', margin: 0 }}></Input>
        </Form.Item>
        {
          _.get(orderForm, 'insuranceType') === insuranceTypes[1] &&
          <Form.Item
            label="Insurance fee："
            rules={[{ required: true }]}
            name={"insuranceFee"}
            labelAlign={"right"}
            wrapperCol={{ offset: 1, span: 8 }}>
            <Input type="number"></Input>
          </Form.Item>
        }
        <Form.Item labelAlign={"right"} wrapperCol={{ offset: 8 }}>
          <Button type={"primary"} htmlType={"submit"}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Col>
  );
}
