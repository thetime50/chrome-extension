console.log('hello devtool-panel');
let devtoolPanelObj = {
  a: 'hello panel devtool'
}
setTimeout(() => {
  // console.log('devtoolObj :>> ', devtoolObj); // 报错
}, 2)

document.getElementById("check_jquery").addEventListener("click", function () {
  chrome.devtools.inspectedWindow.eval( // 在页面环境执行
    "jQuery.fn.jquery",
    function (result, isException) {
      if (isException) {
        console.log("the page is not using jQuery");
      } else {
        console.log("The page is using jQuery v" + result);
      }
    }
  );
});

document
  .getElementById("get_all_resources")
  .addEventListener("click", function () {
    chrome.devtools.inspectedWindow.getResources(function (resources) {
      console.log(resources);
    });
  });
