const spliderCountryPagesHtml = require("./spliderCountryPagesHtml");
const spliderSplitCountryPagesHtml = require("./spliderSplitCountryPagesHtml");
const downLoadImg = require("./downLoadImg");

async function spliderCountryPages() {
  const basePath = await spliderCountryPagesHtml();
  let num = 0;
  while (num < 10) {
    num++;
    console.log(
      "--------------------所有国家馆HTML文件下载完成!--------------------"
    );
  }
  setTimeout(() => {
    spliderSplitCountryPagesHtml(basePath);
  }, 1000);

  setTimeout(() => {
    downLoadImg();
  }, 3000);
}

spliderCountryPages();
