import "../../css/index.css"

import { controls } from "../remote/controls";
import { pages } from "./pages";
import { chanels ,printChanelsList} from "../js/liveTv";
import { setSearchedItems ,movies, searchedItems} from "../js/movies";
import { build_movie_items } from "../js/movies";
import { series } from "../js/series";

export const lettersKeyboard = [
	["q","w","e","r","t","y","u","i","o","p","/","\\","back"],
	["a","s","d","f","g","h","j","k","l",".",":","Done"],
	["up","z","x","c","v","b","n","m",",","?","clean","up"],
	["123"," ","123"]
];

export const numbersKeyboard = [
	["`","1","2","3","4","5","6","7","8","9","0","|","back"],
	["@", "#", "$", "_", "&", "-", "+", "(", ")", "/", "*", "Done"],
	["up",'"',"'",":",";","!",".","<",">","=","clean","up"],
	["Eng"," ","Eng"]
];

export function remove_active(className) {
    let active;
    if (!className) {
      className = "active";
    }
  
    active = document.getElementsByClassName(className);
  
    for (var i = 0; i < active.length; i++) {
      active[i].classList.remove(className);
    }
}

export function remove_active_login(className) {
  let active;
  if (!className) {
    className = "active-login";
  }

  active = document.getElementsByClassName(className);

  for (var i = 0; i < active.length; i++) {
    active[i].classList.remove(className);
  }
}

export function toDate(temp){
  var date = new Date(+temp * 1000);

  var hours  = date.getHours();
  var minute = date.getMinutes();
  if(hours < 10){
    hours = "0" + date.getHours();
  }
  if(minute < 10){
    minute = "0" + date.getMinutes();
  }
  var time = hours + ":" + minute;

  return time;
}

export function currentTime(){
	var date = new Date();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    var day = date.getDate(); 
    var hours = date.getHours();
    var minuts = date.getMinutes();

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
    if(pages.current == "liveTv"){
      currentTime();
    }
	}, 10000);
}

export function loader(){
	var loader = document.createElement("div");
	var loaderParent = document.createElement("div");
	var loaderText = document.createElement("div");
	loaderText.classList.add("loader-text");
	loaderText.textContent = "Loading...";
	loaderParent.classList.add("loader-parent");
	loader.classList.add("loader");
	if(!document.querySelector(".loader-parent")){
		document.querySelector(".root").append(loaderParent);
		loaderParent.append(loader,loaderText)
	}
}

export function removeLoader() {
  if(document.querySelector(".loader-parent"))document.querySelector(".loader-parent").remove();
}

export function blockScroll(block,side,unit = "rem",scrollSize = 65,scrollDir = "Y",movieScrollCount = 1){
  let blockTranslate = block.getAttribute("translate")
  scrollSize = scrollSize * movieScrollCount;
  if(side > 0){
      blockTranslate = +blockTranslate - scrollSize;
      block.setAttribute("translate",blockTranslate)
      block.style.transform = `translate${scrollDir}(${blockTranslate + unit})`
  }else if(side < 0){
      blockTranslate = +blockTranslate + scrollSize;
      block.setAttribute("translate",blockTranslate)
      block.style.transform = `translate${scrollDir}(${blockTranslate + unit})`
  }
}

export function print_keyboard(keyboardKeys,currentInput){
	var keyboard = document.createElement("div");
	keyboard.classList.add("keyboard");
	
	keyboardKeys.forEach((row,rowI) => {
		var rowLine = document.createElement("div");
		rowLine.classList.add("row","keyboard-row-ctrl");
		keyboard.append(rowLine);

		row.forEach((key,keyI) => {
			var symbol = document.createElement("div");
			symbol.classList.add("key","key-ctrl");	
			if(key.toUpperCase() != key.toLowerCase() && key.length === 1){
				symbol.classList.add("letter");
			}
			if(key === "Done"){
				symbol.classList.add("bigKeys","done","no-print");
			}else if( key === "clean"){
				symbol.classList.add("bigKeys","clean","no-print");
			}else if(key === " "){
				symbol.classList.add("space");
			}else if( key === "123" || key === "Eng"){
				symbol.classList.add("numbers-key","no-print");
			}
			if(key === "up"){
				symbol.innerHTML = `
				<span class="material-symbols-outlined">
						shift
				</span>
				`;
				symbol.classList.add("shift","no-print");
			}else{
				symbol.textContent = key;
			}
			if(key === "back"){
				symbol.classList.add("back","no-print");
				symbol.innerHTML = `
				<span class="material-symbols-outlined back-space">
						backspace
				</span>		
				`;
			}
			rowLine.append(symbol);
      symbol.addEventListener("mouseover",() => {
          controls.keyboard.index = keyI;
          controls.keyboard.rowIndex = rowI;
          controls.set_current("keyboard")
          controls.keyboard.move();
      })
			symbol.addEventListener("click",()=> {
        // let activeInput = document.querySelector(".active-login");
        
        let activeKey = keyboard.querySelector(".active");
        let loginElems = document.getElementsByClassName("input-block-item");
        
        if(!activeKey.classList.contains("no-print")){
          
          currentInput.value += activeKey.textContent;


          }else if(activeKey.classList.contains("back")){

            currentInput.value = currentInput.value.split("").slice(0,-1).join("")

          }else if(activeKey.classList.contains("clean")){

            currentInput.value = "";

          }else if(activeKey.classList.contains("done")){

            if(pages.current = "login"){
              if(controls.loginInputs.index < loginElems.length-1){
                controls.loginInputs.index++;
                controls.loginInputs.move();
                currentInput = loginElems[controls.loginInputs.index];
              }else{
                document.querySelector(".login-btn").click();
              }
            }else if(pages.current == "liveTv"){
              document.querySelector(".chanels-search-inputblock").style.transform = "translateX(110%)";
					    document.querySelector(".player-block").style.transform = "translateX(0)";
              currentInput.value = "";
              document.querySelector(".chanels-inner").innerHTML = "";
              printChanelsList(searchedItems);
              filteredCat = searchedItems;
              controls.set_current("tvChanelBlock");
              controls.tvChanelBlock.move();

              // if(document.querySelector(".chanel-item-active")) document.querySelector(".chanel-item-active").click();
            }


          }else if(activeKey.classList.contains("shift")){

            document.querySelectorAll(".letter").forEach(letter => {
              if(letter.textContent !== letter.textContent.toUpperCase()){
                letter.textContent = letter.textContent.toUpperCase();
              }else{
                letter.textContent = letter.textContent.toLowerCase();
              }
            })

          }else if(activeKey.classList.contains("numbers-key")){
            let parent = document.querySelector(".keyboard").parentNode;
            keyboard.remove();
            if(activeKey.textContent == "123"){
              parent.append(print_keyboard(numbersKeyboard,currentInput))
            }else{
              parent.append(print_keyboard(lettersKeyboard,currentInput))
            }
            controls.keyboard.index = 0;
            controls.keyboard.rowIndex = 0;
            controls.keyboard.move();

          }
          
          if(activeKey.classList.contains("back") || !activeKey.classList.contains("no-print") || activeKey.classList.contains("clean")){
            if(controls.current == "keyboard"){
              // searchedItems = [];
              setSearchedItems([])

              if(pages.current == "liveTv"){
                for (var j = 0;j < chanels.length;j++){
                  var chanel = chanels[j];
                  var chanelName = chanel.name.split(" ").join("").toLowerCase();
                  if(chanelName.includes(currentInput.value.split(" ").join("").toLowerCase())){
                    searchedItems.push(chanel)
                    document.querySelector(".chanels-inner").innerHTML = "";
                  }
                }
                document.querySelector(".chanels-inner").innerHTML = "";
                printChanelsList(searchedItems)
                if(document.querySelector(".chanel-item-active")) document.querySelector(".chanel-item-active").click();

              }else if(pages.current == "moviesSearch"){
                  document.querySelector(".searched-movies-row").innerHTML = "";
          				for(var a = 0;a < movies.length;a++){
          					var movie = movies[a];
          					var movieName = movie.name.split(" ").join("").toLowerCase()
          					if(movieName.includes(currentInput.value.split(" ").join("").toLowerCase())){
          						searchedItems.push(movie);
          						document.querySelector(".not-found-block").style.display = "none";
          						document.querySelector(".searched-movies-row").style.display = "flex";
          						if(document.querySelector(".searched-movies-row").querySelectorAll(".movies-item").length < 5){
          							document.querySelector(".searched-movies-row").append(build_movie_items(movie,a)); 
          						}
          					}		
          				}

              }else if(pages.current == "seriesSearch"){
                document.querySelector(".searched-movies-row").innerHTML = "";
                series.forEach((movie,index) => {
                    var movieName = movie.name.split(" ").join("").toLowerCase()
                    if(movieName.includes(currentInput.value.split(" ").join("").toLowerCase())){
                      searchedItems.push(movie);
                      document.querySelector(".not-found-block").style.display = "none";
                      document.querySelector(".searched-movies-row").style.display = "flex";
                      if(document.querySelector(".searched-movies-row").querySelectorAll(".movies-item").length < 5){
                        document.querySelector(".searched-movies-row").append(build_movie_items(movie,index)); 
                      }
                    }				
                  })

              }

            }
          }

			})
		});
	});

	return keyboard;
};


