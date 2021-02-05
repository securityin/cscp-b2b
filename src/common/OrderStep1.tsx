import { Button, Col, Form, Input, Row, Select } from "antd";
import _ from 'lodash'
import { wharfInfos, customsList, agencyCompanys, insuranceCompanys } from "../base/constans";




export default function OrderStep1({ onFinish, orderForm }: { onFinish: (data) => void, orderForm?: any }) {
  return (
    <Form
      style={{ width: "100%", paddingTop: 10 }}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Actual total amount："
        rules={[{ required: true }]}
        name={"finalTotalPrice"}
        initialValue={_.get(orderForm, 'finalTotalPrice')}
      >
        <Input type="number"></Input>
      </Form.Item>
      <Form.Item
        label="Order type："
        rules={[{ required: true }]}
        name={"transType"}
        initialValue={_.get(orderForm, 'transType')}
      >
        <Select>
          <Select.Option value={"Long-term"}>Long-term</Select.Option>
          <Select.Option value={"Spot"}>Spot</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Deposit payment："
        rules={[{ required: true }]}
        name={"securityDeposit"}
        initialValue={_.get(orderForm, 'securityDeposit')}
      >
        <Input type="number"></Input>
      </Form.Item>
      <Form.Item
        label="Port of shipment："
        rules={[{ required: true }]}
        name={"outInfo"}
        initialValue={_.get(orderForm, 'outInfo')}
      >
        <Select>
          {wharfInfos.map((item, index) => <Select.Option value={item} key={`select_${index}`}>{item}</Select.Option>)}
        </Select>
      </Form.Item>
      <Form.Item
        label="Port of destination："
        rules={[{ required: true }]}
        name={"inInfo"}
        initialValue={_.get(orderForm, 'inInfo')}
      >
        <Select>
          {wharfInfos.map((item, index) => <Select.Option value={item} key={`select_${index}`}>{item}</Select.Option>)}
        </Select>
      </Form.Item>
      <Form.Item
        initialValue={_.get(orderForm, 'shipping')}
        label="Shipping：" rules={[{ required: true }]} name={"shipping"}>
        <Input type="number"></Input>
      </Form.Item>
      <Form.Item label="Customs：" style={{ marginBottom: 0 }}>
        <Form.Item
          initialValue={_.get(orderForm, 'customs')}
          rules={[{ required: true }]}
          name={'customs'} style={{ width: '32%', display: 'inline-block' }}>
          <Select>
          {customsList.map((item, index) => <Select.Option value={item} key={`select_${index}`}>{item}</Select.Option>)}
          </Select>
        </Form.Item>
        <Form.Item
          initialValue={_.get(orderForm, 'customsAgent')}
          rules={[{ required: true }]}
          name={'customsAgent'} style={{ width: '32%', display: 'inline-block', marginLeft: '2%' }}>
          <Select>
          {agencyCompanys.map((item, index) => <Select.Option value={item} key={`select_${index}`}>{item}</Select.Option>)}
          </Select>
        </Form.Item>
        <Form.Item
          initialValue={_.get(orderForm, 'customsFee')}
          rules={[{ required: true }]}
          name={'customsFee'} style={{ width: '32%', display: 'inline-block', marginLeft: '2%' }}>
          <Input type={"number"} placeholder={'Customs Fee'}></Input>
        </Form.Item>

      </Form.Item>
      <Form.Item label="Insurance：" style={{ marginBottom: 0 }}>
        <Form.Item
          initialValue={_.get(orderForm, 'insurance')}
          rules={[{ required: true }]}
          name={'insurance'} style={{ width: '49%', display: 'inline-block' }}>
          <Select>
          {insuranceCompanys.map((item, index) => <Select.Option value={item} key={`select_${index}`}>{item}</Select.Option>)}
          </Select>
        </Form.Item>
        <Form.Item
          initialValue={_.get(orderForm, 'insuranceFee')}
          rules={[{ required: true }]}
          name={'insuranceFee'} style={{ width: '49%', display: 'inline-block', marginLeft: '2%' }}>
          <Input type={"number"} placeholder={'Insurance Fee'}></Input>
        </Form.Item>
      </Form.Item>
      <Form.Item labelAlign={"right"} wrapperCol={{ offset: 10 }}>
        <Button type={"primary"} htmlType={"submit"}>
          Next Step
        </Button>
      </Form.Item>
    </Form>
  );
}
