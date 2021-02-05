import { Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import _ from 'lodash';
import { useSelector } from "react-redux";
import { useUpdateStore } from "../../base/hooks";
import { BuyerTabType, selectBuyerTab, setBuyerTab } from "../../base/root.redux";

export default function SiderBuyer() {
  const tab = useSelector(selectBuyerTab)
  const update = useUpdateStore()
  return (
    <Sider
      width={200}
      className="site-layout-background"
      style={{ paddingLeft: 10, backgroundColor: "unset" }}
    >
      <Menu
        mode="inline"
        selectedKeys={[tab]}
        style={{ height: "100%", borderRadius: 4 }}
        onSelect={(info) => {
          update(setBuyerTab(info.key as BuyerTabType))
        }}
      >
        <Menu.Item key="goods">Goods List</Menu.Item>
        <Menu.Item key="orders">Orders</Menu.Item>
        <Menu.SubMenu key={"user"} title={"User Dashboard"}>
          <Menu.Item key="1">My Profile</Menu.Item>
          <Menu.Item key="2">Counterparty</Menu.Item>
          <Menu.Item key="3">Stats</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key={"trans"} title={"Transaction Dashboard"}>
          <Menu.Item key="4">Search</Menu.Item>
          <Menu.Item key="5">Ongoing</Menu.Item>
          <Menu.Item key="6">History</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key={"inbox"} title={"Inbox"}>
          <Menu.Item key="7">LOIs</Menu.Item>
          <Menu.Item key="8">Query</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="9">Trail</Menu.Item>
        <Menu.Item key="10">Ducument</Menu.Item>
        <Menu.Item key="11">Financing</Menu.Item>
        <Menu.Item key="12">Wallet</Menu.Item>
      </Menu>
    </Sider>
  );
}
