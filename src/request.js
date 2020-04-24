import axios from 'axios'

export default async function request (url){
  const responce = await axios.post(url, {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  return responce.data
}

