
import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { dropRight, size, get, join, each, split } from 'lodash'
let store

const initialState = {
  lastUpdate: 0,
  light: false,
  count: 0,
}


const setData = (store, keys, value) => {
  if (keys.length === 1) {
    return value
  }
  let node = value
  let tempKeys = keys
  for (let i = keys.length - 1; i--; i >= 0) {
    let cKey = tempKeys[tempKeys.length - 1]
    tempKeys = dropRight(tempKeys)
    if (size(tempKeys) > 0) {
      const oldNode = get(store, join(tempKeys, '.'))
      const nNode = (oldNode instanceof Array) ? [...oldNode] : { ...oldNode }
      nNode[cKey] = node
      node = nNode
    }
  }
  return node
}

export type UpdateStoreItem = {
  key: string,
  value?: any
}
const UPDATE_STORE = 'UPDATE_STORE'
export type UpdateStoreAction = {
  type: 'UPDATE_STORE',
  list: UpdateStoreItem[]
}

export function updateStore(...list: UpdateStoreItem[]): UpdateStoreAction {
  return {
    type: UPDATE_STORE,
    list
  }
}

const reducer = (state = initialState, action: UpdateStoreAction) => {
  if (action.type = UPDATE_STORE) {
    const nStore = { ...state }
    const list = action.list
    each(action.list, (item) => {
      const keys = split(item.key, '.')
      nStore[keys[0]] = setData(store, keys, item.value)
    })
    return nStore
  }
  return state
}

function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  )
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  // window.minerId = '5He8wseFhq4kp5W15gy8i8ea8rW9z5vxmoPM726HUYbiVE7d'
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}