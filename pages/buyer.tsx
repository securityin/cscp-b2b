import { Button, Col, Input, Modal, Row, Table } from "antd";
import _ from "lodash";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { columns, data, goodsOne } from "../src/base/constans";
import { useDemoData } from "../src/base/hooks";
import { selectBuyerTab } from "../src/base/root.redux";
import { notifySucess } from "../src/base/utils";
import OrderStep1 from "../src/common/OrderStep1";
import OrderStep2 from "../src/common/OrderStep2";
import OrderStep3 from "../src/common/OrderStep3";
import OrderStep4 from "../src/common/OrderStep4";
import OrderStep5 from "../src/common/OrderStep5";
import OrderStep6 from "../src/common/OrderStep6";
import RootLayout from "../src/common/RootLayout";
import { OrderInfo } from "../src/common/texts";

export function GoodsList({ isBuyer2 = false }) {
  const cards = [1, 2, 3, 4];
  const { demoData, updateDemoData } = useDemoData();
  const [inputModel, setInputModel] = useState(false);
  const [intentionAmount, setIntentionAmount] = useState(0);
  const [orderForm, setOrderForm] = useState(null);
  const r = useRouter();
  const mColumns = [
    ...columns,
    {
      render: (value) => {
        return (
          <Button
            onClick={() => {
              if (isBuyer2) return;
              setOrderForm(value);
              setIntentionAmount(_.toNumber(_.get(value, 'price', 0)));
              setInputModel(true);
            }}
          >
            Send intent
          </Button>
        );
      },
    },
  ];

  const canOk = intentionAmount >= _.toNumber(_.get(orderForm, 'price', 0))
  return (
    <>
      <Table columns={mColumns} dataSource={data} pagination={false}></Table>
      <Modal
        visible={inputModel}
        title={"Intention price"}
        onCancel={() => {
          setInputModel(false);
          setIntentionAmount(0);
        }}
        okType={canOk ? 'primary' : 'default'}
        onOk={() => {
          if (!canOk) return;
          updateDemoData({
            orderForm: { ...orderForm, intentionAmount, status: 1 },
            orderForm2: undefined,
          });
          setInputModel(false);
          setIntentionAmount(0);
          notifySucess()
        }}
      >
        <Input
          type="number"
          value={intentionAmount}
          onChange={(e) => setIntentionAmount(_.toNumber(e.target.value))}
          required={true}
        ></Input>
      </Modal>
    </>
  );
}

function CreateOrder() {
  const { demoData, updateDemoData } = useDemoData();
  const orderForm = demoData.orderForm2;
  const [step, setStep] = useState(1);
  const doUpdateDemoData = (data, step, status?) => {
    const s = status ?? _.get(orderForm, 'status', 0)
    updateDemoData({ orderForm2: { ...orderForm, ...data, status: s } })
    setStep(step)
  }

  return (<>
    {step === 1 && (
      <OrderStep1
        orderForm={orderForm}
        onFinish={(data) => doUpdateDemoData(data, 3)}
      />
    )}
    {/* {step === 2 && (
      <OrderStep2
        orderForm={orderForm}
        onFinish={(data) => doUpdateDemoData(data, 3)}
      />
    )} */}
    {step === 3 && (
      <OrderStep3
        orderForm={orderForm}
        onFinish={(data) => doUpdateDemoData(data, 4)}
      />
    )}
    {step === 4 && (
      <OrderStep4
        orderForm={orderForm}
        onFinish={(data) => doUpdateDemoData(data, 4, 3)}
      />
    )}
  </>)
}


function InputStep56() {
  const { demoData, updateDemoData } = useDemoData();
  const orderForm = demoData.orderForm2;
  const status = _.get(orderForm, 'status', 0)
  const [step, setStep] = useState(5);
  return <>
    {step === 5 && (
      <OrderStep5
        orderForm={orderForm}
        onFinish={() => {
          setStep(6)
        }}
      />
    )}
    {step === 6 && (
      <OrderStep6
        orderForm={orderForm}
        onFinish={(data) => {
          updateDemoData({
            orderForm2: {
              ...orderForm,
              status: 6,
              ...data,
            }
          });
          setStep(7)
        }}></OrderStep6>
    )}
    {status === 8 && <Row justify={'center'}>
      <Button
        style={{marginTop: 15}}
        type={'primary'}
        children={'Deliver goods'}
        onClick={() => updateDemoData({ orderForm2: { ...orderForm, status: 9 } })} />
    </Row>}
  </>
}

export function PendingOrder({ isBuyer2 = false }) {
  const { demoData, updateDemoData } = useDemoData();
  const key = isBuyer2 ? 'orderForm2' : 'orderForm'
  const orderForm = demoData[key] ?? {};
  const status = _.get(orderForm, "status", 0);
  if (status === 0) return null;
  const isTurn = _.get(orderForm, "isTurn");

  const orderForm2 = demoData.orderForm2
  const status2 = _.get(orderForm2, 'status', 2)
  const doUpdateDemoDataStatus = (status) => {
    updateDemoData({
      [key]: { ...orderForm, status },
    });
    notifySucess()
  };

  return (
    <Col style={{ padding: 10 }}>
      <OrderInfo orderForm={orderForm}>
        <Row justify={'center'} gutter={10} style={{ padding: '10px 0' }}>
          {status === 3 && (
            <Button
              type={'primary'}
              children={"Determine and pay security deposit"}
              onClick={() => doUpdateDemoDataStatus(4)}
            />
          )}
          {status === 6 && (
            <Button
              type={'primary'}
              children={"Determine and pay service fee"}
              onClick={() => doUpdateDemoDataStatus(7)}
            />
          )}
          {status === 9 && !isBuyer2 && !orderForm2 && (
            <Button
              type={'primary'}
              children={"Transfer order"}
              onClick={() => {
                Modal.confirm({
                  title: 'Tips',
                  content: 'A 3% fee will be charged for the transfer',
                  maskClosable: true,
                  onOk: () => {
                    updateDemoData({
                      orderForm2: { ...goodsOne, status: 2, isTurn: true },
                    });
                    notifySucess()
                  }
                })
              }}
            />
          )}
          {(status === 9) && (isBuyer2 || status2 === 88 || !orderForm2) && (
            <Button
              type={'primary'}
              style={{ marginLeft: 10 }}
              children={"Confirm receipt"}
              onClick={() => doUpdateDemoDataStatus(10)}
            />
          )}
        </Row>
      </OrderInfo>

      {
        orderForm2 && !isBuyer2 && <div style={{ width: '100%', padding: 10 }}>
          <span style={{ fontWeight: 600, fontSize: 16 }}>Transfer oreders:</span>
          {<OrderInfo orderForm={orderForm2} />}
          {status2 === 2 && <CreateOrder />}
          {status2 >= 5 && <InputStep56 />}
        </div>
      }
    </Col>
  );
}

export default function Buyer() {
  const tab = useSelector(selectBuyerTab);
  return (
    <RootLayout>
      {tab === "goods" && <GoodsList />}
      {tab === "orders" && <PendingOrder />}
    </RootLayout>
  );
}
