import axios from 'axios'

export const autentificaToken = async ({ token }: { token: string }): Promise<any> => {
  try {
    const response = await axios.get('http://172.20.1.216:4000/api/profile', { headers: { Authorization: `Bearer ${token}` } })
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}
