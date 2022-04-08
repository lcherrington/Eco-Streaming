var qualitySet = ""
var totalEnergySaved = 0
var totalTime = 0

// device - bitrate - wifi high and 4k - world - yes
// you graph based on current settings vs picked - yes
// add total time watched - yes
// add emission as video is watched
// custom dropped down list -> add 4k 14440p - yes
// wattage for device type -> detected and scaled multiple for co2 emsiions 
// join our development team -> put in heart - done

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

if(document.getElementById('5kgSaved').style.visibility == 'hidden'){
    document.getElementById('badges').style.height = '0px'
}

if(document.getElementById('customQuality').style.visibility == 'hidden'){
    document.getElementById('customQuality').style.height = '20px'
}

if(document.getElementById('fullBreakdownData').style.visibility == 'hidden'){
    document.getElementById('fullBreakdownData').style.height = '0px'
}

if(totalEnergySaved < 167000){
    document.getElementById('trees').style.visibility = 'hidden'
    document.getElementById('trees').style.height = "0px"
}

document.getElementById('eco').addEventListener("click", function(){
    qualitySet = "720p"
    document.getElementById('eco').style.borderBottom = '3px solid #30694B'
    document.getElementById('minimal').style.borderBottom = 'transparent'
    document.getElementById('custom').style.borderBottom = 'transparent'
    document.getElementById('customQuality').style.height = '20px'
    document.getElementById('popup').style.height = "370px"
    document.getElementById('customQuality').style.visibility = 'hidden'
    document.getElementById('setQuality720p').style.borderBottom = '3px solid #30694B'
    document.getElementById('setQuality144p').style.borderBottom = 'transparent'
    document.getElementById('setQuality240p').style.borderBottom = 'transparent'
    document.getElementById('setQuality360p').style.borderBottom = 'transparent'
    document.getElementById('setQuality480p').style.borderBottom = 'transparent'
    document.getElementById('setQuality1080p').style.borderBottom = 'transparent'
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
    document.getElementById('popup').style.height = "370px"
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
    qualitySet = "720p"
    document.getElementById('popup').style.height = "410px"
    document.getElementById('customQuality').style.height = 'auto'
    document.getElementById('customQuality').style.visibility = "visible"
    document.getElementById('eco').style.borderBottom = 'transparent'
    document.getElementById('minimal').style.borderBottom = 'transparent'
    document.getElementById('custom').style.borderBottom = '3px solid #30694B'
    document.getElementById('setQuality720p').style.borderBottom = '3px solid #30694B'
    document.getElementById('setQuality144p').style.borderBottom = 'transparent'
    document.getElementById('setQuality240p').style.borderBottom = 'transparent'
    document.getElementById('setQuality360p').style.borderBottom = 'transparent'
    document.getElementById('setQuality480p').style.borderBottom = 'transparent'
    document.getElementById('setQuality1080p').style.borderBottom = 'transparent'
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

document.getElementById("mbs").addEventListener("mouseover", function(){
    document.getElementById("mbsExplained").style.fontSize = "12px"
    document.getElementById("mbsExplained").textContent = "Mega Bytes per second. The number of Bytes transfered each second.";
});

document.getElementById("mbs").addEventListener("mouseout", function(){
    document.getElementById("mbsExplained").textContent = "";
});

document.getElementById("gco2").addEventListener("mouseover", function(){
    document.getElementById("gco2Explained").style.fontSize = "12px"
    document.getElementById("gco2Explained").textContent = "This is the amount of CO2 saved. Measured in grams.";
});

document.getElementById("gco2").addEventListener("mouseout", function(){
    document.getElementById("gco2Explained").textContent = "";
});

const setInfo = info => {
    qualitySet = info.setQuality
    totalEnergySaved = info.totalEnergySaved
    if(qualitySet == "144p"){
        document.getElementById('setQuality144p').style.borderBottom = '3px solid green'
    }else if(qualitySet == "240p"){
        document.getElementById('setQuality240p').style.borderBottom = '3px solid green'
    }else if(qualitySet == "360p"){
        document.getElementById('setQuality360p').style.borderBottom = '3px solid green'
    }else if(qualitySet == "480p"){
        document.getElementById('setQuality480p').style.borderBottom = '3px solid green'
    }else if(qualitySet == "720p"){
        document.getElementById('setQuality720p').style.borderBottom = '3px solid green'
    }else if(qualitySet == "1080p"){
        document.getElementById('setQuality1080p').style.borderBottom = '3px solid green'
    }else if(qualitySet == "1440p"){
        document.getElementById('setQuality1440p').style.borderBottom = '3px solid green'
    }else if(qualitySet == "4k"){
        document.getElementById('setQuality4k').style.borderBottom = '3px solid green'
    }
    document.getElementById('setQualityCurrentVideo').textContent = qualitySet
    document.getElementById('setQualityEnergyCurrentVideo').textContent = qualitySet
    document.getElementById('currentVideoName').textContent = info.currentVideoName
    document.getElementById('mbsTransferredSavedCurrentVideo').textContent = info.currentVideoDataSaved
    document.getElementById('energySavedCurrentVideo').textContent = info.currentVideoEnergySaved
    document.getElementById('totalDataSaved').textContent = info.totalDataSaved
    document.getElementById('totalEnergySaved').textContent = info.totalEnergySaved
    if(info.totalEnergySaved > 5000){
        document.getElementById('5kgSaved').style.visibility = 'visible'
        document.getElementById('popup').style.height = "390px"
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
    document.getElementById('totalTimeSpent').textContent = secondsToHms(info.totalTime) //sort
};

//sorting
function secondsToHms(d) {
    d = Number(d);
    console.log(d)
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay; 
}
  
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

const width = window.screen.width * window.devicePixelRatio;
const height = window.screen.height * window.devicePixelRatio;
const screenQuality = height
document.getElementById('currentWidth').textContent = width;
document.getElementById('currentHeight').textContent = height;
document.getElementById('screenQuality').textContent = screenQuality
document.getElementById('currentFrameRate').textContent = 60

const setQualityInfo = qualityInfo => {
    qualitySet = qualityInfo.setQuality
    if(qualitySet == "144p"){
        document.getElementById('setQuality144p').style.borderBottom = '3px solid green'
    }else if(qualitySet == "240p"){
        document.getElementById('setQuality240p').style.borderBottom = '3px solid green'
    }else if(qualitySet == "360p"){
        document.getElementById('setQuality360p').style.borderBottom = '3px solid green'
    }else if(qualitySet == "480p"){
        document.getElementById('setQuality480p').style.borderBottom = '3px solid green'
    }else if(qualitySet == "720p"){
        document.getElementById('setQuality720p').style.borderBottom = '3px solid green'
    }else if(qualitySet == "1080p"){
        document.getElementById('setQuality1080p').style.borderBottom = '3px solid green'
    }else if(qualitySet == "14p40"){
        document.getElementById('setQuality1440p').style.borderBottom = '3px solid green'
    }else if(qualitySet == "4k"){
        document.getElementById('setQuality4k').style.borderBottom = '3px solid green'
    }
};

//add window reload
document.getElementById('setQuality144p').addEventListener("click", function(){
    qualitySet = "144p"
    document.getElementById('setQuality144p').style.borderBottom = '3px solid green'
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
    document.getElementById('setQuality240p').style.borderBottom = '3px solid green'
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
    document.getElementById('setQuality360p').style.borderBottom = '3px solid green'
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
    document.getElementById('setQuality480p').style.borderBottom = '3px solid green'
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
    document.getElementById('setQuality720p').style.borderBottom = '3px solid green'
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
    document.getElementById('setQuality1080p').style.borderBottom = '3px solid green'
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
    document.getElementById('setQuality1440p').style.borderBottom = '3px solid green'
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
    document.getElementById('setQuality4k').style.borderBottom = '3px solid green'
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

document.getElementById('fullBreakdown').addEventListener("click", function(){
    if(document.getElementById('fullBreakdownData').style.visibility == 'hidden'){
      document.getElementById('fullBreakdownData').style.visibility = 'visible' 
      document.getElementById('popup').style.height = "450px" 
      document.getElementById('fullBreakdownData').style.height = 'auto'
    }else{
      document.getElementById('fullBreakdownData').style.visibility = 'hidden' 
      document.getElementById('popup').style.height = "370px" 
      document.getElementById('fullBreakdownData').style.height = '0px'
    } 
})

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
})

document.getElementById('usage').addEventListener("click", function(){
    document.getElementById('popup').style.height = "400px"
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
})

document.getElementById('heart').addEventListener("click", function(){
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
})

//big mac - 4kg https://www.sixdegreesnews.org/archives/10261/the-carbon-footprint-of-a-cheeseburger
var numberOfBurgers = totalEnergySaved / 4
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
var numberOfMiles = totalEnergySaved / 0.4
var c = Math.floor(numberOfMiles / 12)
console.log(c)
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
var numberOfTrees = totalEnergySaved / 167
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

getUsageComparison()
updateChart()

function getUsageComparison(){
    for(var i = 0; i < usageGraph.length; i++){
        if(comparisonSetUp == usageGraph[i][0]){
            return usageGraph[i][1]
        }
    }
}

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

function updateChart(){
    const ctx = document.getElementById('chart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Your current Settings', comparisonSetUp],
            datasets: [{
                label: 'amount of CO2 used',
                data: [totalEnergySaved, comparisonCO2],
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
                            return value + "kg of CO2";
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
    if((totalEnergySaved - comparisonCO2) >= 0){
        document.getElementById('comparisonText').textContent = "Changing to a " + device + " streaming " + bitrate + " quality on " + network + " would save " + String(Math.round(totalEnergySaved - comparisonCO2)) + "kg of CO2"
    }else{
        document.getElementById('comparisonText').textContent = "Changing to a " + device + " streaming " + bitrate + " quality on " + network + " would cost " + String(Math.round(comparisonCO2 - totalEnergySaved)) + "kg of CO2"
    }
}



// document.getElementById('eco').style.borderBottom = '3px solid black'
// document.getElementById('customQuality').style.visibility = 'hidden'

// document.getElementById('eco').addEventListener("click", function(){
//     qualitySet = "720p"
//     document.getElementById('setQuality720p').style.borderBottom = '3px solid green'
//     document.getElementById('setQuality144p').style.borderBottom = 'transparent'
//     document.getElementById('setQuality240p').style.borderBottom = 'transparent'
//     document.getElementById('setQuality360p').style.borderBottom = 'transparent'
//     document.getElementById('setQuality480p').style.borderBottom = 'transparent'
//     document.getElementById('setQuality1080p').style.borderBottom = 'transparent'
//     chrome.tabs.query({
//         active: true,
//         currentWindow: true
//     }, tabs => {
//         chrome.tabs.sendMessage(
//         tabs[0].id,
//         {from: 'popup', subject: 'quality updated', quality: qualitySet},
//         setQualityInfo
//         );
//     });
// })

// document.getElementById('minimal').addEventListener("click", function(){
//     qualitySet = "144p"
//     document.getElementById('setQuality144p').style.borderBottom = '3px solid green'
//     document.getElementById('setQuality240p').style.borderBottom = 'transparent'
//     document.getElementById('setQuality360p').style.borderBottom = 'transparent'
//     document.getElementById('setQuality480p').style.borderBottom = 'transparent'
//     document.getElementById('setQuality720p').style.borderBottom = 'transparent'
//     document.getElementById('setQuality1080p').style.borderBottom = 'transparent'
//     chrome.tabs.query({
//         active: true,
//         currentWindow: true
//     }, tabs => {
//         chrome.tabs.sendMessage(
//         tabs[0].id,
//         {from: 'popup', subject: 'quality updated', quality: qualitySet},
//         setQualityInfo
//         );
//     });
// })

// document.getElementById('custom').addEventListener("click", function(){
//     qualitySet = "720p"
//     document.getElementById('customQuality').style.visibility = "visible"
//     document.getElementById('setQuality720p').style.borderBottom = '3px solid green'
//     document.getElementById('setQuality144p').style.borderBottom = 'transparent'
//     document.getElementById('setQuality240p').style.borderBottom = 'transparent'
//     document.getElementById('setQuality360p').style.borderBottom = 'transparent'
//     document.getElementById('setQuality480p').style.borderBottom = 'transparent'
//     document.getElementById('setQuality1080p').style.borderBottom = 'transparent'
//     chrome.tabs.query({
//         active: true,
//         currentWindow: true
//     }, tabs => {
//         chrome.tabs.sendMessage(
//         tabs[0].id,
//         {from: 'popup', subject: 'quality updated', quality: qualitySet},
//         setQualityInfo
//         );
//     });
// })

// var currentTrees = ["treeCurrent1", "treeCurrent2", "treeCurrent3", "treeCurrent4", "treeCurrent5", "treeCurrent6", "treeCurrent7", "treeCurrent8", "treeCurrent9", "treeCurrent10"]
// for(var i = 0; i < currentTrees.length; i ++){
//     if((Math.round(Number(qualitySet.slice(0, -1)) * 0.5))/100 > i){
//         document.getElementById(currentTrees[i]).style.visibility = 'visible'
//         document.getElementById('treeNumber').textContent = i + 1
//     }else{
//         document.getElementById(currentTrees[i]).style.visibility = 'hidden'
//     }
// }

document.getElementById("moreInfomation").style.visibility = "collapse";
var moreInformation = document.getElementById('discoverMore')
moreInformation.addEventListener("click", function(){
    document.getElementById("popup").style.visibility = "hidden";
    document.getElementById('popup').style.width = "0px"
    document.getElementById('popup').style.height = "0px"
    document.getElementById("moreInfomation").style.visibility = "visible";
    document.getElementById('moreInfomation').style.width = "500px"
    document.getElementById('moreInfomation').style.height = "600px"
})

var back = document.getElementById('back')
back.addEventListener("click", function(){
    document.getElementById("moreInfomation").style.visibility = "hidden";
    document.getElementById('moreInfomation').style.width = "0px"
    document.getElementById('moreInfomation').style.height = "0px"
    document.getElementById("popup").style.visibility = "visible";
    document.getElementById('popup').style.width = "500px"
    document.getElementById('popup').style.height = "600px"
})

// document.getElementById('setQuality144p').addEventListener("click", function(){
//     qualitySet = "144p"
//     // document.getElementById('setQuality').textContent = "144p"
//     // document.getElementById('setQualityEnergy').textContent = "144p"
//     document.getElementById('setQuality144p').style.borderBottom = '3px solid green'
//     document.getElementById('setQuality240p').style.borderBottom = 'transparent'
//     document.getElementById('setQuality480p').style.borderBottom = 'transparent'
//     document.getElementById('setQuality720p').style.borderBottom = 'transparent'
//     document.getElementById('setQuality1080p').style.borderBottom = 'transparent'
//     // document.getElementById('mbsTransferredBefore').textContent = Math.round(Number(qualitySet.slice(0, -1)) * 0.95)
//     // document.getElementById('mbsTransferredAfter').textContent = Math.round(Number(qualitySet.slice(0, -1)) * 0.85)
//     // document.getElementById('energyTransferredAfter').textContent = Math.round(Number(qualitySet.slice(0, -1)) * 0.5)
//     // for(var i = 0; i < currentTrees.length; i ++){
//     //     if((Math.round(Number(qualitySet.slice(0, -1)) * 0.5))/100 > i){
//     //         document.getElementById(currentTrees[i]).style.visibility = 'visible'
//     //         document.getElementById('treeNumber').textContent = i + 1
//     //     }else{
//     //         document.getElementById(currentTrees[i]).style.visibility = 'hidden'
//     //     }
//     // }
// })

// document.getElementById('setQuality240p').addEventListener("click", function(){
//     qualitySet = "240p"
//     // document.getElementById('setQuality').textContent = "240p"
//     // document.getElementById('setQualityEnergy').textContent = "240p"
//     document.getElementById('setQuality240p').style.borderBottom = '3px solid green'
//     document.getElementById('setQuality144p').style.borderBottom = 'transparent'
//     document.getElementById('setQuality480p').style.borderBottom = 'transparent'
//     document.getElementById('setQuality720p').style.borderBottom = 'transparent'
//     document.getElementById('setQuality1080p').style.borderBottom = 'transparent'
//     // document.getElementById('mbsTransferredBefore').textContent = Math.round(Number(qualitySet.slice(0, -1)) * 0.95)
//     // document.getElementById('mbsTransferredAfter').textContent = Math.round(Number(qualitySet.slice(0, -1)) * 0.85)
//     // document.getElementById('energyTransferredAfter').textContent = Math.round(Number(qualitySet.slice(0, -1)) * 0.5)
//     // for(var i = 0; i < currentTrees.length; i ++){
//     //     if((Math.round(Number(qualitySet.slice(0, -1)) * 0.5))/100 > i){
//     //         document.getElementById(currentTrees[i]).style.visibility = 'visible'
//     //         document.getElementById('treeNumber').textContent = i + 1
//     //     }else{
//     //         document.getElementById(currentTrees[i]).style.visibility = 'hidden'
//     //     }
//     // }
// })

// document.getElementById('setQuality480p').addEventListener("click", function(){
//     qualitySet = "480p"
//     // document.getElementById('setQuality').textContent = "480p"
//     // document.getElementById('setQualityEnergy').textContent = "480p"
//     document.getElementById('setQuality480p').style.borderBottom = '3px solid green'
//     document.getElementById('setQuality144p').style.borderBottom = 'transparent'
//     document.getElementById('setQuality240p').style.borderBottom = 'transparent'
//     document.getElementById('setQuality720p').style.borderBottom = 'transparent'
//     document.getElementById('setQuality1080p').style.borderBottom = 'transparent'
//     // document.getElementById('mbsTransferredBefore').textContent = Math.round(Number(qualitySet.slice(0, -1)) * 0.95)
//     // document.getElementById('mbsTransferredAfter').textContent = Math.round(Number(qualitySet.slice(0, -1)) * 0.85)
//     // document.getElementById('energyTransferredAfter').textContent = Math.round(Number(qualitySet.slice(0, -1)) * 0.5)
//     // for(var i = 0; i < currentTrees.length; i ++){
//     //     if((Math.round(Number(qualitySet.slice(0, -1)) * 0.5))/100 > i){
//     //         document.getElementById(currentTrees[i]).style.visibility = 'visible'
//     //         document.getElementById('treeNumber').textContent = i + 1
//     //     }else{
//     //         document.getElementById(currentTrees[i]).style.visibility = 'hidden'
//     //     }
//     // }
// })

// document.getElementById('setQuality720p').addEventListener("click", function(){
//     qualitySet = "720p"
//     // document.getElementById('setQuality').textContent = "720p"
//     // document.getElementById('setQualityEnergy').textContent = "720p"
//     document.getElementById('setQuality720p').style.borderBottom = '3px solid green'
//     document.getElementById('setQuality144p').style.borderBottom = 'transparent'
//     document.getElementById('setQuality240p').style.borderBottom = 'transparent'
//     document.getElementById('setQuality480p').style.borderBottom = 'transparent'
//     document.getElementById('setQuality1080p').style.borderBottom = 'transparent'
//     // document.getElementById('mbsTransferredBefore').textContent = Math.round(Number(qualitySet.slice(0, -1)) * 0.95)
//     // document.getElementById('mbsTransferredAfter').textContent = Math.round(Number(qualitySet.slice(0, -1)) * 0.85)
//     // document.getElementById('energyTransferredAfter').textContent = Math.round(Number(qualitySet.slice(0, -1)) * 0.5)
//     // for(var i = 0; i < currentTrees.length; i ++){
//     //     if((Math.round(Number(qualitySet.slice(0, -1)) * 0.5))/100 > i){
//     //         document.getElementById(currentTrees[i]).style.visibility = 'visible'
//     //         document.getElementById('treeNumber').textContent = i + 1
//     //     }else{
//     //         document.getElementById(currentTrees[i]).style.visibility = 'hidden'
//     //     }
//     // }
// })

// document.getElementById('setQuality1080p').addEventListener("click", function(){
//     qualitySet = "1080p"
//     // document.getElementById('setQuality').textContent = "1080p"
//     // document.getElementById('setQualityEnergy').textContent = "1080p"
//     document.getElementById('setQuality1080p').style.borderBottom = '3px solid green'
//     document.getElementById('setQuality144p').style.borderBottom = 'transparent'
//     document.getElementById('setQuality240p').style.borderBottom = 'transparent'
//     document.getElementById('setQuality480p').style.borderBottom = 'transparent'
//     document.getElementById('setQuality720p').style.borderBottom = 'transparent'
//     // document.getElementById('mbsTransferredBefore').textContent = Math.round(Number(qualitySet.slice(0, -1)) * 0.95)
//     // document.getElementById('mbsTransferredAfter').textContent = Math.round(Number(qualitySet.slice(0, -1)) * 0.85)
//     // document.getElementById('energyTransferredAfter').textContent = Math.round(Number(qualitySet.slice(0, -1)) * 0.5)
//     // for(var i = 0; i < currentTrees.length; i ++){
//     //     if((Math.round(Number(qualitySet.slice(0, -1)) * 0.5))/100 > i){
//     //         document.getElementById(currentTrees[i]).style.visibility = 'visible'
//     //         document.getElementById('treeNumber').textContent = i + 1
//     //     }else{
//     //         document.getElementById(currentTrees[i]).style.visibility = 'hidden'
//     //     }
//     // }
// })

// const width = window.screen.width * window.devicePixelRatio;
// const height = window.screen.height * window.devicePixelRatio;
// const screenQuality = height
// document.getElementById('currentWidth').textContent = width;
// document.getElementById('currentHeight').textContent = height;
// document.getElementById('screenQuality').textContent = screenQuality
// document.getElementById('currentFrameRate').textContent = 60
// document.getElementById('setQualityCurrentVideo').textContent = qualitySet
// document.getElementById('setQualityEnergyCurrentVideo').textContent = qualitySet

// Update the relevant fields with the new data.
// const setInfo = info => {
//     console.log("all info", info)
//     qualitySet = info.setQuality
//     qualityBefore = info.qualityBefore
//     document.getElementById('currentVideoName').textContent = info.currentVideoName
//     document.getElementById('mbsTransferredSavedCurrentVideo').textContent = info.currentVideoDataSaved
//     document.getElementById('energySavedCurrentVideo').textContent = info.currentVideoEnergySaved
//     document.getElementById('totalDataSaved').textContent = info.totalDataSaved
//     document.getElementById('totalEnergySaved').textContent = info.totalEnergySaved
//   };
  
//   window.addEventListener('DOMContentLoaded', () => {
//     chrome.tabs.query({
//       active: true,
//       currentWindow: true
//     }, tabs => {
//       chrome.tabs.sendMessage(
//         tabs[0].id,
//         {from: 'popup', subject: 'url', message: qualitySet, qualityBefore: qualityBefore, frameRate: getScreenFrameRate()},
//       setInfo);
//     });
//   });


    // var setQuality144p = document.getElementById('setQuality144p')
    // var setQuality240p = document.getElementById('setQuality240p')
    // var setQuality480p = document.getElementById('setQuality480p')
    // var setQuality720p = document.getElementById('setQuality720p')
    // var setQuality1080p = document.getElementById('setQuality1080p')

    // setQuality144p.addEventListener("click", function(){
    //     chrome.tabs.query({
    //         active: true,
    //         currentWindow: true
    //     }, tabs => {
    //     // ...and send a request for the DOM info...
    //     chrome.tabs.sendMessage(
    //         tabs[0].id,
    //         {from: 'popup', subject: 'setQuality', message: "144p"},
    //         setUrlInfo);
    //     });
    // })
    // setQuality240p.addEventListener("click", function(){ chrome.tabs.query({
    //     active: true,
    //     currentWindow: true
    // }, tabs => {
    // // ...and send a request for the DOM info...
    // chrome.tabs.sendMessage(
    //     tabs[0].id,
    //     {from: 'popup', subject: 'setQuality', message: "240p"},
    //     setUrlInfo);
    // });})
    // setQuality480p.addEventListener("click", function(){
    //     chrome.tabs.query({
    //         active: true,
    //         currentWindow: true
    //     }, tabs => {
    //     // ...and send a request for the DOM info...
    //     chrome.tabs.sendMessage(
    //         tabs[0].id,
    //         {from: 'popup', subject: 'setQuality', message: "480p"},
    //         setUrlInfo);
    //     });
    // })
    // setQuality720p.addEventListener("click", function(){ chrome.tabs.query({
    //     active: true,
    //     currentWindow: true
    // }, tabs => {
    // // ...and send a request for the DOM info...
    // chrome.tabs.sendMessage(
    //     tabs[0].id,
    //     {from: 'popup', subject: 'setQuality', message: "720p"},
    //     setUrlInfo);
    // });})
    // setQuality1080p.addEventListener("click", function(){ chrome.tabs.query({
    //     active: true,
    //     currentWindow: true
    // }, tabs => {
    // // ...and send a request for the DOM info...
    // chrome.tabs.sendMessage(
    //     tabs[0].id,
    //     {from: 'popup', subject: 'setQuality', message: "1080p"},
    //     setUrlInfo);
    // });})

// Update the relevant fields with the new data.
// const setDOMInfo = info => {
//     document.getElementById('total').textContent = info.total;
//     document.getElementById('inputs').textContent = info.inputs;
//     document.getElementById('buttons').textContent = info.buttons;
//   };
  
//   // Once the DOM is ready...
//   window.addEventListener('DOMContentLoaded', () => {
//     // ...query for the active tab...
//     chrome.tabs.query({
//       active: true,
//       currentWindow: true
//     }, tabs => {
//       // ...and send a request for the DOM info...
//       chrome.tabs.sendMessage(
//           tabs[0].id,
//           {from: 'popup', subject: 'DOMInfo'},
//           // ...also specifying a callback to be called 
//           //    from the receiving end (content script).
//           setDOMInfo);
//     });
//   });

// chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
//     console.log(response.farewell);
// });

// var currentUrl = ""
// var qualitySet = ""

// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//       // listen for messages sent from background.js
//       if (request.message === 'frontend') {
//         console.log("frontend", request.url) // new url is now in content scripts!
//       }
//   });


// function main() {
//     setQuality()
// }

// function getCurrentUrl(){
//     console.log('here 1')
//     chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
//         let url = tabs[0].url;
//         if(currentUrl !== url){
//             setQuality()
//             currentUrl = url
//             console.log(url)
//         }
//     });
// }

// function setQuality(){
//     var setQuality144p = document.getElementById('setQuality144p')
//     var setQuality240p = document.getElementById('setQuality240p')
//     var setQuality480p = document.getElementById('setQuality480p')
//     var setQuality720p = document.getElementById('setQuality720p')
//     var setQuality1080p = document.getElementById('setQuality1080p')

//     setQuality144p.addEventListener("click", function(){qualitySet = "144p"})
//     setQuality240p.addEventListener("click", function(){qualitySet = "240p"})
//     setQuality480p.addEventListener("click", function(){qualitySet = "480p"})
//     setQuality720p.addEventListener("click", function(){qualitySet = "720p"})
//     setQuality1080p.addEventListener("click", function(){qualitySet = "1080p"})
// }


// function main() {
//     var screen = getScreenDetails() //Screen Resolution and Quality
//     var frameRate = getScreenFrameRate() //Screen Frame Rate
//     var dataTransferredBefore = calculateDataTransferred(screen.screenQuality, frameRate) // Data Transferred

//     var setQuality = "720p"
//     var loadedQuality = false
//     setQuality = getSetQuality(loadedQuality)

//     console.log(setQuality)

//     var setFrame = "60"
//     var dataTransferredAfter = calculateDataTransferred(setQuality, frameRate) // Data Transferred

//     calculateEnergyAndDataSaved(dataTransferredBefore, dataTransferredAfter, screen.screenQuality, setQuality, frameRate, setFrame)
//     //need to work out costs of streaming each video quality type -> energy used
// }

// function getSetQuality(loadedQuality){

//     var setQuality = ""
//     while(!loadedQuality){
//         var setQuality144p = document.getElementById('setQuality144p')
//         var setQuality240p = document.getElementById('setQuality240p')
//         var setQuality480p = document.getElementById('setQuality480p')
//         var setQuality720p = document.getElementById('setQuality720p')
//         var setQuality1080p = document.getElementById('setQuality1080p')

//         setQuality = setQuality144p.addEventListener('click', function(){return "144p"});
//         setQuality240p.addEventListener('click', function(setQuality){setQuality = "240p"});
//         setQuality480p.addEventListener('click', function(setQuality){setQuality = "480p"});
//         setQuality720p.addEventListener('click', function(setQuality){setQuality = "720p"});
//         setQuality1080p.addEventListener('click', function(setQuality){setQuality = "1080p"});

//         console.log(setQuality)

//         console.log(loadedQuality)

//         if(setQuality != ""){
//             loadedQuality = true
//             if(setQuality != "144p") document.getElementById('setQuality144p').textContent = screenQuality //setting opacity
//             if(setQuality != "240p") document.getElementById('setQuality240p').textContent = screenQuality //setting opacity
//             if(setQuality != "480p") document.getElementById('setQuality480p').textContent = screenQuality //setting opacity
//             if(setQuality != "720p") document.getElementById('setQuality720p').textContent = screenQuality //setting opacity
//             if(setQuality != "1080p") document.getElementById('setQuality1080p').textContent = screenQuality //setting opacity
//             setQualityOnPage() //set selected quality as auto on page
//         }
//     }

//     console.log("set", setQuality)
//     return setQuality
// }

// function getScreenDetails(){
//     const width = window.screen.width * window.devicePixelRatio;
//     const height = window.screen.height * window.devicePixelRatio;
//     const screenQuality = height
//     document.getElementById('currentWidth').textContent = width;
//     document.getElementById('currentHeight').textContent = height;
//     document.getElementById('screenQuality').textContent = screenQuality
//     return {
//         width,
//         height,
//         screenQuality
//     }
// }

// function getScreenFrameRate(){
//     if (!window.requestAnimationFrame) {
//         window.requestAnimationFrame =
//             window.mozRequestAnimationFrame ||
//             window.webkitRequestAnimationFrame;
//     }
//     var t = [];
//     var fps
//     function animate(now) {
//         t.unshift(now);
//         if (t.length > 10) {
//             var t0 = t.pop();
//             fps = Math.floor(1000 * 10 / (now - t0));
//             document.getElementById('currentFrameRate').textContent = fps
//         }
//         window.requestAnimationFrame(animate);
//     };
//     window.requestAnimationFrame(animate);
//     return fps
// }

// function calculateDataTransferred(quality, frameRate){
//     var videoQuality = quality //needs to be done
//     var videoFrameRate = frameRate //needs to be done
//     // var videoLength = document.getElementsByClassName('ytp-time-duration')[0].innerText //needs to be done
//     // videoLength.split(":") //needs to be done
//     var videoLength = ["22", "31"]
//     var videoLengthSeconds = (Number(videoLength[0]) * 60) + Number(videoLength[1])
//     var videoQuality480_60 = 562.5 / 60 / 60 //https://inews.co.uk/news/technology/data-netflix-youtube-spotify-how-much-streaming-video-music-mobile-internet-allowance-388089
//     var videoQuality720_60 = 1860 / 60 / 60 // MB/s
//     var videoQuality1080_60 = 3040 / 60 / 60
//     var videoQuality4k_60 = 15980 / 60 / 60

//     var MBsTransferred = 0
//     if(videoQuality === "480p" && videoFrameRate === "60"){
//         MBsTransferred = videoLengthSeconds * videoQuality480_60
//     }else if(videoQuality === "720p" && videoFrameRate === "60"){
//         MBsTransferred = videoLengthSeconds * videoQuality720_60
//     }else if(videoQuality === "1080p" && videoFrameRate === "60"){
//         MBsTransferred = videoLengthSeconds * videoQuality1080_60
//     }else if(videoQuality === "4k" && videoFrameRate === "60"){
//         MBsTransferred = videoLengthSeconds * videoQuality4k_60
//     }else{
//         MBsTransferred = 0
//     }

//     Math.round(MBsTransferred) //needs to be rounded 

//     // console.log("here", MBsTransferred)

//     if(MBsTransferred !== 0){
//         String(MBsTransferred)
//         document.getElementById("mbsTransferred").textContent = MBsTransferred
//     }else{
//         document.getElementById("mbsTransferred").textContent = "No MBs detected"
//     }
//     return MBsTransferred
// }

// function calculateEnergyAndDataSaved(dataTransferredBefore, dataTransferredAfter, qualityBefore, qualityAfter, frameBefore, frameAfter){
//     document.getElementById('dataSaved').textContent = (dataTransferredAfter - dataTransferredBefore)
//     document.getElementById('energySaved').textContent = (dataTransferredAfter - dataTransferredBefore) * 100 //energy calculation needed
// }

// main()

// what data is youtube / amazon prime


// To Do
// Set streaming quality (User) and on actual youtube

// Calculate Streaming usage for both
// Calculate energy saved
// show on frontend
// save overall usage saved
// video usage saved individually
// hotjar

