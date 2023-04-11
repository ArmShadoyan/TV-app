
let tvChanelI = 0;
let filterMenuI = 0;
let chanels = [];
let categorys = [];
let favoriteItems = [];
let filteredEpg = []
let epgTimer

if(localStorage.getItem("favorites")){
	favoriteItems = JSON.parse(localStorage.getItem("favorites"));
	console.log(favoriteItems);
}


function createTvElements(){
	const filterMenu = document.createElement("div");
	const filterIcon = document.createElement("div");
	const filterText = document.createElement("div");
	const listsBlock = document.createElement("div");
	const chanelsBlock = document.createElement("div");
	const chanelsFilterMenu = document.createElement("div");
	const chanelsInner = document.createElement("div");
	const menu = document.createElement("div");
	
	chanelsInner.classList.add("chanels-inner");
	chanelsInner.style.display = "flex";
	chanelsInner.style.opacity = "1";
	menu.classList.add("filter-menu");

	filterMenu.classList.add("chanel-menu-title-block");
	chanelsBlock.classList.add("chanels-block");
	chanelsFilterMenu.classList.add("chanels-filter-menu","chanels-block");
	chanelsFilterMenu.style.display = "flex";
	listsBlock.classList.add("lists-block");
	filterIcon.classList.add("filter-menu-icon");
	filterText.classList.add("filter-menu-title");
	filterText.textContent = "All";

	listsBlock.append(filterMenu,chanelsBlock);
	chanelsBlock.append(chanelsInner,menu);
	filterMenu.append(filterIcon,filterText);

	return listsBlock;
}

function createPlayerBlock(){
	const playerBlock = document.createElement("div");
	const timeBlock = document.createElement("div");
	const VideoBlock = document.createElement("div");
	const video = document.createElement("video");
	const currentChanel = document.createElement("div");
	const currentChanelInfo = document.createElement("div");
	const currentChanelName = document.createElement("div");
	const currentChanelNumber = document.createElement("div");
	const currentChanelEpg = document.createElement("div");
	const currentEpg = document.createElement("div");
	const nextEpg = document.createElement("div");

	const optionsBlock = document.createElement("div");
	const sortBtn = document.createElement("div");
	const sortRed = document.createElement("div");
	const redBtn = document.createElement("div");
	const categoryBtn = document.createElement("div");
	const categoryGreen = document.createElement("div");
	const greenBtn = document.createElement("div");
	const favoritesBtn = document.createElement("div");
	const favoriteYellow = document.createElement("div");
	const yellowBtn = document.createElement("div");
	const menuBtn = document.createElement("div");
	const menuBlue = document.createElement("div");
	const blueBtn = document.createElement("div");
	const chanelNumber = document.createElement("div");
	const chanelInfo = document.createElement("div");

	const time = document.createElement("div");
	const date = document.createElement("div");

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

	favoritesBtn.addEventListener("click",(e) => {
		const activeChanel = document.querySelector(".chanel-item-active");
		const fav = activeChanel.querySelector(".chanel-favorite");
		if(!fav.classList.contains("chanel-favorite-active")){
			fav.classList.add("chanel-favorite-active");
			activeChanel.classList.add("chanel-item-fav");
			chanels.forEach(item => {
				if(item.name === activeChanel.querySelector(".chanel-title").textContent){
					item.favorite = "true";									
					favoriteItems.push(item);
					localStorage.setItem("favorites",JSON.stringify(favoriteItems));
				}
			});
		}else{
			fav.classList.remove("chanel-favorite-active");
			activeChanel.classList.remove("chanel-item-fav");
			chanels.forEach((item,index) => {
				if(item.name === activeChanel.querySelector(".chanel-title").textContent){
					console.log(item);	
					favoriteItems.forEach((fav,index) => {
						if(fav.name === item.name){
							favoriteItems.splice(index,1);
							console.log(favoriteItems);
						}
					});
				}
			});
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

function currentTime(){
	let date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let day = date.getDate(); 
    let hours = date.getHours();
    let minuts = date.getMinutes();

    if (hours < 10) hours = "0" + hours;
    if (minuts < 10) minuts = "0" + minuts;

    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;

	document.querySelector(".date").textContent = `
		${year}/${month}/${day}
	`;
	document.querySelector(".time").textContent = `
		${hours}:${minuts}
	`;


	setTimeout(() => {
		currentTime();
	}, 10000);
}



function printChanelsList(categorys){
	const chanelsBlock = document.querySelector(".chanels-block");
	const chanelsInner = document.querySelector(".chanels-inner");
	const menu = document.querySelector(".filter-menu");

	categorys.forEach(item => {
		const chanelItem = document.createElement("div");
		const number = document.createElement("div");
		const logo = document.createElement("div");
		const title = document.createElement("div");
		const favorite = document.createElement("div");

		favoriteItems.forEach(fav => {
			if(item.name === fav.name){
				favorite.classList.add("chanel-favorite-active");
			}
		});

		number.classList.add("chanel-number");
		logo.classList.add("chanel-logo");
		title.classList.add("chanel-title");
		favorite.classList.add("chanel-favorite");
		chanelItem.classList.add("chanel-item");

		if(item.num){
			number.textContent = `${item.num}`;
			logo.style.cssText = `
			background-image: url(${item.stream_icon});
			`;
			title.textContent = `${item.name}`;
	
			chanelItem.append(number,logo,title,favorite);
			chanelsInner.append(chanelItem);
			chanelItem.classList.add("control-chanels");

		}else{
			title.textContent = `${item}`;
			chanelItem.append(title);
			title.classList.add("filter-menu-list-title");
			menu.append(chanelItem);
			chanelItem.classList.add("filter-menu-item");
			if(item === "All")chanelItem.classList.add("All");
		}

			
		chanelItem.addEventListener("click",() => {
			if(document.querySelector(".chanel-item-selected")){
				document.querySelector(".chanel-item-selected").classList.remove("chanel-item-selected");
			}
			if(!chanelItem.classList.contains("chanel-item-selected")){
				chanelItem.classList.add("chanel-item-selected");
			}
			chanels.forEach(item => {
				if(item.name === document.querySelector(".chanel-item-selected").querySelector(".chanel-title").textContent){
					if(document.querySelector(".video")){
						document.querySelector(".video").src = `http://79.143.180.88:25461/4/4/${item.stream_id}`;
					}
				}
			});
			filteredEpg = [];

			let chanelTitle = title.textContent;

			chanels.forEach(chanel => {
				if(chanelTitle === chanel.name){
				if(document.querySelector(".current-chanel-number"))document.querySelector(".current-chanel-number").textContent = chanel.num;
				if(document.querySelector(".current-chanel-name"))document.querySelector(".current-chanel-name").textContent = chanel.name;
					epgRequest(chanel.stream_id)
					.then(categorys => {
						categorys = categorys.json();
						return categorys;
					}).then(categorys => {
						clearTimeout(epgTimer)
						updateEpgs(categorys);
					});
				}
			});
		});
	});
	chanelsBlock.append(chanelsInner,menu);
}


function updateEpgs(categorys){
	categorys.epg_listings.forEach(list =>{
		const liveDate = list.start.split(" ")[0].split("-").join("");
		if(document.querySelector(".date")){
			const currentDate = document.querySelector(".date").innerText.split("/").join("");
			if(liveDate == currentDate){
				filteredEpg.push(list);
			}
		}
	});
	// console.log(filteredEpg);
	let currentEpgs = [];
	let nextEpgs = [];
	filteredEpg.forEach((epg,index) => {
		const currentHour = document.querySelector(".time").innerText.split(":")[0];
		const currentMinute = document.querySelector(".time").innerText.split(":")[1];

		let start = toDate(epg.start_timestamp).split(":").join("");
		let end = toDate(epg.stop_timestamp).split(":").join("");
		// console.log(start,end);
		let time = document.querySelector(".time").innerText.split(":").join("");
			if(+time < +end && +time > +start){
				currentEpgs.push(filteredEpg[index]);
				nextEpgs.push(filteredEpg[index+1])
			} 
	});
	let currentEpg = currentEpgs[0];
	let nextEpg = nextEpgs[0];
	// console.log(currentEpg,nextEpg);
	document.querySelector(".current-epg").innerHTML = `<span>${toDate(currentEpg.start_timestamp)?toDate(currentEpg.start_timestamp):"-- --"}</span> ${enCode(currentEpg.title)?enCode(currentEpg.title):"Program not found"}`;
	document.querySelector(".next-epg").innerHTML = `<span>${toDate(nextEpg.start_timestamp)?toDate(nextEpg.start_timestamp):"-- --"}</span> ${enCode(nextEpg.title)?enCode(nextEpg.title):"Program not found"}`;

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
	const chanelsInner = document.querySelector(".chanels-inner");
	if(chanelsInner){
		if(chanelsInner.style.opacity === "1"){
			chanelsInner.style.transform = "scale(0.4)";
			chanelsInner.style.opacity = "0";
			document.querySelector(".filter-menu").style.transform = "translate(0rem)";		
			currentBlock = "filter-menu";
			addRemFilterMenu();
			document.querySelectorAll(".option-btn").forEach((item,index) => {
				if(index !== document.querySelectorAll(".option-btn").length-1){
					item.style.display = "none";
				}
			});
		}else{
			chanelsInner.style.display = "flex";
			chanelsInner.style.opacity = "1";
			chanelsInner.style.transform = "scale(1)";
			document.querySelector(".filter-menu").style.transform = "translate(-100rem)";
			currentBlock = "tv";
			if(document.querySelector(".keyboard").classList.contains("live-keyboard"))currentBlock = "login";
			document.querySelectorAll(".option-btn").forEach((item,index) => {
				if(index !== document.querySelectorAll(".option-btn").length-1){
					item.style.display = "block";
				}
			});
		}
	}
	if(document.querySelector(".chanel-item-active"))document.querySelector(".chanel-item-active").click();
}

function chanelsOnClick(){
	const menuBtn = document.querySelector(".menu-btn");
	if(menuBtn){
		menuBtn.addEventListener("click",() => {
			menuRender();
		});
	}
	
	const categoryBtn = document.querySelector(".category-btn");
	if(categoryBtn){
		categoryBtn.addEventListener("click", () => {
			showChanelsMenu();
		});
	}

}

function filterMenuOnclick(){
	const items = document.querySelectorAll(".filter-menu-item");
	
	items.forEach(item => {
		const active = item.textContent;
		item.addEventListener("click",() => {
				console.log(categorys)
				if(active === "All"){
					document.querySelector(".filter-menu-title").textContent = active;	
					document.querySelector(".chanels-inner").innerHTML = "";
					printChanelsList(chanels);
				}else if(active === "Favorites"){
					document.querySelector(".filter-menu-title").textContent = active;	
					document.querySelector(".chanels-inner").innerHTML = "";
					console.log(favoriteItems);
					printChanelsList(favoriteItems);
				}else if(active === "Search"){
					// debugger
					document.querySelector(".player-block").style.transform = "translateX(110%)";
					document.querySelector(".chanels-search-inputblock").style.transform = "translateX(0)";
					document.querySelector(".chanels-inner").innerHTML = "";
					printChanelsList(chanels);
					document.querySelector(".keyboard").classList.add("live-keyboard")
					currentBlock = "login";	
					rowIndex = 0;
					keyIndex = 0;
					// addRemLogin();
					keyboard_exist = true; 
				}else{
					let filteredCat = [];
					
					categorys.forEach(item => {
						if(item.category_name === active){
							chanels.forEach(chanel => {
								if(chanel.category_id === item.category_id){
									filteredCat.push(chanel);
								}
							});
						}
					});
					document.querySelector(".chanels-inner").innerHTML = "";
					document.querySelector(".filter-menu-title").textContent = active;	
					printChanelsList(filteredCat);
				}


				setTimeout(() => {
						showChanelsMenu();
						if(active !== "Search"){
							currentBlock = "tv";
						}
				}, 1);
				tvChanelI = 0;
				addRemTvChanel();
				chanelsOnClick();
				return;
		});
	});
}

function createChanelsSearechInput(){
	const inputBlock = document.createElement("div");
	const tvBlock = document.createElement("div");
	const rightBlock = document.createElement("div");
	const input = document.createElement("input");
	
	inputBlock.append(input,print_keyboard(lettersKeyboard,document.querySelector(".chanels-search-input")));
	
	inputBlock.classList.add("chanels-search-inputblock");
	input.classList.add("chanels-search-input");
	input.type = "text"
	rightBlock.classList.add("tv-right-block");
	tvBlock.classList.add("tv-block");



	tvBlock.append(createTvElements(),rightBlock);
	rightBlock.append(createPlayerBlock(),inputBlock);	
	return tvBlock;
}

function toDate(temp){
	let date = new Date(+temp * 1000);

	let hours  = date.getHours();
	let minute = date.getMinutes();
	if(hours < 10){
		hours = "0" + date.getHours();
	}
	if(minute < 10){
		minute = "0" + date.getMinutes();
	}
	let time = hours + ":" + minute;

	return time;
}

function addRemTvChanel(){
	
	if(document.querySelector(".chanel-item-active")){
		document.querySelector(".chanel-item-active").classList.remove("chanel-item-active");
	}
	if(document.querySelectorAll(".control-chanels")[tvChanelI]){
		document.querySelectorAll(".control-chanels")[tvChanelI].classList.add("chanel-item-active");
	}

}

function addRemFilterMenu(){
	if(document.querySelector(".filter-menu-active")){
		document.querySelector(".filter-menu-active").classList.remove("filter-menu-active");
	}
	document.querySelectorAll(".filter-menu-item")[filterMenuI].classList.add("filter-menu-active");
}

function tvControls(e){
	let chanelItems = document.querySelectorAll(".control-chanels");

	if(e.key === "ArrowDown"){
		tvChanelI++;
		if(tvChanelI === chanelItems.length)tvChanelI = 0;
		addRemTvChanel();
	}else if(e.key === "ArrowUp"){
		tvChanelI--;
		if(tvChanelI < 0)tvChanelI = chanelItems.length-1;
		addRemTvChanel();
	}else if(e.key === "Backspace"){
			showChanelsMenu();
	}else if(e.key === "Enter"){
		document.querySelector(".chanel-item-active").click();
	}
}

function filterMenuControls(e){
	let filterItems = document.querySelectorAll(".filter-menu-item");

	if(e.key === "ArrowDown"){
		filterMenuI++;
		if(filterMenuI === filterItems.length)filterMenuI = 0;
		addRemFilterMenu();
	}else if(e.key === "ArrowUp"){
		filterMenuI--;
		if(filterMenuI < 0)filterMenuI = filterItems.length-1;
		addRemFilterMenu();
	}else if(e.key === "ArrowRight"){
		// showChanelsMenu();
		document.querySelector(".filter-menu-item.All").click()
	}else if(e.key === "Enter"){
		document.querySelector(".filter-menu-active").click();
	}
}

function enCode(str){
	return window.atob(str);
}

function tvRender(chanels,filterMenu){
	console.log(chanels)
	console.log(filterMenu)
	root.innerHTML = "";
	root.append(createChanelsSearechInput());
	document.querySelector(".keyboard").classList.add("live-keyboard");
	document.querySelector(".keyboard").style.display = "flex";
	currentTime();
	printChanelsList(chanels);  
	printChanelsList(filterMenu);
	addRemTvChanel();
	chanelsSerachBack();
	filterMenuOnclick();
	document.querySelector(".keyboard").innerHTML = "";
	print_keyboard(lettersKeyboard,document.querySelector(".chanels-search-input") )

	document.querySelector(".chanel-item-active").classList.add("chanel-item-selected");
	chanels.forEach(item => {
		if(item.name === document.querySelector(".chanel-item-selected").querySelector(".chanel-title").textContent){
			document.querySelector(".video").src = `http://79.143.180.88:25461/4/4/${item.stream_id}`;
		}
	});
	document.querySelector(".chanel-item-active").click();
}