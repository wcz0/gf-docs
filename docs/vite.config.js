import { SearchPlugin } from "vitepress-plugin-search";
import { defineConfig } from "vite";

// 载入模块
var Segment = require('segment');
// 创建实例
var segment = new Segment();
// 使用默认的识别模块及字典，载入字典文件需要1秒，仅初始化时执行一次即可
segment.useDefault();
// 开始分词
// console.log(segment.doSegment('这是一个基于Node.js的中文分词模块。'));


//default options
var options = {
  // ...flexSearchIndexOptions,
  // previewLength: 62,

  buttonLabel: "搜索",
  placeholder: "搜索文档",
  encode: function (str) {
    return segment.doSegment(str, {simple: true});
  },
  tokenize: "forward", // 解决汉字搜索问题。来源：https://github.com/emersonbottero/vitepress-plugin-search/issues/11

  // encode: false,
  // tokenize: "full"
};

export default defineConfig({
  plugins: [
    SearchPlugin(options)
  ],
});
