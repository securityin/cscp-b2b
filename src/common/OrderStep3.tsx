import { Button, Col, Form, Input } from "antd";
import _ from "lodash";

export default function OrderStep3({ onFinish, orderForm }: { onFinish: (data) => void, orderForm?: any }) {

  const transType = _.get(orderForm, "transType");
  const isLongTrans = transType === "Long-term";
  return (
    <Col>
      <Form
        style={{ width: "100%", paddingTop:10 }}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        onFinish={onFinish}
      >
        {isLongTrans && (
          <Form.Item
            label="Long-term agreement contract number："
            rules={[{ required: true }]}
            name={"longTransId"}
            initialValue={_.get(orderForm, 'longTransId')}
          >
            <Input type="text"></Input>
          </Form.Item>
        )}

        <Form.Item labelAlign={"right"} wrapperCol={{ offset: 10 }}>
          <Button type={"primary"} htmlType={"submit"}>
            Confirm the manifest
          </Button>
        </Form.Item>
      </Form>
    </Col>
  );
}
