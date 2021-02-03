import { FaSpinner } from 'react-icons/fa'
import { classNames } from '../base/utils'
import s from './Loading.module.scss'
export function AppLoading() {
  return <div className={classNames(s.appLoading)}>
    <FaSpinner size={'3rem'} color={'rgba(0 , 0, 0 , 0.5)'} />
  </div>
}