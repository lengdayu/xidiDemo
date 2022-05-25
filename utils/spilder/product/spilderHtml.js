const fs = require("fs");
const downloadHtml = require("./downLoad");

//创建目录
if (!fs.existsSync("../../../public")) {
  fs.mkdirSync("../../../public");
  console.log("项目资源目录: \n" + "public文件夹创建完毕!");
}
if (!fs.existsSync("../../../public/product")) {
  fs.mkdirSync("../../../public/product");
  console.log("public目录下: \n" + "> product文件夹创建完毕!");
}
if (!fs.existsSync("../../../public/product/image")) {
  fs.mkdirSync("../../../public/product/image");
  console.log("public/product目录下: \n" + ">> image文件夹创建完毕!");
}
if (!fs.existsSync("../../../public/product/local-data")) {
  fs.mkdirSync("../../../public/product/local-data");
  console.log("public/product: \n" + ">> local-data文件夹创建完毕!");
}

module.exports = function spilderHtml() {
  return new Promise((resolve, reject) => {
    try {
      const baseDownLoadPath = "../../../public/product/local-data/";
      let modeArray = JSON.parse(fs.readFileSync("../productLocalData.json"));
      modeArray = modeArray.map(async (item, index) => {
        await downloadHtml(
          item.url,
          baseDownLoadPath + item.title,
          "index.html"
        );
      });
      Promise.all(modeArray).then(() => {
        console.log("所有分类商品页面下载完成！");
        console.log("所有分类商品页面下载完成！");
        console.log("所有分类商品页面下载完成！");
        console.log("所有分类商品页面下载完成！");
        console.log("所有分类商品页面下载完成！");
        console.log("所有分类商品页面下载完成！");
        console.log("所有分类商品页面下载完成！");
        console.log("所有分类商品页面下载完成！");
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
};
