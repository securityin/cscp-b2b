import RootLayout from "../src/common/RootLayout";
import { FinanceOrders } from "./buyerFinance";

export default function BuyerFinance() {
  return (
    <RootLayout>
      <FinanceOrders isBuyer2={true} />
    </RootLayout>
  );
}
