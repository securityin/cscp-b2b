import { Button, Col, Input, Modal, Row, Table } from "antd";
import ButtonGroup from "antd/lib/button/button-group";
import Column from "antd/lib/table/Column";
import _ from "lodash";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { columns, data } from "../src/base/constans";
import { useDemoData } from "../src/base/hooks";
import { selectBuyerTab } from "../src/base/root.redux";
import { notifySucess } from "../src/base/utils";
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

export function PendingOrder({ isBuyer2 = false }) {
  const { demoData, updateDemoData } = useDemoData();
  const orderForm = demoData.orderForm ?? {};
  const status = _.get(orderForm, "status", 0);
  if (status === 0) return null;
  const isTurn = _.get(orderForm, "isTurn");
  if ((isTurn && !isBuyer2) || (isBuyer2 && !isTurn)) return null;

  const doUpdateDemoDataStatus = (status) => {
    updateDemoData({
      orderForm: { ...orderForm, status },
    });
    notifySucess()
  };

  return (
    <Col style={{ padding: 10 }}>
      <OrderInfo >
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
          {status === 8 && !isTurn && (
            <Button
              type={'primary'}
              children={"Transfer order"}
              onClick={() => {
                updateDemoData({
                  orderForm: { ...orderForm, status: 2, isTurn: true },
                });
                notifySucess()
              }}
            />
          )}
          {(status === 9 || status === 8) && (
            <Button
              type={'primary'}
              style={{ marginLeft: 10 }}
              children={"Confirm receipt"}
              onClick={() => doUpdateDemoDataStatus(10)}
            />
          )}
        </Row>
      </OrderInfo>


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
