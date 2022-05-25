const fs = require("fs");
const cheerio = require("cheerio");
const myReadFile = require("../../fsPackaging/myReadFile");

// filePath传入的目标文件路径数组
module.exports = async function spliderSplitCountryPagesHtml(filePathArrary) {
  for (let i in filePathArrary) {
    let htmlPath = filePathArrary[i].htmlDownloadPath;
    const currentPath = htmlPath.split("index.html")[0];
    const currentCountry = currentPath.split("/local-data/")[1];
    // 判断参数是否正确
    if (htmlPath === undefined) {
      console.log("传入的htmlPath参数为空");
    } else if (!typeof htmlPath === "string") {
      console.log("传入的htmlPath参数类型错误,应当传入String类型");
    }

    // 读取目标网页文件
    if (!fs.existsSync(htmlPath)) {
      console.log("目标网页文件不存在!无法进行解析");
      return;
    }

    // 读取页面文件数据
    const html = await myReadFile(htmlPath);

    //   开始拆分
    let $ = cheerio.load(html);

    //   1.banner
    let topBanner = [];
    topBanner.push($("div.content-country").css("background"));
    topBanner.push($("div.j_slideLists img").attr("src"));
    topBanner.push($("div.country-location img").attr("src"));

    console.log(topBanner);
    topBanner = JSON.stringify(topBanner).toString("utf8");
    const p1 = fs.promises.writeFile(
      `${currentPath}/topBanner.json`,
      topBanner
    );

    //   2.商品展示
    let product = [];
    $("li.prolist-item").each((index, item) => {
      let obj = {};
      obj.src = "https:" + $(item).find("img").attr("data-src");
      obj.title = $(item).find("div.prolist-title a").text();
      product.push(obj);
    });

    product = JSON.stringify(product).toString("utf8");
    const p2 = fs.promises.writeFile(`${currentPath}/product.json`, product);

    Promise.all([p1, p2]).then(() => {
      console.log(`${currentCountry}国家数据抓取完毕！`);
    });
  }
};
