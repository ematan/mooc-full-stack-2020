import axios from 'axios'
const baseUrl = '/api/blogs'

const addComment = async (id, comment) => {
  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    comment
  )
  return response.data
}

export default { addComment }