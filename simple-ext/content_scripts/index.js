// 以直接访问以下chrome的API：

// i18n
// storage
// runtime:
//     connect
//     getManifest
//     getURL
//     id
//     onConnect
//     onMessage
//     sendMessage

// console.log('chrome', chrome)

// chrome.tabs.executeScript(chrome.runtime.id, { //没有这个执行权限 需要在background.js中监听事件注入执行
//   file: "./page.js",
// });

function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    })
}

// async function mian() {
    // await delay(1000)

    let searchEl = document.querySelector('#kw')
    console.dir( searchEl)
    if(searchEl.value){
        alert('搜索文字 '+searchEl.value)
    }
// }
// mian()

// to /simple-ext/background/index.js
chrome.runtime.sendMessage(
  { greeting: "我是content-script呀，我主动发消息给后台！" },
  function (response) {
    console.log("收到来自后台的回复：" + response);
  }
);

console.log('hello content script')
// 接收 background 的消息
chrome.runtime.onMessage.addListener(
  function(
      request, 
      sender,  // 不同的发送方
      sendResponse
    ) {
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");
    if (request.greeting.indexOf("hello") !== -1){
      sendResponse({farewell: "goodbye"});
    }else{
      sendResponse({farewell: "bad"});
    }
  });
