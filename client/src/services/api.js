import config from '@/config/config'
import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: config.server_url,
    withCredentials: true
  })
}