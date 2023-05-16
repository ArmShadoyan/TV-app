import { print_keyboard } from "../remote/utils";
import { lettersKeyboard, numbersKeyboard ,currentTime, blockScroll} from "../remote/utils";
import { controls } from "../remote/controls";
import { urlParams ,baseUrl} from "../requests/parametrs";
import { getLiveCategories, getLiveChanels, getRequest } from "../requests/requests";
import { pages } from "../remote/pages";



export let liveObj = {};
export let chanels = [];
export let liveCategories = [];

let favoriteItems = [];
let filteredEpg = []
let filteredCat = [];
let epgTimer;
let chanelsCount = 6;
let nextChanel = 1;
let prevChanel = 1;
let menuTransform = 0;
if(localStorage.getItem("favorites")){
	favoriteItems = JSON.parse(localStorage.getItem("favorites"));
	console.log(favoriteItems);
}

export function setCategories(newCategories) {
	categorys = newCategories;
}
export function setliveObj(newLiveObj){
	liveObj = newLiveObj;
}
export function setChanels(newChanels){
	chanels = newChanels
}

function getCategories() {
	return categorys;
}


function createTvElements(){
	let filterMenu = document.createElement("div");
	let filterIcon = document.createElement("div");
	let filterText = document.createElement("div");
	let listsBlock = document.createElement("div");
	let chanelsBlock = document.createElement("div");
	let chanelsFilterMenu = document.createElement("div");
	let chanelsInner = document.createElement("div");
	let menu = document.createElement("div");
	let filterMenuParent = document.createElement("div");
	
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


	filterMenuParent.append(menu)
	chanelsBlock.append(chanelsInner,filterMenuParent)
	listsBlock.append(filterMenu,chanelsBlock);
	
	filterMenu.append(filterIcon,filterText);

	return listsBlock;
}

function createTvPlayerBlock(){
	let playerBlock = document.createElement("div");
	let timeBlock = document.createElement("div");
	let VideoBlock = document.createElement("div");
	let video = document.createElement("video");
	let currentChanel = document.createElement("div");
	let currentChanelInfo = document.createElement("div");
	let currentChanelName = document.createElement("div");
	let currentChanelNumber = document.createElement("div");
	let currentChanelEpg = document.createElement("div");
	let currentEpg = document.createElement("div");
	let nextEpg = document.createElement("div");

	let optionsBlock = document.createElement("div");
	let sortBtn = document.createElement("div");
	let sortRed = document.createElement("div");
	let redBtn = document.createElement("div");
	let categoryBtn = document.createElement("div");
	let categoryGreen = document.createElement("div");
	let greenBtn = document.createElement("div");
	let favoritesBtn = document.createElement("div");
	let favoriteYellow = document.createElement("div");
	let yellowBtn = document.createElement("div");
	let menuBtn = document.createElement("div");
	let menuBlue = document.createElement("div");
	let blueBtn = document.createElement("div");
	let chanelNumber = document.createElement("div");
	let chanelInfo = document.createElement("div");

	let time = document.createElement("div");
	let date = document.createElement("div");

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
		debugger
		let activeChanel = document.querySelector(".active");
		let fav = activeChanel.querySelector(".chanel-favorite");
		if(!fav.classList.contains("chanel-favorite-active")){
			fav.classList.add("chanel-favorite-active");
			activeChanel.classList.add("chanel-item-fav");
		
			for(let i = 0;i < chanels.length;i++){
				let item = chanels[i];
				if(item.name === activeChanel.querySelector(".chanel-title").textContent){
					item.favorite = "true";									
					favoriteItems.push(item);
					localStorage.setItem("favorites",JSON.stringify(favoriteItems));
				}
			}
		}else{
			fav.classList.remove("chanel-favorite-active");
			activeChanel.classList.remove("chanel-item-fav");
	
			for(let j = 0;j < chanels.length;j++){
				let item = chanels[j];
				let index = j;
				if(item.name === activeChanel.querySelector(".chanel-title").textContent){
					for(let a = 0;a < favoriteItems.length;a++){
						let fav = favoriteItems[a];
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

export function printChanelsList(items,name){
	let chanelsBlock = document.querySelector(".chanels-block");
	let chanelsInner = document.querySelector(".chanels-inner");
	let menu = document.querySelector(".filter-menu");
	let menuParent = document.querySelector(".filter-menu-parent");

	for(let i = 0;i < items.length;i++){
		let item = items[i];
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
	let chanelItem = document.createElement("div");
	let number = document.createElement("div");
	let logo = document.createElement("div");
	let title = document.createElement("div");
	let favorite = document.createElement("div");

	for(let i = 0;i < favoriteItems.length;i++){
		let fav = favoriteItems[i];
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
		
		let img = new Image()

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
		let chanelTitle = title.textContent;

			if(item.name === document.querySelector(".chanel-item-selected").querySelector(".chanel-title").textContent){
				if(document.querySelector(".video")){
					document.querySelector(".video").src = `${urlParams.playerBase}/MYOWN1/Meins321/${item.stream_id}`;
				}
			}
			if(document.querySelector(".chanels-inner").style.opacity === "1"){
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
	let items = document.querySelectorAll(".chanels-inner .chanel-item");
	let block = document.querySelector(".chanels-inner");

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

	for(let i = 0;i < categorys.epg_listings.length;i++){
		let list = categorys.epg_listings[i];
		let liveDate = list.start.split(" ")[0].split("-").join("");
		if(document.querySelector(".date")){
			let currentDate = document.querySelector(".date").innerText.split("/").join("");
			if(liveDate == currentDate){
				filteredEpg.push(list);
			}
		}
	}
	let currentEpgs = [];
	let nextEpgs = [];
	
	for(let j = 0;j < filteredEpg.length;j++){
		let epg = filteredEpg[j];
		let currentHour = document.querySelector(".time").innerText.split(":")[0];
		let currentMinute = document.querySelector(".time").innerText.split(":")[1];

		let start = toDate(epg.start_timestamp).split(":").join("");
		let end = toDate(epg.stop_timestamp).split(":").join("");
		let time = document.querySelector(".time").innerText.split(":").join("");
			if(+time < +end && +time > +start){
				currentEpgs.push(filteredEpg[j]);
				nextEpgs.push(filteredEpg[j+1])
			} 
	}

	let currentEpg = currentEpgs[0];
	let nextEpg = nextEpgs[0];

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
	let chanelsInner = document.querySelector(".chanels-inner");
	if(chanelsInner){
		if(chanelsInner.style.opacity === "1"){
			chanelsInner.style.transform = "scale(0.4)";
			chanelsInner.style.opacity = "0";
			document.querySelector(".filter-menu-parent").style.transform = "translateX(0rem)";		
		
			controls.set_current("tvCategoryBlock");
			controls.tvCategoryBlock.move();
			
			for(let i = 0;i < document.querySelectorAll(".option-btn").length;i++){
				let item = document.querySelectorAll(".option-btn")[i];
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
		
			for(let j = 0;j < document.querySelectorAll(".option-btn").length;j++){
				let item = document.querySelectorAll(".option-btn")[j];
				if(j !== document.querySelectorAll(".option-btn").length-1){
					item.style.display = "block";
				}
			}
		}
	}
	if(document.querySelector(".chanel-item-active"))document.querySelector(".chanel-item-active").click();
}

export function chanelsOnClick(){
	let menuBtn = document.querySelector(".menu-btn");
	if(menuBtn){
		menuBtn.addEventListener("click",() => {
			pages.set_current("menu");
			controls.set_current("menu");
			controls.menu.move();
		});
	}
	
	let categoryBtn = document.querySelector(".category-btn");
	if(categoryBtn){
		categoryBtn.addEventListener("click", () => {
			showChanelsMenu();
		});
	}

}

function filterMenuOnclick(){
	let items = document.getElementsByClassName("filter-menu-item");

	let active;
	for(let i = 0;i < items.length;i++) {
		items[i].addEventListener("click",function(e){
			active = this.textContent;
			filteredCat = [];
			nextChanel = 1;
			chanelsCount = 6;
				if(active === "All"){
			
					filteredCat = chanels;
					document.querySelector(".filter-menu-title").textContent = active;	
					document.querySelector(".chanels-inner").innerHTML = "";
					printChanelsList(chanels,"chanels");
					controls.set_current("tvChanelBlock");
					controls.tvChanelBlock.move();

				}else if(active === "Favorites"){
				
					document.querySelector(".filter-menu-title").textContent = active;	
					document.querySelector(".chanels-inner").innerHTML = ""; 
					printChanelsList(favoriteItems,"favoriteItems");
					filteredCat = favoriteItems;
					controls.set_current("tvChanelBlock");
					controls.tvChanelBlock.move();

				}else if(active === "Search"){

					blockScroll(document.querySelector(".player-block"),-1,"%",110,"X")
					blockScroll(document.querySelector(".chanels-search-inputblock"),1,"",0,"X")
					
					document.querySelector(".keyboard").classList.add("live-keyboard")
					document.querySelector(".chanels-inner").innerHTML = "";
					printChanelsList(chanels,"chanels");
					document.querySelector(".chanels-search-input").value = "";

					controls.set_current("keyboard");
					controls.keyboard.rowIndex = 0;
					controls.keyboard.index = 0;
					controls.keyboard.move();

				}else{

					filteredCat = [];
					for(let item in liveObj){
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
				}, 1);
				chanelsOnClick();
				return;
			})
		
	}
}

function createChanelsSearechInput(){
	let inputBlock = document.createElement("div");
	let tvBlock = document.createElement("div");
	let rightBlock = document.createElement("div");
	let input = document.createElement("input");
	
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

 export function tvRender(chanels,filterMenu){
	document.querySelector(".root").append(createChanelsSearechInput());
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
	
	// for(let i = 0;i < chanels.length;i++){
	// 	let item = chanels[i];
	// 	if(item.name === document.querySelector(".chanel-item-selected").querySelector(".chanel-title").textContent){
	// 		document.querySelector(".video").src = `http://79.143.180.88:25461/4/4/${item.stream_id}`;
	// 	}
	// }

	// document.querySelector(".chanel-item-active").click();
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

export async function liveInit () {
	debugger
	Promise.all([getLiveCategories(),getLiveChanels()])
	.then(res => {
		// debugger
		let chanelsMenu = ["Favorites","All","Search"];
		liveCategories = res[0];
		chanels = res[1];

		liveObj = chanels_data_build(chanels,liveCategories,chanelsMenu);
		tvRender(chanels,chanelsMenu)
		chanelsOnClick();

		controls.set_current("tvChanelBlock");
		controls.tvChanelBlock.move();
	})
}

function chanels_data_build (chanels,chanelCategories,chanelsMenu) {
	// debugger

	chanelCategories.forEach(item => {
		liveObj[item.category_id] = {category:item.category_name,chanels:[]}
		chanelsMenu.push(item.category_name);
	})
	chanels.forEach(item => {
		if(liveObj[item.category_id]){
			liveObj[item.category_id].chanels.push(item);
		}
	})

	return liveObj;
}