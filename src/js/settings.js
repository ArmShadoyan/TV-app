import { controls } from "../remote/controls";
import { pages } from "../remote/pages";
import { parentalCodeRender,parentalCodeOnclick ,lockCategoriesRender} from "./pincodeBlock";

let epgIcon = require("../imgs/settingsmenu/format.svg");
let tmdbicon = require("../imgs/settingsmenu/subtitles.png")
let remSubIcon = require("../imgs/settingsmenu/subtitles.png")
let langIcon = require("../imgs/settingsmenu/globus.png")
let timzoneIcon = require("../imgs/settingsmenu/time.png")
let parentalIcon = require("../imgs/settingsmenu/parentalicon.png")
let lockCatIcon = require("../imgs/settingsmenu/padlock.png")
let logOutIcon = require("../imgs/settingsmenu/logout.png")

let engIcon = require("../imgs/settingsmenu/us.png");
let portIcon = require("../imgs/settingsmenu/br.png");
let spanIcon = require("../imgs/settingsmenu/es.png");
let checkedIcon = require("../imgs/settingsmenu/checked.svg")


let settingsMenuOptions = [
	{id:1,name:"Use Xtream Code EPG",icon:epgIcon,class:"xtream-item", label:"1"},
	{id:2,name:"Use TMDB API",icon:tmdbicon,class:"tmdb-item", label:"1"},
	{id:3,name:"Remove subtitle background",icon:remSubIcon,class:"remove-item", label:"1"},
	{id:4,name:"Change Language",icon:langIcon,class:"change-language-item"},
	{id:5,name:"Change Timezone",icon:timzoneIcon,class:"change-timezone-item"},
	{id:6,name:"Change Parental Code",icon:parentalIcon,class:"change-parental-item"},
	{id:7,name:"Lock Categories",icon:lockCatIcon,class:"lock-item"},
	{id:8,name:"Log out",icon:logOutIcon,class:"logout-item"},
];

let languageOptions = [
	{id:1,name:"English",icon:checkedIcon,class:"english",img:engIcon},
	{id:2,name:"Portugues Brazil",icon:"",class:"port-braz",img:portIcon},
	{id:3,name:"Spanish",icon:"",class:"spanish",img:spanIcon},
];
let timezoneRem = 0;

export let timeZoneOptions = ["-12","-11","-10","-9","-8","-7","-6","-5","-4","-3","-2","-1","0","1","2","3","4","5","6","7","8","9","10","11","12"];

export let pinKeys = ["1","2","3","4","5","6","7","8","9","0"];


function createSettingsElemnts(options){
	let settingsMenu = document.createElement("div");
	let settingsBlock = document.createElement("div");
	let settingsBlockInner = document.createElement("div");
	let backToMenuDiv = document.createElement("div");
	let backToMenuBtn = document.createElement("div");
	let settingsTitle = document.createElement("div");
	
	settingsBlock.classList.add("settings-block");
	settingsBlockInner.classList.add("settings-block-inner");
	backToMenuDiv.classList.add("back-to-menu-div");
	backToMenuBtn.classList.add("back-to-menu-btn","settings-ctrl");
	settingsTitle.classList.add("settings-title");
	settingsMenu.classList.add("settings-menu");

	settingsTitle.textContent = "Settings";

	document.querySelector(".root").classList.add("settings-root");
	document.querySelector(".root").append(backToMenuDiv,settingsBlock);
	settingsBlockInner.append(settingsMenu);
	settingsBlock.append(settingsTitle,settingsBlockInner);
	backToMenuDiv.append(backToMenuBtn);

	options.forEach(item => {
		console.log(item);
		let settingsItem = document.createElement("div");
		let icon = document.createElement("div");
		let title = document.createElement("div");

		if(options == settingsMenuOptions || options == languageOptions){

			settingsItem.classList.add(`${item.class}`);
			settingsItem.classList.add("settings-item","settings-ctrl");
			icon.classList.add(`${item.class}-icon`,"item-icon");
			title.classList.add(`${item.class}-title`,"item-title");
			title.textContent = `${item.name}`;
			console.log(item.icon);
			icon.style.backgroundImage = `url(${item.icon})`;
		}else if(options = timeZoneOptions){
			settingsItem.classList.add("settings-item","timezone-settings-item","settings-ctrl");
			title.classList.add("item-title","timezone-item-title");
			title.textContent = item;
		}

		settingsItem.append(icon,title);

		if(item.label){
			let label = document.createElement("label");
			let input = document.createElement("input");
			let span = document.createElement("span");
			let childSpan = document.createElement("span");
			childSpan.classList.add("settings-child-span");
			settingsItem.classList.add("label");
			input.type = "checkbox";
			span.append(childSpan);
			label.append(input,span);
			settingsItem.append(label);
			settingsItem.addEventListener("click",() => {
				if(!childSpan.classList.contains("active-check")){
					childSpan.classList.add("active-check");
				}else{
					childSpan.classList.remove("active-check");
				}
			});
		}else if(item.img){
			let flag = document.createElement("img");
			flag.src = item.img;
			flag.classList.add("language-flag-img");
			settingsItem.append(flag);
		}
		settingsMenu.append(settingsItem);

		settingsItem.addEventListener("click",function() {
			if(item.name === "Change Language"){
				languageRender();
			}
			else if(item.name === "Change Timezone"){
				timeZoneRender();
			}
			else if(item.name === "Change Parental Code"){
				parentalCodeRender();
				parentalCodeOnclick();
			}
			else if(item.name === "Lock Categories"){
				// debugger
				lockCategoriesRender();
				parentalCodeOnclick();
			}
			else if(item.name === "Log out"){
				document.querySelector(".root").innerHTML = "";
				build_Login_BLock();
			
			}
		})
	});

	backToMenuBtn.addEventListener("click",function(){
		if(options === settingsMenuOptions){
				pages.set_current("menu");
				controls.set_current("menu");
				controls.menu.move()
		}else{
			pages.set_current("settings")
			controls.set_current("settings");
			controls.settings.move();
		}
	})

}

export function settingsRender(){
	createSettingsElemnts(settingsMenuOptions);
	controls.set_current("settings");
	controls.settings.index = 1;
	controls.settings.move();
}

function languageRender(){
	document.querySelector(".root").innerHTML = "";
	createSettingsElemnts(languageOptions);
	document.querySelector(".settings-title").textContent = "Languages";
	controls.set_current("settings");
	controls.settings.index = 1;
	controls.settings.move();
}

function timeZoneRender(){
	document.querySelector(".root").innerHTML = "";
	createSettingsElemnts(timeZoneOptions);
	document.querySelector(".settings-title").textContent = "Select Timezone";
	controls.set_current("settings");
	controls.settings.index = 1;
	controls.settings.move();
}















