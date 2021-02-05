import { useDemoData } from "../src/base/hooks";
import RootLayout from "../src/common/RootLayout";
import { OrderInfo, TwoText } from "../src/common/texts";
import _ from "lodash";
import { Button, Row } from "antd";
import { notifySucess } from "../src/base/utils";
import { useMemo } from "react";

export function FinanceOrders({ isBuyer2 = false }) {
  const { demoData, updateDemoData } = useDemoData();
  const orderForm = demoData.orderForm ?? {};
  const status = _.get(orderForm, "status", 0);
  if (status < 4) return null;
  const isTurn = _.get(orderForm, "isTurn");
  if ((isTurn && !isBuyer2) || (isBuyer2 && !isTurn)) return null;

  const doUpdateDemoDataStatus = (status) => {
    updateDemoData({
      orderForm: { ...orderForm, status },
    });
    notifySucess()
  };

  const toPay = useMemo(() => {
    if (status === 4) {
      return _.toNumber(_.get(orderForm, 'securityDeposit', 0))
    }
    if (status === 7) {
      return 100
    }
    if (status === 10) {
      return 80000
    }
    return 0
  }, [status])

  return (
    <OrderInfo >
      {
        toPay > 0 &&
        <TwoText label={'Need to pay：'} text={toPay} style={{ color: '#ec5c08', fontSize: 18, fontWeight: 600 }} />
      }
      <Row justify={'center'} style={{ width: '100%', padding: '10px 0' }}>
        {status === 4 && (
          <Button
            type={'primary'}
            children={"Determine and pay security deposit"}
            onClick={() => doUpdateDemoDataStatus(5)}
          />
        )}
        {status === 7 && (
          <Button
            type={'primary'}
            children={"Determine and pay service fee"}
            onClick={() => doUpdateDemoDataStatus(8)}
          />
        )}
        {status === 10 && (
          <Button
            type={'primary'}
            children={"Confirm payment of balance"}
            onClick={() => doUpdateDemoDataStatus(88)}
          />
        )}
      </Row>
    </OrderInfo>
  );
}

export default function BuyerFinance() {
  return (
    <RootLayout>
      <FinanceOrders />
    </RootLayout>
  );
}
