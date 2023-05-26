import axios from 'axios'
import { parseCookies } from 'nookies'

const cookies = parseCookies()

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API}`,
  headers: {
    Authorization: `Bearer ${cookies['caparao.token']}`,
  },
})
