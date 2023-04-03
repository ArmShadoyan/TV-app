
let menuI = 0;

	const menuLogoBlock = document.createElement("div");
	const menuBlock = document.createElement("div");
	const menuTvItem = document.createElement("div");
	const menuMovieItem = document.createElement("div");
	const menuSeriesitem = document.createElement("div");
	const menuSettingsItem = document.createElement("div");

	const menuTvTitle = document.createElement("div");
	const menuMovieTitle = document.createElement("div");
	const menuSeriesTitle = document.createElement("div");
	const menuSettingsTitle = document.createElement("div");

	menuLogoBlock.classList.add("menu-logo-block");
	menuBlock.classList.add("menu-block");

	menuTvItem.classList.add("menu-tv-item","menu-item");
	menuMovieItem.classList.add("menu-movies-item","menu-item");
	menuSeriesitem.classList.add("menu-series-item","menu-item");
	menuSettingsItem.classList.add("menu-settings-item","menu-item");

	menuTvTitle.classList.add("menu-item-title","menu-tv-title");
	menuMovieTitle.classList.add("menu-item-title","menu-movie-title");
	menuSeriesTitle.classList.add("menu-item-title","menu-series-title");
	menuSettingsTitle.classList.add("menu-item-title","menu-settings-title");

	menuTvTitle.textContent = "Live Tv";
	menuMovieTitle.textContent = "Movies";
	menuSeriesTitle.textContent = "Series";
	menuSettingsTitle.textContent = "Settings";

function createMenuElements(){
	root.append(menuLogoBlock,menuBlock);
	menuBlock.append(menuTvItem,menuMovieItem,menuSeriesitem,menuSettingsItem);
	menuTvItem.append(menuTvTitle);
	menuMovieItem.append(menuMovieTitle);
	menuSeriesitem.append(menuSeriesTitle);
	menuSettingsItem.append(menuSettingsTitle);
}


document.addEventListener("keydown",(e) => {
	let items = document.querySelectorAll(".menu-item");
	let chanelItems = document.querySelectorAll(".control-chanels");
	let filterItems = document.querySelectorAll(".filter-menu-item");
		
		if(currentBlock === "menu"){

			if(e.key === "ArrowRight"){
				menuI++;
				if(menuI == items.length) menuI = 0;
				addRemMenu();
				
			}else if(e.key === "ArrowLeft"){

				menuI--;
				if(menuI < 0) menuI = items.length - 1
				addRemMenu();

			}else if(e.key === "Enter" ){
				if(menuSettingsItem.classList.contains("menu-active")){
					document.querySelector(".menu-active").classList.remove("menu-active");
					settingsRender();
				}
				else if(menuTvItem.classList.contains("menu-active")){
					document.querySelector(".menu-tv-item").click();
				
				}
			}
		}else if(currentBlock === "settings") {
			createSettingsControls(e);
		}
		
		else if(currentBlock === "parental code"){
			parentalCodeControls(e);
		}else if(currentBlock === "tv"){

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


		}else if(currentBlock === "filter-menu"){
			if(e.key === "ArrowDown"){
				filterMenuI++;
				if(filterMenuI === filterItems.length)filterMenuI = 0;
				addRemFilterMenu();
			}else if(e.key === "ArrowUp"){
				filterMenuI--;
				if(filterMenuI < 0)filterMenuI = filterItems.length-1;
				addRemFilterMenu();
			}else if(e.key === "ArrowRight"){
				showChanelsMenu();
			}else if(e.key === "Enter"){
				const active = document.querySelector(".filter-menu-active").textContent;

				getRequest(categoryUrl)
				.then(data => {
					data = data.json();
					return data;
				}).then(data => {
					if(active === "Movies" || active === "Education" || active === "Music"){
						let filteredCat = [];
					console.log(filteredCat)

						data.forEach(item => {
							if(item.category_name === active){
								chanels.forEach(chanel => {
									if(chanel.category_id === item.category_id){
										filteredCat.push(chanel);
									}
								});
							
							}
						});
							document.querySelector(".filter-menu-title").textContent = active;	
							document.querySelector(".chanels-inner").innerHTML = "";
							printChanelsList(filteredCat);
					}else if(active === "All"){
						document.querySelector(".filter-menu-title").textContent = active;	
						document.querySelector(".chanels-inner").innerHTML = "";
						printChanelsList(chanels);
					}else if(active === "Favorites"){
						document.querySelector(".filter-menu-title").textContent = active;	
						document.querySelector(".chanels-inner").innerHTML = "";
						console.log(favoriteItems);
						printChanelsList(favoriteItems);
					}else if(active === "Search"){
						// document.querySelector(".player-block").innerHTML = 
						console.log(	printKeyboard(lettersKeyboard)		);
					}else{
						return;
					}
						tvChanelI = 0;
						addRemTvChanel();
						chanelsOnClick();
						setTimeout(() => {
							showChanelsMenu();
						}, 1);
						return;
				});
			}
		}
	});	



function menuOnClick(){
	const menuItems = menuBlock.querySelectorAll(".menu-item");
	menuItems.forEach(item => {
		item.addEventListener("click",() => {
			if(item.firstElementChild.textContent === "Settings"){
				settingsRender();
			}else if(item.firstElementChild.textContent === "Live Tv"){
				root.innerHTML = "";
				currentBlock = "tv";
				getRequest(chanelsUrl)
				.then(data => {
					data = data.json();
					return data;
				}).then(data => {
					chanels = data;
					tvRender(data);
					chanelsOnClick();
				});
			}
		});
	});
}

function menuRender(){
	currentBlock = "menu";
	root.innerHTML = "";
	createMenuElements();
	addRemMenu();
	menuOnClick();
}

function tvRender(data){
	root.innerHTML = "";
	createTvElements();
	printChanelsList(data);
	printChanelsList(filterMenu);
	addRemTvChanel();
	showChanelsMenuClick();
	document.querySelector(".chanel-item-active").classList.add("chanel-item-selected");
	chanels.forEach(item => {
		if(item.name === document.querySelector(".chanel-item-selected").querySelector(".chanel-title").textContent){
			document.querySelector(".video").src = `http://79.143.180.88:25461/4/4/${item.stream_id}`;
		}
	});
	document.querySelector(".chanel-item-active").click();
}

function addRemMenu () {
	if(document.querySelector(".menu-active")) {
		document.querySelector(".menu-active").classList.remove("menu-active")
	}

	document.querySelectorAll(".menu-item")[menuI].classList.add("menu-active")
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


// btoa()
// atob();