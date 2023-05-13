var liveObj = {};
var chanels = [];
var categorys = [];
var favoriteItems = [];
var filteredEpg = []
var filteredCat = [];
var epgTimer;
var chanelsCount = 6;
var nextChanel = 1;
var prevChanel = 1;
var menuTransform = 0;
if(localStorage.getItem("favorites")){
	favoriteItems = JSON.parse(localStorage.getItem("favorites"));
	console.log(favoriteItems);
}


function createTvElements(){
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
	filterMenuParent.classList.add("filter-menu-parent")

	filterMenu.classList.add("chanel-menu-title-block");
	chanelsBlock.classList.add("chanels-block");
	chanelsFilterMenu.classList.add("chanels-filter-menu","chanels-block");
	chanelsFilterMenu.style.display = "flex";
	listsBlock.classList.add("lists-block");
	filterIcon.classList.add("filter-menu-icon");
	filterText.classList.add("filter-menu-title");
	filterText.textContent = "All";

	// debugger

	filterMenuParent.append(menu)
	chanelsBlock.append(chanelsInner,filterMenuParent)
	listsBlock.append(filterMenu,chanelsBlock);
	
	filterMenu.append(filterIcon,filterText);

	return listsBlock;
}

function createTvPlayerBlock(){
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

	sortBtn.classList.add("sort-btn","option-btn");
	sortRed.classList.add("sort-red");
	redBtn.classList.add("red-btn","color-btn");
	categoryBtn.classList.add("category-btn","option-btn");
	greenBtn.classList.add("green-btn","color-btn");
	favoritesBtn.classList.add("favorite-btn","option-btn");
	yellowBtn.classList.add("yellow-btn","color-btn");
	menuBtn.classList.add("menu-btn","option-btn");
	blueBtn.classList.add("blue-btn","color-btn");

	sortBtn.textContent = "Sort";
	categoryBtn.textContent = "category";
	favoritesBtn.textContent = "Favorites";
	menuBtn.textContent = "Menu";

	favoritesBtn.addEventListener("click",function(e) {
		// debugger
		var activeChanel = document.querySelector(".chanel-item-active");
		var fav = activeChanel.querySelector(".chanel-favorite");
		if(!fav.classList.contains("chanel-favorite-active")){
			fav.classList.add("chanel-favorite-active");
			activeChanel.classList.add("chanel-item-fav");
		
			for(var i = 0;i < chanels.length;i++){
				var item = chanels[i];
				if(item.name === activeChanel.querySelector(".chanel-title").textContent){
					item.favorite = "true";									
					favoriteItems.push(item);
					localStorage.setItem("favorites",JSON.stringify(favoriteItems));
				}
			}
		}else{
			fav.classList.remove("chanel-favorite-active");
			activeChanel.classList.remove("chanel-item-fav");
	
			for(var j = 0;j < chanels.length;j++){
				var item = chanels[j];
				var index = j;
				if(item.name === activeChanel.querySelector(".chanel-title").textContent){
					for(var a = 0;a < favoriteItems.length;a++){
						var fav = favoriteItems[a];
						if(fav.name === item.name){
							favoriteItems.splice(a,1);
							console.log(favoriteItems);
						}
					}
				}
			}
			localStorage.setItem("favorites",JSON.stringify(favoriteItems));
		}
	});

	sortBtn.append(redBtn,sortRed);
	categoryBtn.append(greenBtn,categoryGreen);
	favoritesBtn.append(yellowBtn,favoriteYellow);
	menuBtn.append(blueBtn,menuBlue);
	playerBlock.append(timeBlock,VideoBlock,currentChanel,optionsBlock);
	VideoBlock.append(video);
	currentChanel.append(currentChanelNumber,currentChanelInfo);
	currentChanelInfo.append(currentChanelName,currentChanelEpg);
	optionsBlock.append(sortBtn,categoryBtn,favoritesBtn,menuBtn);
	timeBlock.append(date,time);
	currentChanelEpg.append(currentEpg,nextEpg);

	return playerBlock;
}

function printChanelsList(items,name){
	var chanelsBlock = document.querySelector(".chanels-block");
	var chanelsInner = document.querySelector(".chanels-inner");
	var menu = document.querySelector(".filter-menu");
	var menuParent = document.querySelector(".filter-menu-parent");

	for(var i = 0;i < items.length;i++){
		var item = items[i];
		if(name === "filterMenu"){
			menu.append(createChanelItem(item))
		}else{
			if(i < 6){
				chanelsInner.append(createChanelItem(item))
			}
		}
	}
	menuParent.append(menu)
	chanelsBlock.append(chanelsInner,menuParent);
}

function createChanelItem(item){
	var chanelItem = document.createElement("div");
	var number = document.createElement("div");
	var logo = document.createElement("div");
	var title = document.createElement("div");
	var favorite = document.createElement("div");

	for(var i = 0;i < favoriteItems.length;i++){
		var fav = favoriteItems[i];
		if(item.name === fav.name){
			favorite.classList.add("chanel-favorite-active");
		}
	}

	number.classList.add("chanel-number");
	logo.classList.add("chanel-logo");
	title.classList.add("chanel-title");
	favorite.classList.add("chanel-favorite");
	chanelItem.classList.add("chanel-item");

	if(item.num){
		var img = new Image()

        img.onload = () =>{
            logo.style.backgroundImage = `url(${img.src})`
        }

        img.onerror = () =>{
            logo.style.backgroundImage = `url(imgs/logo-large.png)`;
        }
		number.textContent = `${item.num}`;
		img.src = item.stream_icon;
		title.textContent = `${item.name}`;

		chanelItem.append(number,logo,title,favorite);
		// chanelsInner.append(chanelItem);
		chanelItem.classList.add("chanel-ctrl");

	}else{
		title.textContent = `${item}`;
		chanelItem.append(title);
		title.classList.add("filter-menu-list-title");
		// menu.append(chanelItem);
		chanelItem.classList.add("filter-menu-item","tv-category-ctrl");
		if(item === "All")chanelItem.classList.add("All");
	}


	chanelItem.addEventListener("click",() => {
		if(document.querySelector(".chanel-item-selected")){
			document.querySelector(".chanel-item-selected").classList.remove("chanel-item-selected");
		}
		if(!chanelItem.classList.contains("chanel-item-selected")){
			chanelItem.classList.add("chanel-item-selected");
		}
		filteredEpg = [];
		var chanelTitle = title.textContent;

			if(item.name === document.querySelector(".chanel-item-selected").querySelector(".chanel-title").textContent){
				if(document.querySelector(".video")){
					document.querySelector(".video").src = `${urlParams.playerBase}/MYOWN1/Meins321/${item.stream_id}`;
				}
			}
			if(document.querySelector(".chanels-inner").style.opacity === "1"){
				// debugger
				if(chanelTitle === item.name){
					if(document.querySelector(".current-chanel-number"))document.querySelector(".current-chanel-number").textContent = item.num;
					if(document.querySelector(".current-chanel-name"))document.querySelector(".current-chanel-name").textContent = item.name;
						getRequest(baseUrl,urlParams.loginUrl,urlParams.epg,item.stream_id)
						.then(categorys => {
							categorys = categorys.json();
							return categorys;
						}).then(categorys => {
							clearTimeout(epgTimer)
							updateEpgs(categorys);
						});
				}
			}
	});
	return chanelItem;
}

function chanelItemsRender(side){
	// debugger
	var items = document.querySelectorAll(".chanels-inner .chanel-item");
	var block = document.querySelector(".chanels-inner");

	nextChanel = filteredCat[chanelsCount];
	prevChanel = filteredCat[chanelsCount-7] 
	
	if(side === "bottom" && nextChanel){
		items[0].remove();
		block.append(createChanelItem(nextChanel));
		chanelsCount++;
	}
	
	if(side === "top"){
		items[items.length-1].remove();
		block.prepend(createChanelItem(prevChanel))
		chanelsCount--;
	}
	nextChanel = filteredCat[chanelsCount];
	prevChanel = filteredCat[chanelsCount-7]
}

function updateEpgs(categorys){

	for(var i = 0;i < categorys.epg_listings.length;i++){
		var list = categorys.epg_listings[i];
		var liveDate = list.start.split(" ")[0].split("-").join("");
		if(document.querySelector(".date")){
			var currentDate = document.querySelector(".date").innerText.split("/").join("");
			if(liveDate == currentDate){
				filteredEpg.push(list);
			}
		}
	}
	var currentEpgs = [];
	var nextEpgs = [];
	
	for(let j = 0;j < filteredEpg.length;j++){
		var epg = filteredEpg[j];
		var currentHour = document.querySelector(".time").innerText.split(":")[0];
		var currentMinute = document.querySelector(".time").innerText.split(":")[1];

		var start = toDate(epg.start_timestamp).split(":").join("");
		var end = toDate(epg.stop_timestamp).split(":").join("");
		var time = document.querySelector(".time").innerText.split(":").join("");
			if(+time < +end && +time > +start){
				currentEpgs.push(filteredEpg[j]);
				nextEpgs.push(filteredEpg[j+1])
			} 
	}

	var currentEpg = currentEpgs[0];
	var nextEpg = nextEpgs[0];

	if(currentEpg){
		document.querySelector(".current-epg").innerHTML = `<span>${toDate(currentEpg.start_timestamp)}</span> ${enCode(currentEpg.title)}`;
	}else{
		document.querySelector(".current-epg").innerHTML = "<span> -- -- </span><span> Program not found </span>"
	}
	
	if(nextEpg){
		document.querySelector(".next-epg").innerHTML = `<span>${toDate(nextEpg.start_timestamp)}</span> ${enCode(nextEpg.title)}`;
	}else{
		document.querySelector(".next-epg").innerHTML = "<span> -- -- </span><span> Program not found </span>"
	}

	epgTimer = setTimeout(() => {
		updateEpgs(categorys)
	}, 15000);
}

function chanelsSerachBack(){
	document.querySelector(".chanel-menu-title-block").addEventListener("click",() => {	
		if(document.querySelector(".keyboard").classList.contains("live-keyboard")){
			showChanelsMenu();
			document.querySelector(".player-block").style.transform = "translateX(0)";
			document.querySelector(".chanels-search-inputblock").style.transform = "translateX(110%)";
			document.querySelector(".keyboard").classList.remove("live-keyboard")
		}else{
			showChanelsMenu();	
		}
	});	
}

function showChanelsMenu(){
	// debugger
	var chanelsInner = document.querySelector(".chanels-inner");
	if(chanelsInner){
		if(chanelsInner.style.opacity === "1"){
			chanelsInner.style.transform = "scale(0.4)";
			chanelsInner.style.opacity = "0";
			document.querySelector(".filter-menu-parent").style.transform = "translateX(0rem)";		
		
			controls.set_current("tvCategoryBlock");
			controls.tvCategoryBlock.move();
			
			for(var i = 0;i < document.querySelectorAll(".option-btn").length;i++){
				var item = document.querySelectorAll(".option-btn")[i];
				if(i !== document.querySelectorAll(".option-btn").length-1){
					item.style.display = "none";
				}
			}
		}else{
			chanelsInner.style.display = "flex";
			chanelsInner.style.opacity = "1";
			chanelsInner.style.transform = "scale(1)";
			document.querySelector(".filter-menu-parent").style.transform = "translate(-100rem)";
			if(document.querySelector(".keyboard").classList.contains("live-keyboard")){
				
			}else{
				controls.set_current("tvChanelBlock");
				controls.tvChanelBlock.move();
			}
		
			for(var j = 0;j < document.querySelectorAll(".option-btn").length;j++){
				var item = document.querySelectorAll(".option-btn")[j];
				if(j !== document.querySelectorAll(".option-btn").length-1){
					item.style.display = "block";
				}
			}
		}
	}
	if(document.querySelector(".chanel-item-active"))document.querySelector(".chanel-item-active").click();
}

function chanelsOnClick(){
	var menuBtn = document.querySelector(".menu-btn");
	if(menuBtn){
		menuBtn.addEventListener("click",() => {
			pages.set_current("menu");
			controls.set_current("menu");
			controls.menu.move();
		});
	}
	
	var categoryBtn = document.querySelector(".category-btn");
	if(categoryBtn){
		categoryBtn.addEventListener("click", () => {
			showChanelsMenu();
		});
	}

}

function filterMenuOnclick(){
	var items = document.getElementsByClassName("filter-menu-item");

	var active;
	for(var i = 0;i < items.length;i++) {
		items[i].addEventListener("click",function(e){
			// debugger
			active = this.textContent;
			filteredCat = [];
			nextChanel = 1;
			chanelsCount = 6;
			console.log(categorys)
				if(active === "All"){
					// debugger
					// document.querySelector(".chanels-search-inputblock").style.transform = "translateX(110%)";
					// document.querySelector(".player-block").style.transform = "translateX(0)";

					filteredCat = chanels;
					document.querySelector(".filter-menu-title").textContent = active;	
					document.querySelector(".chanels-inner").innerHTML = "";
					printChanelsList(chanels,"chanels");
					controls.set_current("tvChanelBlock");
					controls.tvChanelBlock.move();
				}else if(active === "Favorites"){
					// document.querySelector(".chanels-search-inputblock").style.transform = "translateX(110%)";
					// document.querySelector(".player-block").style.transform = "translateX(0)";

					document.querySelector(".filter-menu-title").textContent = active;	
					document.querySelector(".chanels-inner").innerHTML = "";
					printChanelsList(favoriteItems,"favoriteItems");
					filteredCat = favoriteItems;
					controls.set_current("tvChanelBlock");
					controls.tvChanelBlock.move();
				}else if(active === "Search"){
					// debugger
					blockScroll(document.querySelector(".player-block"),-1,"%",110,"X")
					blockScroll(document.querySelector(".chanels-search-inputblock"),1,"",0,"X")
					
					document.querySelector(".keyboard").classList.add("live-keyboard")
					document.querySelector(".chanels-inner").innerHTML = "";
					printChanelsList(chanels,"chanels");
					document.querySelector(".chanels-search-input").value = "";

					// debugger
					controls.set_current("keyboard");
					controls.keyboard.rowIndex = 0;
					controls.keyboard.index = 0;
					controls.keyboard.move();
				}else{
					// document.querySelector(".chanels-search-inputblock").style.transform = "translateX(110%)";
					// document.querySelector(".player-block").style.transform = "translateX(0)";

					filteredCat = [];
					for(item in liveObj){
						if(liveObj[item].category === active){
							filteredCat = liveObj[item].chanels;
						}
					}
			
					document.querySelector(".chanels-inner").innerHTML = "";
					document.querySelector(".filter-menu-title").textContent = active;	
					printChanelsList(filteredCat,"filteredCat");
					controls.set_current("tvChanelBlock");
					controls.tvChanelBlock.move();
				}


				setTimeout(() => {
						showChanelsMenu();
						if(active !== "Search"){
							currentBlock = "tv";
						}
				}, 1);
				chanelsOnClick();
				return;
			})
		
	}
}

function createChanelsSearechInput(){
	// debugger
	var inputBlock = document.createElement("div");
	var tvBlock = document.createElement("div");
	var rightBlock = document.createElement("div");
	var input = document.createElement("input");
	
	inputBlock.append(input,print_keyboard(lettersKeyboard,input));
	
	inputBlock.classList.add("chanels-search-inputblock");
	input.classList.add("chanels-search-input");
	input.type = "text"
	rightBlock.classList.add("tv-right-block");
	tvBlock.classList.add("tv-block");



	tvBlock.append(createTvElements(),rightBlock);
	rightBlock.append(createTvPlayerBlock(),inputBlock);	
	return tvBlock;
}

 function tvRender(chanels,filterMenu){
	root.append(createChanelsSearechInput());
	document.querySelector(".keyboard").classList.add("live-keyboard");
	document.querySelector(".keyboard").style.display = "flex";
	currentTime();
	printChanelsList(chanels,"chanels");  
	filteredCat = chanels;
	printChanelsList(filterMenu,"filterMenu");
	menuTransform = 0;
	
	chanelsSerachBack();
	filterMenuOnclick();

	// document.querySelector(".chanel-item-active").classList.add("chanel-item-selected");
	
	// for(var i = 0;i < chanels.length;i++){
	// 	var item = chanels[i];
	// 	if(item.name === document.querySelector(".chanel-item-selected").querySelector(".chanel-title").textContent){
	// 		document.querySelector(".video").src = `http://79.143.180.88:25461/4/4/${item.stream_id}`;
	// 	}
	// }

	// document.querySelector(".chanel-item-active").click();
	// debugger
}

function selectedChanel(){
	if(document.querySelector(".chanel-item-selected")){
		document.querySelector(".chanel-item-selected").classList.remove("chanel-item-selected");
	}
	if(!document.querySelector(".chanel-item-active").classList.contains("chanel-item-selected")){
		document.querySelector(".chanel-item-active").classList.add("chanel-item-selected");
	}
	chanels.forEach(item => {
		if(item.name === document.querySelector(".chanel-item-selected").querySelector(".chanel-title").textContent){
			document.querySelector(".video").src = `http://79.143.180.88:25461/4/4/${item.stream_id}`;
		}
	});
}