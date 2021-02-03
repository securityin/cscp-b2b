
import Popup from 'reactjs-popup';
import { EventType, PopupPosition } from 'reactjs-popup/dist/types'
import _ from 'lodash'
export function Tooltip({ data, children, maxW = 330, position = 'top center', on = 'hover' }: {
  data,
  children,
  maxW?: number | string,
  position?: PopupPosition | PopupPosition[],
  on?: EventType | EventType[],
}) {
  if (_.isEmpty(data)) return children
  return <Popup
    position={position}
    trigger={children}
    arrow={true}
    on={on}
    contentStyle={{
      padding: 5,
      borderRadius: 5,
      color: 'white',
      maxWidth: maxW,
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all',
      backgroundColor: 'rgba(0,0,0,0.8)',
    }}
    arrowStyle={{
      color: 'rgba(0,0,0,0.8)'
    }}
    keepTooltipInside={true}
  >
    {data}
  </Popup>
}