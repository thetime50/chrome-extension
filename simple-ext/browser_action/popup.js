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
            
            // chrome.scripting.executeScript({ // scripting 是 undefinde
            //         func:()=>{
            //             console.log('hello hello', )
            //         }
            //     },
            //     () => {
                   
            //     }
            // );
        });

    });
};


function funCreate(elId,title,btnText,cb){
    let el = document.getElementById(elId);
    if(!el){
        let titleEl = document.createElement('h2')
        titleEl.innerText = title
        document.body.appendChild(titleEl)
        el = document.createElement('div')
        el.id = elId
        document.body.appendChild(el)
    }
    let button = document.createElement('button')
    button.innerText  = btnText
    button.addEventListener("click", cb)
    el.appendChild(button)
}

// 在 popup 页面中调用 background 的方法
function callBgMethInit(){
    let cnt = 0
    funCreate('callBgMeth','调用 background 方法','call background method',async function () {
        var bg = chrome.extension.getBackgroundPage();
        bg.alertInfo('hello background')
    });
}

// 在 background 页面中调用 popup 的方法
function insertCtn(num){
    const elId = 'insertCtn'
    let el = document.getElementById(elId);
    if(!el){
        el = document.createElement('h2')
        el.id = elId
        document.body.appendChild(el)
    }
    el.innerText = '来自 background 的数字 '+num
}

function sendMessageToContentScriptInit(){

    function sendMessageToContentScript() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            console.log('tabs[0]', tabs[0])
            if(!tabs.length){
                console.log('no tabs')
                return
            }
            chrome.tabs.sendMessage(
                tabs[0].id,
                { greeting: "hello，我是popup，主动发消息给content-script" },
                function (response) {
                    console.log('response', response)
                    console.log(response.farewell);
                }
            );
        });
    }
    funCreate('sendContent','发送消息到 ContentScript','send ContentScript message',sendMessageToContentScript)
}
        
callBgMethInit()
sendMessageToContentScriptInit()


