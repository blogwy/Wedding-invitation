let Sequelize = require('sequelize');
let db = require('./db');
let moment = require('moment');

let bless = db.define('bless',{
  // 表结构映射
  nickName: {
    type: Sequelize.STRING
  },
  avatarUrl: {
    type: Sequelize.STRING
  },
  openId: {
    type: Sequelize.STRING
  },
  create_time: {
	type: Sequelize.DATE,
	get() {
		return moment(this.getDataValue('create_time')).format('YYYY年MM月DD日 HH点mm分');
	}
  },
  update_time: {
	type: Sequelize.DATE,
	get() {
		return moment(this.getDataValue('update_time')).format('YYYY年MM月DD日 HH点mm分');
	}
  }
},{
  // 配置项
  // 启动时间戳
  timestamps: true,
  // 禁止表名修改为复数
  freezeTableName: true,
  createdAt: 'create_time',
  updatedAt: 'update_time'
})

module.exports = bless;

