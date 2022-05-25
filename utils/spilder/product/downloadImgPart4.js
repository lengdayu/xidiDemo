const fs = require("fs");
const downLoad = require("./downLoad");

module.exports = function downloadImg() {
  return new Promise((resolve, reject) => {
    try {
      const basePath = "../../../public/product/local-data/";
      const baseDownLoadPath = "../../../public/product/image/";

      let pathArray = fs.readdirSync(basePath);

      pathArray.map(async (item, index) => {
        if (index >= 22 && index < 28) {
          let array = JSON.parse(
            fs.readFileSync(basePath + item + "/productArrary.json")
          );
          array = array.map(async (item, index) => {
            await downLoad(
              item.productImgUrl,
              baseDownLoadPath + item.classfiy,
              item.title + ".jpg"
            );
            Promise.all(array).then(() => {
              console.log(
                "商品种类： ----" + item.classfiy + "---- 商品图片下载完毕!"
              );
            });
          });
        }
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
