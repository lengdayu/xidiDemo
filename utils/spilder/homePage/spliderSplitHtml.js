/**
 * @function 目标网站首页抓取方法
 * @author 冷大宇不会飞 2022/5/18
 * @version 1.0.0
 * @param spliderHtmlFilePath {String} 抓取到的html文件存储路径
 * @return
 */

// 注入依赖
const fs = require("fs");
const cheerio = require("cheerio");

const myReadFile = require("../../fsPackaging/myReadFile");

module.exports = function spliderSplitHtml(spliderHtmlFilePath) {
  // 获取index文件的基础路径
  const currentPath = spliderHtmlFilePath.split("/index.html")[0];
  return new Promise(async (resolve, reject) => {
    try {
      // 判断参数是否正确
      if (spliderHtmlFilePath === undefined) {
        console.log("传入的spliderHtmlFilePath参数为空");
      } else if (!typeof spliderHtmlFilePath === "string") {
        console.log("传入的spliderHtmlFilePath参数类型错误,应当传入String类型");
      }

      // 读取目标网页文件
      if (!fs.existsSync(spliderHtmlFilePath)) {
        console.log("目标网页文件不存在!无法进行解析");
        return;
      }

      const html = await myReadFile(spliderHtmlFilePath);

      //   开始拆分
      let $ = cheerio.load(html);

      //1.首页国家标签栏
      let countryArrary = [];
      $("div.nav-country a").each((index, value) => {
        countryArrary.push(value.children[0].data);
      });
      countryArrary = JSON.stringify(countryArrary).toString("utf8");
      // 写入到index文件的同级目录下
      const p1 = fs.promises.writeFile(
        `${currentPath}/totalCountry.json`,
        countryArrary
      );

      //2.首页商品分类标签栏
      let classify = {};
      $("div.nav-classify-item").each((index, value) => {
        let title = $(value).find("div.nav-classify-title>a").text();
        classify[title] = [];
        $(value)
          .find("div.nav-classify-list-item")
          .each((secIndex, secValue) => {
            let obj = {};
            obj.classfiyName = $(secValue)
              .find("span")
              .text()
              .replace(/\//g, "");
            obj.imgUrl = $(secValue).find("img").attr("data-image");
            classify[title].push(obj);
          });
      });
      classify = JSON.stringify(classify).toString("utf8");
      // 写入到index文件的同级目录下
      const p2 = fs.promises.writeFile(
        `${currentPath}/shoppingfClassify.json`,
        classify
      );

      //3.轮播图
      let banner = [];
      $("div.banner-cont li img").each((index, value) => {
        let url = value.attribs["data-slide-img"];
        if (url === undefined) {
          banner.push(value.attribs["src"]);
          return;
        }
        banner.push(url);
      });
      banner = JSON.stringify(banner).toString("utf8");
      // 写入到index文件的同级目录下
      const p3 = fs.promises.writeFile(`${currentPath}/bannerImg.json`, banner);

      // 4.专题精选
      let recommend = {};
      $("div.ztlist-item div.pic>img").each((index, value) => {
        recommend[index] = { imgUrl: value.attribs["data-src"] };
      });
      $("div.ztlist-item div.text").each((index, value) => {
        recommend[index].title = value.children[0].data;
      });
      recommend = JSON.stringify(recommend).toString("utf8");
      // 写入到index文件的同级目录下
      const p4 = fs.promises.writeFile(
        `${currentPath}/recommend.json`,
        recommend
      );

      //5.海外尖货
      let outsideTop = {};
      $("div.home-new li>div.pic img").each((index, value) => {
        outsideTop[index] = { imgUrl: "https:" + value.attribs["data-src"] };
      });
      $("div.home-new li>div.title>span ").each((index, value) => {
        outsideTop[index].title = value.children[0].data;
      });
      $("div.home-new li>div.desc>a ").each((index, value) => {
        outsideTop[index].desc = value.children[0].data;
      });
      $("div.home-new li>div.flag>img ").each((index, value) => {
        outsideTop[index].countryIconUrl = "https:" + value.attribs["data-src"];
      });
      $("div.home-new li>div.flag>span ").each((index, value) => {
        outsideTop[index].country = value.children[0].data;
      });
      outsideTop = JSON.stringify(outsideTop).toString("utf8");
      // 写入到index文件的同级目录下
      const p5 = fs.promises.writeFile(
        `${currentPath}/outsideTop.json`,
        outsideTop
      );

      //6.16国特品
      let sixteenCountryTop = [];
      $("div.content>div.home-module").each((index, value) => {
        // 第三个起到倒数第二个结束，都是相同的结构可以遍历获取
        if (index > 1 && index < 9) {
          let obj = {};
          obj.title = $(value).find("h2.title-main").text();
          obj.desc = $(value).find("div.title-assist").text();
          obj.bannerBig = $(value)
            .find("div.home-module-banner-big img")
            .attr("data-src");
          obj.children = {};
          $(value)
            .find("li.homepro-item")
            .each((secIndex, secValue) => {
              let item = {};
              item.imgUrl = "https:" + $(secValue).find("img").attr("data-src");
              item.title = $(secValue).find("div.title>span").text();
              item.desc = $(secValue).find("div.desc>a").text();
              obj.children[secIndex] = item;
            });
          sixteenCountryTop.push(obj);
        }
      });
      sixteenCountryTop = JSON.stringify(sixteenCountryTop).toString("utf8");
      // 写入到index文件的同级目录下
      const p6 = fs.promises.writeFile(
        `${currentPath}/sixteenCountryTop.json`,
        sixteenCountryTop
      );

      //7.大家都在说
      let talk = [];
      $("ul.homehot-box>li").each((index, value) => {
        let obj = {};
        obj.imgUrl = "https:" + $(value).find("div.pic>img").attr("data-src");
        obj.title = $(value).find("div.title").text();
        obj.userImg = $(value).find("div.comment-user>img").attr("data-src");
        obj.userName = $(value).find("span.name").text();
        obj.comment = $(value).find("div.comment-cont").text();
        obj.commentDate = $(value).find("div.comment-date").text();
        talk.push(obj);
      });
      talk = JSON.stringify(talk).toString("utf8");
      // 写入到index文件的同级目录下
      const p7 = fs.promises.writeFile(`${currentPath}/talk.json`, talk);

      //8.热门厂店
      let hotFactory = [];
      $("div.factory-wrap div.factory-item").each((index, value) => {
        let pic = {};
        pic.topImgUrl = $(value).find("a>img").attr("data-src");
        pic.item = [];
        $(value)
          .find("li.images-item")
          .each((secIndex, secValue) => {
            let item = {};
            item[secIndex] = {
              imgUrl: "https:" + $(secValue).find("img").attr("data-src"),
            };
            pic.item.push(item);
          });
        hotFactory.push(pic);
      });
      hotFactory = JSON.stringify(hotFactory).toString("utf8");
      // 写入到index文件的同级目录下
      const p8 = fs.promises.writeFile(
        `${currentPath}/hotFactory.json`,
        hotFactory
      );

      // 9.首页底部图标链接
      let iconLink = [];
      $("li.stroll-item>a").each((index, value) => {
        let obj = {};
        obj.title = $(value).find("div.stroll-title").text();
        obj.picNormal =
          "https:" + $(value).find("div.pic-normal>img").attr("data-src");
        obj.picHover =
          "https:" + $(value).find("div.pic-hover>img").attr("data-src");
        iconLink.push(obj);
      });
      iconLink = JSON.stringify(iconLink).toString("utf8");
      // 写入到index文件的同级目录下
      const p9 = fs.promises.writeFile(
        `${currentPath}/iconLink.json`,
        iconLink
      );

      Promise.all([p1, p2, p3, p4, p5, p6, p7, p8, p9]).then(() => {
        console.log("----------首页国家标签栏---------数据写入完毕!----------");
        console.log("----------首页商品分类标签栏-----数据写入完毕!----------");
        console.log("----------首页轮播图图片路径-----数据写入完毕!----------");
        console.log("----------首页专题精选----------数据写入完毕!----------");
        console.log("----------首页海外尖货----------数据写入完毕!----------");
        console.log("----------首页16国特品----------数据写入完毕!----------");
        console.log("----------首页大家都在说---------数据写入完毕!----------");
        console.log("----------首页热门厂店-----------数据写入完毕!----------");
        console.log("----------首页底部图标链接-------数据写入完毕!----------");
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
};
