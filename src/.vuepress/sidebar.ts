import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "笔记",
      icon: "/cb.svg",
      prefix: "cb/",
      link: "cb/",
      children: "structure",
    },    {
      text: "项目说明",
      icon: "/project.svg",
      prefix: "project/",
      link: "project/",
      children: "structure",
    },
  ],
});
