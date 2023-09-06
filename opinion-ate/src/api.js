import axios from 'axios'

const client = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_KEY}`,
})

const api = {
  async loadRestaurants() {
    const response = await client.get('/restaurants')
    return response.data
  },
}

export default api
