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

function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    })
}

function pmcall(fun,...args){
  return new Promise((resolve,reject)=>{
    fun(...args,reject)
  })
}

var version = "1.0";
// debugger api test
async function debuggerApi_test() {
  // targets = chrome.debugger.getTargets()
  // console.log('targets :>> ', targets);
  let tabs = await new Promise((resolve, reject) => {
    chrome.tabs.query({active: true,currentWindow: true}, resolve)
  })

  await new Promise((resolve, reject) => {
    chrome.debugger.attach(
      {tabId: tabs[0].id},
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
  await new Promise((resolve, reject) => {
    chrome.debugger.sendCommand({
      tabId: tabId
    }, "Debugger.enable", {}, resolve)
  })
  
  let pmLlist = []
  // 为什么这里打开会有问题
  // 会抓到Log.entryAdded
  pmLlist.push( pmcall(chrome.debugger.sendCommand, {
    tabId: tabId
  }, "Log.enable", {}))

  // 只能抓取用户打印
  pmLlist.push(pmcall(chrome.debugger.sendCommand, {
    tabId: tabId
  }, "Console.enable", {}))

  // 资源和用户请求都有
  pmLlist.push(pmcall(chrome.debugger.sendCommand, {
    tabId: tabId
  }, "Network.enable", {}))
  // 要在"Debugger.enable" 的作用域里才有效 await 或者delay后可能就没效了
  await Promise.allSettled(pmLlist)

  chrome.debugger.onEvent.addListener(onEvent);
  function onEvent(debuggeeId, message, params) {
    console.log('1 :>> ', 1);
    if (['Debugger.scriptParsed'].includes(message)) {
      return
    }
    console.log('debuggeeId :>> ', debuggeeId);
    console.log('message, :>> ', message,);
    console.log('params :>> ', params);
    if(params.request){
      console.log('params.request.url :>> ', params.request.url);
    }
  }
  console.log("Done")
}
debuggerApi_test()