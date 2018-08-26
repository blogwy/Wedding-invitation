# Wedding-invitation

婚礼邀请函微信小程序，前端+后端+数据库 **小程序前端是fork的 [OnceLove](https://github.com/donghaikun/OnceLove)**

## 代码

### 后端

1. 修改app.js里面23 24行为你的小程序appid和secret
   
2. 修改/db/db.js里面的数据库信息

### 前端

1. 在app.js里面71行处填写你的服务器域名，在44行处填写分享后显示的标题及图片
   
2. 根据每个页面的js文件的注释进行修改

## 部署

1. 首先申请一个小程序账号 购买一个服务器和域名(必须备案) 小程序后台添加服务器域名
   
2. 配置服务器 安装node pm2 nginx mysql
   
3. 恢复数据库 用远程软件连接上数据库后，新键love数据库字符集utf8mb4，用/sql/1.sql文件恢复(会有一些测试数据)
   
4. 配置nginx并启动 nginx配置文件如下：
```
location /openid {
  proxy_pass http://localhost:3000;     
}
location /bless {
  proxy_pass  http://localhost:3000;     
}
location /comment {
  proxy_pass  http://localhost:3000;     
}
```

4. 上传修改好的后端代码到服务器，并执行 npm i 安装依赖包。以来包安装好后，在此目录下执行 pm2 start app.js 启动
   
5. 大功告成



