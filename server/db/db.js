const Sequelize = require('sequelize');

// 依次为数据库名 数据库用户名 数据库密码 ip 端口
const sequelize = new Sequelize('', '', '', {
  host: '',
  dialect: 'mysql',
  port: '',
  operatorsAliases: false,
  timezone: '+08:00',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize
    .authenticate()
    .then(() => {
      console.log('love数据库连接成功');
    })
    .catch(err => {
      console.error('数据库连接失败：', err);
    });

module.exports = sequelize;