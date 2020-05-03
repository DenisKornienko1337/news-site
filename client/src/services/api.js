import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://193.164.149.101:80'
  })
}