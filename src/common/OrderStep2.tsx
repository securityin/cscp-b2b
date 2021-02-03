import { Button, Col, Form, Input, Row, Select } from "antd";

export default function OrderStep2({ onFinish }: { onFinish: (data) => void }) {
  return (
    <Form
      style={{ width: "100%" }}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      onFinish={onFinish}
    >
      <Form.Item label='交易条款' name={'transTerm'}>
        <Input.TextArea rows={15}></Input.TextArea>
      </Form.Item>
      <Form.Item labelAlign={"right"} wrapperCol={{ offset: 10 }}>
        <Button type={"primary"} htmlType={"submit"}>
          下一步
        </Button>
      </Form.Item>
    </Form>
  );
}
