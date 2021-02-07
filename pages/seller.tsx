import { Button, Col, Modal, Table, Tag } from "antd";
import _ from "lodash";
import { useState } from "react";
import { useSelector } from "react-redux";
import { columns, columns2, data } from "../src/base/constans";
import { useDemoData } from "../src/base/hooks";
import { selectSellerTab } from "../src/base/root.redux";
import OrderStep1 from "../src/common/OrderStep1";
import OrderStep2 from "../src/common/OrderStep2";
import OrderStep3 from "../src/common/OrderStep3";
import OrderStep4 from "../src/common/OrderStep4";
import OrderStep5 from "../src/common/OrderStep5";
import OrderStep6 from "../src/common/OrderStep6";
import RootLayout from "../src/common/RootLayout";
import { OrderInfo } from "../src/common/texts";

function CreateOrder() {
  const { demoData, updateDemoData } = useDemoData();
  const orderForm = demoData.orderForm;
  const [step, setStep] = useState(1);
  return (<>
    <OrderInfo orderForm={orderForm} />
    {step === 1 && (
      <OrderStep1
        orderForm={orderForm}
        onFinish={(data) => {
          updateDemoData({
            orderForm: {
              ...orderForm, ...data,
            }
          });
          setStep(2)
        }}
      />
    )}
    {step === 2 && (
      <OrderStep2
        orderForm={orderForm}
        onFinish={(data) => {
          updateDemoData({
            orderForm: {
              ...orderForm, ...data,
            }
          });
          setStep(3)
        }}
      />
    )}
    {step === 3 && (
      <OrderStep3
        orderForm={orderForm}
        onFinish={(data) => {
          updateDemoData({
            orderForm: {
              ...orderForm, ...data,
            }
          });
          setStep(4)
        }}
      />
    )}
    {step === 4 && (
      <OrderStep4
        orderForm={orderForm}
        onFinish={(data) => {
          updateDemoData({
            orderForm: {
              ...orderForm, ...data, status: 3
            }
          });
        }}
      />
    )}
  </>)
}

function PendingList() {
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
                <td style={{ padding: 30 }}> {`#${index + 1}`} </td>
                <td style={{ padding: 30 }}> {_.get(value, "buyerName", "")} </td>
                <td style={{ padding: 30 }}> {`Buyer intention price：${_.get(value, "intentionAmount", 0)}`}</td>
                <td style={{ padding: 30 }}> {`Risk level：${riskLevel}`} </td>
                <td style={{ padding: 30 }}>
                  <Col>
                    <Button
                      onClick={() => {
                        updateDemoData({
                          ...demoData,
                          orderForm: { ...orderForm, status: 2 },
                        });
                      }}> Selected </Button>
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

function PendingCreateList({ onClickCreate }) {
  const { demoData } = useDemoData();
  const orderForm = demoData.orderForm;
  const data = orderForm ? [demoData.orderForm] : [];
  const onClickBuyerInfo = () => {
    Modal.info({
      title: "Buyer infomation",
      content: "Company： xxx Company<br/>tel-phone： xxx-xxxxxx",
    });
  };

  const mColumns2 = [
    ...columns2,
    {
      render: (value) => {
        return (
          <Col>
            <Button children="Contact buyer" onClick={onClickBuyerInfo} />
            <div style={{ height: 10 }} />
            <Button children="Create Order" onClick={onClickCreate} />
          </Col>
        );
      },
    },
  ];
  return (<Table columns={mColumns2} dataSource={data} pagination={false}></Table>)
}


function InputStep56() {
  const { demoData, updateDemoData } = useDemoData();
  const orderForm = demoData.orderForm;
  const [step, setStep] = useState(5);
  return <>
    <OrderInfo orderForm={orderForm}>
      {step === 5 && (
        <OrderStep5
          orderForm={orderForm}
          onFinish={() => {
            setStep(6)
          }}
        />
      )}

    </OrderInfo>
    {step === 6 && (
      <OrderStep6
        orderForm={orderForm}
        onFinish={(data) => {
          updateDemoData({
            orderForm: {
              ...orderForm,
              status: 6,
              ...data,
            }
          });
          setStep(7)
        }}></OrderStep6>
    )}
  </>
}

function Published() {
  return <Table columns={columns} dataSource={data} pagination={false}></Table>
}

export default function Seller() {
  const { demoData } = useDemoData();
  const tab = useSelector(selectSellerTab)
  const orderForm = demoData.orderForm;
  const status = _.get(orderForm, 'status', 0);
  const [showCreate, setShowCreate] = useState(false)
  const renderComp = () => {
    if (status === 1) {
      return <PendingList />
    }
    if (status === 2) {
      if (showCreate) {
        return <CreateOrder />
      }
      return <PendingCreateList onClickCreate={() => setShowCreate(true)} />
    }
    return <InputStep56 />
  }

  return (
    <RootLayout>
      { tab === 'orders' && renderComp()}
      { tab === 'published' && <Published />}
    </RootLayout>
  );
}
