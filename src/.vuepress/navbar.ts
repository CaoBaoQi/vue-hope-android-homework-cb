import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "笔记",
    icon: "/cb.svg",
    prefix: "/cb",
    children: [
      "",
      { text: "开发环境的安装", icon: "/doc.svg", link: "/init-path.md" },
      { text: "Android 基础界面编程", icon: "/doc.svg", link: "/basic.md" },
      { text: "Android 高级界面控件", icon: "/doc.svg", link: "/advanced.md" },
      { text: "列表控件", icon: "/doc.svg", link: "/list.md" }
    ],
  },  {
    text: "项目说明",
    icon: "/project.svg",
    prefix: "/project",
    children: [
      "",
      { text: "框架搭建(登录、注册)", icon: "/doc.svg", link: "/day01.md" },
      { text: "商品分类、详情、购物车、订单", icon: "/doc.svg", link: "/day02.md" },
      { text: "订单界面、个人中心、启动页", icon: "/doc.svg", link: "/day03.md" },
    ],
  },
]);
