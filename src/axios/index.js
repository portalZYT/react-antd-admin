import JsonP from 'jsonp';
import axios from 'axios';
import { Modal } from 'antd';
export default class Axios {
    static jsonp(options) {
        return new Promise((res, rej) => {
            JsonP(options.url, {
                param: 'callback'
            }, function (err, response) {
                response.status == 'success' ? res(response) : rej(response.message)
            })
        })
    }

    static ajax(options) {
        let baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseApi,
                timeout: 10000,
                params: (options.data && options.data.params) || ''
            }).then((response) => {
                console.log(response);
                if (response.status == '200') {
                    resolve(response.data);
                } else {
                    reject(response.data);
                    Modal.info({
                        title: "提示",
                        content: 'response.data.msg'
                    })
                }
            })
        });
    }
}