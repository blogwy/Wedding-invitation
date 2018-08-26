/*
SQLyog Ultimate v12.2.6 (64 bit)
MySQL - 5.6.40 : Database - love
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`love` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `love`;

/*Table structure for table `bless` */

DROP TABLE IF EXISTS `bless`;

CREATE TABLE `bless` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `nickName` varchar(100) DEFAULT NULL,
  `avatarUrl` varchar(1000) DEFAULT NULL,
  `openId` varchar(256) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

/*Data for the table `bless` */

insert  into `bless`(`id`,`nickName`,`avatarUrl`,`openId`,`create_time`,`update_time`) values 
(1,'测试名字','测试头像','sdcdscsc','2018-08-24 13:56:43','2018-08-24 13:56:49'),
(2,'你好,树先生！','www.bbbbbb.com','111111','2018-08-24 14:22:47','2018-08-24 14:22:47'),
(3,'生化危机1','www.bbbbbb.com','111111','2018-08-24 14:23:56','2018-08-24 14:23:56');

/*Table structure for table `comment` */

DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `nickName` varchar(256) DEFAULT NULL,
  `avatarUrl` varchar(1000) DEFAULT NULL,
  `words` varchar(256) DEFAULT NULL,
  `openId` varchar(256) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

/*Data for the table `comment` */

insert  into `comment`(`id`,`nickName`,`avatarUrl`,`words`,`openId`,`create_time`,`update_time`) values 
(1,'测测','当时','成都所产生的','dsfdsfdsf','2018-08-24 13:58:15','2018-08-24 13:58:18'),
(2,'blogwy','www.baidu.com','你好','dscsdcsdcsdcdc','2018-08-24 14:20:08','2018-08-24 14:20:08'),
(3,'尼玛','www.bbbbbb.com','hello','111111','2018-08-24 14:24:36','2018-08-24 14:24:36');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
