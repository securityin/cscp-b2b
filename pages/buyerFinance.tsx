import { Button, Row } from "antd";
import _ from "lodash";
import { useDemoData } from "../src/base/hooks";
import { notifySucess } from "../src/base/utils";
import RootLayout from "../src/common/RootLayout";
import { OrderInfo, TwoText } from "../src/common/texts";

export function FinanceOrders({ isBuyer2 = false }) {
  const { demoData, updateDemoData } = useDemoData();
  const key = isBuyer2? 'orderForm2' : 'orderForm'
  const orderForm = demoData[key] ?? {};
  const status = _.get(orderForm, "status", 0);

  const getToPay = () => { 
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
  }
  const toPay = getToPay()

  if (status < 4) return null;
  const doUpdateDemoDataStatus = (status) => {
    updateDemoData({
      [key]: { ...orderForm, status },
    });
    notifySucess()
  };


  return (
    <OrderInfo orderForm={orderForm}>
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
