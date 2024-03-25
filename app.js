/* 
 * 携爱幼教小程序
 * author: yistec
 * organization:  携爱幼教 yistec.com
 * 技术支持微信号：yistec
 * Copyright (c) 2020 https://shop.ttuwa.com All rights reserved.
 */
import * as api from 'utils/new/api.js'
import * as util from 'utils/new/util.js'
import config from 'utils/config.js'
const Api = require('./utils/api.js')

App({
  onLaunch: function (options) {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);

    this.updateManager()
    this.getConfigData()
  },
  // 获取配置数据
  getConfigData() {
    const http = Api.getConfig()

    http.then(res => {
      const data = res.settings
      let _d = data.downloadfile_domain
      let _b = data.business_domain

      let appName = data.webname
      let appDes = data.websitedec
      let appLogo = data.appLogo
      // let praiseImg = data.praiseImg
      let downloadDomain = _d.length ? _d.split(',') : []
      let businessDomain = _b.length ? _b.split(',') : []
      let copyright = "©  " + appName + " " + "Yistec"

      let customBanner = {
        home: data.expand.home_list_top_nav,
        cate: data.expand.cat_list_nav,
        cateList: data.expand.cat_posts_list_nav,
        topicList: data.expand.topic_list_nav,
        postDetail: data.expand.post_detail_top_nav,
        topicDetail: data.expand.topic_detail_top_nav
      }

      let info = this.globalData
      this.globalData = {
        ...info,
        appName,
        appLogo,
        appDes,     
        downloadDomain,
        businessDomain,    
        copyright,
        customBanner
      }
    })
  },

  // 小程序更新
  updateManager() {
    if (!wx.canIUse('getUpdateManager')) {
      return false;
    }
    const updateManager = wx.getUpdateManager();
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '新版本提示',
        content: '小程序新版本已经准备好，即将重启',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      });
    });
    updateManager.onUpdateFailed(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel: false
      })
    });
  },
  globalData: {
    userInfo: {},
    userSession: {},
    memberUserInfo: {},
    wxLoginInfo: {},   
    appSetting: {},
    appName: '',
    appDes: '',
    appLogo: '',  
    downloadDomain: [],
    businessDomain: [],  
    copyright: '',
    customBanner: {}
  },

  // 新封装的wx.request
  $api: api,
  $util: util
})