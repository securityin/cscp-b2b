
import { MouseEventHandler } from 'react'
import { IconType } from 'react-icons'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { useTranslation } from '../base/hooks'
import s from './Card.module.scss'
import { from } from 'rxjs'
import { Tooltip } from './Tooltip'
import { classNames } from '../base/utils'
import _ from 'lodash'
import Column from 'antd/lib/table/Column'

export function Card({ children, onClick }: { children, onClick?: MouseEventHandler | undefined }) {
  return <div className={s.card} onClick={onClick}>
    {children}
  </div>
}

export function Card2({ children }: { children }) {
  return <div className={s.card2}>
    {children}
  </div>
}

export function LabelCard(
  {
    title,
    text,
    Icon,
    color = 'blue',
    onClick,
    hoverTip,
  }: {
    Icon: IconType,
    title: string,
    text: string,
    color?: string,
    onClick?: MouseEventHandler,
    hoverTip?: any
  }
) {
  const showTip = !_.isEmpty(hoverTip)
  return <Card onClick={onClick} >
    <Icon size={24} color={color} />
    <div className={s.textGroup}>
      <div className={s.title}>
        {title}
        {showTip && hoverTip}
      </div>
      <div className={s.text}>{text}</div>
    </div>
  </Card>
}

export function HoverCard(
  {
    title,
    text,
    Icon,
    iconSize = '1.5rem',
    color = 'blue',
    hoverRender,
    onHoverClick,
  }: {
    Icon: IconType
    title: string
    text: string
    color?: string
    iconSize?: number | string
    hoverRender?: string
    onHoverClick?: MouseEventHandler
  }
) {
  return <div className={s.cardHover}>
    <Icon size={iconSize} color={color} />
    <div className={s.textGroup}>
      <div className={s.title}>{title}</div>
      <div className={s.text}>{text}</div>
    </div>
    <div className={s.hover} onClick={onHoverClick}>{hoverRender}</div>
  </div>
}

function TextV({ title, text, textTip }: { title, text, textTip?}) {
  return <div className={s.textV}>
    <div className={s.textVtitle}>{title}</div>
    <Tooltip data={textTip} >
      <div className={s.textVtext}>{text}</div>
    </Tooltip>
  </div>
}


export function MinerCard({ minerID, balence, minerIDTip }) {
  const { t } = useTranslation()
  return <Card2>
    <div className={s.flexV}>
      <TextV title={t('minerName')} text={minerID} textTip={minerIDTip} />
      <TextV title={t('minerBalence')} text={balence} />
    </div>
  </Card2>
}


export function ViewBtn({ onClick, text, className = '' }) {
  return <div className={classNames(s.viewBtn, className)} onClick={onClick}>{`${text}>>`}</div>
}

export function PoolCard({ text }) {
  const { t } = useTranslation()
  return <Card2>
    {/* <div className={s.flexV}>
      <TextV title={t('bonusPool')} text={text} />
      <ViewBtn text={t('viewBonusPool')} onClick={() => { }} />
    </div> */}
    <div className={s.flexVCenter}>
      {<AiOutlineExclamationCircle size={16} />}
      <span style={{ paddingLeft: 4 }}>{t('poolComming')}</span>
    </div>
  </Card2>
}

export function StakeLimitCard({ text }) {
  const { t } = useTranslation()
  return <Card2>
    <div className={s.flexV}>
      <TextV title={t('stakeLimit')} text={text} />
      <ViewBtn text={t('viewStakeLimit')} onClick={() => { window.open('https://apps.crust.network/') }} />
    </div>
  </Card2>
}

export function OilInfoCard({data}){
  const { title,  }  = data
  return <Column>
    <div className={s.title}>{title}</div>
    <div className={s.text}>{title}</div>
    <div className={s.text}>{title}</div>
  </Column>
}