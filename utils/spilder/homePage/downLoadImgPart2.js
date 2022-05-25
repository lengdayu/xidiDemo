const fs = require("fs");
const downloadFile = require("../downLoad");

module.exports = function downLoadImg() {
  return new Promise(async (resolve, reject) => {
    try {
      const basePath = "../../../public/homepage/local-data";
      const downLoadPath = "../../../public/homepage/image";

      //   6.首页商品分类图标图片下载
      let shoppingfClassify = JSON.parse(
        fs.readFileSync(basePath + "/shoppingfClassify.json")
      );
      let shoppingfClassifyArrary = [];
      for (let index in shoppingfClassify) {
        let item = shoppingfClassify[index];
        if (!fs.existsSync(`${downLoadPath}/shoppingfClassify`)) {
          fs.mkdirSync(`${downLoadPath}/shoppingfClassify`);
        }
        if (!fs.existsSync(`${downLoadPath}/shoppingfClassify/${index}`)) {
          fs.mkdirSync(`${downLoadPath}/shoppingfClassify/${index}`);
        }
        item.forEach((secItem, secIndex) => {
          let obj = {};
          obj.topClassfiy = index;
          obj.classfiyName = secItem.classfiyName;
          obj.imgUrl = secItem.imgUrl;
          shoppingfClassifyArrary.push(obj);
        });
      }
      shoppingfClassifyArrary = shoppingfClassifyArrary.map(
        async (item, index) => {
          await downloadFile(
            item.imgUrl,
            `${downLoadPath}/shoppingfClassify/${item.topClassfiy}`,
            `${item.topClassfiy}--${item.classfiyName}图片.jpeg`
          );
        }
      );

      //  7.首页商品模块图片下载
      let sixteenCountryTop = JSON.parse(
        fs.readFileSync(basePath + "/sixteenCountryTop.json")
      );
      if (!fs.existsSync(`${downLoadPath}/sixteenCountryTop`)) {
        fs.mkdirSync(`${downLoadPath}/sixteenCountryTop`);
      }
      let sixteenCountryTopArrary1 = [];
      let sixteenCountryTopArrary2 = [];
      sixteenCountryTop.map((item, index) => {
        if (!fs.existsSync(`${downLoadPath}/sixteenCountryTop/${item.title}`)) {
          fs.mkdirSync(`${downLoadPath}/sixteenCountryTop/${item.title}`);
        }
        sixteenCountryTopArrary1.push({
          title: item.title,
          bannerBig: item.bannerBig,
          children: [],
        });
        for (let i in item.children) {
          let value = item.children[i];
          let obj = {};
          obj.topTitle = item.title;
          obj.title = value.title;
          obj.imgUrl = value.imgUrl;
          sixteenCountryTopArrary2.push(obj);
        }
      });

      sixteenCountryTopArrary1 = sixteenCountryTopArrary1.map(
        async (item, index) => {
          await downloadFile(
            item.bannerBig,
            `${downLoadPath}/sixteenCountryTop`,
            `${item.title}大图.jpeg`
          );
        }
      );

      sixteenCountryTopArrary2 = sixteenCountryTopArrary2.map(
        async (item, index) => {
          await downloadFile(
            item.imgUrl,
            `${downLoadPath}/sixteenCountryTop/${item.topTitle}`,
            `${item.topTitle}--${item.title}小图.jpeg`
          );
        }
      );

      //   8.首页大家都在说图片下载
      let talk = JSON.parse(fs.readFileSync(basePath + "/talk.json"));
      talk = talk.map(async (item, index) => {
        await downloadFile(
          item.imgUrl,
          `${downLoadPath}/talk`,
          `${item.title}大图.jpeg`
        );
      });
      Promise.all([
        ...shoppingfClassifyArrary,
        ...sixteenCountryTopArrary1,
        ...sixteenCountryTopArrary2,
        ...talk,
      ]).then(() => {
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
};
