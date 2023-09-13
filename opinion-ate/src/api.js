import axios from 'axios'

const client = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_KEY}`,
})

const api = {
  async loadRestaurants() {
    const response = await client.get('/restaurants')
    return response.data
  },
  async createRestaurant(name) {
    const response = await client.post('/restaurants', { name })
    return response.data
  },
}

export default api
