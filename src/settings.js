var timezoneRem = 0;

var settingsMenuOptions = [
	{id:1,name:"Use Xtream Code EPG",icon:"/imgs/settingsmenu/format.svg",class:"xtream-item", label:"1"},
	{id:2,name:"Use TMDB API",icon:"/imgs/settingsmenu/tmdb.png",class:"tmdb-item", label:"1"},
	{id:3,name:"Remove subtitle background",icon:"/imgs/settingsmenu/subtitles.png",class:"remove-item", label:"1"},
	{id:4,name:"Change Language",icon:"/imgs/settingsmenu/globus.png",class:"change-language-item"},
	{id:5,name:"Change Timezone",icon:"/imgs/settingsmenu/time.png",class:"change-timezone-item"},
	{id:6,name:"Change Parental Code",icon:"/imgs/settingsmenu/parentalicon.png",class:"change-parental-item"},
	{id:7,name:"Lock Categories",icon:"/imgs/settingsmenu/padlock.png",class:"lock-item"},
	{id:8,name:"Log out",icon:"/imgs/settingsmenu/logout.png",class:"logout-item"},
];

var languageOptions = [
	{id:1,name:"English",icon:"/imgs/settingsmenu/checked.svg",class:"english",img:"/imgs/settingsmenu/us.png"},
	{id:2,name:"Portugues Brazil",icon:"",class:"port-braz",img:"/imgs/settingsmenu/br.png"},
	{id:3,name:"Spanish",icon:"",class:"spanish",img:"/imgs/settingsmenu/es.png"},
];

var timeZoneOptions = ["-12","-11","-10","-9","-8","-7","-6","-5","-4","-3","-2","-1","0","1","2","3","4","5","6","7","8","9","10","11","12"];

var pinKeys = ["1","2","3","4","5","6","7","8","9","0"];


function createSettingsElemnts(options){
	var settingsMenu = document.createElement("div");
	var settingsBlock = document.createElement("div");
	var settingsBlockInner = document.createElement("div");
	var backToMenuDiv = document.createElement("div");
	var backToMenuBtn = document.createElement("div");
	var settingsTitle = document.createElement("div");
	
	settingsBlock.classList.add("settings-block");
	settingsBlockInner.classList.add("settings-block-inner");
	backToMenuDiv.classList.add("back-to-menu-div");
	backToMenuBtn.classList.add("back-to-menu-btn","settings-ctrl");
	settingsTitle.classList.add("settings-title");
	settingsMenu.classList.add("settings-menu");

	settingsTitle.textContent = "Settings";

	root.classList.add("settings-root");
	root.append(backToMenuDiv,settingsBlock);
	settingsBlockInner.append(settingsMenu);
	settingsBlock.append(settingsTitle,settingsBlockInner);
	backToMenuDiv.append(backToMenuBtn);

	options.forEach(item => {
		console.log(item);
		var settingsItem = document.createElement("div");
		var icon = document.createElement("div");
		var title = document.createElement("div");

		if(options == settingsMenuOptions || options == languageOptions){

			settingsItem.classList.add(`${item.class}`);
			settingsItem.classList.add("settings-item","settings-ctrl");
			icon.classList.add(`${item.class}-icon`,"item-icon");
			title.classList.add(`${item.class}-title`,"item-title");
			title.textContent = `${item.name}`;
			icon.style.cssText = `
			background-image: url(${item.icon});
			`;
		}else if(options = timeZoneOptions){
			settingsItem.classList.add("settings-item","timezone-settings-item","settings-ctrl");
			title.classList.add("item-title","timezone-item-title");
			title.textContent = item;
		}

		settingsItem.append(icon,title);

		if(item.label){
			var label = document.createElement("label");
			var input = document.createElement("input");
			var span = document.createElement("span");
			var childSpan = document.createElement("span");
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
			var flag = document.createElement("img");
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
				root.innerHTML = "";
				build_Login_BLock();
			
			}
		})
	});

	backToMenuBtn.addEventListener("click",function(){
		// debugger
		// if(options === languageOptions || options === timeZoneOptions){
		// 	pages.set_current("settings");
		// }else if(options === settingsMenuOptions){
		// 	pages.set_current("menu");
		// }
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

function settingsRender(){
	createSettingsElemnts(settingsMenuOptions);
	controls.set_current("settings");
	controls.settings.index = 1;
	controls.settings.move();
}

function languageRender(){
	root.innerHTML = "";
	createSettingsElemnts(languageOptions);
	document.querySelector(".settings-title").textContent = "Languages";
	controls.set_current("settings");
	controls.settings.index = 1;
	controls.settings.move();
}

function timeZoneRender(){
	root.innerHTML = "";
	createSettingsElemnts(timeZoneOptions);
	document.querySelector(".settings-title").textContent = "Select Timezone";
	controls.set_current("settings");
	controls.settings.index = 1;
	controls.settings.move();
}















