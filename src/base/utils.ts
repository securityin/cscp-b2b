import { notification } from 'antd';
import _, { filter, isEmpty, join } from 'lodash';
import { statusMap } from './constans'
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
    style: {
      right: 50,
      top: 60
    },
    message: 'Success',
    duration: 2,
  })
}


export function getOrderStatus(orderForm) {
  const status = _.get(orderForm, 'status', 0)
  return _.get(statusMap, status, '')
}