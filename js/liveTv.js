
let tvChanelI = 0;
let filterMenuI = 0;
let chanels = [];
let favoriteItems = [];

if(localStorage.getItem("favorites")){
	favoriteItems = JSON.parse(localStorage.getItem("favorites"));
	console.log(favoriteItems);
}

const filterMenu = ["Favorites","All","Search","Movies","Music","Education"];

function createTvElements(){
	const tvBlock = document.createElement("div");
	const filterMenu = document.createElement("div");
	const filterIcon = document.createElement("div");
	const filterText = document.createElement("div");
	const listsBlock = document.createElement("div");
	const chanelsBlock = document.createElement("div");
	const chanelsFilterMenu = document.createElement("div");
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

	const chanelsInner = document.createElement("div");
	const menu = document.createElement("div");
	
	chanelsInner.classList.add("chanels-inner");
	chanelsInner.style.display = "flex";
	chanelsInner.style.opacity = "1";
	menu.classList.add("filter-menu");

	tvBlock.classList.add("tv-block");
	filterMenu.classList.add("chanel-menu-title-block");
	chanelsBlock.classList.add("chanels-block");
	chanelsFilterMenu.classList.add("chanels-filter-menu","chanels-block");
	chanelsFilterMenu.style.display = "flex";
	listsBlock.classList.add("lists-block");
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
	filterIcon.classList.add("filter-menu-icon");
	filterText.classList.add("filter-menu-title");
	filterText.textContent = "All";

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

	root.append(tvBlock);
	tvBlock.append(listsBlock,playerBlock);
	listsBlock.append(filterMenu,chanelsBlock);
	chanelsBlock.append(chanelsInner,menu);
	playerBlock.append(timeBlock,VideoBlock,currentChanel,optionsBlock);
	VideoBlock.append(video);
	currentChanel.append(currentChanelNumber,currentChanelInfo);
	currentChanelInfo.append(currentChanelName,currentChanelEpg);
	currentChanelEpg.append(currentEpg,nextEpg);
	optionsBlock.append(sortBtn,categoryBtn,favoritesBtn,menuBtn);
	timeBlock.append(date,time);
	filterMenu.append(filterIcon,filterText);
	currentTime();
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
		
	}, 10000);
}

function printChanelsList(data){
	const chanelsBlock = document.querySelector(".chanels-block");
	const chanelsInner = document.querySelector(".chanels-inner");
	const menu = document.querySelector(".filter-menu");

	data.forEach(item => {
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
					document.querySelector(".video").src = `http://79.143.180.88:25461/4/4/${item.stream_id}`;
				}
			});
			const filteredEpg = [];

			let chanelTitle = title.textContent;

			chanels.forEach(chanel => {
				if(chanelTitle === chanel.name){
					document.querySelector(".current-chanel-number").textContent = chanel.num;
					document.querySelector(".current-chanel-name").textContent = chanel.name;
					epgRequest(chanel.stream_id)
					.then(data => {
						data = data.json();
						return data;
					}).then(data => {
						data.epg_listings.forEach(list =>{
							const liveDate = list.start.split(" ")[0].split("-").join("");
							const currentDate = document.querySelector(".date").innerText.split("/").join("")
							if(liveDate == currentDate){
								filteredEpg.push(list);
							}
						});

						filteredEpg.forEach((epg,index) => {
							const currentHour = document.querySelector(".time").innerText.split(":")[0];
							const currentMinute = document.querySelector(".time").innerText.split(":")[1];

							let start = toDate(epg.start_timestamp).split(":").join("");
							let end = toDate(epg.stop_timestamp).split(":").join("");
							let time = document.querySelector(".time").innerText.split(":").join("");
								if(+time < +end && +time > +start){
								

								} 
						});
					
					});
				}
			});
		});
		
	});
	chanelsBlock.append(chanelsInner,menu);

}


function showChanelsMenuClick(){
	document.querySelector(".chanel-menu-title-block").addEventListener("click",() => {	
		showChanelsMenu();
	});
}

function showChanelsMenu(){
	const chanelsInner = document.querySelector(".chanels-inner");

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
		document.querySelectorAll(".option-btn").forEach((item,index) => {
			if(index !== document.querySelectorAll(".option-btn").length-1){
				item.style.display = "block";
			}
		});
	}
	document.querySelector(".chanel-item-active").click();
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

function chanelsOnClick(){
	const menuBtn = document.querySelector(".menu-btn");
	menuBtn.addEventListener("click",() => {
		menuRender();
	});
	const categoryBtn = document.querySelector(".category-btn");
	categoryBtn.addEventListener("click", () => {
		showChanelsMenu();
	});
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

function chanelsOnControl(){
	
}

