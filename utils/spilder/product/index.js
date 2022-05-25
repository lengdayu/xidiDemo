const spilderHtml = require("./spilderHtml");
const spliderSplitHtml = require("./spliderSplitHtml");
const downloadImgPart1 = require("./downloadImgPart1");
const downloadImgPart2 = require("./downloadImgPart2");
const downloadImgPart3 = require("./downloadImgPart3");
const downloadImgPart4 = require("./downloadImgPart4");
const downloadImgPart5 = require("./downloadImgPart5");
const downloadImgPart6 = require("./downloadImgPart6");

async function start() {
  await spilderHtml();
  setTimeout(() => {
    spliderSplitHtml();
    console.log("所有商品本地数据写入完毕！");
  }, 2000);
  setTimeout(() => {
    downloadImgPart1();
  }, 20000);
  setTimeout(() => {
    downloadImgPart2();
  }, 40000);
  setTimeout(() => {
    downloadImgPart3();
  }, 60000);

  setTimeout(() => {
    downloadImgPart4();
  }, 80000);
  setTimeout(() => {
    downloadImgPart5();
  }, 100000);
  setTimeout(() => {
    downloadImgPart6();
  }, 120000);
}

start();
