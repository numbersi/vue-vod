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
        debug: true, //生产环境需要关闭debug模式

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
        wx.onMenuShareAppMessage({
          title: "分享标题",
          desc: "分享描述",
          success: function () {
            // 设置成功
            console.log('updateTimelineShareData设置成功 :');
          }
        })

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

  }

}