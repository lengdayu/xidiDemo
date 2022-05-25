/**
 * @function 目标网站首页抓取方法
 * @author 冷大宇不会飞 2022/5/17
 * @version 1.0.0
 * @param spliderUrl {String} 目标网站首页地址
 * @return {String} 文件存储路径地址
 */
// 注入依赖
const axios = require("axios").default;
const fs = require("fs");

module.exports = function spilderHtml(spliderUrl) {
  return new Promise((resolve, reject) => {
    // 创建目录结构
    // tips: node.js 18.1.0
    // 在调用 fs.open()、fs.readFile() 或 fs.writeFile() 之前，不要使用 fs.access() 检查文件的可访问性。 这样做会引入竞争条件，因为其他进程可能会在两次调用之间更改文件的状态。 而是，用户代码应直接打开/读取/写入文件，并处理无法访问文件时引发的错误。
    if (!fs.existsSync("../../../public")) {
      fs.mkdirSync("../../../public");
      console.log("项目资源目录: \n" + "public文件夹创建完毕!");
    }
    if (!fs.existsSync("../../../public/homepage")) {
      fs.mkdirSync("../../../public/homepage");
      console.log("public目录下: \n" + "> homepage文件夹创建完毕!");
    }
    if (!fs.existsSync("../../../public/homepage/image")) {
      fs.mkdirSync("../../../public/homepage/image");
      console.log("public/homepage目录下: \n" + ">> image文件夹创建完毕!");
    }
    if (!fs.existsSync("../../../public/homepage/local-data")) {
      fs.mkdirSync("../../../public/homepage/local-data");
      console.log("public/homepage目录下: \n" + ">> local-data文件夹创建完毕!");
    }
    console.log("                   开始抓取目标网站首页!                ");
    console.log("--------------------***************-------------------");
    console.log("--------------------***************-------------------");
    console.log("--------------------***************-------------------");
    console.log("--------------------***************-------------------");
    console.log("--------------------***************-------------------");
    console.log("--------------------***************-------------------");
    console.log("--------------------***************-------------------");
    console.log("--------------------***************-------------------");
    console.log("--------------------***************-------------------");
    try {
      axios.get(spliderUrl).then((res) => {
        //安全判断
        const { status } = res;
        const contentType = res.headers["content-type"];

        let error;
        //判断响应码是否为200，文件类型是否为网页
        if (status !== 200) {
          error = new Error(
            "请求失败,状态码异常 \n" + `Status Code: ${statusCode}`
          );
        } else if (!/^text\/html/.test(contentType)) {
          error = new Error(
            "网页文件内容类型错误 \n" + `当前接收的文件类型是 ${contentType}`
          );
        }
        if (error) {
          console.log("抓取失败 \n" + `${error}`);
        } else {
          //保存HTML内容
          fs.writeFile(
            "../../../public/homepage/local-data/index.html",
            res.data,
            (err) => {
              if (err) {
                console.log("目标网站首页抓取失败!" + err);
              } else {
                console.log(
                  "-------------------目标网站首页抓取完成!-------------------"
                );

                resolve("../../../public/homepage/local-data/index.html");
              }
            }
          );
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};
