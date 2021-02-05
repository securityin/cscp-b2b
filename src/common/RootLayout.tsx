import { Button, Layout, Menu, Row } from "antd";
import _ from "lodash";
import { useRouter } from "next/dist/client/router";
import { useMemo } from "react";
import { AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { title } from "../base/constans";
import { useDemoData } from "../base/hooks";
import SiderBuyer from "./sider/SiderBuyer";
import SiderBuyerFinance from "./sider/SiderBuyerFinance";
import SiderSeller from "./sider/SiderSeller";
import { CTime } from "./texts";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default function RootLayout({ children }) {
  const r = useRouter();
  const cPath = _.isEmpty(r.pathname) ? "/buyer" : r.pathname;
  const user = useMemo(() => {
    if (_.includes(["/buyer"], cPath)) return "Buyer1";
    if (_.includes(["/buyer2"], cPath)) return "Buyer2";
    if (_.includes(["/seller", "/seller_create"], cPath)) return "Seller";
    if (_.includes(["/buyerFinance"], cPath)) return "Buyer1(Finance)";
    if (_.includes(["/buyerFinance2"], cPath)) return "Buyer2(Finance)";
    return "Buyer1";
  }, [cPath]);

  const headColors = useMemo(() => {
    const colors = {
      color: "black",
      backgroundColor: "white",
    };
    if (user === "Seller") {
      colors.backgroundColor = "#EB761C";
      colors.color = "white";
    } else if (user === "Buyer1" || user === "Buyer2") {
      colors.backgroundColor = "#111A34";
      colors.color = "white";
    }
    return colors;
  }, [user]);

  const { updateDemoData } = useDemoData();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Header className="header" style={{ ...headColors }}>
        <Row justify="space-between" align="middle" style={{ height: "100%" }}>
          <img
              src={"./logo.png"}
              style={{ height: 40, cursor: "pointer" }}
            />
          <span>{title}</span>
          <Row align="middle">
            <Row align="middle" style={{ cursor: "pointer" }}>
              <AiOutlineUser size={20} /> <div>{user}</div>
            </Row>
            <div style={{ width: 10 }} />
            <Row align="middle" style={{ cursor: "pointer" }}>
              <AiOutlineSetting size={20} /> <div>Setting</div>
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
          position: "relative",
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            position: "absolute",
            right: 25,
            top: 0,
          }}
        >
          <CTime />
        </div>
      </Header>
      <Layout hasSider={true}>
        {(user === "Buyer1" || user === "Buyer2") && <SiderBuyer />}
        {(user === "Seller") && <SiderSeller />}
        {(user === 'Buyer1(Finance)' || user === 'Buyer2(Finance)') && <SiderBuyerFinance />}
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
