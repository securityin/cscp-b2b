export const baseUrl = 'https://splorer-api.crust.run:8443/api'
interface BaseData<T> {
  message: string,
  code: number,
  data: T
}

function baseEncode() {
  return 'Y3J1c3Q6MTYyNTM0'
}

export async function get<T>(path: string) {
  const AuthEncode = baseEncode()
  const headers = new Headers({
    'Authorization': `Basic ${AuthEncode}`,
    'Content-Type': 'application/json; charset=utf-8'
  })

  const res = await fetch(`${baseUrl}${path}`, {
    mode: 'cors',
    method: 'GET',
    headers: headers
  })
  if (res.ok) {
    const bd: BaseData<T> = await res.json()
    return bd.data as T
  }
  return undefined
}
