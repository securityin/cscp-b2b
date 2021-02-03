import { DateTime } from 'luxon'
import { useState } from "react"
import { useResizeDetector } from "react-resize-detector"
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis, YAxis } from "recharts"
import { from } from "rxjs"
import { onErrorResumeNext } from 'rxjs/operators'
import { useObservable } from "rxjs-hooks"
import { getMarketOverview } from "../base/home.api"
import { useTranslation } from "../base/hooks"
import { classNames } from "../base/utils"
import _ from 'lodash'
import s from "./StorageBarChart.module.scss"
function Tab({ text, active = false, activeColor, onClick }) {
  return <div className={classNames(s.tab, active ? s.activeTab : null)} onClick={onClick}>
    <div className={s.left} style={{ backgroundColor: activeColor }} />
    <div className={s.text}>{text}</div>
  </div>
}

export const colors = {
  'totalPeers': '#F5A623',
  'totalStorage': '#F5A623',
  'fileCount': '#F5A623',
}

export function StorageLineChart({ }: {}) {
  const { t } = useTranslation()
  const dataList = useObservable(() => from(getMarketOverview()).pipe(onErrorResumeNext([])), [])
  
  const data = _.map(dataList, (m) => {
    const name = DateTime.fromMillis(m.date).toFormat("MM-dd")
    return { ...m, name }
  })
  const [cKey, setCKey] = useState('totalPeers')

  const { width, ref } = useResizeDetector({ handleWidth: true, handleHeight: false, refreshMode: 'debounce' })
  return <div className={s.container}>
    <div className={s.top}>
      <div className={s.title}>{t('lineChartTitle')}</div>
      <div className={s.tabs}>
        <Tab text={t('nodeNum')}
          active={cKey === 'totalPeers'}
          activeColor={colors['totalPeers']}
          onClick={() => { setCKey('totalPeers') }} />
        <Tab text={t('totalStorage')}
          active={cKey === 'totalStorage'}
          activeColor={colors['totalStorage']}
          onClick={() => { setCKey('totalStorage') }} />
        <Tab text={t('allValidFile')}
          active={cKey === 'fileCount'}
          activeColor={colors['fileCount']}
          onClick={() => { setCKey('fileCount') }} />
      </div>
    </div>
    <div style={{ width: '100%' }} ref={ref as any}>
      {width > 0 && <BarChart
        width={width}
        height={210}
        data={data}
        margin={{
          top: 40, right: 10, left: -6, bottom: -6,
        }}
      >
        <CartesianGrid strokeDasharray="1 0 #000000" vertical={false} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} stroke={'#858B9C'} fontSize={12} />
        <YAxis axisLine={false} dataKey={cKey} tickLine={false} stroke={'#858B9C'} fontSize={12} tickCount={4} allowDecimals={cKey === 'totalStorage'} />
        <Bar
          dataKey={cKey} fill={colors[cKey]}
          barSize={20}
          shape={<Rectangle radius={4} />}
          label={false}>
        </Bar>
      </BarChart>}
    </div>

  </div>
}