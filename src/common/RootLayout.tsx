import { Button, Layout, Menu, Row } from "antd";
import _ from "lodash";
import { useRouter } from "next/dist/client/router";
import { useMemo } from "react";
import { AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { title } from "../base/constans";
import { useDemoData } from "../base/hooks";
import { CTime } from "./texts";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default function RootLayout({ children }) {
  const r = useRouter();
  const cPath = _.isEmpty(r.pathname) ? "/buyer" : r.pathname;
  const user = useMemo(() => {
    if (_.includes(["/buyer"], cPath)) return "买家(交易员)";
    if (_.includes(["/seller", "/seller_create"], cPath)) return "卖家";
    if (_.includes(["/buyerFinance"], cPath)) return "买家(财务)";
    return "买家(交易员)";
  }, [cPath]);
  const { updateDemoData } = useDemoData()
  return (
    <Layout
      style={{
        minHeight: '100vh'
      }}
    >
      <Header
        className="header"
        style={{ color: "black", backgroundColor: "white" }}
      >
        <Row justify="space-between" align="middle" style={{ height: "100%" }}>
          <img
            src={"./logo.jpeg"}
            style={{ height: 50, width: 50, cursor: "pointer" }}
            onClick={() => {
              updateDemoData({})
              // r.push("/");
              if(cPath === '/seller_create'){
                r.replace('/seller')
              }
            }}
          />
          <span>{title}</span>
          <Row align="middle">
            <Row align="middle" style={{cursor:'pointer'}}>
              <AiOutlineUser size={20} /> <div>{user}</div>
            </Row>
            <div style={{width: 10}}/>
            <Row align="middle" style={{cursor:'pointer'}}>
              <AiOutlineSetting size={20} /> <div>设置</div>
            </Row>
          </Row>
        </Row>
      </Header>
      <Header
        className="header"
        style={{
          color: "black",
          backgroundColor: "#f0f2f5",
          height: 70,
          padding: 10,
          position: 'relative'
        }}
      >
        <Row
          style={{
            backgroundColor: "white",
            borderRadius: 4,
            width: "100%",
            padding: 10,
            height: 50,
            lineHeight: 50,
          }}
        >
          <Button style={{ borderRadius: 8 }}>
            CSPC Group-Trading Section
          </Button>
          <div style={{ width: 10 }} />
          <Button style={{ borderRadius: 8 }}>CREATE ▽</Button>
          <div style={{ width: 10 }} />
          <Button style={{ borderRadius: 8 }}>MESSAGE ▽</Button>
          <div style={{ width: 10 }} />
          <Button style={{ borderRadius: 8 }}>SHORTCOTS ▽</Button>
          <div style={{ width: 10 }} />
          <Button style={{ borderRadius: 8 }}>MORE ▽</Button>
        </Row>
        <div style={{ display: 'flex', alignItems: 'center', 
        height: '100%', position: 'absolute', right: 25, top: 0}}>
          <CTime/>
        </div>
      </Header>
      <Layout>
        <Sider
          width={200}
          className="site-layout-background"
          style={{ paddingLeft: 10, backgroundColor: "unset" }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ height: "100%", borderRadius: 4 }}
          >
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
        <Layout style={{ padding: "0 10px 10px", borderRadius: 4 }}>
          <Content
            className="site-layout-background"
            style={{
              margin: 0,
              minHeight: 280,
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
