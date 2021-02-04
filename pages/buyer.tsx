import { Button, Col, Input, Modal, Table } from "antd";
import _ from "lodash";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { columns, data } from "../src/base/constans";
import { useDemoData } from "../src/base/hooks";
import { selectBuyerTab } from "../src/base/root.redux";
import RootLayout from "../src/common/RootLayout";
import { OrderInfo } from "../src/common/texts";

export function GoodsList({ isBuyer2 = false}) {
  const cards = [1, 2, 3, 4];
  const { demoData, updateDemoData } = useDemoData();
  const [inputModel, setInputModel] = useState(false);
  const [intentionAmount, setIntentionAmount] = useState(0);
  const [orderForm, setOrderForm] = useState(null);
  const r = useRouter();
  const mColumns = [
    ...columns,
    {
      title: "",
      dataIndex: "",
      render: (value) => {
        return (
          <Button
            onClick={() => {
              setOrderForm(value);
              setInputModel(true);
            }}
          >
            Send intent
          </Button>
        );
      },
    },
  ];
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
        onOk={() => {
          if(isBuyer2) return;
          updateDemoData({
            orderForm: { ...orderForm, intentionAmount, status: 1 },
          });
          setInputModel(false);
          setIntentionAmount(0);
          Modal.success({
            title: 'Success',
            content: 'Send intent OK!'
          })
        }}
      >
        <Input
          type="number"
          onChange={(e) => setIntentionAmount(_.toNumber(e.target.value))}
        ></Input>
      </Modal>
    </>
  );
}

export function PendingOrder({isBuyer2 = false}) {
  const { demoData, updateDemoData } = useDemoData();
  const orderForm = demoData.orderForm ?? {};
  const status = _.get(orderForm, 'status', 0)
  if(status === 0) return null;
  const isTurn = _.get(orderForm, 'isTurn' )
  if(isBuyer2 && !isTurn) return null

  const doUpdateDemoDataStatus = (status) => {
    updateDemoData({
      orderForm: { ...orderForm, status },
    });
    Modal.success({})
  }

  return (
    <Col style={{ padding: 10 }}>
      <OrderInfo />
      {status === 4 && (
        <Button
          children={"Determine and pay security deposit"}
          onClick={() => doUpdateDemoDataStatus(5)}
        />
      )}
      {status === 6 && (
        <Button
          children={"Determine and pay service fee"}
          onClick={() => doUpdateDemoDataStatus(7)}
        />
      )}
      {status === 8 && (
        <Button
          children={"Confirm receipt"}
          onClick={() => doUpdateDemoDataStatus(9)}
        />
      )}
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
