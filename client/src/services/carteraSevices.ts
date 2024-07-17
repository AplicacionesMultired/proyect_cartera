import axios from 'axios'
import { HOST } from '../utils/contanst'

export const fetchCartera = async (empresa: string, abs: boolean) => {
  try {
    const response = await axios.get(`${HOST}/cartera?empresa=${empresa}&abs=${abs}`)
    return response.data
  } catch (error) {
    console.error('Error fetching cartera data:', error)
    throw error
  }
}
