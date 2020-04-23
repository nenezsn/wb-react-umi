import request from '../request'
export async function getuserInfo() {
  return request('/api/users')
}
