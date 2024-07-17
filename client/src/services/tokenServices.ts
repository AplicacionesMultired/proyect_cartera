import axios, { AxiosResponse } from 'axios'

export const authTokenServices = async ({ token }: { token: string }): Promise<AxiosResponse> => {
  try {
    const response = await axios.get('LOGIN_ROUTE/profile', { headers: { Authorization: `Bearer ${token}` } })
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}
