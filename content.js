var currentUrl = ""
var serviceProvider = ""
var setQuality = ""
var qualityBefore = ""
var totalDataSaved = 0
var totalEnergySaved = 0
var currentVideoDataSaved = 0
var currentVideoEnergySaved = 0
var currentVideoName = ""
var frameRate = 60
var totalTime = 0

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if((msg.from === 'popup') && (msg.subject === 'url')) {
    var info = {
      totalDataSaved: totalDataSaved,
      totalEnergySaved: totalEnergySaved,
      currentVideoDataSaved: currentVideoDataSaved,
      currentVideoEnergySaved: currentVideoEnergySaved,
      currentVideoName: currentVideoName,
      setQuality: setQuality,
    }
    response(info)
  }
  if((msg.from === 'popup') && (msg.subject === 'quality updated')){
    setQuality = msg.quality
    chrome.runtime.sendMessage({
      from: "content",
      message: "updated quality",
      setQuality: setQuality,
    })
    var qualityInfo = {
      setQuality: setQuality,
    }
    response(qualityInfo)
  }
  if((msg.from === 'background') && (msg.message === 'url updated')){
    if(currentUrl != window.location.href){
      currentUrl = window.location.href
      let domain = (new URL(currentUrl));
      serviceProvider = domain.hostname;
      totalDataSaved = msg.totalDataSaved
      totalEnergySaved = msg.totalEnergySaved
      setQuality = msg.setQuality
      totalTime = msg.totalTime
      updateDetails()
    }
  }
});

const delay = ms => new Promise(res => setTimeout(res, ms));

async function updateDetails(){
  if(document.readyState === 'complete' && document.getElementsByClassName('ad-showing ad-interrupting').length == 0){
    getAndSetQuality()
    currentVideoName = getCurrentVideoName()
    var currentVideoDataAfter = getCurrentVideoDataSaved(setQuality, frameRate)
    var currentVideoDataBefore = getCurrentVideoDataSaved(qualityBefore, frameRate)
    currentVideoDataSaved = Math.round(currentVideoDataBefore - currentVideoDataAfter)
    if(currentVideoDataSaved < 0) currentVideoDataSaved = 0
    if(currentVideoDataSaved > 0) totalDataSaved = totalDataSaved + currentVideoDataSaved
    var currentVideoEnergyAfter = getCurrentVideoEnergySaved(setQuality)
    var currentVideoEnergyBefore = getCurrentVideoEnergySaved(qualityBefore)
    currentVideoEnergySaved = Math.round(currentVideoEnergyBefore - currentVideoEnergyAfter)
    if(currentVideoEnergySaved < 0) currentVideoEnergySaved = 0
    if(currentVideoEnergySaved > 0) totalEnergySaved = totalEnergySaved + currentVideoEnergySaved
    totalTime = totalTime + getVideoDuration()
    chrome.runtime.sendMessage({
      from: "content",
      message: "updated data",
      totalDataSaved: totalDataSaved,
      totalEnergySaved: totalEnergySaved,
      setQuality: setQuality,
      totalTime: totalTime
    })
  }else{
    await delay(5000)
    updateDetails()
  }
}


function getCurrentVideoName(){
  return document.getElementsByClassName("title style-scope ytd-video-primary-info-renderer")[0].innerText
}

function getCurrentVideoDataSaved(videoQuality, videoFrameRate){
  var videoDuration = getVideoDuration()
 
  var videoQuality144_60 = 150 / 60 / 60
  var videoQuality240_60 = 300 / 60 / 60
  var videoQuality360_60 = 450 / 60 / 60
  var videoQuality480_60 = 562.5 / 60 / 60 //https://inews.co.uk/news/technology/data-netflix-youtube-spotify-how-much-streaming-video-music-mobile-internet-allowance-388089
  var videoQuality720_60 = 1860 / 60 / 60 // MB/s
  var videoQuality1080_60 = 3040 / 60 / 60
  var videoQuality1440_60 = 3600 / 60 / 60
  var videoQuality4k_60 = 15980 / 60 / 60

  var MBsTransferred = 0
  if(videoQuality === "144p" && videoFrameRate === 60){
    MBsTransferred = videoDuration * videoQuality144_60
  }else if(videoQuality === "240p" && videoFrameRate === 60){
    MBsTransferred = videoDuration * videoQuality240_60
  }else if(videoQuality === "360p" && videoFrameRate === 60){
      MBsTransferred = videoDuration * videoQuality360_60
  }else if(videoQuality === "480p" && videoFrameRate === 60){
    MBsTransferred = videoDuration * videoQuality480_60
  }else if(videoQuality === "720p" && videoFrameRate === 60){
      MBsTransferred = videoDuration * videoQuality720_60
  }else if(videoQuality === "1080p" && videoFrameRate === 60){
      MBsTransferred = videoDuration * videoQuality1080_60
  }else if(videoQuality === "1440p" && videoFrameRate === 60){
    MBsTransferred = videoDuration * videoQuality1440_60
  }else if(videoQuality === "4k" && videoFrameRate === 60){
      MBsTransferred = videoDuration * videoQuality4k_60
  }else{
      MBsTransferred = 0
  }

  return Math.round(MBsTransferred)
}

function getVideoDuration(){
  var videoDuration = document.getElementsByClassName('ytp-time-duration')[0].innerHTML
  videoDuration = videoDuration.split(':')
  var videoFullLength = videoDuration[0] * 60 + videoDuration[1]
  return videoFullLength
}

function getCurrentVideoEnergySaved(quality){
  var videoDuration = getVideoDuration()
  var energyMultiplier = 400 * 0.1 / 60 / 60 //seconds

  var energySaved = 0
  if(quality === "144p"){
    energySaved = energyMultiplier * videoDuration * (144/1080)
  }else if(quality === "240p"){
    energySaved = energyMultiplier * videoDuration * (240/1080)
  }else if(quality === "360p"){
    energySaved = energyMultiplier * videoDuration * (360/1080)
  }else if(quality === "480p"){
    energySaved = energyMultiplier * videoDuration * (480/1080)
  }else if(quality === "720p"){
    energySaved = energyMultiplier * videoDuration * (720/1080)
  }else if(quality === "1080p"){
    energySaved = energyMultiplier * videoDuration * (1080/1080)
  }else if(quality === "1440p"){
    energySaved = energyMultiplier * videoDuration * (1440/1080)
  }else if(quality === "4k"){
    energySaved = energyMultiplier * videoDuration * (4000/1080)
  }else{
      energySaved = 0
  }

  return Math.round(energySaved)
}

async function getAndSetQuality(){
  document.querySelector('.ytp-button.ytp-settings-button').click();
  await delay(2000);
  qualityBefore = document.getElementsByClassName('ytp-menu-label-secondary')[0].innerText
  qualityBefore = qualityBefore.substring(0, qualityBefore.indexOf('p')) + 'p'
  document.querySelector('.ytp-menu-label-secondary').click();
  var allQualities = document.getElementsByClassName('ytp-menuitem-label')
  if(setQuality == "144p"){
    for(var i = 0; i < allQualities.length; i++){
      if(allQualities[i].innerText.includes("144p")) document.getElementsByClassName('ytp-menuitem-label')[i].click()
    }
  }else if(setQuality == "240p"){
    for(var i = 0; i < allQualities.length; i++){
      if(allQualities[i].innerText.includes("240p")) document.getElementsByClassName('ytp-menuitem-label')[i].click()
    }
  }else if(setQuality == "360p"){
    for(var i = 0; i < allQualities.length; i++){
      if(allQualities[i].innerText.includes("360p")) document.getElementsByClassName('ytp-menuitem-label')[i].click()
    }
  }else if(setQuality == "480p"){
    for(var i = 0; i < allQualities.length; i++){
      if(allQualities[i].innerText.includes("480p")) document.getElementsByClassName('ytp-menuitem-label')[i].click()
    }
  }else if(setQuality == "720p"){
    for(var i = 0; i < allQualities.length; i++){
      if(allQualities[i].innerText.includes("720p")) document.getElementsByClassName('ytp-menuitem-label')[i].click()
    }
  }else if(setQuality == "1080p"){
    for(var i = 0; i < allQualities.length; i++){
      if(allQualities[i].innerText.includes("1080p")) document.getElementsByClassName('ytp-menuitem-label')[i].click()
    }
  }else if(setQuality == "1440p"){
    for(var i = 0; i < allQualities.length; i++){
      if(allQualities[i].innerText.includes("1440p")) document.getElementsByClassName('ytp-menuitem-label')[i].click()
    }
  }else{
    for(var i = 0; i < allQualities.length; i++){
      if(allQualities[i].innerText.includes("4k")) document.getElementsByClassName('ytp-menuitem-label')[i].click()
    }
  }
}