let changeColor = document.getElementById("changeColor");

changeColor.onclick = function (el) {
    chrome.storage.sync.get("color", function (data) {
        // changeColor.style.backgroundColor = data.color; // 改边popup 按钮颜色

        let { color } = data;
        console.log('color', color)
        // 通过激活状态获取页面
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            console.log('tabs', tabs)
            chrome.tabs.executeScript(tabs[0].id, { // 执行脚本
                code: 'document.body.style.backgroundColor = "' + color + '";',
                // file:
            });
        });

    });
};
