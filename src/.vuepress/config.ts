import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "安卓笔记",
  description: "曹蓓-2309312103",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
