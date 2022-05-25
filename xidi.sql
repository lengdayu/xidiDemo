SET NAMES utf8;
--如果存在数据库，先丢弃
DROP DATABASE IF EXISTS xidi;
--创建数据库喜地
CREATE DATABASE xidi charset=utf8;
--进入喜地数据库
use xidi;
--创建用户表
CREATE TABLE `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `account` varchar(16) DEFAULT NULL COMMENT '用户账户',
  `uname` varchar(16) DEFAULT NULL COMMENT '用户名',
  `upwd` varchar(16) DEFAULT NULL COMMENT '用户密码',
  `sex` int(1) DEFAULT NULL COMMENT '用户性别',
  `avatar` varchar(32) DEFAULT NULL COMMENT '用户头像',
  `phone` varchar(16) DEFAULT NULL COMMENT '用户手机号',
  `email` varchar(32) DEFAULT NULL COMMENT '用户邮箱',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `account` (`account`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COMMENT='用户表';

-- 商品一级分类表
CREATE TABLE `commodityclassify` (
  `commodityclassifyid` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品种类编号',
  `commodityClassifyName` varchar(20) NOT NULL COMMENT '商品种类名称',
  PRIMARY KEY (`commodityclassifyid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品一级分类表';

-- 商品二级分类表
CREATE TABLE `commoditydetailclassity` (
  `detailsId` int(11) NOT NULL AUTO_INCREMENT COMMENT '二级商品种类编号',
  `parentId` int(11) NOT NULL COMMENT '一级商品编号',
  `detailsName` varchar(100) NOT NULL COMMENT '二级商品种类名称',
  PRIMARY KEY (`detailsId`),
  CONSTRAINT `commodityDetailClassity_FK` FOREIGN KEY (`detailsId`) REFERENCES `commodityclassify` (`commodityclassifyid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品二级分类表';

-- 商品产地表
CREATE TABLE `commoditycountry` (
  `countryId` int(11) NOT NULL AUTO_INCREMENT COMMENT '产地ID',
  `countryName` varchar(100) NOT NULL COMMENT '产地名称（国家级）',
  `countryImg` varchar(100) DEFAULT NULL COMMENT '产地图片(国家国旗图片)',
  PRIMARY KEY (`countryId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品产地表';

-- 商品表
CREATE TABLE `commodity` (
  `commodityId` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `commodityName` varchar(100) NOT NULL COMMENT '商品名称',
  `commodityPrice` decimal(10,0) NOT NULL COMMENT '商品价格',
  `commodityCountry` varchar(20) NOT NULL COMMENT '产地',
  `stock` int(11) NOT NULL COMMENT '库存数量',
  `commodityclassifyid` int(11) DEFAULT NULL COMMENT '商品一级分类编号',
  `detailsId` int(11) DEFAULT NULL COMMENT '商品二级分类编号',
  PRIMARY KEY (`commodityId`),
  KEY `commodity_FK_1` (`commodityclassifyid`),
  KEY `commodity_FK_2` (`detailsId`),
  CONSTRAINT `commodity_FK` FOREIGN KEY (`commodityId`) REFERENCES `commoditycountry` (`countryId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `commodity_FK_1` FOREIGN KEY (`commodityclassifyid`) REFERENCES `commodityclassify` (`commodityclassifyid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `commodity_FK_2` FOREIGN KEY (`detailsId`) REFERENCES `commoditydetailclassity` (`detailsId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品表';

-- 全量轮播图表
CREATE TABLE `banner` (
  `bannerId` int(11) NOT NULL AUTO_INCREMENT COMMENT '轮播图编号',
  `bannerImg` varchar(100) NOT NULL COMMENT '轮播图图片地址',
  `commodityId` int(11) NOT NULL COMMENT '轮播图关联商品id',
  PRIMARY KEY (`bannerId`),
  KEY `banner_FK` (`commodityId`),
  CONSTRAINT `banner_FK` FOREIGN KEY (`commodityId`) REFERENCES `commodity` (`commodityId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='全量轮播图表';

-- 首页海外尖货栏目表
CREATE TABLE `homeabroadtopcommodity` (
  `abroadTopId` int(11) NOT NULL AUTO_INCREMENT COMMENT '首页海外尖货栏目-商品编号',
  `commodityId` int(11) NOT NULL COMMENT '商品编号',
  PRIMARY KEY (`abroadTopId`),
  KEY `abroadTopCommodity_FK` (`commodityId`),
  CONSTRAINT `abroadTopCommodity_FK` FOREIGN KEY (`commodityId`) REFERENCES `commodity` (`commodityId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='首页海外尖货栏目表';

-- 首页轮播图表
CREATE TABLE `homebanner` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '首页轮播图编号',
  `bannerId` int(11) NOT NULL COMMENT '管理轮播表中的图片编号',
  PRIMARY KEY (`id`),
  KEY `homebanner_FK` (`bannerId`),
  CONSTRAINT `homebanner_FK` FOREIGN KEY (`bannerId`) REFERENCES `banner` (`bannerId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='首页轮播图表';

-- 首页专题栏目表
CREATE TABLE `homecolumn` (
  `columonId` int(11) NOT NULL AUTO_INCREMENT COMMENT '首页专栏编号',
  `bannerId` int(11) NOT NULL COMMENT '管理轮播表中的图片编号',
  `columonName` varchar(100) NOT NULL COMMENT '首页专栏名称',
  PRIMARY KEY (`columonId`),
  KEY `columnbanner_FK` (`bannerId`),
  CONSTRAINT `columnbanner_FK` FOREIGN KEY (`bannerId`) REFERENCES `banner` (`bannerId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='首页专题栏目表';

-- 首页精选栏目表（关联专题栏目表）
CREATE TABLE `homeselectedtopics` (
  `selectId` int(11) NOT NULL AUTO_INCREMENT COMMENT '首页专题精选',
  `selectImg` varchar(100) DEFAULT NULL COMMENT '专题精选图片路径',
  `selectImgId` int(11) DEFAULT NULL COMMENT '专题精选图片编号',
  `columonId` int(11) DEFAULT NULL COMMENT '关联对应的首页栏目编号',
  PRIMARY KEY (`selectId`),
  KEY `Selectedtopics_FK` (`columonId`),
  CONSTRAINT `Selectedtopics_FK` FOREIGN KEY (`columonId`) REFERENCES `homecolumn` (`columonId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='首页精选栏目表（关联专题栏目表）';