import axios, { AxiosResponse } from 'axios'
import { LOGIN_URL } from '../utils/contanst'

export const authTokenServices = async ({ token }: { token: string }): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(`${LOGIN_URL}/profile`, { headers: { Authorization: `Bearer ${token}` } })
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}
