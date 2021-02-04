import { Modal } from 'antd';
import { join, filter, isEmpty } from 'lodash'

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