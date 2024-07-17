import axios from 'axios'

export const fetchCartera = async (empresa: string, abs: boolean) => {
  try {
    const response = await axios.get(`API_ROUTE/cartera?empresa=${empresa}&abs=${abs}`)
    return response.data
  } catch (error) {
    console.error('Error fetching cartera data:', error)
    throw error
  }
}
