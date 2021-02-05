import { Button, Col, Form, Input, Row, Select } from "antd";
import _ from 'lodash'

export default function OrderStep2({ onFinish, orderForm }: { onFinish: (data) => void, orderForm?: any }) {
  return (
    <Form
      style={{ width: "100%", paddingTop: 10 }}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      onFinish={onFinish}
    >
      <Form.Item label='Transation term' name={'transTerm'} initialValue={_.get(orderForm, 'transTerm')}>
        <Input.TextArea rows={8}></Input.TextArea>
      </Form.Item>
      <Form.Item labelAlign={"right"} wrapperCol={{ offset: 10 }}>
        <Button type={"primary"} htmlType={"submit"}>
          Next Step
        </Button>
      </Form.Item>
    </Form>
  );
}
