/**
 * @function fs.readFile方法使用Promise二次封装
 * @author 冷大宇不会飞 2022/5/18
 * @version 1.0.0
 * @param path {String} 文件存储路径
 * @return {String} 文件内容
 */

const fs = require("fs");

module.exports = function myReadFile(path) {
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(path, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          resolve(data.toString("utf8"));
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};
