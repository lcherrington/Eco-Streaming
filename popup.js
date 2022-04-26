var qualitySet = ""
var totalEnergySaved = 0
var totalTime = 60
var emissionAddition = 0
var totalEmissionAddition = 0
var emissionAdditionEnergy = 0
var totalEmissionAdditionEnergy = 0
var isGrams = true

// PopUp Set Up
document.getElementById('popup').style.height = "350px"
document.getElementById('eco').style.borderBottom = '3px solid #30694B'
document.getElementById('customQuality').style.visibility = 'hidden'
document.getElementById('fullBreakdownData').style.visibility = 'hidden'
document.getElementById('homePage').style.visibility = "visible"
document.getElementById('home').style.borderBottom = "3px solid #f8f8ff"
document.getElementById('usagePage').style.visibility = "hidden"
document.getElementById('usagePage').style.height = "0px"
document.getElementById('informationPage').style.visibility = "hidden"
document.getElementById('informationPage').style.height = "0px"
document.getElementById('heartPage').style.visibility = "hidden"
document.getElementById('heartPage').style.height = "0px"

if(document.getElementById('customQuality').style.visibility == 'hidden'){
    document.getElementById('customQuality').style.height = '20px'
}

if(document.getElementById('fullBreakdownData').style.visibility == 'hidden'){
    document.getElementById('fullBreakdownData').style.height = '0px'
}

if(totalEnergySaved < 167000){
    document.getElementById('trees').style.visibility = 'hidden'
    document.getElementById('trees').style.height = "0px"
}else{
    document.getElementById('popup').style.height = "390px"
    document.getElementById('badges').style.marginTop = "0px"
}

if(document.getElementById('5kgSaved').style.visibility == 'hidden'){
    document.getElementById('badges').style.height = '0px'
}

//listeners for quality changes
document.getElementById('eco').addEventListener("click", function(){
    qualitySet = "720p"
    document.getElementById('eco').style.borderBottom = '3px solid #30694B'
    document.getElementById('minimal').style.borderBottom = 'transparent'
    document.getElementById('custom').style.borderBottom = 'transparent'
    document.getElementById('customQuality').style.height = '20px'
    document.getElementById('popup').style.height = "350px"
    document.getElementById('customQuality').style.visibility = 'hidden'
    document.getElementById('setQuality720p').style.borderBottom = '3px solid #30694B'
    document.getElementById('setQuality144p').style.borderBottom = 'transparent'
    document.getElementById('setQuality240p').style.borderBottom = 'transparent'
    document.getElementById('setQuality360p').style.borderBottom = 'transparent'
    document.getElementById('setQuality480p').style.borderBottom = 'transparent'
    document.getElementById('setQuality1080p').style.borderBottom = 'transparent'
    if(document.getElementById('fullBreakdownData').style.visibility == 'visible'){
        document.getElementById('popup').style.height = "450px"
    }else{
        document.getElementById('popup').style.height = "350px"
    }
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'quality updated', quality: qualitySet},
        setQualityInfo
        );
    });
})

document.getElementById('minimal').addEventListener("click", function(){
    qualitySet = "144p"
    document.getElementById('customQuality').style.height = '20px'
    document.getElementById('popup').style.height = "350px"
    document.getElementById('customQuality').style.visibility = 'hidden'
    document.getElementById('eco').style.borderBottom = 'transparent'
    document.getElementById('minimal').style.borderBottom = '3px solid #30694B'
    document.getElementById('custom').style.borderBottom = 'transparent'
    document.getElementById('setQuality144p').style.borderBottom = '3px solid #30694B'
    document.getElementById('setQuality240p').style.borderBottom = 'transparent'
    document.getElementById('setQuality360p').style.borderBottom = 'transparent'
    document.getElementById('setQuality480p').style.borderBottom = 'transparent'
    document.getElementById('setQuality720p').style.borderBottom = 'transparent'
    document.getElementById('setQuality1080p').style.borderBottom = 'transparent'
    if(document.getElementById('fullBreakdownData').style.visibility == 'visible'){
        document.getElementById('popup').style.height = "450px"
    }else{
        document.getElementById('popup').style.height = "350px"
    }
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'quality updated', quality: qualitySet},
        setQualityInfo
        );
    });
})

document.getElementById('custom').addEventListener("click", function(){
    document.getElementById('customQuality').style.visibility = "visible"
    if(document.getElementById('fullBreakdownData').style.visibility == 'visible'){
        document.getElementById('popup').style.height = "470px"
    }else{
        document.getElementById('popup').style.height = "380px"
    }
    document.getElementById('customQuality').style.height = 'auto'
    document.getElementById('eco').style.borderBottom = 'transparent'
    document.getElementById('minimal').style.borderBottom = 'transparent'
    document.getElementById('custom').style.borderBottom = '3px solid #30694B'
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'quality updated', quality: qualitySet},
        setQualityInfo
        );
    });
})

// Extra information on units on hover
document.getElementById("mbs").addEventListener("mouseover", function(){
    document.getElementById("mbsExplained").style.fontSize = "12px"
    document.getElementById("mbsExplained").textContent = "Mega Bytes per second. The number of Bytes transfered each second.";
});

document.getElementById("mbs").addEventListener("mouseout", function(){
    document.getElementById("mbsExplained").textContent = "";
});

document.getElementById("gco2").addEventListener("mouseover", function(){
    document.getElementById("gco2Explained").style.fontSize = "12px"
    if(isGrams){
        document.getElementById("gco2Explained").textContent = "This is the amount of CO2 saved. Measured in grams.";
    }else{
        document.getElementById("gco2Explained").textContent = "This is the amount of CO2 saved. Measured in Kilograms.";
    }
});

document.getElementById("gco2").addEventListener("mouseout", function(){
    document.getElementById("gco2Explained").textContent = "";
});

// Sets updated values
const setInfo = info => {
    if(info == undefined){
        totalTime = 60
        document.getElementById('totalTimeSpent').textContent = secondsToHms(totalTime)
        setUpGraph()
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
        });
    }else{
        totalTime = info.totalTime
        qualitySet = info.setQuality
        totalEnergySaved = info.totalEnergySaved
        if(totalEnergySaved > 1000) isGrams = false
        if(isGrams){
            document.getElementById('gco2').textContent = "grams of CO2"
        }
        emissionAddition = info.emissionAddition
        var intervalId = setInterval(function(){
            totalEmissionAddition = info.totalDataSaved - info.currentVideoDataSaved + emissionAddition
            if(totalEmissionAddition >= info.totalDataSaved){
                clearInterval(intervalId)
            }
            document.getElementById('totalDataSaved').textContent = Math.round(totalEmissionAddition)
            emissionAddition = emissionAddition + info.emissionAddition
        }, 1000)
        emissionAdditionEnergy = info.emissionAdditionEnergy
        var intervalIdEnergy = setInterval(function(){
            totalEmissionAdditionEnergy = info.totalEnergySaved - info.currentVideoEnergySaved + emissionAdditionEnergy
            if(totalEmissionAdditionEnergy >= info.totalEnergySaved){
                clearInterval(intervalIdEnergy)
            }
            if(isGrams){
                document.getElementById('totalEnergySaved').textContent = Math.round(totalEmissionAdditionEnergy)
            }else{
                document.getElementById('totalEnergySaved').textContent = Math.round(totalEmissionAdditionEnergy / 1000)
            }
            emissionAdditionEnergy = emissionAdditionEnergy + info.emissionAdditionEnergy
        }, 1000)
        setUpGraph()
        if(qualitySet == "144p"){
            document.getElementById('setQuality144p').style.borderBottom = '3px solid #30694B'
            document.getElementById('eco').style.borderBottom = 'transparent'
            document.getElementById('minimal').style.borderBottom = '3px solid #30694B'
            document.getElementById('custom').style.borderBottom = 'transparent'
            document.getElementById('setQuality144p').style.borderBottom = '3px solid #30694B'
            document.getElementById('setQuality240p').style.borderBottom = 'transparent'
            document.getElementById('setQuality360p').style.borderBottom = 'transparent'
            document.getElementById('setQuality480p').style.borderBottom = 'transparent'
            document.getElementById('setQuality720p').style.borderBottom = 'transparent'
            document.getElementById('setQuality1080p').style.borderBottom = 'transparent'
            document.getElementById('setQuality1440p').style.borderBottom = 'transparent'
            document.getElementById('setQuality4k').style.borderBottom = 'transparent'
        }else if(qualitySet == "240p"){
            document.getElementById('setQuality240p').style.borderBottom = '3px solid #30694B'
            document.getElementById('eco').style.borderBottom = 'transparent'
            document.getElementById('minimal').style.borderBottom = 'transparent'
            document.getElementById('custom').style.borderBottom = '3px solid #30694B'
            document.getElementById('setQuality144p').style.borderBottom = 'transparent'
            document.getElementById('setQuality240p').style.borderBottom = '3px solid #30694B'
            document.getElementById('setQuality360p').style.borderBottom = 'transparent'
            document.getElementById('setQuality480p').style.borderBottom = 'transparent'
            document.getElementById('setQuality720p').style.borderBottom = 'transparent'
            document.getElementById('setQuality1080p').style.borderBottom = 'transparent'
            document.getElementById('setQuality1440p').style.borderBottom = 'transparent'
            document.getElementById('setQuality4k').style.borderBottom = 'transparent'
        }else if(qualitySet == "360p"){
            document.getElementById('setQuality360p').style.borderBottom = '3px solid #30694B'
            document.getElementById('eco').style.borderBottom = 'transparent'
            document.getElementById('minimal').style.borderBottom = 'transparent'
            document.getElementById('custom').style.borderBottom = '3px solid #30694B'
            document.getElementById('setQuality144p').style.borderBottom = 'transparent'
            document.getElementById('setQuality240p').style.borderBottom = 'transparent'
            document.getElementById('setQuality360p').style.borderBottom = '3px solid #30694B'
            document.getElementById('setQuality480p').style.borderBottom = 'transparent'
            document.getElementById('setQuality720p').style.borderBottom = 'transparent'
            document.getElementById('setQuality1080p').style.borderBottom = 'transparent'
            document.getElementById('setQuality1440p').style.borderBottom = 'transparent'
            document.getElementById('setQuality4k').style.borderBottom = 'transparent'
        }else if(qualitySet == "480p"){
            document.getElementById('setQuality480p').style.borderBottom = '3px solid #30694B'
            document.getElementById('eco').style.borderBottom = 'transparent'
            document.getElementById('minimal').style.borderBottom = 'transparent'
            document.getElementById('custom').style.borderBottom = '3px solid #30694B'
            document.getElementById('setQuality144p').style.borderBottom = 'transparent'
            document.getElementById('setQuality240p').style.borderBottom = 'transparent'
            document.getElementById('setQuality360p').style.borderBottom = 'transparent'
            document.getElementById('setQuality480p').style.borderBottom = '3px solid #30694B'
            document.getElementById('setQuality720p').style.borderBottom = 'transparent'
            document.getElementById('setQuality1080p').style.borderBottom = 'transparent'
            document.getElementById('setQuality1440p').style.borderBottom = 'transparent'
            document.getElementById('setQuality4k').style.borderBottom = 'transparent'
        }else if(qualitySet == "720p"){
            document.getElementById('setQuality720p').style.borderBottom = '3px solid #30694B'
            document.getElementById('eco').style.borderBottom = '3px solid #30694B'
            document.getElementById('minimal').style.borderBottom = 'transparent'
            document.getElementById('custom').style.borderBottom = 'transparent'
            document.getElementById('setQuality144p').style.borderBottom = 'transparent'
            document.getElementById('setQuality240p').style.borderBottom = 'transparent'
            document.getElementById('setQuality360p').style.borderBottom = 'transparent'
            document.getElementById('setQuality480p').style.borderBottom = 'transparent'
            document.getElementById('setQuality720p').style.borderBottom = '3px solid #30694B'
            document.getElementById('setQuality1080p').style.borderBottom = 'transparent'
            document.getElementById('setQuality1440p').style.borderBottom = 'transparent'
            document.getElementById('setQuality4k').style.borderBottom = 'transparent'
        }else if(qualitySet == "1080p"){
            document.getElementById('setQuality1080p').style.borderBottom = '3px solid #30694B'
            document.getElementById('eco').style.borderBottom = 'transparent'
            document.getElementById('minimal').style.borderBottom = 'transparent'
            document.getElementById('custom').style.borderBottom = '3px solid #30694B'
            document.getElementById('setQuality144p').style.borderBottom = 'transparent'
            document.getElementById('setQuality240p').style.borderBottom = 'transparent'
            document.getElementById('setQuality360p').style.borderBottom = 'transparent'
            document.getElementById('setQuality480p').style.borderBottom = 'transparent'
            document.getElementById('setQuality720p').style.borderBottom = 'transparent'
            document.getElementById('setQuality1080p').style.borderBottom = '3px solid #30694B'
            document.getElementById('setQuality1440p').style.borderBottom = 'transparent'
            document.getElementById('setQuality4k').style.borderBottom = 'transparent'
        }else if(qualitySet == "1440p"){
            document.getElementById('setQuality1440p').style.borderBottom = '3px solid #30694B'
            document.getElementById('eco').style.borderBottom = 'transparent'
            document.getElementById('minimal').style.borderBottom = 'transparent'
            document.getElementById('custom').style.borderBottom = '3px solid #30694B'
            document.getElementById('setQuality144p').style.borderBottom = 'transparent'
            document.getElementById('setQuality240p').style.borderBottom = 'transparent'
            document.getElementById('setQuality360p').style.borderBottom = 'transparent'
            document.getElementById('setQuality480p').style.borderBottom = 'transparent'
            document.getElementById('setQuality720p').style.borderBottom = 'transparent'
            document.getElementById('setQuality1080p').style.borderBottom = 'transparent'
            document.getElementById('setQuality1440p').style.borderBottom = '3px solid #30694B'
            document.getElementById('setQuality4k').style.borderBottom = 'transparent'
        }else if(qualitySet == "4k"){
            document.getElementById('setQuality4k').style.borderBottom = '3px solid #30694B'
            document.getElementById('eco').style.borderBottom = 'transparent'
            document.getElementById('minimal').style.borderBottom = 'transparent'
            document.getElementById('custom').style.borderBottom = '3px solid #30694B'
            document.getElementById('setQuality144p').style.borderBottom = 'transparent'
            document.getElementById('setQuality240p').style.borderBottom = 'transparent'
            document.getElementById('setQuality360p').style.borderBottom = 'transparent'
            document.getElementById('setQuality480p').style.borderBottom = 'transparent'
            document.getElementById('setQuality720p').style.borderBottom = 'transparent'
            document.getElementById('setQuality1080p').style.borderBottom = 'transparent'
            document.getElementById('setQuality1440p').style.borderBottom = 'transparent'
            document.getElementById('setQuality4k').style.borderBottom = '3px solid #30694B'
        }
        document.getElementById('totalTimeSpent').textContent = secondsToHms(info.totalTime)
        document.getElementById('setQualityCurrentVideo').textContent = qualitySet
        document.getElementById('setQualityEnergyCurrentVideo').textContent = qualitySet
        document.getElementById('currentVideoName').textContent = info.currentVideoName
        document.getElementById('equivalences').textContent = String(Math.floor(info.totalEnergySaved / 1000 / 4)) + " Burgers, or " + String(Math.floor(info.totalEnergySaved / 1000 / 0.4)) + " Miles Driven"
        if(info.currentVideoEnergySaved < 1000){
            document.getElementById('energySavedCurrentVideo').textContent = info.currentVideoEnergySaved
            document.getElementById('gco2Current').textContent = "grams of CO2"
        }else{
            document.getElementById('energySavedCurrentVideo').textContent = info.currentVideoEnergySaved / 1000
        }
        document.getElementById('mbsTransferredSavedCurrentVideo').textContent = info.currentVideoDataSaved
        if(info.totalEnergySaved > 5000){
            document.getElementById('5kgSaved').style.visibility = 'visible'
            document.getElementById('badges').style.height = "auto"
        }
        if(info.totalEnergySaved > 10000){
            document.getElementById('10kgSaved').style.visibility = 'visible'
        }
        if(info.totalEnergySaved > 20000){
            document.getElementById('20kgSaved').style.visibility = 'visible'
        }
        if(info.totalEnergySaved > 50000){
            document.getElementById('50kgSaved').style.visibility = 'visible'
        }
    }
};

// Seconds Converter
function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay; 
}
  
// Sends request to Content.js when PopUp clicked
window.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'url', message: qualitySet},
        setInfo);
    });

});

// Sets Screen Dimensions and Frame Rate
const width = window.screen.width * window.devicePixelRatio;
const height = window.screen.height * window.devicePixelRatio;
const screenQuality = height
document.getElementById('currentWidth').textContent = width;
document.getElementById('currentHeight').textContent = height;
document.getElementById('screenQuality').textContent = screenQuality
document.getElementById('currentFrameRate').textContent = 60

// Sets Updated selected quality
const setQualityInfo = qualityInfo => {
    qualitySet = qualityInfo.setQuality
    if(qualitySet == "144p"){
        document.getElementById('setQuality144p').style.borderBottom = '3px solid #30694B'
    }else if(qualitySet == "240p"){
        document.getElementById('setQuality240p').style.borderBottom = '3px solid #30694B'
    }else if(qualitySet == "360p"){
        document.getElementById('setQuality360p').style.borderBottom = '3px solid #30694B'
    }else if(qualitySet == "480p"){
        document.getElementById('setQuality480p').style.borderBottom = '3px solid #30694B'
    }else if(qualitySet == "720p"){
        document.getElementById('setQuality720p').style.borderBottom = '3px solid #30694B'
    }else if(qualitySet == "1080p"){
        document.getElementById('setQuality1080p').style.borderBottom = '3px solid #30694B'
    }else if(qualitySet == "14p40"){
        document.getElementById('setQuality1440p').style.borderBottom = '3px solid #30694B'
    }else if(qualitySet == "4k"){
        document.getElementById('setQuality4k').style.borderBottom = '3px solid #30694B'
    }
};

document.getElementById('setQuality144p').addEventListener("click", function(){
    qualitySet = "144p"
    document.getElementById('setQuality144p').style.borderBottom = '3px solid #30694B'
    document.getElementById('setQuality240p').style.borderBottom = 'transparent'
    document.getElementById('setQuality360p').style.borderBottom = 'transparent'
    document.getElementById('setQuality480p').style.borderBottom = 'transparent'
    document.getElementById('setQuality720p').style.borderBottom = 'transparent'
    document.getElementById('setQuality1080p').style.borderBottom = 'transparent'
    document.getElementById('setQuality1440p').style.borderBottom = 'transparent'
    document.getElementById('setQuality4k').style.borderBottom = 'transparent'
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'quality updated', quality: qualitySet},
        setQualityInfo
        );
    });
})

document.getElementById('setQuality240p').addEventListener("click", function(){
    qualitySet = "240p"
    document.getElementById('setQuality240p').style.borderBottom = '3px solid #30694B'
    document.getElementById('setQuality144p').style.borderBottom = 'transparent'
    document.getElementById('setQuality360p').style.borderBottom = 'transparent'
    document.getElementById('setQuality480p').style.borderBottom = 'transparent'
    document.getElementById('setQuality720p').style.borderBottom = 'transparent'
    document.getElementById('setQuality1080p').style.borderBottom = 'transparent'
    document.getElementById('setQuality1440p').style.borderBottom = 'transparent'
    document.getElementById('setQuality4k').style.borderBottom = 'transparent'
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'quality updated', quality: qualitySet},
        setQualityInfo
        );
    });
})

document.getElementById('setQuality360p').addEventListener("click", function(){
    qualitySet = "360p"
    document.getElementById('setQuality360p').style.borderBottom = '3px solid #30694B'
    document.getElementById('setQuality144p').style.borderBottom = 'transparent'
    document.getElementById('setQuality240p').style.borderBottom = 'transparent'
    document.getElementById('setQuality480p').style.borderBottom = 'transparent'
    document.getElementById('setQuality720p').style.borderBottom = 'transparent'
    document.getElementById('setQuality1080p').style.borderBottom = 'transparent'
    document.getElementById('setQuality1440p').style.borderBottom = 'transparent'
    document.getElementById('setQuality4k').style.borderBottom = 'transparent'
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'quality updated', quality: qualitySet},
        setQualityInfo
        );
    });
})

document.getElementById('setQuality480p').addEventListener("click", function(){
    qualitySet = "480p"
    document.getElementById('setQuality480p').style.borderBottom = '3px solid #30694B'
    document.getElementById('setQuality144p').style.borderBottom = 'transparent'
    document.getElementById('setQuality240p').style.borderBottom = 'transparent'
    document.getElementById('setQuality360p').style.borderBottom = 'transparent'
    document.getElementById('setQuality720p').style.borderBottom = 'transparent'
    document.getElementById('setQuality1080p').style.borderBottom = 'transparent'
    document.getElementById('setQuality1440p').style.borderBottom = 'transparent'
    document.getElementById('setQuality4k').style.borderBottom = 'transparent'
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'quality updated', quality: qualitySet},
        setQualityInfo
        );
    });
})

document.getElementById('setQuality720p').addEventListener("click", function(){
    qualitySet = "720p"
    document.getElementById('setQuality720p').style.borderBottom = '3px solid #30694B'
    document.getElementById('setQuality144p').style.borderBottom = 'transparent'
    document.getElementById('setQuality240p').style.borderBottom = 'transparent'
    document.getElementById('setQuality360p').style.borderBottom = 'transparent'
    document.getElementById('setQuality480p').style.borderBottom = 'transparent'
    document.getElementById('setQuality1080p').style.borderBottom = 'transparent'
    document.getElementById('setQuality1440p').style.borderBottom = 'transparent'
    document.getElementById('setQuality4k').style.borderBottom = 'transparent'
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'quality updated', quality: qualitySet},
        setQualityInfo
        );
    });
})

document.getElementById('setQuality1080p').addEventListener("click", function(){
    qualitySet = "1080p"
    document.getElementById('setQuality1080p').style.borderBottom = '3px solid #30694B'
    document.getElementById('setQuality144p').style.borderBottom = 'transparent'
    document.getElementById('setQuality240p').style.borderBottom = 'transparent'
    document.getElementById('setQuality360p').style.borderBottom = 'transparent'
    document.getElementById('setQuality480p').style.borderBottom = 'transparent'
    document.getElementById('setQuality720p').style.borderBottom = 'transparent'
    document.getElementById('setQuality1440p').style.borderBottom = 'transparent'
    document.getElementById('setQuality4k').style.borderBottom = 'transparent'
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'quality updated', quality: qualitySet},
        setQualityInfo
        );
    });
})

document.getElementById('setQuality1440p').addEventListener("click", function(){
    qualitySet = "1440p"
    document.getElementById('setQuality1440p').style.borderBottom = '3px solid #30694B'
    document.getElementById('setQuality144p').style.borderBottom = 'transparent'
    document.getElementById('setQuality240p').style.borderBottom = 'transparent'
    document.getElementById('setQuality360p').style.borderBottom = 'transparent'
    document.getElementById('setQuality480p').style.borderBottom = 'transparent'
    document.getElementById('setQuality720p').style.borderBottom = 'transparent'
    document.getElementById('setQuality1080p').style.borderBottom = 'transparent'
    document.getElementById('setQuality4k').style.borderBottom = 'transparent'
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'quality updated', quality: qualitySet},
        setQualityInfo
        );
    });
})

document.getElementById('setQuality4k').addEventListener("click", function(){
    qualitySet = "4k"
    document.getElementById('setQuality4k').style.borderBottom = '3px solid #30694B'
    document.getElementById('setQuality144p').style.borderBottom = 'transparent'
    document.getElementById('setQuality240p').style.borderBottom = 'transparent'
    document.getElementById('setQuality360p').style.borderBottom = 'transparent'
    document.getElementById('setQuality480p').style.borderBottom = 'transparent'
    document.getElementById('setQuality720p').style.borderBottom = 'transparent'
    document.getElementById('setQuality1080p').style.borderBottom = 'transparent'
    document.getElementById('setQuality1440p').style.borderBottom = 'transparent'
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'quality updated', quality: qualitySet},
        setQualityInfo
        );
    });
})

// Show more usage Statistics
document.getElementById('fullBreakdown').addEventListener("click", function(){
    if(document.getElementById('fullBreakdownData').style.visibility == 'hidden'){
      document.getElementById('fullBreakdownData').style.visibility = 'visible' 
      if(document.getElementById('custom').style.borderBottom == '3px solid rgb(48, 105, 75)'){
        document.getElementById('popup').style.height = "470px"
        document.getElementById('fullBreakdownData').style.height = 'auto'
      }else{
        document.getElementById('popup').style.height = "430px"
        document.getElementById('fullBreakdownData').style.height = 'auto'
      }
    }else{
      document.getElementById('fullBreakdownData').style.visibility = 'hidden' 
      if(document.getElementById('custom').style.borderBottom == '3px solid rgb(48, 105, 75)'){
        document.getElementById('popup').style.height = "380px" 
        document.getElementById('fullBreakdownData').style.height = '0px'
      }else{
        document.getElementById('popup').style.height = "350px" 
        document.getElementById('fullBreakdownData').style.height = '0px'
      }
    } 
})

// Navigation
document.getElementById('home').addEventListener("click", function(){
    document.getElementById('home').style.borderBottom = "3px solid #f8f8ff"
    document.getElementById('usage').style.borderBottom = "none"
    document.getElementById('information').style.borderBottom = "none"
    document.getElementById('heart').style.borderBottom = "none"
    document.getElementById('homePage').style.visibility = 'visible'
    document.getElementById('usagePage').style.visibility = 'hidden'
    document.getElementById('informationPage').style.visibility = 'hidden'
    document.getElementById('heartPage').style.visibility = 'hidden'
    document.getElementById('usagePage').style.height = '0px'
    document.getElementById('informationPage').style.height = '0px'
    document.getElementById('heartPage').style.height = '0px'
    if(document.getElementById('custom').style.borderBottom == '3px solid rgb(48, 105, 75)') {
        document.getElementById('customQuality').style.visibility = "visible"
        document.getElementById('popup').style.height = "390px"
    }else{
        document.getElementById('customQuality').style.visibility = "hidden"
        document.getElementById('popup').style.height = "350px"
    }
    document.getElementById('fullBreakdownData').style.visibility = 'hidden'
    document.getElementById('fullBreakdownData').style.height = "0px"
})

document.getElementById('usage').addEventListener("click", function(){
    document.getElementById('usage').style.borderBottom = "3px solid #f8f8ff"
    document.getElementById('home').style.borderBottom = "none"
    document.getElementById('information').style.borderBottom = "none"
    document.getElementById('heart').style.borderBottom = "none"    
    document.getElementById('homePage').style.visibility = 'hidden'
    document.getElementById('usagePage').style.visibility = 'visible'
    document.getElementById('informationPage').style.visibility = 'hidden'
    document.getElementById('heartPage').style.visibility = 'hidden'
    document.getElementById('homePage').style.height = '0px'
    document.getElementById('informationPage').style.height = '0px'
    document.getElementById('heartPage').style.height = '0px'
    document.getElementById('customQuality').style.visibility = 'hidden'
    document.getElementById('fullBreakdownData').style.visibility = 'hidden'
    document.getElementById('fullBreakdownData').style.height = "0px"
    document.getElementById('popup').style.height = "350px"
})

document.getElementById('information').addEventListener("click", function(){
    document.getElementById('information').style.borderBottom = "3px solid #f8f8ff"
    document.getElementById('usage').style.borderBottom = "none"
    document.getElementById('home').style.borderBottom = "none"
    document.getElementById('heart').style.borderBottom = "none"    
    document.getElementById('homePage').style.visibility = 'hidden'
    document.getElementById('usagePage').style.visibility = 'hidden'
    document.getElementById('informationPage').style.visibility = 'visible'
    document.getElementById('heartPage').style.visibility = 'hidden'
    document.getElementById('usagePage').style.height = '0px'
    document.getElementById('homePage').style.height = '0px'
    document.getElementById('heartPage').style.height = '0px'
    document.getElementById('customQuality').style.visibility = 'hidden'
    document.getElementById('fullBreakdownData').style.visibility = 'hidden'
    document.getElementById('fullBreakdownData').style.height = "0px"
    document.getElementById('popup').style.height = "350px"
})

document.getElementById('heart').addEventListener("click", function(){
    document.getElementById('popup').style.height = "350px"
    document.getElementById('heart').style.borderBottom = "3px solid #f8f8ff"
    document.getElementById('usage').style.borderBottom = "none"
    document.getElementById('information').style.borderBottom = "none"
    document.getElementById('home').style.borderBottom = "none"    
    document.getElementById('homePage').style.visibility = 'hidden'
    document.getElementById('usagePage').style.visibility = 'hidden'
    document.getElementById('informationPage').style.visibility = 'hidden'
    document.getElementById('heartPage').style.visibility = 'visible'
    document.getElementById('usagePage').style.height = '0px'
    document.getElementById('informationPage').style.height = '0px'
    document.getElementById('homePage').style.height = '0px'
    document.getElementById('customQuality').style.visibility = 'hidden'
    document.getElementById('fullBreakdownData').style.visibility = 'hidden'
    document.getElementById('fullBreakdownData').style.height = "0px"
    document.getElementById('popup').style.height = "350px"
})

// Calculations for equivalences
//big mac - 4kg https://www.sixdegreesnews.org/archives/10261/the-carbon-footprint-of-a-cheeseburger
var numberOfBurgers = (totalEnergySaved / 1000) / 4
var x = Math.floor(numberOfBurgers / 12)
var burgerElements = ""
if(numberOfBurgers >= (x * 12) && x != 0){
    burgerElements = `<i style="color: #30694B; margin-right: 5px;" class="fa-solid fa-burger fa-2xl"></i>` + `<p style="display: inline;  margin-right: 5px;">x${x * 12}</p>`
    for(var i = 0; i < Math.round(numberOfBurgers) - x * 12; i++){ 
        burgerElements = burgerElements + `<i style="color: #FFD700; margin-right: 5px;" class="fa-solid fa-burger fa-2xl"></i>`
    }
    burgerElements = burgerElements + `<p style="display: inline;">1 Burger = 4 KG of CO2</p>`
}else if(numberOfBurgers == 0){
    burgerElements = `<i style="color: #FFD700; margin-right: 5px;" class="fa-solid fa-burger fa-2xl"></i>` + `<p style="display: inline;"> Burger = 4 KG of CO2</p>`
}else{
    for(var i = 0; i < Math.round(numberOfBurgers); i++){ 
        burgerElements = burgerElements + `<i style="color: #FFD700; margin-right: 5px;" class="fa-solid fa-burger fa-2xl"></i>`
    }
    burgerElements = burgerElements + `<p style="display: inline;">1 Burger = 4 KG of CO2</p>`
}

document.getElementById('burgers').innerHTML = burgerElements

//car - 0.4 kg per mile https://www.epa.gov/greenvehicles/greenhouse-gas-emissions-typical-passenger-vehicle#:~:text=typical%20passenger%20vehicle%3F-,A%20typical%20passenger%20vehicle%20emits%20about%204.6%20metric%20tons%20of,around%2011%2C500%20miles%20per%20year.
var numberOfMiles = (totalEnergySaved / 1000) / 0.4
var c = Math.floor(numberOfMiles / 12)
var carElements = ""
if(numberOfMiles >= (c * 12) && c != 0){
    carElements = `<i style="color: #30694B; margin-right: 5px;" class="fa-solid fa-car fa-2xl"></i>` + `<p style="display: inline;  margin-right: 5px;">x${c * 12}</p>`
    for(var i = 0; i < Math.round(numberOfMiles) - c * 12; i++){ 
        carElements = carElements + `<i style="color: #121212; margin-right: 5px;" class="fa-solid fa-car fa-2xl"></i>`
    }
    carElements = carElements + `<p style="display: inline;">1 Mile = 0.4 KG of CO2</p>`
}else if(numberOfMiles == 0){
    carElements = `<i style="color: #121212; margin-right: 5px;" class="fa-solid fa-car fa-2xl"></i>` + `<p style="display: inline;"> Mile = 0.4 KG of CO2</p>`
}else{
    for(var i = 0; i < Math.round(numberOfMiles); i++){ 
        carElements = carElements + `<i style="color: #121212; margin-right: 5px;" class="fa-solid fa-car fa-2xl"></i>`
    }
    carElements = carElements + `<p style="display: inline;">1 Mile = 0.4 KG of CO2</p>`
}

document.getElementById('cars').innerHTML = carElements

//tree - 167 kg https://climate.selectra.com/en/news/co2-tree
var numberOfTrees = (totalEnergySaved / 1000) / 167
var t = Math.floor(numberOfTrees / 12)
var treeElements = ""
if(numberOfTrees >= (t * 12) && t != 0){
    treeElements = `<i style="color: #30694B; margin-right: 5px;" class="fa-solid fa-tree fa-2xl"></i>` + `<p style="display: inline;  margin-right: 5px;">x${t * 12}</p>`
    for(var i = 0; i < Math.round(numberOfTrees) - x * 12; i++){ 
        treeElements = treeElements + `<i style="color: #358856; margin-right: 5px;" class="fa-solid fa-tree fa-2xl"></i>`
    }
    treeElements = treeElements + `<p style="display: inline;">1 Tree = 167 KG of CO2 per year</p>`
}else if(numberOfTrees == 0){
    treeElements = `<i style="color: #358856; margin-right: 5px;" class="fa-solid fa-tree fa-2xl"></i>` + `<p style="display: inline;"> Tree = 167 KG of CO2 per year</p>`
}else{
    for(var i = 0; i < Math.round(numberOfTrees); i++){ 
        treeElements = treeElements + `<i style="color: #358856; margin-right: 5px;" class="fa-solid fa-tree fa-2xl"></i>`
    }
    treeElements = treeElements + `<p style="display: inline;">1 Tree = 167 KG of CO2 per year</p>`
}

document.getElementById('trees').innerHTML = treeElements

// Comparison Graph
const usageGraph = [["laptop_SD_Wifi", 19], ["laptop_SD_4g", null], ["laptop_HD_Wifi", 21], ["laptop_HD_4g", null], ["laptop_4k_Wifi", 25], ["laptop_4k_4g", null],
["smartphone_Low_Wifi", 9], ["smartphone_Low_4g", 2], ["smartphone_SD_Wifi", 10], ["smartphone_SD_4g", 3], ["smartphone_HD_Wifi", 12], ["smartphone_HD_4g", 9],
["tablet_Low_Wifi", 10], ["tablet_Low_4g", 3], ["tablet_SD_Wifi", 10], ["tablet_SD_4g", 4], ["tablet_HD_Wifi", 13], ["tablet_HD_4g", 9], ["tablet_4k_Wifi", 13],
["tablet_4k_4g", null], ["television_SD_Wifi", 65], ["television_SD_4g", null], ["television_HD_Wifi", 67], ["television_HD_4g", null], ["television_4k_Wifi", 71], ["television_4k_4g", null]]

var comparisonCO2 = 0

var device = "laptop"
var bitrate = "HD"
var network = "Wifi"

var myChart

document.getElementById('laptop').style.borderBottom = "3px solid #30694B"
document.getElementById('hd').style.borderBottom = "3px solid #30694B"
document.getElementById('wifi').style.borderBottom = "3px solid #30694B"

var comparisonSetUp = device + "_" + bitrate + "_" + network

function setUpGraph(){
    comparisonCO2 = (getUsageComparison() / 60 / 60) * totalTime
    updateChart()
}

function getUsageComparison(){
    for(var i = 0; i < usageGraph.length; i++){
        if(comparisonSetUp == usageGraph[i][0]){
            return usageGraph[i][1]
        }
    }
}

// Updating user choices on Graph
document.getElementById('smartphone').addEventListener("click", function(){
    document.getElementById('smartphone').style.borderBottom = "3px solid #30694B"
    document.getElementById('tablet').style.borderBottom = "transparent"
    document.getElementById('laptop').style.borderBottom = "transparent"
    document.getElementById('television').style.borderBottom = "transparent"
    device = "smartphone"
    myChart.destroy();
    comparisonCO2 = (getUsageComparison() / 60 / 60) * totalTime
    updateChart()
})

document.getElementById('tablet').addEventListener("click", function(){
    document.getElementById('tablet').style.borderBottom = "3px solid #30694B"
    document.getElementById('smartphone').style.borderBottom = "transparent"
    document.getElementById('laptop').style.borderBottom = "transparent"
    document.getElementById('television').style.borderBottom = "transparent"
    device = "tablet"
    myChart.destroy();
    comparisonCO2 = (getUsageComparison() / 60 / 60) * totalTime
    updateChart()
})

document.getElementById('laptop').addEventListener("click", function(){
    document.getElementById('laptop').style.borderBottom = "3px solid #30694B"
    document.getElementById('smartphone').style.borderBottom = "transparent"
    document.getElementById('tablet').style.borderBottom = "transparent"
    document.getElementById('television').style.borderBottom = "transparent"
    device = "laptop"
    myChart.destroy();
    comparisonCO2 = (getUsageComparison() / 60 / 60) * totalTime
    updateChart()
})

document.getElementById('television').addEventListener("click", function(){
    document.getElementById('television').style.borderBottom = "3px solid #30694B"
    document.getElementById('smartphone').style.borderBottom = "transparent"
    document.getElementById('tablet').style.borderBottom = "transparent"
    document.getElementById('laptop').style.borderBottom = "transparent"
    device = "television"
    myChart.destroy();
    comparisonCO2 = (getUsageComparison() / 60 / 60) * totalTime
    updateChart()
})

document.getElementById('low').addEventListener("click", function(){
    document.getElementById('low').style.borderBottom = "3px solid #30694B"
    document.getElementById('sd').style.borderBottom = "transparent"
    document.getElementById('hd').style.borderBottom = "transparent"
    document.getElementById('4k').style.borderBottom = "transparent"
    bitrate = "Low"
    myChart.destroy();
    comparisonCO2 = (getUsageComparison() / 60 / 60) * totalTime
    updateChart()
})

document.getElementById('sd').addEventListener("click", function(){
    document.getElementById('sd').style.borderBottom = "3px solid #30694B"
    document.getElementById('low').style.borderBottom = "transparent"
    document.getElementById('hd').style.borderBottom = "transparent"
    document.getElementById('4k').style.borderBottom = "transparent"
    bitrate = "SD"
    myChart.destroy();
    comparisonCO2 = (getUsageComparison() / 60 / 60) * totalTime
    updateChart()
})

document.getElementById('hd').addEventListener("click", function(){
    document.getElementById('hd').style.borderBottom = "3px solid #30694B"
    document.getElementById('low').style.borderBottom = "transparent"
    document.getElementById('sd').style.borderBottom = "transparent"
    document.getElementById('4k').style.borderBottom = "transparent"
    bitrate = "HD"
    myChart.destroy();
    comparisonCO2 = (getUsageComparison() / 60 / 60) * totalTime
    updateChart()
})

document.getElementById('4k').addEventListener("click", function(){
    document.getElementById('4k').style.borderBottom = "3px solid #30694B"
    document.getElementById('low').style.borderBottom = "transparent"
    document.getElementById('sd').style.borderBottom = "transparent"
    document.getElementById('hd').style.borderBottom = "transparent"
    bitrate = "4k"
    myChart.destroy();
    comparisonCO2 = (getUsageComparison() / 60 / 60) * totalTime
    updateChart()
})

document.getElementById('wifi').addEventListener("click", function(){
    document.getElementById('wifi').style.borderBottom = "3px solid #30694B"
    document.getElementById('4g').style.borderBottom = "transparent"
    network = "Wifi"
    myChart.destroy();
    comparisonCO2 = (getUsageComparison() / 60 / 60) * totalTime
    updateChart()
})

document.getElementById('4g').addEventListener("click", function(){
    document.getElementById('4g').style.borderBottom = "3px solid #30694B"
    document.getElementById('wifi').style.borderBottom = "transparent"
    network = "4g"
    myChart.destroy();
    comparisonCO2 = (getUsageComparison() / 60 / 60) * totalTime
    updateChart()
})

//Builds chart
function updateChart(){
    const ctx = document.getElementById('chart').getContext('2d');
    var divider = 1
    comparisonSetUp = device + "_" + bitrate + "_" + network
    if(!isGrams) divider = 1000
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Your current Settings', comparisonSetUp],
            datasets: [{
                label: 'amount of CO2 used',
                data: [(totalEnergySaved / divider), (comparisonCO2 / divider)],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
                maxBarThickness: 50
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false
                    },
                    ticks: {
                        callback: function(value, index, ticks) {
                            if(isGrams){
                                return value + " grams of CO2";
                            }else{
                                return value + " kg of CO2";
                            }
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
    if(((totalEnergySaved / divider) - (comparisonCO2 / divider)) >= 0){
        if(isGrams){
            document.getElementById('comparisonText').textContent = "Changing to a " + device + " streaming " + bitrate + " quality on " + network + " would save " + String(Math.round((totalEnergySaved / divider) - (comparisonCO2 / divider))) + " grams of CO2"
        }else{
            document.getElementById('comparisonText').textContent = "Changing to a " + device + " streaming " + bitrate + " quality on " + network + " would save " + String(Math.round((totalEnergySaved / divider) - (comparisonCO2 / divider))) + " kg of CO2"
        }
    }else{
        if(isGrams){
            document.getElementById('comparisonText').textContent = "Changing to a " + device + " streaming " + bitrate + " quality on " + network + " would cost " + String(Math.round((comparisonCO2 / divider) - (totalEnergySaved / divider))) + " grams of CO2"
        }else{
            document.getElementById('comparisonText').textContent = "Changing to a " + device + " streaming " + bitrate + " quality on " + network + " would cost " + String(Math.round((comparisonCO2 / divider) - (totalEnergySaved / divider))) + " kg of CO2"
        }
    }
}