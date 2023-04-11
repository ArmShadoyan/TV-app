
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


function menuOnClick(){
	const menuItems = menuBlock.querySelectorAll(".menu-item");
	menuItems.forEach(item => {
		item.addEventListener("click",() => {
			if(item.firstElementChild.textContent === "Settings"){
				settingsRender();
			}else if(item.firstElementChild.textContent === "Live Tv"){
				root.innerHTML = "";
				let filterMenu = ["Favorites","All","Search"];
				currentBlock = "tv";
				getRequest(chanelsUrl)
				
				.then(data => {
					data = data.json();
					return data;
				}).then(data => {
					chanels = data;
					console.log(chanels)
				}).then(data => {

					getRequest(categoryUrl)
					.then(data => {
						data = data.json();
						return data;
					}).then(data => {
						categorys = data;
						categorys.forEach(item => {
							filterMenu.push(item.category_name);
						})
						return filterMenu
					}).then(filterMenu => {
						tvRender(chanels,filterMenu);
						chanelsOnClick();
					})
				})
			}else if(item.firstElementChild.textContent === "Movies"){
				getRequest(moviesCategoryUrl)
				.then(categorys => {
					categorys = categorys.json();
					return categorys
				}).then(categorys => {
					movieCategorys = categorys
					console.log(movieCategorys);
					return movieCategorys;
				})
				.then(movieCategorys => {
					getRequest(moviesUrl)
					.then(data => {
						data = data.json()
						return data
					}).then(data => {
						movies = data;
						console.log(movies)
						moviesRender(movieCategorys,movies)
					})
				})
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