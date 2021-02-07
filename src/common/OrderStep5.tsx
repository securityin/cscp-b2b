import { Button, Col, Form } from "antd";
import _ from "lodash";
export default function OrderStep5({ onFinish, orderForm}: { onFinish: (data) => void , orderForm }) {

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
    <Col style={{ width: "100%", paddingTop: 10 }}>
      {/* { renderFormData() } */}
      { renderBtn()}
    </Col>
  );
}
