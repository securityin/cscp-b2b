import { Button, Col, Input, Modal, Row, Table } from "antd";
import _ from "lodash";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { columns, data } from "../src/base/constans";
import { useDemoData, useUpdateStore } from "../src/base/hooks";
import { selectBuyerTab } from "../src/base/root.redux";
import RootLayout from "../src/common/RootLayout";
import { GoodsInfo, OrderInfo } from "../src/common/texts";

function GoodsList() {
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
          updateDemoData({
            orderForm: { ...orderForm, intentionAmount, status: 1 },
          });
          setInputModel(false);
          setIntentionAmount(0);
          // r.push('/seller')
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

function PendingOrder() {
  const { demoData, updateDemoData } = useDemoData();
  const orderForm = demoData.orderForm ?? {};
  return (
    <Col style={{ padding: 10 }}>
      <OrderInfo />
      <Button
        children={"Determine and pay security deposit"}
        onClick={() => {
          updateDemoData({
            orderForm: { ...orderForm, status: 4 },
          });
        }}
      />
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
