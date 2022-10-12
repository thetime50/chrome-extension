console.log('hello debugger api', );

function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  })
}

function pmcall(fun, ...args) {
  return new Promise((resolve, reject) => {
    fun(...args, resolve)
  })
}

let idSet = new Set()

var version = "1.0";
// debugger api test
async function openDebug(tabId) {
  console.log('openDebug :>> ', tabId);
  // targets = chrome.debugger.getTargets()
  // console.log('targets :>> ', targets);

  await new Promise((resolve, reject) => {
    chrome.debugger.attach({
        tabId: tabId
      },
      version,
      resolve)
  })

  function onAttach(tabId) {
    console.log('chrome.runtime.lastError :>> ', chrome.runtime.lastError);
    idSet.add(tabId)
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
  onAttach(tabId)

  await pmcall(chrome.debugger.sendCommand,{
      tabId: tabId
    }, "Debugger.enable", {})

  let pmLlist = []
  // 为什么这里打开会有问题
  // 会抓到Log.entryAdded
  pmLlist.push(pmcall(chrome.debugger.sendCommand, {
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
    console.log('message, :>> ', message, );
    console.log('params :>> ', params);
    if (params.request) {
      console.log('params.request.url :>> ', params.request.url);
    }
  }
  console.log("Done")
}
async function closeDebug(tabId){
  console.log('closeDebug :>> ', tabId);
  await pmcall(chrome.debugger.sendCommand, {
    tabId: tabId
  }, "Debugger.disable", {})
  await pmcall(chrome.debugger.detach, {
    tabId: tabId
  })

  idSet.delete(tabId)
}
async function debuggerApi_test(){
  let tabs = await pmcall(chrome.tabs.query,{
      active: true,
      currentWindow: true
    })
  await openDebug(tabs[0].id)
}
// debuggerApi_test()

export async function getDebug(tabId) {
  // let dgbtarget = null
  // try{
  //   dgbtarget = await pmcall(chrome.debugger.getTargets)
  //   console.log('dgbtarget :>> ', dgbtarget);
  // }catch(e){
  //   console.log(`debugger.getTargets(function callback): No matching signature ${tabId}`)
  // }
  // return dgbtarget
  return idSet.has(tabId)
}

export async function switchDebug(tabId){
  let res = false
  let dgbtarget = await getDebug(tabId)
  if (dgbtarget){
    try {
      closeDebug(tabId)
    } catch (error) {
      throw error
    }finally{
      res = false
    }
  }else{
    try {
    openDebug(tabId)
    } catch (error) {
      throw error
    }finally{
    res = true
    }
  }
  return res
}


