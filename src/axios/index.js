import ajax from './ajax'

//分页获取角色列表
export const reqRoleList = (searchData) => ajax('/uac/role/queryRoleListWithPage',searchData)
//删除角色
export const reqDeleteRole = (id) => ajax('/uac/role/deleteRoleById/'+id)
//批量删除角色
export const reqDeleteBatch = (deleteArr) => ajax('/uac/role/batchDeleteByIdList',deleteArr)
//更改角色状态
export const reqSwitchRoleStatus = (switchRole) => ajax('/uac/role/modifyRoleStatusById',switchRole)
//添加/更新角色
export const reqAddOrUpdateRole = (newRole) => ajax('/uac/role/save',newRole)


//分页获取权限列表
export const reqAuthList = (searchData) => ajax('/uac/action/queryListWithPage',searchData)
//批量删除权限
export const reqDeleteBatchAuth = (deleteArr) => ajax('/uac/action/batchDeleteByIdList',deleteArr)
//删除权限
export const reqDeleteAuth = (id) => ajax('/uac/action/deleteActionById/'+id)
//更改权限状态
export const reqSwitchAuthStatus = (switchAuth) => ajax('/uac/action/modifyStatus',switchAuth)
//添加/更新权限
export const reqAddOrUpdateAuth = (newAuth) => ajax('/uac/action/save',newAuth)
