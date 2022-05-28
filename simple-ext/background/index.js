// background.js

function alarmsTest() {
    let timeout = 1000 * 60 * 0.05; // 3 minutes in milliseconds
    // persistent false 没有影响吗
    window.setTimeout(function () {
        console.log('Hello,simple-ext setTimeout')
        alert('Hello,simple-ext setTimeout');
    }, timeout);

    if (chrome.alarms){
        chrome.alarms.create({
            delayInMinutes: 0.05
        })

        chrome.alarms.onAlarm.addListener(function () {
            console.log("Hello,simple-ext alarms")
            alert("Hello,simple-ext alarms")
        });
    }else{
        console.log('chrome.alarms', chrome.alarms)
    }
}

chrome.runtime.onInstalled.addListener(function () {
    console.log("插件已被安装2");
    // alarmsTest()
});

chrome.runtime.onInstalled.addListener(function () {
    // storage中设置值
    // console.log('chrome', chrome)
    chrome.storage.sync.set({
        color: "#aaffaa"
    }, function () {
        console.log("storage init color value");
    });
    // 为特定的网址显示图标
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostEquals: "baidu.com"
                    },
                }),
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()],
        }, ]);
    });
});

// 手动切换title
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/browserAction/getTitle#examples
function toggleTitle(title) {
  if (title == "this") {
    chrome.browserAction.setTitle({title: "that"});
  } else {
    chrome.browserAction.setTitle({title: "this"});
  }
}
// https://developer.chrome.com/docs/extensions/reference/browserAction/#event-onClicked
// 有弹窗弹出不会触发 要把 browser_action.default_popup 去掉才会触发
chrome.browserAction.onClicked.addListener(() => { 
  console.log('toggleTitle')
  let gettingTitle = chrome.browserAction.getTitle({}); // 这里会失败 估计要拿一下啊tab // 为什么这是 Promise??
  gettingTitle.then(toggleTitle);
});
