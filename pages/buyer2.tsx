import { useSelector } from "react-redux";
import { selectBuyerTab } from "../src/base/root.redux";
import RootLayout from "../src/common/RootLayout";
import { GoodsList, PendingOrder } from "./buyer";


export default function Buyer() {
  const tab = useSelector(selectBuyerTab);
  return (
    <RootLayout>
      {tab === "goods" && <GoodsList isBuyer2={true}/>}
      {tab === "orders" && <PendingOrder isBuyer2={true}/>}
    </RootLayout>
  );
}
