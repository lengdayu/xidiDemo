const fs = require("fs");
const downloadFile = require("../downLoad");

module.exports = function downLoadImg() {
  const basePath = "../../../public/countryPages/local-data";
  const downLoadPath = "../../../public/countryPages/image";

  let pathArrary = [];
  let arrary = JSON.parse(fs.readFileSync("../localData.json"));
  arrary.map((item, index) => {
    console.log(index);
    if (!fs.existsSync(downLoadPath + "/" + item.countryName)) {
      fs.mkdirSync(downLoadPath + "/" + item.countryName);
    }
    let obj = {};
    obj.countryName = item.countryName;
    obj.downLoadPath = downLoadPath + "/" + item.countryName;
    obj.readPath = basePath + "/" + item.countryName;
    pathArrary.push(obj);
  });

  pathArrary.map((item, index) => {
    let bannerData = JSON.parse(
      fs.readFileSync(item.readPath + "/topBanner.json")
    );

    for (let i in bannerData) {
      if (i == 0) {
        bannerData[i] = bannerData[i].split("(")[1].split(")")[0];
      }
    }

    let product = JSON.parse(fs.readFileSync(item.readPath + "/product.json"));

    // 1.轮播图图片下载
    bannerData = bannerData.map(async (secItem, secIndex) => {
      await downloadFile(
        secItem,
        item.downLoadPath + "/轮播图",
        `轮播图${secIndex}.jpg`
      );
    });

    // console.log(product);
    // 2.商品图片下载
    product = product.map(async (secItem, secIndex) => {
      await downloadFile(
        secItem.src,
        item.downLoadPath + "/商品图",
        `${secItem.title
          .replace(/\-/g, "")
          .replace(/\*/g, "x")
          .replace(/\//g, "")
          .replace(/\\/g, "")
          .replace(/\"/g, "")}.jpg`
      );
    });
    Promise.all([...bannerData, ...product]);
  });
};
