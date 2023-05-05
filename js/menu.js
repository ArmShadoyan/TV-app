
var menuI = 0;

	var menuLogoBlock = document.createElement("div");
	var menuBlock = document.createElement("div");
	var menuTvItem = document.createElement("div");
	var menuMovieItem = document.createElement("div");
	var menuSeriesitem = document.createElement("div");
	var menuSettingsItem = document.createElement("div");

	var menuTvTitle = document.createElement("div");
	var menuMovieTitle = document.createElement("div");
	var menuSeriesTitle = document.createElement("div");
	var menuSettingsTitle = document.createElement("div");

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
	var menuItems = menuBlock.querySelectorAll(".menu-item");
	menuItems.forEach(item => {
		item.addEventListener("click",() => {
			
			if(item.firstElementChild.textContent === "Settings"){
				settingsRender();
			}else if(item.firstElementChild.textContent === "Live Tv"){
				root.innerHTML = "";
				var filterMenu = ["Favorites","All","Search"];
				currentBlock = "tv";
				getRequest(baseUrl,urlParams.loginUrl,urlParams.liveCategorys)
					.then(data => {
						data = data.json();
						return data;
					}).then(data => {
						categorys = data;
						// 
						console.log(categorys,chanels);
						liveObj = {};	
						categorys.forEach(item => {
							liveObj[item.category_id] = {category:item.category_name,chanels:[]}
							filterMenu.push(item.category_name);
						})
						return filterMenu
					}).then(data => {
						getRequest(baseUrl,urlParams.loginUrl,urlParams.liveChanels)
						.then(data => {
							data = data.json();
							return data;
						}).then(data => {
							chanels = data;
							chanels.forEach(item => {
								if(liveObj[item.category_id])liveObj[item.category_id].chanels.push(item);
							})
							// 
							console.log(liveObj);
						}).then(data => {
							if(document.querySelector(".loader-parent"))document.querySelector(".loader-parent").remove();
							tvRender(chanels,filterMenu);
							chanelsOnClick();
						})
					})
				
			}else if(item.firstElementChild.textContent === "Movies"){
				currentSearch = "movies"
				getRequest(baseUrl,urlParams.loginUrl,urlParams.movieCategorys)
				.then(categorys => {
					categorys = categorys.json();
					return categorys
				}).then(categorys => {
					movieCategorys = categorys
					return movieCategorys;
				})
				.then(movieCategorys => {
					getRequest(baseUrl,urlParams.loginUrl,urlParams.movies)
					.then(data => {
						data = data.json()
						return data
					}).then(data => {
						movies = data;
						return movies;
					}).then(data => {
						moviesObj = {};
						movieCategorys.forEach((cat,index) => {
							moviesObj[cat.category_id] = {category:cat.category_name,movies:[],index:index};	
						})
						movies.forEach(movie => {
							// 
							if(moviesObj[movie.category_id])moviesObj[movie.category_id].movies.push(movie)

						})
						for(item in moviesObj){
							if(moviesObj[item].movies.length === 0){
								console.log(moviesObj[item]);
								delete moviesObj[item]
							}
						}

						console.log(moviesObj);
					}).then(data => {
						moviesRender(movieCategorys,movies,moviesObj,"movies")
					})
				})
			}else if(item.firstElementChild.textContent === "Series"){
				currentSearch = "series";
				getRequest(baseUrl,urlParams.loginUrl,urlParams.seriesCategorys)
				.then(categorys => {
					categorys = categorys.json();
					return categorys;
				}).then(categorys => {
					seriesCategory = categorys;
					return seriesCategory;
				}).then(seriesCategory => {
					getRequest(baseUrl,urlParams.loginUrl,urlParams.series)
					.then(data => {
						data = data.json();
						return data;
					}).then(data => {
						series = data;
						return series;
					}).then(data => {
						console.log(series,seriesCategory)
						seriesObj = {};
						seriesCategory.forEach((cat,index) => {
							// 
							seriesObj[cat.category_id] = {category:cat.category_name,movies:[],index:index}
						})
						series.forEach(item => {
							if(seriesObj[item.category_id])seriesObj[item.category_id].movies.push(item);
						})
						moviesRender(seriesCategory,series,seriesObj,"series")
					})
				})
			}
		});
	});
}


function menuRender(){
	currentPage = "menu";
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