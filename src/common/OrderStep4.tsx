import { Button, Col, Form, Input, Row, Select } from "antd";

export default function OrderStep4({ onFinish }: { onFinish: (data) => void }) {
  return (
    <Form
      style={{ width: "100%" }}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      onFinish={onFinish}
    >
      <Form.Item
        label="商币部分：" // 大于保证金
        rules={[{ required: true }]}
        name={"moneyCoin"}
      >
        <Input type="number"></Input>
      </Form.Item>
      <Form.Item
        label="黄金部分：" 
        
        name={"moneyGold"}
      >
        <Input type="number"></Input>
      </Form.Item>
      <Form.Item
        label="申请贷款："
        name={"moneyLoan"}
      >
        <Input type="number"></Input>
      </Form.Item>
      
      <Form.Item labelAlign={"right"} wrapperCol={{ offset: 10 }}>
        <Button type={"primary"} htmlType={"submit"}>
          确认并冻结保证金
        </Button>
      </Form.Item>
    </Form>
  );
}
