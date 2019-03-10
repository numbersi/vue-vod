const cheerio = require('cheerio')
async function jxHtml(ret) {
  const $ = cheerio.load(ret)
  //图片
  //https://tu.66vod.net/2019/0071.jpg
  const pic = $('#post_content p img').attr('src')
  const title = $("#content h1").text()
  let Durl = $('.context .widget.box.row a').attr('href')
  Durl = Durl.substr(0, Durl.length - 1) + '1'

  // const Durlret = await axios.get(Durl)

  // var playurl = /(http.*?index.m3u8)/i.exec(Durlret)
  const res = {
    title,
    pic,
    Durl,
    // playurl: playurl[0]
  } //`title=${title}&pic=${pic}&playurl=${playurl}`
  // console.log(`pages/play/play?data=` + JSON.stringify(res))
  return res
}
export default jxHtml