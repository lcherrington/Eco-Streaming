var totalDataSaved = 0
var totalEnergySaved = 0
var setQuality = "720p"
var totalTime = 60

chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
      if (changeInfo.url) {
        chrome.tabs.sendMessage(tabId, {
          from: "background",
          message: 'url updated',
          url: changeInfo.url,
          totalDataSaved: totalDataSaved,
          totalEnergySaved: totalEnergySaved,
          setQuality: setQuality,
          totalTime: totalTime
        })
      }
    }
);

chrome.runtime.onMessage.addListener((msg, sender) => {
  if ((msg.from === 'content') && (msg.message === 'updated data')) {
    totalDataSaved = msg.totalDataSaved
    totalEnergySaved = msg.totalEnergySaved
    setQuality = msg.setQuality
    totalTime = msg.totalTime
  }
  if ((msg.from === 'content') && (msg.message === 'updated quality')) {
    setQuality = msg.setQuality
  }
});