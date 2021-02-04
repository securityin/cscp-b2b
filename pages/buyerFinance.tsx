import { useDemoData } from "../src/base/hooks";
import RootLayout from "../src/common/RootLayout";
import { OrderInfo } from "../src/common/texts";
import _ from "lodash";
import { Button, Modal } from "antd";

export function FinanceOrders({ isBuyer2 = false }) {
  const { demoData, updateDemoData } = useDemoData();
  const orderForm = demoData.orderForm ?? {};
  const status = _.get(orderForm, "status", 0);
  if (status < 4) return null;
  const isTurn = _.get(orderForm, "isTurn");
  if (isBuyer2 && !isTurn) return null;

  const doUpdateDemoDataStatus = (status) => {
    updateDemoData({
      orderForm: { ...orderForm, status },
    });
    Modal.success({});
  };
  return (
    <>
      <OrderInfo />
      {status === 4 && (
        <Button
          children={"Determine and pay security deposit"}
          onClick={() => doUpdateDemoDataStatus(5)}
        />
      )}
      {status === 7 && (
        <Button
          children={"Determine and pay service fee"}
          onClick={() => doUpdateDemoDataStatus(8)}
        />
      )}
      {status === 10 && (
        <Button
          children={"Confirm payment of balance"}
          onClick={() => doUpdateDemoDataStatus(88)}
        />
      )}
    </>
  );
}

export default function BuyerFinance() {
  return (
    <RootLayout>
      <FinanceOrders />
    </RootLayout>
  );
}
