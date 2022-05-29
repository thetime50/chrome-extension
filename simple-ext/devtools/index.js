// devtools.js
// 创建扩展面板
chrome.devtools.panels.create(
  // 扩展面板显示名称
  "se-DevPanel",
  // 扩展面板icon，并不展示
  "devtools/panel-icon-18.png", // 这个是必须参数 要用项目路径
  // 扩展面板页面
  "devtools/panel.html",
  function (panel) {
    console.log("自定义面板创建成功！");
  }
);

// 创建自定义侧边栏
chrome.devtools.panels.elements.createSidebarPane(
  "Sidebar",
  function (sidebar) {
    sidebar.setPage("devtools/sidebar.html");
  }
);
