const axios = require("axios").default;
const fs = require("fs");
const downloadFile = require("../../downLoad");

module.exports = function downLoadCountryPages() {
  return new Promise((resolve, reject) => {
    try {
      // 创建目录结构
      // tips: node.js 18.1.0
      // 在调用 fs.open()、fs.readFile() 或 fs.writeFile() 之前，不要使用 fs.access() 检查文件的可访问性。 这样做会引入竞争条件，因为其他进程可能会在两次调用之间更改文件的状态。 而是，用户代码应直接打开/读取/写入文件，并处理无法访问文件时引发的错误。
      if (!fs.existsSync("../../../public")) {
        fs.mkdirSync("../../../public");
        console.log("项目资源目录: \n" + "public文件夹创建完毕!");
      }
      if (!fs.existsSync("../../../public/countryPages")) {
        fs.mkdirSync("../../../public/countryPages");
        console.log("public目录下: \n" + "> countryPages文件夹创建完毕!");
      }
      if (!fs.existsSync("../../../public/countryPages/image")) {
        fs.mkdirSync("../../../public/countryPages/image");
        console.log(
          "public/countryPages目录下: \n" + ">> image文件夹创建完毕!"
        );
      }
      if (!fs.existsSync("../../../public/countryPages/local-data")) {
        fs.mkdirSync("../../../public/countryPages/local-data");
        console.log(
          "public/countryPages目录下: \n" + ">> local-data文件夹创建完毕!"
        );
      }

      let num = 0;
      while (num < 10) {
        num++;
        console.log(
          "--------------------开始下载所有国家馆HTML文件!--------------------"
        );
      }

      let countryArrary = JSON.parse(fs.readFileSync("../localData.json"));
      const baseUrl = countryArrary[0].baseUrl;
      const downLoadPath = "../../../public/countryPages/local-data";
      countryArrary.splice(0, 1);

      // 遍历下载国家特色商品页面
      let countryDownloadPathArrary = [];
      countryArrary = countryArrary.map(async (item, index) => {
        countryDownloadPathArrary.push({
          htmlDownloadPath: `${downLoadPath}/${item.countryName}/index.html`,
        });
        await downloadFile(
          `${baseUrl}${item.country}`,
          `${downLoadPath}/${item.countryName}`,
          `index.html`
        );
      });

      Promise.all(countryArrary).then(() => {
        resolve(countryDownloadPathArrary);
      });
    } catch (error) {
      reject(error);
    }
  });
};
