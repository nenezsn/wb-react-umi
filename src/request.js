export default async function request (url){
  const responce = await window.fetch(url)
  const data = await responce.json()
  return data
}
