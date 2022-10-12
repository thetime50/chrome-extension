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

var version = "1.0";
// debugger api test
async function debuggerApi_test() {
  // targets = chrome.debugger.getTargets()
  // console.log('targets :>> ', targets);
  let tabs = await new Promise((resolve, reject) => {
    chrome.tabs.query({active: true,currentWindow: true}, resolve)
  })

  await new Promise((resolve, reject) => {
    chrome.debugger.attach({
      tabId: tabs[0].id
    },
    version,
    resolve)
  })

  function onAttach(tabId) {
    console.log('chrome.runtime.lastError :>> ', chrome.runtime.lastError);
    if (chrome.runtime.lastError) {
      alert(chrome.runtime.lastError.message);
      return;
    }

    // chrome.windows.create({ // 插件页面窗口
    //   url: "headers.html?" + tabId,
    //   type: "popup",
    //   width: 800,
    //   height: 600
    // });
  }
  onAttach(tabs[0].id)

  let tabId = tabs[0].id

  chrome.debugger.sendCommand({tabId:tabId}, "Network.enable");
  chrome.debugger.onEvent.addListener(onEvent);
  function onEvent(debuggeeId, message, params) { 
    // 没有触发 没有啥效果
    console.log('debuggeeId, message, params :>> ', debuggeeId, message, params);
  }
  console.log("Network.enable")
}
debuggerApi_test()