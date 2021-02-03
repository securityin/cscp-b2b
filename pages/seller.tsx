import { Button, Col, Modal, Row, Table } from "antd";
import { columns, columns2, data } from "../src/base/constans";
import { useDemoData } from "../src/base/hooks";
import RootLayout from "../src/common/RootLayout";
import _ from "lodash";
import OrderStep1 from "../src/common/OrderStep1";
import OrderStep2 from "../src/common/OrderStep2";
import OrderStep3 from "../src/common/OrderStep3";
import OrderStep4 from "../src/common/OrderStep4";
import { GoodsInfo } from "../src/common/texts";
import { useState } from "react";
function CreateOrder(){
  const { demoData, updateDemoData } = useDemoData();
  const orderForm = demoData.orderForm;
  const data = orderForm ? [demoData.orderForm] : [];
  const [step, setStep] = useState(1);

  return (<>
    <GoodsInfo/>
      {step === 1 && (
        <OrderStep1
          onFinish={(data) => {
            updateDemoData({ orderForm: {
              ...orderForm, ...data,
            } });
            setStep(2)
          }}
        />
      )}
      {step === 2 && (
        <OrderStep2
          onFinish={(data) => {
            updateDemoData({ orderForm: {
              ...orderForm, ...data,
            } });
            setStep(3)
          }}
        />
      )}
      {step === 3 && (
        <OrderStep3
          onFinish={(data) => {
            updateDemoData({ orderForm: {
              ...orderForm, ...data,
            } });
            setStep(4)
          }}
        />
      )}
      {step === 4 && (
        <OrderStep4
          onFinish={(data) => {
            updateDemoData({ orderForm: {
              ...orderForm, ...data, status: 4
            } });
          }}
        />
      )}
  </>)
}

function PendingList(){
  const { demoData, updateDemoData } = useDemoData();
  const orderForm = demoData.orderForm;
  const data = orderForm ? [demoData.orderForm] : [];
  const status = _.get(orderForm, 'status', 0);
  const riskLevel = _.get(orderForm, 'riskLevel', 0);
  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false}></Table>
      {data.map((value, index) => {
        return (
          <table
            key={`seller_${index}`}
            style={{ width: "100%", tableLayout: "auto" }}
          >
            <tbody>
              <tr style={{ backgroundColor: "white" }}>
                <td style={{ padding: 30}}> {`#${index + 1}`} </td>
                <td style={{ padding: 30}}> {_.get(value, "buyerName", "")} </td>
                <td style={{ padding: 30}}> {`意向价：${_.get(value, "intentionAmount", 0)}`}</td>
                <td style={{ padding: 30}}> {`风险等级：${riskLevel}`} </td>
                <td style={{ padding: 30}}>
                  <Col>
                    <Button
                      onClick={() => {
                        updateDemoData({
                          ...demoData,
                          orderForm: { ...orderForm, status: 2 },
                        });
                      }}> 选中 </Button>
                  </Col>
                </td>
              </tr>
            </tbody>
          </table>
        );
      })}
    </>
  )
}

function PendingCreateList(){
  const { demoData, updateDemoData } = useDemoData();
  const orderForm = demoData.orderForm;
  const data = orderForm ? [demoData.orderForm] : [];
  const status = _.get(orderForm, 'status', 0);
  const riskLevel = _.get(orderForm, 'riskLevel', 0);
  const onClickBuyerInfo = () => {
    Modal.info({
      title: "买家信息",
      content: "公司名称： xxx公司  电话： xxx-xxxxxx",
    });
  };
  const onClickCreateOrder = () => {
    updateDemoData({ orderForm: {
      ...orderForm, ...data, status: 3
    } });
  };
  const mColumns2 = [
    ...columns2,
    {
      render: (value) => {
        return (
          <Col>
            <Button children="联系买家" onClick={onClickBuyerInfo} />
            <div style={{ height: 10 }} />
            <Button children="创建订单" onClick={onClickCreateOrder} />
          </Col>
        );
      },
    },
  ];
  return (<Table columns={mColumns2} dataSource={data} pagination={false}></Table>)
}

export default function Seller() {
  const { demoData } = useDemoData();
  const orderForm = demoData.orderForm;
  const status = _.get(orderForm, 'status', 0);
  return (
    <RootLayout>
      {status === 1 && <PendingList />}
      {status === 2 && <PendingCreateList />}
      {status === 3 && <CreateOrder />}
    </RootLayout>
  );
}
