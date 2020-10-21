import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log(response.data)
  return response.data
}

const getOne = async id => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default { getAll, getOne }