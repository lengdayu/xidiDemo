const fs = require("fs");
const downloadFile = require("../downLoad");

module.exports = function downLoadImg() {
  return new Promise(async (resolve, reject) => {
    try {
      const basePath = "../../../public/homepage/local-data";
      const downLoadPath = "../../../public/homepage/image";

      //   1.轮播图图片下载
      let bannerData = JSON.parse(
        fs.readFileSync(basePath + "/bannerImg.json")
      );
      bannerData = bannerData.map(async (item, index) => {
        await downloadFile(
          item,
          downLoadPath + "/bannerImg",
          `轮播图${index}.jpg`
        );
      });

      // 2.热门厂店图片下载
      let hotFactory = JSON.parse(
        fs.readFileSync(basePath + "/hotFactory.json")
      );
      let hotFactoryTOP = []; //大图
      let hotFactorySecond = []; //小图
      hotFactory.map((item, index) => {
        hotFactoryTOP.push(item.topImgUrl);
        item.item.map((value, index) => {
          hotFactorySecond.push(value[index].imgUrl);
        });
      });

      hotFactoryTOP = hotFactoryTOP.map(async (value, index) => {
        await downloadFile(
          value,
          downLoadPath + "/hotFactory",
          `热门厂店大图${index}.jpg`
        );
      });
      hotFactorySecond = hotFactorySecond.map(async (value, index) => {
        await downloadFile(
          value,
          downLoadPath + "/hotFactory",
          `热门厂店小图${index}.jpg`
        );
      });

      //   3.首页底部链接图片下载
      let iconLink = JSON.parse(fs.readFileSync(basePath + "/iconLink.json"));
      iconLink = iconLink.map(async (item, index) => {
        await downloadFile(
          item.picNormal,
          downLoadPath + "/iconLink",
          `底部链接普通图片${index}.jpg`
        );
        await downloadFile(
          item.picHover,
          downLoadPath + "/iconLink",
          `底部链接悬浮图片${index}.jpg`
        );
      });

      //   4.首页海外尖货图片下载
      let outsideTop = JSON.parse(
        fs.readFileSync(basePath + "/outsideTop.json")
      );
      let outsideTopArrary = [];
      for (let index in outsideTop) {
        outsideTopArrary.push(outsideTop[index]);
      }

      outsideTopArrary = outsideTopArrary.map(async (item, index) => {
        await downloadFile(
          item.imgUrl,
          downLoadPath + "/outsideTop",
          `海外尖货商品图片${index}.jpg`
        );
        await downloadFile(
          item.countryIconUrl,
          downLoadPath + "/outsideTop",
          `海外尖货国家图片${index}.jpg`
        );
      });

      //   5.首页专题精选图片下载
      let recommend = JSON.parse(fs.readFileSync(basePath + "/recommend.json"));
      let recommendArrary = [];
      for (let index in recommend) {
        recommendArrary.push(recommend[index]);
      }

      recommendArrary = recommendArrary.map(async (item, index) => {
        await downloadFile(
          item.imgUrl,
          downLoadPath + "/recommend",
          `专题精选商品图片${index}.jpg`
        );
      });

      Promise.all([
        ...bannerData,
        ...hotFactoryTOP,
        ...hotFactorySecond,
        ...iconLink,
        ...outsideTopArrary,
        ...recommendArrary,
      ]).then(() => {
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
};
