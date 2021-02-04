import { Button, Col, Modal, Row, Table, Tag } from "antd";
import { columns, columns2, data } from "../src/base/constans";
import { useDemoData } from "../src/base/hooks";
import RootLayout from "../src/common/RootLayout";
import _ from "lodash";
import OrderStep1 from "../src/common/OrderStep1";
import OrderStep2 from "../src/common/OrderStep2";
import OrderStep3 from "../src/common/OrderStep3";
import OrderStep4 from "../src/common/OrderStep4";
import { GoodsInfo } from "../src/common/texts";
import { useState } from "react";
import OrderStep5 from "../src/common/OrderStep5";
import OrderStep6 from "../src/common/OrderStep6";
function CreateOrder(){
  const { demoData, updateDemoData } = useDemoData();
  const orderForm = demoData.orderForm;
  const data = orderForm ? [demoData.orderForm] : [];
  const [step, setStep] = useState(1);

  console.log('step', step)

  const getStatus = () => {
    if (step < 5) {
      return ''
    }
    const status = _.get(orderForm, 'status', '')
    console.log('step', step, 'status', status)
    if (status == '4' || status == '3') {
      return '待支付保证金'
    }
    if (status == '5' && step === 5) {
      return '公示期'
    }
    if (status == '6' && step === 7) {
      return '待支付服务费'
    }
    if (status == '7' && step === 7) {
      return '待支付服务费'
    }
    if (status == '8') {
      return '二次公示期'
    }
    if (status == '9') {
      return '待发货'
    }
    if (status == '88') {
      return '订单已完成'
    }
  }

  const RenderStatus = () => {
    const s = getStatus()
    if (_.isEmpty(s)) {
      return <span></span>
    }
    return <Tag style={{position: 'absolute', left: '50%'}} color="success"> {s} </Tag>
  }

  return (<>
      <RenderStatus></RenderStatus>
      <GoodsInfo/>
      {step === 1 && (
        <OrderStep1
          onFinish={(data) => {
            updateDemoData({ orderForm: {
              ...orderForm, ...data,
            } });
            setStep(2)
          }}
        />
      )}
      {step === 2 && (
        <OrderStep2
          onFinish={(data) => {
            updateDemoData({ orderForm: {
              ...orderForm, ...data,
            } });
            setStep(3)
          }}
        />
      )}
      {step === 3 && (
        <OrderStep3
          onFinish={(data) => {
            updateDemoData({ orderForm: {
              ...orderForm, ...data,
            } });
            setStep(4)
          }}
        />
      )}
      {step === 4 && (
        <OrderStep4
          onFinish={(data) => {
            updateDemoData({ orderForm: {
              ...orderForm, ...data
            } });
            setStep(5)
          }}
        />
      )}
      {step === 5 && (
        <OrderStep5
          onFinish={(data) => {
            updateDemoData({ orderForm: {
              ...orderForm,
            } });
            setStep(6)
          }}
        />
      )}
      {step === 6 && (
        <OrderStep6 onFinish={(data) => {
          updateDemoData({ orderForm: {
            ...orderForm,
            status: 6,
            ...data,
          } });
          setStep(7)
        }}></OrderStep6>
      )}
  </>)
}

function PendingList(){
  const { demoData, updateDemoData } = useDemoData();
  const orderForm = demoData.orderForm;
  const data = orderForm ? [demoData.orderForm] : [];
  const status = _.get(orderForm, 'status', 0);
  const riskLevel = _.get(orderForm, 'riskLevel', 0);
  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false}></Table>
      {data.map((value, index) => {
        return (
          <table
            key={`seller_${index}`}
            style={{ width: "100%", tableLayout: "auto" }}
          >
            <tbody>
              <tr style={{ backgroundColor: "white" }}>
                <td style={{ padding: 30}}> {`#${index + 1}`} </td>
                <td style={{ padding: 30}}> {_.get(value, "buyerName", "")} </td>
                <td style={{ padding: 30}}> {`意向价：${_.get(value, "intentionAmount", 0)}`}</td>
                <td style={{ padding: 30}}> {`风险等级：${riskLevel}`} </td>
                <td style={{ padding: 30}}>
                  <Col>
                    <Button
                      onClick={() => {
                        updateDemoData({
                          ...demoData,
                          orderForm: { ...orderForm, status: 2 },
                        });
                      }}> 选中 </Button>
                  </Col>
                </td>
              </tr>
            </tbody>
          </table>
        );
      })}
    </>
  )
}

function PendingCreateList(){
  const { demoData, updateDemoData } = useDemoData();
  const orderForm = demoData.orderForm;
  const data = orderForm ? [demoData.orderForm] : [];
  const status = _.get(orderForm, 'status', 0);
  const riskLevel = _.get(orderForm, 'riskLevel', 0);
  const onClickBuyerInfo = () => {
    Modal.info({
      title: "买家信息",
      content: "公司名称： xxx公司  电话： xxx-xxxxxx",
    });
  };
  const onClickCreateOrder = () => {
    updateDemoData({ orderForm: {
      ...orderForm, ...data, status: 3
    } });
  };
  const mColumns2 = [
    ...columns2,
    {
      render: (value) => {
        return (
          <Col>
            <Button children="联系买家" onClick={onClickBuyerInfo} />
            <div style={{ height: 10 }} />
            <Button children="创建订单" onClick={onClickCreateOrder} />
          </Col>
        );
      },
    },
  ];
  return (<Table columns={mColumns2} dataSource={data} pagination={false}></Table>)
}

export default function Seller() {
  const { demoData } = useDemoData();
  const orderForm = demoData.orderForm;
  const status = _.get(orderForm, 'status', 0);

  const renderComp = () => {
    if (status === 1) {
      return <PendingList />
    }
    if (status === 2) {
      return  <PendingCreateList />
    }
    return <CreateOrder />
  }

  return (
    <RootLayout>
      { renderComp() }
    </RootLayout>
  );
}
