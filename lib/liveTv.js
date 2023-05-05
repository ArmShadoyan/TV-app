var tvChanelI = 0;
var filterMenuI = 0;
var liveObj = {};
var chanels = [];
var categorys = [];
var favoriteItems = [];
var filteredEpg = [];
var filteredCat = [];
var epgTimer;
var chanelsCount = 8;
var nextChanel = 1;
var prevChanel = 1;
var menuTransform = 0;
if (localStorage.getItem("favorites")) {
  favoriteItems = JSON.parse(localStorage.getItem("favorites"));
  console.log(favoriteItems);
}
function createTvElements() {
  var filterMenu = document.createElement("div");
  var filterIcon = document.createElement("div");
  var filterText = document.createElement("div");
  var listsBlock = document.createElement("div");
  var chanelsBlock = document.createElement("div");
  var chanelsFilterMenu = document.createElement("div");
  var chanelsInner = document.createElement("div");
  var menu = document.createElement("div");
  var filterMenuParent = document.createElement("div");
  chanelsInner.classList.add("chanels-inner");
  chanelsInner.style.display = "flex";
  chanelsInner.style.opacity = "1";
  menu.classList.add("filter-menu");
  filterMenuParent.classList.add("filter-menu-parent");
  filterMenu.classList.add("chanel-menu-title-block");
  chanelsBlock.classList.add("chanels-block");
  chanelsFilterMenu.classList.add("chanels-filter-menu", "chanels-block");
  chanelsFilterMenu.style.display = "flex";
  listsBlock.classList.add("lists-block");
  filterIcon.classList.add("filter-menu-icon");
  filterText.classList.add("filter-menu-title");
  filterText.textContent = "All";

  // debugger

  filterMenuParent.append(menu);
  chanelsBlock.append(chanelsInner, filterMenuParent);
  listsBlock.append(filterMenu, chanelsBlock);
  filterMenu.append(filterIcon, filterText);
  return listsBlock;
}
function createPlayerBlock() {
  var playerBlock = document.createElement("div");
  var timeBlock = document.createElement("div");
  var VideoBlock = document.createElement("div");
  var video = document.createElement("video");
  var currentChanel = document.createElement("div");
  var currentChanelInfo = document.createElement("div");
  var currentChanelName = document.createElement("div");
  var currentChanelNumber = document.createElement("div");
  var currentChanelEpg = document.createElement("div");
  var currentEpg = document.createElement("div");
  var nextEpg = document.createElement("div");
  var optionsBlock = document.createElement("div");
  var sortBtn = document.createElement("div");
  var sortRed = document.createElement("div");
  var redBtn = document.createElement("div");
  var categoryBtn = document.createElement("div");
  var categoryGreen = document.createElement("div");
  var greenBtn = document.createElement("div");
  var favoritesBtn = document.createElement("div");
  var favoriteYellow = document.createElement("div");
  var yellowBtn = document.createElement("div");
  var menuBtn = document.createElement("div");
  var menuBlue = document.createElement("div");
  var blueBtn = document.createElement("div");
  var chanelNumber = document.createElement("div");
  var chanelInfo = document.createElement("div");
  var time = document.createElement("div");
  var date = document.createElement("div");
  playerBlock.classList.add("player-block");
  timeBlock.classList.add("time-block");
  VideoBlock.classList.add("video-block");
  video.classList.add("video");
  video.autoplay = true;
  currentChanel.classList.add("current-chanel");
  currentChanelInfo.classList.add("current-chanel-info");
  currentChanelName.classList.add("current-chanel-name");
  currentChanelNumber.classList.add("current-chanel-number");
  currentChanelEpg.classList.add("current-chanel-epg");
  currentEpg.classList.add("current-epg");
  nextEpg.classList.add("next-epg");
  optionsBlock.classList.add("options-block");
  chanelNumber.classList.add("chanel-number");
  chanelInfo.classList.add("chanel-info");
  time.classList.add("time");
  date.classList.add("date");
  sortBtn.classList.add("sort-btn", "option-btn");
  sortRed.classList.add("sort-red");
  redBtn.classList.add("red-btn", "color-btn");
  categoryBtn.classList.add("category-btn", "option-btn");
  greenBtn.classList.add("green-btn", "color-btn");
  favoritesBtn.classList.add("favorite-btn", "option-btn");
  yellowBtn.classList.add("yellow-btn", "color-btn");
  menuBtn.classList.add("menu-btn", "option-btn");
  blueBtn.classList.add("blue-btn", "color-btn");
  sortBtn.textContent = "Sort";
  categoryBtn.textContent = "category";
  favoritesBtn.textContent = "Favorites";
  menuBtn.textContent = "Menu";
  favoritesBtn.addEventListener("click", function (e) {
    var activeChanel = document.querySelector(".chanel-item-active");
    var fav = activeChanel.querySelector(".chanel-favorite");
    if (!fav.classList.contains("chanel-favorite-active")) {
      fav.classList.add("chanel-favorite-active");
      activeChanel.classList.add("chanel-item-fav");
      // chanels.forEach(item => {
      // 	if(item.name === activeChanel.querySelector(".chanel-title").textContent){
      // 		item.favorite = "true";									
      // 		favoriteItems.push(item);
      // 		localStorage.setItem("favorites",JSON.stringify(favoriteItems));
      // 	}
      // });
      for (var i = 0; i < chanels.length; i++) {
        var item = chanels[i];
        if (item.name === activeChanel.querySelector(".chanel-title").textContent) {
          item.favorite = "true";
          favoriteItems.push(item);
          localStorage.setItem("favorites", JSON.stringify(favoriteItems));
        }
      }
    } else {
      fav.classList.remove("chanel-favorite-active");
      activeChanel.classList.remove("chanel-item-fav");
      // chanels.forEach((item,index) => {
      // 	if(item.name === activeChanel.querySelector(".chanel-title").textContent){
      // 		console.log(item);	
      // 		favoriteItems.forEach((fav,index) => {
      // 			if(fav.name === item.name){
      // 				favoriteItems.splice(index,1);
      // 				console.log(favoriteItems);
      // 			}
      // 		});
      // 	}
      // });
      for (var j = 0; j < chanels.length; j++) {
        var item = chanels[j];
        var index = j;
        if (item.name === activeChanel.querySelector(".chanel-title").textContent) {
          for (var a = 0; a < favoriteItems.length; a++) {
            var fav = favoriteItems[a];
            if (fav.name === item.name) {
              favoriteItems.splice(a, 1);
              console.log(favoriteItems);
            }
          }
        }
      }
      localStorage.setItem("favorites", JSON.stringify(favoriteItems));
    }
  });
  sortBtn.append(redBtn, sortRed);
  categoryBtn.append(greenBtn, categoryGreen);
  favoritesBtn.append(yellowBtn, favoriteYellow);
  menuBtn.append(blueBtn, menuBlue);
  playerBlock.append(timeBlock, VideoBlock, currentChanel, optionsBlock);
  VideoBlock.append(video);
  currentChanel.append(currentChanelNumber, currentChanelInfo);
  currentChanelInfo.append(currentChanelName, currentChanelEpg);
  optionsBlock.append(sortBtn, categoryBtn, favoritesBtn, menuBtn);
  timeBlock.append(date, time);
  currentChanelEpg.append(currentEpg, nextEpg);
  return playerBlock;
}
function currentTime() {
  var date = new Date();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var day = date.getDate();
  var hours = date.getHours();
  var minuts = date.getMinutes();
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minuts < 10) {
    minuts = "0" + minuts;
  }
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  document.querySelector(".date").textContent = "\n\t\t".concat(year, "/").concat(month, "/").concat(day, "\n\t");
  document.querySelector(".time").textContent = "\n\t\t".concat(hours, ":").concat(minuts, "\n\t");
  setTimeout(function () {
    currentTime();
  }, 10000);
}
function printChanelsList(items, name) {
  var chanelsBlock = document.querySelector(".chanels-block");
  var chanelsInner = document.querySelector(".chanels-inner");
  var menu = document.querySelector(".filter-menu");
  var menuParent = document.querySelector(".filter-menu-parent");

  // items.forEach((item,index) => {

  // 		if(name === "filterMenu"){
  // 			menu.append(createChanelItem(item))
  // 		}else{
  // 			if(index < 8){
  // 				chanelsInner.append(createChanelItem(item))
  // 			}
  // 		}
  // });
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    if (name === "filterMenu") {
      menu.append(createChanelItem(item));
    } else {
      if (i < 8) {
        chanelsInner.append(createChanelItem(item));
      }
    }
  }
  // qwert
  menuParent.append(menu);
  chanelsBlock.append(chanelsInner, menuParent);
  // chanelsBlock.append(chanelsInner,menu);
}

function createChanelItem(item) {
  var chanelItem = document.createElement("div");
  var number = document.createElement("div");
  var logo = document.createElement("div");
  var title = document.createElement("div");
  var favorite = document.createElement("div");

  // favoriteItems.forEach(fav => {
  // 	if(item.name === fav.name){
  // 		favorite.classList.add("chanel-favorite-active");
  // 	}
  // });
  for (var i = 0; i < favoriteItems.length; i++) {
    var fav = favoriteItems[i];
    if (item.name === fav.name) {
      favorite.classList.add("chanel-favorite-active");
    }
  }
  number.classList.add("chanel-number");
  logo.classList.add("chanel-logo");
  title.classList.add("chanel-title");
  favorite.classList.add("chanel-favorite");
  chanelItem.classList.add("chanel-item");
  if (item.num) {
    var img = new Image();
    img.onload = function () {
      logo.style.backgroundImage = "url(".concat(img.src, ")");
    };
    img.onerror = function () {
      logo.style.backgroundImage = "url(imgs/logo-large.png)";
    };
    number.textContent = "".concat(item.num);
    img.src = item.stream_icon;
    title.textContent = "".concat(item.name);
    chanelItem.append(number, logo, title, favorite);
    // chanelsInner.append(chanelItem);
    chanelItem.classList.add("control-chanels");
  } else {
    title.textContent = "".concat(item);
    chanelItem.append(title);
    title.classList.add("filter-menu-list-title");
    // menu.append(chanelItem);
    chanelItem.classList.add("filter-menu-item");
    if (item === "All") {
      chanelItem.classList.add("All");
    }
  }
  chanelItem.addEventListener("click", function () {
    if (document.querySelector(".chanel-item-selected")) {
      document.querySelector(".chanel-item-selected").classList.remove("chanel-item-selected");
    }
    if (!chanelItem.classList.contains("chanel-item-selected")) {
      chanelItem.classList.add("chanel-item-selected");
    }
    filteredEpg = [];
    var chanelTitle = title.textContent;
    if (item.name === document.querySelector(".chanel-item-selected").querySelector(".chanel-title").textContent) {
      if (document.querySelector(".video")) {
        document.querySelector(".video").src = "".concat(urlParams.playerBase, "/MYOWN1/Meins321/").concat(item.stream_id);
      }
    }
    if (document.querySelector(".chanels-inner").style.opacity === "1") {
      // debugger
      if (chanelTitle === item.name) {
        if (document.querySelector(".current-chanel-number")) {
          document.querySelector(".current-chanel-number").textContent = item.num;
        }
        if (document.querySelector(".current-chanel-name")) {
          document.querySelector(".current-chanel-name").textContent = item.name;
        }
        getRequest(baseUrl, urlParams.loginUrl, urlParams.epg, item.stream_id).then(function (categorys) {
          categorys = categorys.json();
          return categorys;
        }).then(function (categorys) {
          clearTimeout(epgTimer);
          updateEpgs(categorys);
        });
      }
    }
  });
  return chanelItem;
}
function chanelItemsRender(side) {
  // debugger

  var items = document.querySelectorAll(".chanels-inner .chanel-item");
  var block = document.querySelector(".chanels-inner");
  nextChanel = filteredCat[chanelsCount];
  prevChanel = filteredCat[chanelsCount - 9];
  if (side === "bottom") {
    items[0].remove();
    block.append(createChanelItem(nextChanel));
    chanelsCount++;
  } else if (side === "top") {
    items[items.length - 1].remove();
    block.prepend(createChanelItem(prevChanel));
    chanelsCount--;
  }
  nextChanel = filteredCat[chanelsCount];
  prevChanel = filteredCat[chanelsCount - 9];
}
function updateEpgs(categorys) {
  // categorys.epg_listings.forEach(list =>{
  // 	var liveDate = list.start.split(" ")[0].split("-").join("");
  // 	if(document.querySelector(".date")){
  // 		var currentDate = document.querySelector(".date").innerText.split("/").join("");
  // 		if(liveDate == currentDate){
  // 			filteredEpg.push(list);
  // 		}
  // 	}
  // });
  for (var i = 0; i < categorys.epg_listings.length; i++) {
    var list = categorys.epg_listings[i];
    var liveDate = list.start.split(" ")[0].split("-").join("");
    if (document.querySelector(".date")) {
      var currentDate = document.querySelector(".date").innerText.split("/").join("");
      if (liveDate == currentDate) {
        filteredEpg.push(list);
      }
    }
  }
  var currentEpgs = [];
  var nextEpgs = [];
  // filteredEpg.forEach((epg,index) => {
  // 	var currentHour = document.querySelector(".time").innerText.split(":")[0];
  // 	var currentMinute = document.querySelector(".time").innerText.split(":")[1];

  // 	var start = toDate(epg.start_timestamp).split(":").join("");
  // 	var end = toDate(epg.stop_timestamp).split(":").join("");
  // 	var time = document.querySelector(".time").innerText.split(":").join("");
  // 		if(+time < +end && +time > +start){
  // 			currentEpgs.push(filteredEpg[index]);
  // 			nextEpgs.push(filteredEpg[index+1])
  // 		} 
  // });
  for (let j = 0; j < filteredEpg.length; j++) {
    var epg = filteredEpg[j];
    var currentHour = document.querySelector(".time").innerText.split(":")[0];
    var currentMinute = document.querySelector(".time").innerText.split(":")[1];
    var start = toDate(epg.start_timestamp).split(":").join("");
    var end = toDate(epg.stop_timestamp).split(":").join("");
    var time = document.querySelector(".time").innerText.split(":").join("");
    if (+time < +end && +time > +start) {
      currentEpgs.push(filteredEpg[j]);
      nextEpgs.push(filteredEpg[j + 1]);
    }
  }
  var currentEpg = currentEpgs[0];
  var nextEpg = nextEpgs[0];
  if (currentEpg) {
    document.querySelector(".current-epg").innerHTML = "<span>".concat(toDate(currentEpg.start_timestamp), "</span> ").concat(enCode(currentEpg.title));
  } else {
    document.querySelector(".current-epg").innerHTML = "<span> -- -- </span><span> Program not found </span>";
  }
  if (nextEpg) {
    document.querySelector(".next-epg").innerHTML = "<span>".concat(toDate(nextEpg.start_timestamp), "</span> ").concat(enCode(nextEpg.title));
  } else {
    document.querySelector(".next-epg").innerHTML = "<span> -- -- </span><span> Program not found </span>";
  }
  epgTimer = setTimeout(function () {
    updateEpgs(categorys);
  }, 15000);
}
function chanelsSerachBack() {
  document.querySelector(".chanel-menu-title-block").addEventListener("click", function () {
    if (document.querySelector(".keyboard").classList.contains("live-keyboard")) {
      showChanelsMenu();
      document.querySelector(".player-block").style.transform = "translateX(0)";
      document.querySelector(".chanels-search-inputblock").style.transform = "translateX(110%)";
      document.querySelector(".keyboard").classList.remove("live-keyboard");
    } else {
      showChanelsMenu();
    }
  });
}
function showChanelsMenu() {
  // debugger
  var chanelsInner = document.querySelector(".chanels-inner");
  if (chanelsInner) {
    if (chanelsInner.style.opacity === "1") {
      chanelsInner.style.transform = "scale(0.4)";
      chanelsInner.style.opacity = "0";
      document.querySelector(".filter-menu-parent").style.transform = "translateX(0rem)";
      // document.querySelector(".filter-menu").style.transform = `translateY(${menuTransform}rem)`;		
      // document.querySelector(".filter-menu").classList.remove("filter-menu-transform");
      currentBlock = "filter-menu";
      addRemFilterMenu();
      // document.querySelectorAll(".option-btn").forEach((item,index) => {
      // 	if(index !== document.querySelectorAll(".option-btn").length-1){
      // 		item.style.display = "none";
      // 	}
      // });
      for (var i = 0; i < document.querySelectorAll(".option-btn").length; i++) {
        var item = document.querySelectorAll(".option-btn")[i];
        if (i !== document.querySelectorAll(".option-btn").length - 1) {
          item.style.display = "none";
        }
      }
    } else {
      chanelsInner.style.display = "flex";
      chanelsInner.style.opacity = "1";
      chanelsInner.style.transform = "scale(1)";
      document.querySelector(".filter-menu-parent").style.transform = "translate(-100rem)";
      // document.querySelector(".filter-menu").classList.add("filter-menu-transform");
      currentBlock = "tv";
      if (document.querySelector(".keyboard").classList.contains("live-keyboard")) {
        currentBlock = "login";
      }
      // document.querySelectorAll(".option-btn").forEach((item,index) => {
      // 	if(index !== document.querySelectorAll(".option-btn").length-1){
      // 		item.style.display = "block";
      // 	}
      // });
      for (var j = 0; j < document.querySelectorAll(".option-btn").length; j++) {
        var item = document.querySelectorAll(".option-btn")[j];
        if (j !== document.querySelectorAll(".option-btn").length - 1) {
          item.style.display = "block";
        }
      }
    }
  }
  if (document.querySelector(".chanel-item-active")) {
    document.querySelector(".chanel-item-active").click();
  }
}
function chanelsOnClick() {
  var menuBtn = document.querySelector(".menu-btn");
  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      menuRender();
    });
  }
  var categoryBtn = document.querySelector(".category-btn");
  if (categoryBtn) {
    categoryBtn.addEventListener("click", function () {
      showChanelsMenu();
    });
  }
}
function filterMenuOnclick() {
  var items = document.getElementsByClassName("filter-menu-item");

  // items.forEach(item => {

  // });
  var active;
  for (var i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function (e) {
      // debugger
      active = this.textContent;
      console.log(this);
      filteredCat = [];
      nextChanel = 1;
      chanelsCount = 8;
      console.log(categorys);
      if (active === "All") {
        // debugger
        filteredCat = chanels;
        document.querySelector(".filter-menu-title").textContent = active;
        document.querySelector(".chanels-inner").innerHTML = "";
        printChanelsList(chanels, "chanels");
      } else if (active === "Favorites") {
        document.querySelector(".filter-menu-title").textContent = active;
        document.querySelector(".chanels-inner").innerHTML = "";
        console.log(favoriteItems);
        printChanelsList(favoriteItems, "favoriteItems");
        filteredCat = favoriteItems;
      } else if (active === "Search") {
        // debugger
        document.querySelector(".player-block").style.transform = "translateX(110%)";
        document.querySelector(".chanels-search-inputblock").style.transform = "translateX(0)";
        document.querySelector(".chanels-inner").innerHTML = "";
        printChanelsList(chanels, "chanels");
        document.querySelector(".keyboard").classList.add("live-keyboard");
        currentBlock = "login";
        rowIndex = 0;
        keyIndex = 0;
        // addRemLogin();
        keyboard_exist = true;
      } else {
        filteredCat = [];
        for (item in liveObj) {
          if (liveObj[item].category === active) {
            filteredCat = liveObj[item].chanels;
          }
        }
        // debugger

        document.querySelector(".chanels-inner").innerHTML = "";
        document.querySelector(".filter-menu-title").textContent = active;
        printChanelsList(filteredCat, "filteredCat");
      }
      setTimeout(function () {
        showChanelsMenu();
        if (active !== "Search") {
          currentBlock = "tv";
        }
      }, 1);
      tvChanelI = 0;
      addRemTvChanel();
      chanelsOnClick();
      return;
    });
  }
}
function createChanelsSearechInput() {
  // debugger
  var inputBlock = document.createElement("div");
  var tvBlock = document.createElement("div");
  var rightBlock = document.createElement("div");
  var input = document.createElement("input");
  inputBlock.append(input, print_keyboard(lettersKeyboard, input));
  inputBlock.classList.add("chanels-search-inputblock");
  input.classList.add("chanels-search-input");
  input.type = "text";
  rightBlock.classList.add("tv-right-block");
  tvBlock.classList.add("tv-block");
  tvBlock.append(createTvElements(), rightBlock);
  rightBlock.append(createPlayerBlock(), inputBlock);
  return tvBlock;
}
function toDate(temp) {
  var date = new Date(+temp * 1000);
  var hours = date.getHours();
  var minute = date.getMinutes();
  if (hours < 10) {
    hours = "0" + date.getHours();
  }
  if (minute < 10) {
    minute = "0" + date.getMinutes();
  }
  var time = hours + ":" + minute;
  return time;
}
function addRemTvChanel() {
  if (document.querySelector(".chanel-item-active")) {
    document.querySelector(".chanel-item-active").classList.remove("chanel-item-active");
  }
  if (document.querySelectorAll(".control-chanels")[tvChanelI]) {
    document.querySelectorAll(".control-chanels")[tvChanelI].classList.add("chanel-item-active");
  }
}
function addRemFilterMenu() {
  if (document.querySelector(".filter-menu-active")) {
    document.querySelector(".filter-menu-active").classList.remove("filter-menu-active");
  }
  document.querySelectorAll(".filter-menu-item")[filterMenuI].classList.add("filter-menu-active");
}
function tvControls(e) {
  // debugger
  var chanelItems = document.querySelectorAll(".control-chanels");
  var items = document.querySelectorAll(".chanels-inner .chanel-item");
  if (e.key === "ArrowDown") {
    // debugger
    console.log(tvChanelI);
    if (tvChanelI > 1 && nextChanel) {
      chanelItemsRender("bottom");
      addRemTvChanel();
    } else if (tvChanelI < chanelItems.length - 3) {
      tvChanelI++;
      addRemTvChanel();
    }
  } else if (e.key === "ArrowUp") {
    if (tvChanelI < chanelItems.length - 4 && prevChanel) {
      chanelItemsRender("top");
      addRemTvChanel();
    } else if (tvChanelI > 0) {
      tvChanelI--;
      addRemTvChanel();
    }
  } else if (e.key === "Backspace") {
    showChanelsMenu();
  } else if (e.key === "Enter") {
    document.querySelector(".chanel-item-active").click();
  }
}
function filterMenuControls(e) {
  var filterItems = document.querySelectorAll(".filter-menu-item");
  if (e.key === "ArrowDown") {
    if (filterMenuI > 1 && filterMenuI < filterItems.length - 4) {
      menuTransform -= 15.6;
      document.querySelector(".filter-menu").style.transform = "translateY(".concat(menuTransform, "rem)");
      filterMenuI++;
      addRemFilterMenu();
    } else if (filterMenuI < filterItems.length - 1) {
      filterMenuI++;
      addRemFilterMenu();
    }
  } else if (e.key === "ArrowUp") {
    // debugger
    if (filterMenuI > 2 && filterMenuI < filterItems.length - 3) {
      menuTransform += 15.6;
      document.querySelector(".filter-menu").style.transform = "translateY(".concat(menuTransform, "rem)");
      filterMenuI--;
      addRemFilterMenu();
    } else if (filterMenuI > 0) {
      filterMenuI--;
      addRemFilterMenu();
    }
    ;
  } else if (e.key === "ArrowRight") {
    // showChanelsMenu();
    document.querySelector(".filter-menu-item.All").click();
  } else if (e.key === "Enter") {
    document.querySelector(".filter-menu-active").click();
  } else if (e.key === "Backspace") {
    document.querySelector(".menu-btn").click();
  }
}
function enCode(str) {
  return window.atob(str);
}
function tvRender(chanels, filterMenu) {
  currentPage = "tv";
  root.innerHTML = "";
  root.append(createChanelsSearechInput());
  document.querySelector(".keyboard").classList.add("live-keyboard");
  document.querySelector(".keyboard").style.display = "flex";
  currentTime();
  printChanelsList(chanels, "chanels");
  filteredCat = chanels;
  printChanelsList(filterMenu, "filterMenu");
  tvChanelI = 0;
  filterMenuI = 0;
  menuTransform = 0;
  addRemTvChanel();
  addRemFilterMenu();
  chanelsSerachBack();
  filterMenuOnclick();
  // print_keyboard(vartersKeyboard,document.querySelector(".chanels-search-input") )

  document.querySelector(".chanel-item-active").classList.add("chanel-item-selected");
  // chanels.forEach(item => {
  // 	if(item.name === document.querySelector(".chanel-item-selected").querySelector(".chanel-title").textContent){
  // 		document.querySelector(".video").src = `http://79.143.180.88:25461/4/4/${item.stream_id}`;
  // 	}
  // });
  for (var i = 0; i < chanels.length; i++) {
    var item = chanels[i];
    if (item.name === document.querySelector(".chanel-item-selected").querySelector(".chanel-title").textContent) {
      document.querySelector(".video").src = "http://79.143.180.88:25461/4/4/".concat(item.stream_id);
    }
  }
  document.querySelector(".chanel-item-active").click();
}
function initLive() {
  var filterMenu = ["Favorites", "All", "Search"];
  currentBlock = "tv";
  getRequest(baseUrl, urlParams.loginUrl, urlParams.liveCategorys).then(function (data) {
    data = data.json();
    return data;
  }).then(function (data) {
    categorys = data;
    // debugger
    console.log(categorys, chanels);
    liveObj = {};
    // categorys.forEach(item => {
    // 	liveObj[item.category_id] = {category:item.category_name,chanels:[]}
    // 	filterMenu.push(item.category_name);
    // })
    for (var i = 0; i < categorys.length; i++) {
      var item = categorys[i];
      liveObj[item.category_id] = {
        category: item.category_name,
        chanels: []
      };
      filterMenu.push(item.category_name);
    }
    return filterMenu;
  }).then(function (data) {
    getRequest(baseUrl, urlParams.loginUrl, urlParams.liveChanels).then(function (data) {
      data = data.json();
      return data;
    }).then(function (data) {
      chanels = data;
      // chanels.forEach(item => {
      // 	if(liveObj[item.category_id])liveObj[item.category_id].chanels.push(item);
      // })
      for (var j = 0; j < chanels.length; j++) {
        var item = chanels[j];
        if (liveObj[item.category_id]) {
          liveObj[item.category_id].chanels.push(item);
        }
      }
      // debugger
      console.log(liveObj);
    }).then(function (data) {
      if (document.querySelector(".loader-parent")) {
        document.querySelector(".loader-parent").remove();
      }
      tvRender(chanels, filterMenu);
      pages.set_current("tv");
      chanelsOnClick();
    });
  });
}