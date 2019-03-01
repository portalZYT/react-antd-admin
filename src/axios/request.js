import JsonP from 'jsonp';
import axios from 'axios';
import { Modal } from 'antd';
let baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
/****** 创建axios实例 ******/
const axiosService = axios.create({
    baseURL: baseApi,  // api的base_url
    timeout: 8000  // 请求超时时间
});
/****** request拦截器==>对请求参数做处理 ******/
axiosService.interceptors.request.use(config => {
    // config.method === 'post'
    //     ? config.data = qs.stringify({ ...config.data })
    //     : config.params = { ...config.params };
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    console.log('设置请求头', config);
    return config;
}, error => {  //请求错误处理
    Promise.reject(error);
});
/****** respone拦截器==>对响应做处理 ******/
axiosService.interceptors.response.use(
    response => {  //成功请求到数据
        return Promise.resolve(response);
    },
    error => {  //响应错误处理
        let err = JSON.parse(JSON.stringify(error));
        Modal.info({
            title: "提示",
            content: err.response.data.error
        });
        return Promise.reject(error);
    }
);
export default axiosService;

// export default class Axios {
//     static jsonp(options) {
//         return new Promise((res, rej) => {
//             JsonP(options.url, {
//                 param: 'callback'
//             }, function (err, response) {
//                 response.status == 'success' ? res(response) : rej(response.message)
//             })
//         })
//     }

//     static ajax(options) {
//         let baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
//         return new Promise((resolve, reject) => {
//             axios({
//                 url: options.url,
//                 method: 'get',
//                 baseURL: baseApi,
//                 timeout: 10000,
//                 params: (options.data && options.data.params) || ''
//             }).then((response) => {
//                 console.log(response);
//                 if (response.status == '200') {
//                     resolve(response.data);
//                 } else {
//                     reject(response.data);
//                     Modal.info({
//                         title: "提示",
//                         content: 'response.data.msg'
//                     })
//                 }
//             })
//         });
//     }
// }