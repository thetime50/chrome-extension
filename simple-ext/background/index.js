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
    alarmsTest()
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
