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