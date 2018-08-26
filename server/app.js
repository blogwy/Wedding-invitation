const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

// for parsing application/json
app.use(bodyParser.json());

// table
const bless = require('./db/bless.js');
const comment = require('./db/comment.js');

// test
app.get('/', function (req, res) {
  res.send('Hello World!');
});

// 获取openid
app.get('/openid/get',function (req,res) {
  let jsCode = req.query.js_code;
  axios.get('https://api.weixin.qq.com/sns/jscode2session', {
    params: {
      appid: '', // 填写你的appId
      secret: '', // 填写你的secret
      js_code: jsCode,
      grant_type: 'authorization_code'
    }
  })
      .then(function (response) {
        if (response.data.openid){
          res.json(response.data);
        }else {
          res.json(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
          res.json({
              msg: "未知错误",
              code: "-1"
          });
      });
})

// 祝福信息查询所有
app.get('/bless/search',function (req,res) {
  bless.findAll({
      order: [
          ["id", "DESC"]
      ]
  })
      .then(respons => {
        res.json({
          code: '1',
          msg: '查询成功',
          data: respons
        })
      })
      .catch(errors => {
        console.log(errors);
          res.json({
              msg: "未知错误",
              code: "-1"
          });
      })
})

// 祝福信息添加
app.post('/bless/increase',function (req,res) {
  let data = {
    nickName: req.body.nickName,
    avatarUrl: req.body.avatarUrl,
    openId: req.body.openId
  }
    bless.findOne({ where: {openId: req.body.openId} })
        .then(respons => {
            if (respons){
                res.json({
                    code: '0',
                    msg: '您已经发表过祝福了'
                })
            }else {
                bless.create(data)
                    .then(createRes => {
                        res.json({
                            code: '1',
                            msg: '收到您的祝福,谢谢！',
                            data: createRes
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.json({
                            msg: "未知错误",
                            code: "-1"
                        });
                    })
            }
        })
        .catch(errors => {
            console.log(errors);
            res.json({
                msg: "未知错误",
                code: "-1"
            });
        })
})

// 评论信息查询所有
app.get('/comment/search',function (req,res) {
  comment.findAll({
      order: [
          ["id", "DESC"]
      ]
  })
      .then(respons => {
        res.json({
          code: '1',
          msg: '查询成功',
          data: respons
        })
      })
      .catch(errors => {
        console.log(errors);
        res.json({
            msg: "未知错误",
            code: "-1"
        });
      })
})

// 评论信息添加
app.post('/comment/increase',function (req,res) {
  let data = {
    nickName: req.body.nickName,
    avatarUrl: req.body.avatarUrl,
    words: req.body.words,
    openId: req.body.openId
  }
    comment.findOne({ where: {openId: req.body.openId} })
        .then(respons => {
            if(respons){
                res.json({
                    code: '0',
                    msg: '您已经发表过祝福了'
                })
            }else {
                // 插入数据
                comment.create(data)
                    .then(createRes => {
                        res.json({
                            code: '1',
                            msg: '收到您的祝福,谢谢！',
                            data: createRes
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.json({
                            msg: "未知错误",
                            code: "-1"
                        });
                    })
            }
        })
        .catch(errors => {
            console.log(errors);
            res.json({
                msg: "未知错误",
                code: "-1"
            });
        })
})


const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});