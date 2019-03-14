// const parser = require('fast-xml-parser')
class vodxml {
  static async searchXML(data) {
    const content = await parseXML(data)
   const pagecount = /pagecount="(.*?)"/.exec(data)[1]
    const list_video = content.rss.list
    if (list_video.video) {
      let video = filtration(list_video)
      return {
        video,
        pagecount
      }
    }
    return {
      status: false,
      msg: '没找到'
    }
  }
  static async getPlayLinkXml(data) {
    const content = await parseXML(data)
    let video = content.rss.list[0].video[0]
    return video
  }
}
// 过滤
const filtration = (list_video) => {
  if (Array.isArray(list_video.video)) {
    list_video.video = list_video.video.filter(function (video) {
      return ["福利片", '伦理片'].indexOf(video.type) >= 0 ? false : true
    })
  } else {
    list_video.video = [list_video.video]
  }
  return list_video.video
}
const parseXML = xml => {

  // eslint-disable-next-line no-undef
  return parser.parse(xml)
}
export default vodxml