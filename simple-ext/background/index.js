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

// 初始化菜单

chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        id: "1",
        title: "Test Context Menu",
        contexts: ["all"],
    });
        //分割线
    chrome.contextMenus.create({
        id: "0",
        type: "separator",
    });
        // 父级菜单
    chrome.contextMenus.create({
        id: "2",
        title: "Parent Context Menu",
        contexts: ["all"],
    });
    chrome.contextMenus.create({
        id: "21",
        parentId: "2",
        title: "Child Context Menu1",
        contexts: ["all"],
    });
    chrome.contextMenus.create({
        id: "3",
        title: "使用百度搜索：%s",
        contexts: ["selection"], // 选中文本触发的菜单
        // onclick: function (params) {
        //     console.log('params', params)
        //     chrome.tabs.create({
        //         url: "https://www.baidu.com/s?ie=utf-8&wd=" +
        //             encodeURI(params.selectionText),
        //     });
        // },
    });
});
chrome.contextMenus.onClicked.addListener(function(info, tab) { // 唤醒非持久脚本
    console.log('info', info)
    if (info.menuItemId == "3") {
        chrome.tabs.create({
            url: "https://www.baidu.com/s?ie=utf-8&wd=" +
                encodeURI(info.selectionText),
        });
    }
});

// https://stackoverflow.com/questions/26245888/adding-context-menu-item-on-a-non-persistent-background-script
// chrome.runtime.onInstalled.addListener(function() {
//     chrome.contextMenus.create({
//         title: 'My menu',
//         id: 'menu1', // you'll use this in the handler function to identify this context menu item
//         contexts: ['all'],
//     });
// });

// chrome.contextMenus.onClicked.addListener(function(info, tab) {
//     if (info.menuItemId === "menu1") { // here's where you'll need the ID
//         // do something
//     }
// });

// to /simple-ext/content_scripts/index.js
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("background 收到的消息", message);
  sendResponse("我收到了你的消息！");
});


// 监听storage 的变化
chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    );
  }
});

