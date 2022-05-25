const fs = require("fs");
const cheerio = require("cheerio");

module.exports = function splitAllHtml() {
  const basePath = "../../../public/product/local-data/";
  let dir = fs.readdirSync(basePath);
  dir.map((item, index) => {
    let currentPath = basePath + item;
    let classfiy = item;

    const html = fs.readFileSync(`${currentPath}/index.html`).toString("utf8");

    //   开始拆分
    let $ = cheerio.load(html);

    let productArrary = [];
    $("div.prolist-box").each((index, item) => {
      let obj = {};
      obj.productImgUrl =
        "https:" + $(item).find("div.prolist-image-list img").attr("data-src");
      obj.title = $(item)
        .find("div.prolist-article a")
        .text()
        .replace(/\*/g, "x")
        .replace(/\"/g, "")
        .replace(/\\|\//g, "-");
      obj.country = $(item).find("span.text").text();
      obj.classfiy = classfiy;
      productArrary.push(obj);
    });
    productArrary = JSON.stringify(productArrary).toString("utf8");
    fs.writeFileSync(`${currentPath}/productArrary.json`, productArrary);
  });
};
