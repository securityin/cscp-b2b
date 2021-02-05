import { notification } from 'antd';
import _, { filter, isEmpty, join } from 'lodash';

export function classNames(...c) {
  return join(filter(c, s => !isEmpty(s)), ' ')
}

export function elipID(id: string, size = 6) {
  if (id && id.length > size * 2) {
    return `${id.substr(0, size)}...${id.substr(id.length - size, id.length)}`
  }
  return id
}

export function notifySucess() {
  notification.success({
    message: 'Success',
    duration: 3000,
  })
}

const statusMap = {
  0: '',
  1: 'Intending',
  2: 'Selected',
  3: 'Deposit to be paid',
  4: 'Deposit to be paid(Finance)',
  5: 'Publicity period',
  6: 'Pending service fee',
  7: 'Pending service fee(Finance)',
  8: 'Second publicity period',
  9: 'Final payment pending',
  10: 'Final payment pending(Finance)',
  88: 'Order completed',
}
export function getOrderStatus(orderForm) {
  const status = _.get(orderForm, 'status', 0)
  return _.get(statusMap, status, '')
}