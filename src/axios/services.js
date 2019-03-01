//api.js
import axiosService from './request'
/***
 * 获取角色列表
 */
export const getRoleList = data => {
    return axiosService({
        url: '/role/list',
        method: 'get',
        data
    })
};
/***
 * 获取角色获取用户列表
 */
export const getUserList = (id) => {
    console.log(id)
    return axiosService({
        url: '/role/user_list',
        method: 'get',
        params: id
    })
};