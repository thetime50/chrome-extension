let page = document.getElementById("buttonDiv");
const kButtonColors = ["#ccffcc", "#ffcccc", "#ffffaa", "#bbbbff"];

function constructOptions(kButtonColors) {
    for (let item of kButtonColors) {
        let button = document.createElement("button");
        button.style.backgroundColor = item;
        button.addEventListener("click", function () {
            chrome.storage.sync.set({
                color: item
            }, function () {
                console.log("color is " + item);
            });
        });
        page.appendChild(button);
    }
}

function popupInit(){
    let el = document.getElementById("popupBtn");
    let button = document.createElement("button");
    button.innerText  = "Popup";
    button.addEventListener("click", async function () {
        let tabs = await new Promise ((resolve, reject) => {
            chrome.tabs.query({ active: true, currentWindow: true },resolve)
        })
        if(!tabs.length ){
            throw new Error('no tabs')
        }
        console.log('tabs', tabs)
        let popup = await new Promise((resolve, reject) => {
            chrome.browserAction,chrome.browserAction.getPopup({tabId:tabs[0].id}, resolve)
        })
        let desPopup = ''
        if(/new/.test(popup)){
            desPopup = '/browser_action/popup.html'
        }else{
            desPopup = '/browser_action/new-popup.html'
        }
        console.log('popup, desPopup', popup, desPopup)
        chrome.browserAction.setPopup({popup: desPopup});
    });
    el.appendChild(button);

}

// 手动切换title
function titleInit(){
    let el = document.getElementById("titleBtn");
    let cnt = 0
    let button = document.createElement("button");
    console.log('el, button', el, button)
    button.innerText  = "set title";
    button.addEventListener("click", async function () {
        let title = 'title '
        try{
            let tabs = await new Promise((resolve, reject) => {
                chrome.tabs.query({ active: true, currentWindow: true },resolve)
            })
            console.log('tabs', tabs) // 这个返回值里没有tabId 不是这个tab??
            if(!tabs.length ){
                throw new Error('no tabs')
            }
            let res = await new Promise((resolve, reject) => {
                // https://developer.chrome.com/docs/extensions/reference/browserAction/#method-getTitle
                // chrome.browserAction.getTitle({} /* tabs[0] */, resolve) // 可以执行
                chrome.browserAction.getTitle({ // 有多余参数检查
                    tabId:tabs[0].id,
                }, resolve) // 
            })
            title = res
        }catch(e){
            console.error( e)
        }
        title = title.replace(/( \d*)?$/, ' '+(cnt++).toString())
        console.log('title', title)
        chrome.browserAction.setTitle({ title: title });
    });
    el.appendChild(button);

}

constructOptions(kButtonColors);
popupInit()
titleInit()