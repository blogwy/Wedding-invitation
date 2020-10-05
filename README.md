# Wedding-invitation

婚礼邀请函微信小程序，前端+后端+数据库 **小程序前端是fork的 [OnceLove](https://github.com/donghaikun/OnceLove)** 现在已经迁移到云开发，不需要域名和服务器。

![1](https://wong-1251253615.cos.ap-shanghai.myqcloud.com/bless/awsl.png)


## 前提

* 申请一个小程序账号并且开通云开发

## 部署

1. clone本项目，并通过微信开发工具导入，导入时填入你的appid

2. 新建数据库集合，并写入基础数据
   * 新建4个集合，分别是`bless` `photos` `comment` `invitation`
   * 在`photos`集合中写入记录，此数据用于小程序的`甜蜜相册`，有几张图片添加几条记录，数据格式是`{ "image": "图片url" }`（图片可以上传到云存储）
   * 在`invitation`集合写入基本信息，此数据用于小程序的`首页`和`地图`页面，数据格式如下
    ```json
      {
        // 新郎姓名
        "boy": "周杰伦",
        // 公历结婚日期
        "date": "2020-10-01 12:00:00",
        // 新娘姓名
        "girl": "昆凌",
        // 结婚地点（酒店教堂名称即可）
        "hotel": "英国约克郡塞尔比教堂",
        // 农历结婚日期
        "lunar": "庚子年八月十五",
        // 背景音乐url
        "music": "https://6465-dev-1goaza5i509ecff5-1258198969.tcb.qcloud.la/audio/ido.mp3?sign=f186b54afeca081690c8c03c2573521c&t=1601797034",
        // 背景音乐是否自动播放
        "autoPlay": false,
        // 首页背景大图
        "image": "https://6465-dev-1goaza5i509ecff5-1258198969.tcb.qcloud.la/photos/cover.jpeg?sign=5ebe072ba028b0a2da8aa54fb82586a0&t=1601799069",
        // 结婚地点地址
        "address": "英国约克郡塞尔比镇",
        // 结婚地点经纬度
        "latitude": 38.446324,
        "longitude": 112.735426,
        // 新郎&新娘手机号
        "boyPhone": "13412344321",
        "girlPhone": "13698766789"
      }
    ```


