import { selectDemoData, setDemoData } from './root.redux';
import { useSelector } from 'react-redux';
import { RefObject, useEffect, useRef } from 'react';
import { useTranslation as useTrans } from 'react-i18next/react-i18next';
import { useDispatch } from 'react-redux';
import { updateStore } from '../store';
import { UpdateStoreItem } from './../store';

export function useOnClickOutside<T extends HTMLElement>(
  node: RefObject<T | undefined>,
  handler: undefined | (() => void)
) {
  const handlerRef = useRef<undefined | (() => void)>(handler)
  useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (node.current?.contains(e.target as Node) ?? false) {
        return
      }
      if (handlerRef.current) handlerRef.current()
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [node])
}

export function useUpdateStore() {
  const put = useDispatch()
  const update = (...list: UpdateStoreItem[]) => {
    put(updateStore(...list))
  }
  return update
}

export function useTranslation() {
  return useTrans()
}

export function useDemoData() {
  const update = useUpdateStore()
  const demoData = useSelector(selectDemoData)
  const updateDemoData = (data, notify = true) => {
    const dataStr = JSON.stringify(data)
    if(notify){
      localStorage.setItem('demoData', dataStr)
    }
    update(setDemoData(data))
  } 
  return { updateDemoData , demoData, }
}