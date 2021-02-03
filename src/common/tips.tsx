
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { Tooltip } from './Tooltip'

export function CRUTip() {
  const createIndex = (index) => <span style={{ fontSize: 8, verticalAlign: 'text-top' }}> {index}</span>
  return <Tooltip data={
    <>
      <span>{`1.0 pCRU = 1x10`}{createIndex(-12)}{' CRU\n\r'}</span>
      <span>{`1.0 nCRU = 1x10`}{createIndex(-9)}{' CRU\n\r'}</span>
      <span>{`1.0 µCRU = 1x10`}{createIndex(-6)}{' CRU\n\r'}</span>
      <span>{`1.0 mCRU = 1x10`}{createIndex(-3)}{' CRU'}</span>
    </>
  }>
    <div style={{padding: '0 4px', display: 'inline-flex', alignItems: 'center', alignSelf: 'center'}}>
      <AiOutlineExclamationCircle size={16}/>
    </div>
  </Tooltip>
}