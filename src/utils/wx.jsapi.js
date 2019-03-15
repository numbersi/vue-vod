import axios from 'axios'

const jsApiList = ['onMenuShareAppMessage',
  'onMenuShareTimeline', 'showMenuItems', 'hideMenuItems'
]
// import wx from 'wx-js-sdk'
export default {

  wxShowMenu: function () {
    axios.post('/api/signature').then(function (res) {
      var getMsg = res.data.data;
      let config = {
        debug: false, //生产环境需要关闭debug模式
        appId: getMsg.appId, //appId通过微信服务号后台查看
        timestamp: getMsg.timestamp, //生成签名的时间戳
        nonceStr: getMsg.noncestr, //生成签名的随机字符串
        signature: getMsg.signature, //签名
        jsApiList //需要调用的JS接口列表
      }
      wx.config(config);

      wx.ready(function () {

        wx.checkJsApi({

          jsApiList,

          success: function () {

            wx.showMenuItems({

              menuList: [

                'menuItem:share:appMessage', //发送给朋友

                'menuItem:share:timeline' //分享到朋友圈

              ]

            });

          }

        });


        // //分享到朋友圈

        // wx.updateTimelineShareData({

        //   title: "分享描述", // 分享标题

        //   desc: "分享描述", //分享描述

        //   link: getMsg.shareLink, // 分享链接

        //   imgUrl: getMsg.imgUrl // 分享图标

        // });



        // //分享给朋友

        // wx.updateAppMessageShareData({

        //   title: "分享描述", // 分享标题

        //   desc: "分享描述", // 分享描述

        //   link: getMsg.shareLink, // 分享链接

        //   imgUrl: getMsg.imgUrl // 分享图标

        // });

      });

    })
  },

  ready: function ({title,desc,link,imgUrl}) {
    console.log({title,desc,link,imgUrl})

    wx.ready(function () { //需在用户可能点击分享按钮前就先调用
      wx.onMenuShareAppMessage({
        title, // 分享标题
        desc, // 分享描述
        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl, // 分享图标
        success: function () {
          // 设置成功
        }
      }),
      wx.onMenuShareTimeline({
        title, // 分享标题
        desc, // 分享描述
        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl, // 分享图标
        success: function () {
          // 设置成功
        }
      })
    });
  }

}