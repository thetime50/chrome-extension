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
    console.log("自定义面板创建成功！"); // 在devtool 的控制台里打印
  }
);

// 创建自定义侧边栏
chrome.devtools.panels.elements.createSidebarPane(
  "Sidebar",
  function (sidebar) {
    sidebar.setPage("devtools/sidebar.html");
  }
);

// 开发者工具侧边栏 显示所有的资源
chrome.devtools.panels.elements.createSidebarPane(
  "All Images",
  function (sidebar) {
    sidebar.setExpression(
      'document.querySelectorAll("img")',  // 执行语句
      "All Images" //字段描述
      );
  }
);


// 开发者侧边栏工具 显示开发者工具中选中元素
var page_getProperties = function () {
  if ($0 instanceof HTMLElement) {
    return {
      tag: $0.tagName.toLocaleLowerCase(),
      class: $0.classList,
      width: window.getComputedStyle($0)["width"],
      height: window.getComputedStyle($0)["height"],
      margin: window.getComputedStyle($0)["margin"],
      padding: window.getComputedStyle($0)["padding"],
      color: window.getComputedStyle($0)["color"],
      fontSize: window.getComputedStyle($0)["fontSize"],
    };
  } else {
    return {};
  }
};

chrome.devtools.panels.elements.createSidebarPane(
  "Select Element",
  function (sidebar) {
    function updateElementProperties() {
      // 在窗体中显示语句执行结果
      // https://developer.chrome.com/docs/extensions/reference/devtools_panels/#method-ExtensionSidebarPane-setExpression
      sidebar.setExpression(
        "(" + page_getProperties.toString() + ")()", // 执行语句
        "select element" // 字段描述
      );
    }
    updateElementProperties();
    chrome.devtools.panels.elements.onSelectionChanged.addListener(
      updateElementProperties
    );
  }
);
