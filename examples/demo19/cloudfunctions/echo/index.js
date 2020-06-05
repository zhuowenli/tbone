const cloud = require('wx-server-sdk')

exports.main = async (event, context) => {
  // event.userInfo 是已废弃的保留字段，在此不做展示
  // 获取 OPENID 等淘宝上下文请使用 cloud.getWXContext()
  delete event.userInfo
  return event
}
