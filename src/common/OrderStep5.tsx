import { Button, Col, Form, Input, Row, Select } from "antd";
import _ from "lodash";
import { useDemoData, useTranslation } from "../base/hooks";
import { GoodsInfo, TwoText } from "./texts";

const keysToHidden = ['0', 'key', 'name', 'cycle', 'warehouse', 'price', 'buyerName', 'riskLevel', 'count', 'status']

export default function OrderStep5({ onFinish }: { onFinish: (data) => void }) {
  const { demoData } = useDemoData();
  const { t } = useTranslation()
  const orderForm = demoData.orderForm;
  const keys = _.keys(orderForm)
  const keysToDisplay = _.difference(keys, keysToHidden)

  // 待支付保证金
  const renderFormData = () => {
    return _.map(keysToDisplay, (k) => {
      return <TwoText label={`${t(k)} ： `} text={_.get(orderForm, k, '无')} key={k}></TwoText>
    })
  }

  const renderBtn = () => {
    const status = _.get(orderForm, 'status', '')
    if (status == '5') {
      return <Form.Item labelAlign={"right"} wrapperCol={{ offset: 10 }}>
        <Button type={"primary"} htmlType={"submit"} onClick={onFinish}>
          填写协调信息
        </Button>
      </Form.Item>
    }
    return ''
  }

  return (
    <Col style={{ width: "100%" }}>
      { renderFormData() }
      { renderBtn() }
    </Col>
  );
}
