import { Button, Form, Input, InputNumber } from "antd";
import { ValidateStatus } from "antd/lib/form/FormItem";
import _ from 'lodash';
import { useMemo, useState } from "react";

const colLayout = {
  labelCol:{ span: 6 },
  wrapperCol:{ span: 14 }
}

export default function OrderStep4({ onFinish, orderForm }: { onFinish: (data) => void, orderForm?: any }) {

  const minCurrency = _.toNumber(_.get(orderForm, 'securityDeposit', 1000))
  const totalAmount = _.toNumber(_.get(orderForm, 'finalTotalPrice', 1000))
  const [currency, setCurrency] = useState(0)
  // const [gold, setGold] = useState(0)
  const [loan, setLoan] = useState(0)

  const validate = useMemo(() => {
    const data: { sataus: ValidateStatus, message: string } = { sataus: 'success', message: '' }
    const sucess = totalAmount === currency  + loan
    data.sataus = sucess ? 'success' : 'error'
    data.message = sucess ? '' : `Total payment must be equal to ${totalAmount}`
    return data
  }, [currency, loan])

  return (
    <Form
      style={{ width: "100%", paddingTop: 10 }}
      onFinish={onFinish}
    >
      <Form.Item
        validateStatus={validate.sataus}
        help={validate.message}
      >
        <Form.Item
          {...colLayout}
          label="Payment component 1(Currency)：" // 大于保证金
          rules={[{ required: true }]}
          help={`Range: [${minCurrency}, ${totalAmount}]`}
          initialValue={minCurrency}
          name={"moneyCoin"}
        >
          <InputNumber min={minCurrency} max={totalAmount} onChange={(e) => setCurrency(_.toNumber(e))} />
        </Form.Item>
        {/* <Form.Item
          {...colLayout}
          label="Payment component 2(Gold)："
          name={"moneyGold"}
          initialValue={_.get(orderForm, 'moneyGold')}
        >
          <Input type="number" onChange={(e) => setGold(_.toNumber(e.target.value))} />
        </Form.Item> */}
        <Form.Item
          {...colLayout}
          label="Payment component 2(Loan)："
          name={"moneyLoan"}
          initialValue={_.get(orderForm, 'moneyLoan')}
        >
          <Input type="number" onChange={(e) => setLoan(_.toNumber(e.target.value))} />
        </Form.Item>
      </Form.Item>
      <Form.Item labelAlign={"right"} wrapperCol={{ offset: 10 }}>
        <Button type={"primary"} htmlType={"submit"}>
          Confirm and freeze margin
        </Button>
      </Form.Item>
    </Form>
  );
}
