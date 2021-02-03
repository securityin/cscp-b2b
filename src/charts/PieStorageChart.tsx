import React from 'react'
import { useResizeDetector } from "react-resize-detector"
import { Cell, Pie, PieChart, Sector } from 'recharts'
import { Margin } from 'recharts/types/util/types'
import { useTranslation } from '../base/hooks'
import { ViewBtn } from '../common/Card'
import s from "./PieStorageChart.module.scss"

export function PieChartM({ data = defData, width, height, innerRadius = 60, outerRadius = 80, cx = '50%', margin }:
  { data, width: number, height: number, innerRadius?, outerRadius?, cx?, margin?: Margin }) {
  const isDef = data === defData
  const colorDef = '#cccccc'
  const color1 = isDef ? colorDef : '#199DD3'
  const color2 = isDef ? colorDef : '#FA8C16'
  const label = (isDef ? renderDefLabel : renderStorageLabel) as any
  const paddingAnge = 0
  return <PieChart width={width} height={height} margin={margin}>
    <Pie
      isAnimationActive={false}
      cx={cx}
      data={data}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      labelLine={false}
      spacing={0}
      dataKey="value"
      endAngle={450}
      startAngle={90}
      paddingAngle={paddingAnge}
      label={label}
    >
      <Cell fill={color1} />
      <Cell fill={color2} />
    </Pie>
  </PieChart>
}

const renderDefLabel = (p) => {
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value,
  } = p;
  return (<g>
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
    />
  </g>)
}
const renderStorageLabel = (p) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value,
  } = p;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 0) * cos;
  const sy = cy + (outerRadius + 0) * sin;
  const mx = cx + (outerRadius + 12) * cos;
  const my = cy + (outerRadius + 12) * sin;
  const line2length = 16 * (1 - Math.abs(cos))
  const ex = mx + (cos >= 0 ? 1 : -1) * line2length;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      {/* <text x={cx} y={cy} dy={4} textAnchor="middle" fill={fill}>{payload.name}</text> */}
      {/* <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      /> */}
      {/* <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      /> */}
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 5} y={ey + 5} textAnchor={textAnchor} fill="#333">{`${value}TB`}</text>
    </g>
  )
}


const defData = [
  { value: 1 },
  { value: 0 }
]

function PieTitle({ title = '', color = 'blue' }) {
  const r = 6;
  return <div className={s.pieTitle}>
    <div style={{ backgroundColor: color, width: 2 * r, height: 2 * r, borderRadius: r, marginRight: 5 }}></div>
    {title}
  </div>
}

export function PieStorageChart({ data }: { data }) {
  const { t } = useTranslation()
  const { width, ref } = useResizeDetector({ handleHeight: false, handleWidth: true, refreshMode: 'debounce' })
  return <div className={s.piePanel} >
    <div style={{ width: '100%' }} ref={ref as any}>
      {width > 0 && <PieChartM
        innerRadius={30}
        outerRadius={50}
        data={data}
        width={width}
        height={190} />}
    </div>
    <div className={s.pieStorageTitle}>{t('storage')}</div>
    <ViewBtn text={t('viewAllPeers')} onClick={() => {  window.open('https://telemetry.polkadot.io/#list/Crust%20Maxwell') }} className={s.pieTurnBtn}/>
    <div className={s.pieTitleGroup}>
      <PieTitle color="#199DD3" title={t('availableStorage')} />
      <PieTitle color="#FA8C16" title={t('usedStorage')} />
    </div>
  </div>
}

export function PieStorageChart2({ data }: { data?}) {
  const { t } = useTranslation()
  const { width, ref } = useResizeDetector({ handleHeight: false, handleWidth: true, refreshMode: 'debounce' })
  return <div className={s.piePanel2}>
    <div style={{ width: '100%' }} ref={ref as any}>
      {width > 0 && <PieChartM
        margin={{ top: 10 }}
        innerRadius={20}
        outerRadius={35}
        data={data}
        width={width}
        height={130} />}
    </div>

    <div className={s.pieTitleGroup} style={{ fontSize: 12 }}>
      <PieTitle color="#199DD3" title={t('availableStorage')} />
      <PieTitle color="#FA8C16" title={t('usedStorage')} />
    </div>
  </div>
}

