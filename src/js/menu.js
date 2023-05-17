
import { controls } from "../remote/controls";
import { pages } from "../remote/pages";


function createMenuElements(){
	let menuLogoBlock = document.createElement("div");
	let menuBlock = document.createElement("div");
	let menuTvItem = document.createElement("div");
	let menuMovieItem = document.createElement("div");
	let menuSeriesitem = document.createElement("div");
	let menuSettingsItem = document.createElement("div");

	let menuTvTitle = document.createElement("div");
	let menuMovieTitle = document.createElement("div");
	let menuSeriesTitle = document.createElement("div");
	let menuSettingsTitle = document.createElement("div");

	menuLogoBlock.classList.add("menu-logo-block");
	menuBlock.classList.add("menu-block");

	menuTvItem.classList.add("menu-tv-item","menu-item", "menu-ctrl");
	menuMovieItem.classList.add("menu-movies-item","menu-item", "menu-ctrl");
	menuSeriesitem.classList.add("menu-series-item","menu-item", "menu-ctrl");
	menuSettingsItem.classList.add("menu-settings-item","menu-item", "menu-ctrl");

	menuTvTitle.classList.add("menu-item-title","menu-tv-title");
	menuMovieTitle.classList.add("menu-item-title","menu-movie-title");
	menuSeriesTitle.classList.add("menu-item-title","menu-series-title");
	menuSettingsTitle.classList.add("menu-item-title","menu-settings-title");

	menuTvTitle.textContent = "Live Tv";
	menuMovieTitle.textContent = "Movies";
	menuSeriesTitle.textContent = "Series";
	menuSettingsTitle.textContent = "Settings";

	document.querySelector(".root").append(menuLogoBlock,menuBlock);
	menuBlock.append(menuTvItem,menuMovieItem,menuSeriesitem,menuSettingsItem);
	menuTvItem.append(menuTvTitle);
	menuMovieItem.append(menuMovieTitle);
	menuSeriesitem.append(menuSeriesTitle);
	menuSettingsItem.append(menuSettingsTitle);
}


function menuOnClick(){
	let menuItems = document.querySelector(".menu-block").querySelectorAll(".menu-item");
	menuItems.forEach(item => {
		item.addEventListener("click",() => {
			
			if(item.firstElementChild.textContent === "Settings"){

				pages.set_current("settings");

			}else if(item.firstElementChild.textContent === "Live Tv"){

				pages.set_current("liveTv");
				
			}else if(item.firstElementChild.textContent === "Movies"){
				
				pages.set_current("movies");

			}else if(item.firstElementChild.textContent === "Series"){
				
				pages.set_current("series");

			}
		});
	});
}


export function menuRender(){
	createMenuElements();
	menuOnClick();
	console.warn("menu render")
	controls.set_current("menu");
	controls.menu.move();
}







// btoa()
// atob();