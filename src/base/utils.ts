import { OrderForm } from './types';
import { Modal } from 'antd';
import { join, filter, isEmpty } from 'lodash'
import _ from 'lodash'

export function classNames(...c) {
  return join(filter(c, s => !isEmpty(s)), ' ')
}

export function elipID(id: string, size = 6) {
  if (id && id.length > size * 2) {
    return `${id.substr(0, size)}...${id.substr(id.length - size, id.length)}`
  }
  return id
}

export function modalSucess() {
  Modal.success({ content: 'Success' , maskClosable: true});
}

const statusMap = {
  0: '',
  1: '意向中',
  2: '已被选中',
  3: '待支付保证金',
  4: '待支付保证金(财务)',
  5: '公示期',
  6: '待支付服务费',
  7: '待支付服务费(财务)',
  8: '二次公示期',
  9: '(已收货)待支付尾款',
  10: '待支付尾款',
  88: '已完成',
}
export function getOrderStatus(orderForm) {
  const status = _.get(orderForm, 'status', 0)
  return _.get(statusMap, status, '')
}