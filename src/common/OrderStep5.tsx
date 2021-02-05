import { Button, Col, Form } from "antd";
import _ from "lodash";
import { useDemoData, useTranslation } from "../base/hooks";
import { TwoText } from "./texts";

const keysToHidden = ['0', 'key', 'name', 'cycle', 'warehouse', 'price', 'buyerName', 'riskLevel', 'count', 'status']

export default function OrderStep5({ onFinish }: { onFinish: (data) => void }) {
  const { demoData } = useDemoData();
  const { t } = useTranslation()
  const orderForm = demoData.orderForm;
  const keys = _.keys(orderForm)

  const renderBtn = () => {
    const status = _.get(orderForm, 'status', '')
    if (status == '5') {
      return <Form.Item labelAlign={"right"} wrapperCol={{ offset: 10 }}>
        <Button type={"primary"} htmlType={"submit"} onClick={onFinish}>
          Fill coordination information
        </Button>
      </Form.Item>
    }
    return ''
  }

  return (
    <Col style={{ width: "100%" }}>
      {/* { renderFormData() } */}
      { renderBtn()}
    </Col>
  );
}
