import JsonP from 'jsonp'
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
}