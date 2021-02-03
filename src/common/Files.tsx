import s from './Files.module.scss'
import { MerchantFile } from '../base/home.api'
import { classNames, elipID } from '../base/utils'
import { sortBy, isEmpty, filter, chunk, size, isNumber, range } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useTranslation } from '../base/hooks'
import { Tooltip } from './Tooltip'
import { CRUTip } from './tips'

const colors = ['#F9F9F9', 'white']

export function Files({ files, filterStr }: { files?: MerchantFile[], filterStr?: string }) {
  const { t } = useTranslation()
  // data
  const sorted = useMemo(() => sortBy(files, (f) => 0 - f.expiredTime), [files])
  const needFilter = !isEmpty(filterStr)
  const filterFiles = needFilter ? filter(sorted, (f) => f.cid === filterStr) : sorted
  const pages: MerchantFile[][] = files ? chunk(filterFiles, 10) : null
  const pageSize = size(pages)
  const [pageIndex, setPageIndex] = useState(0)
  useEffect(() => { setPageIndex(0) }, [filterStr])
  const usePageIndex = Math.min(pageIndex, pageSize - 1)
  //pages
  const elip = '···'
  const pageTabs = useMemo(() => {
    if (pageSize > 5) {
      let p = usePageIndex + 1
      let leftElip = p > 3
      let rightElip = p < pageSize - 2
      let mid = range(Math.max(p - 1, 2), Math.min(p + 2, pageSize))
      return filter([1, leftElip ? elip : null, ...mid, rightElip ? elip : null, pageSize])
    } if (pageSize > 1) {
      return range(1, pageSize + 1)
    }
    return null
  }, [pageSize, usePageIndex])

  return <div>
    <div className={s.head}>
      <div className={s.tab}>{t('fileCID')}</div>
      <div className={s.tab}>{t('fileSize')}</div>
      <div className={s.tab}>{t('fileExpiredTime')}</div>
      <div className={s.tab}>{t('expectedEarning')} <CRUTip /> </div>
    </div>
    {
      pageSize > 0 ? pages[usePageIndex].map((f, index) => {
        return <div className={s.item} key={`key_files_${index}`} style={{ backgroundColor: colors[index % 2] }}>
          <Tooltip data={f.cid}>
            <div className={s.tab}>{elipID(f.cid)}</div>
          </Tooltip>
          <div className={s.tab}>{`${f.fileSize}`}</div>
          <div className={s.tab}>{`${f.expiredTime}`}</div>
          <div className={s.tab}>{`${f.expectedReward}`}</div>
        </div>
      }) :
        <>
          <div className={s.empty} style={{ backgroundColor: colors[0] }}></div>
          <div className={s.empty} >
            {t('emptyData')}
          </div>
        </>

    }
    <div className={s.empty} style={{ height: 1 }} />
    {
      pageSize > 1 && <div className={s.pages}>
        <div className={s.page} onClick={() => setPageIndex(Math.max(0, usePageIndex - 1))} >
          <FaChevronLeft />
        </div>
        {
          pageTabs.map((tab, index) => <div
            key={`page_tab_${index}`}
            className={classNames(s.page, usePageIndex + 1 === tab ? s.pageActive : null)}
            onClick={() => {
              if (isNumber(tab)) {
                setPageIndex(tab - 1)
              }
            }}>{`${tab}`}</div>)
        }
        <div className={s.page} onClick={() => setPageIndex(Math.min(pageSize - 1, usePageIndex + 1))}>
          <FaChevronRight />
        </div>
      </div>
    }
  </div>
}