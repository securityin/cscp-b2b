import { Button, Col, Form, Input, Row, Select } from "antd";

export default function OrderStep1({ onFinish }: { onFinish: (data) => void }) {
  return (
    <Form
      style={{ width: "100%", paddingTop: 10 }}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      onFinish={onFinish}
    >
      <Form.Item
        label="交易形式："
        rules={[{ required: true }]}
        name={"transType"}
      >
        <Select>
          <Select.Option value={"长协"}>长协</Select.Option>
          <Select.Option value={"现货"}>现货</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="保证金："
        rules={[{ required: true }]}
        name={"securityDeposit"}
      >
        <Input type="number"></Input>
      </Form.Item>
      <Form.Item
        label="出库信息："
        rules={[{ required: true }]}
        name={"outInfo"}
      >
        <Select>
          <Select.Option value={"珠海xxx码头"}>珠海xxx码头</Select.Option>
          <Select.Option value={"上海xxx码头"}>上海xxx码头</Select.Option>
          <Select.Option value={"青岛xxx码头"}>青岛xxx码头</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="入库信息："
        rules={[{ required: true }]}
        name={"inInfo"}
      >
        <Select>
          <Select.Option value={"珠海xxx码头"}>珠海xxx码头</Select.Option>
          <Select.Option value={"上海xxx码头"}>上海xxx码头</Select.Option>
          <Select.Option value={"青岛xxx码头"}>青岛xxx码头</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="运费：" rules={[{ required: true }]} name={"shipping"}>
        <Input type="number"></Input>
      </Form.Item>
      <Form.Item label="海关：" rules={[{ required: true }]} style={{marginBottom: 0}}>  
        <Form.Item name={'customs'} style={{width: '32%', display: 'inline-block'}}>
          <Select>
            <Select.Option value={"珠海xxx关口"}>珠海xxx关口</Select.Option>
            <Select.Option value={"上海xxx关口"}>上海xxx关口</Select.Option>
            <Select.Option value={"青岛xxx关口"}>青岛xxx关口</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name={'customsAgent'} style={{width: '32%', display: 'inline-block', marginLeft: '2%'}}>
          <Select>
            <Select.Option value={"A代理公司"}>A代理公司</Select.Option>
            <Select.Option value={"B代理公司"}>B代理公司</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name={'customsFee'} style={{width: '32%', display: 'inline-block', marginLeft: '2%'}}>
          <Input type={"number"} placeholder={'海关费用'}></Input>
        </Form.Item>
 
      </Form.Item>
      <Form.Item label="保险：" rules={[{ required: true }]} style={{marginBottom: 0}}>
        <Form.Item name={'insurance'} style={{width: '49%', display: 'inline-block'}}>
          <Select>
            <Select.Option value={"平安保险公司"}>平安保险公司</Select.Option>
            <Select.Option value={"太平洋保险公司"}>太平洋保险公司</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name={'insuranceFee'} style={{width: '49%', display: 'inline-block',marginLeft: '2%'}}>
          <Input type={"number"} placeholder={'保险费用'}></Input>
        </Form.Item>
      </Form.Item>
      <Form.Item labelAlign={"right"} wrapperCol={{ offset: 10 }}>
        <Button type={"primary"} htmlType={"submit"}>
          下一步
        </Button>
      </Form.Item>
    </Form>
  );
}
