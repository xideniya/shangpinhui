import { v4 as uuidv4 } from 'uuid'
// 生成随机的字符车串 每次执行不能变化，游客身份持久储存
export const getuuid = () => {
  // 先从本地获取uuid(看看本地有没有)
  let uuidToken = localStorage.getItem('UUIDTOKEN')
  if (!uuidToken) {
    // 生成游客临时身份
    uuidToken = uuidv4()
    // 本地存储一次，单例模式
    localStorage.setItem('UUIDTOKEN', uuidToken)
  }
  // 切记要有返回值，不然undefined
  return uuidToken
}
