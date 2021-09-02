import axios from 'axios'
// compatible server and client TODO: config
const isBrowser = process.browser

/* 
  another way
    //  file api doesn't add prefix of '/api'
        const service = axios.create({
          baseURL: isBrowser?'api':'http://xx.xxx.xxx.xxx/',
          timeout: 5000
        })
    //  config.url of request interceptor needn't be modified 
 */

const service = axios.create({
  baseURL: isBrowser?'':'http://xx.xxx.xxx.xxx/',
  timeout: 5000,
})
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiJ9.iSCjeMeds8Gfz_rqRl9Vlz-S1B_em0NaPvMm20i6MawXlvpe9FJuWkhLdTfq4UPy3LTJtfE3L9aolzkcybjIYw'

// request interceptor 
service.interceptors.request.use(
  (config) => {
    config.headers['token'] = token
    // server-side remove /api
    !isBrowser&&(config.url = config.url.slice(4))
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
      return response
  },
  (error) => {
      console.log(error,'request error')
    return Promise.reject(error)
  }
)

export default service
