var searchedItems = [];


document.addEventListener("keydown",(e) => {
	var items = document.querySelectorAll(".menu-item");
		if(currentBlock === "login"){
			keyboardControls(e);
		}else if(currentBlock === "menu"){

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
				else if(menuMovieItem.classList.contains("menu-active")){
					document.querySelector(".menu-movies-item").click();
				}
				else if(menuSeriesitem.classList.contains("menu-active")){
					document.querySelector(".menu-series-item").click();
				}
			}
		}else if(currentBlock === "settings") {
			createSettingsControls(e);
		}else if(currentBlock === "parental code"){
			parentalCodeControls(e);
		}else if(currentBlock === "tv"){
			tvControls(e);
		}else if(currentBlock === "filter-menu"){
			filterMenuControls(e);
		}else if(currentBlock === "movies"){
			movieControls(e);
		}else if(currentBlock === "movie-info"){
			movieInfoControls(e);
		}else if(currentBlock === "movie-search"){
			movieSearchControls(e);
		}else if(currentBlock === "series"){
			episodeControls(e)
		}
	});	


 function keyboardClick(currentInput,key){

	var input = currentInput
	searchedItems = [];

	if(document.querySelector(".active"))document.querySelector(".active").classList.remove("active");
	key.classList.add("active");
	var activeText = document.querySelector(".active").innerText;
		if(activeText !== "shift" && activeText !== "Done" && activeText !== "clean" && activeText !== "backspace" && activeText !== "123" && activeText !== "Eng" && activeText !== "" && keyboard_exist){
			input.value += activeText;
	
		}else if(document.querySelector(".back").classList.contains("active")){
			input.value = input.value.split("").slice(0,-1).join("")
	
		}else if(document.querySelector(".active").classList.contains("shift")){
			var letters = document.querySelectorAll(".letter");
			// letters.forEach(item => {
			// 	if(item.textContent !== item.textContent.toUpperCase()){
			// 		item.textContent = item.textContent.toUpperCase();
			// 	}else{
			// 		item.textContent = item.textContent.toLowerCase();
			// 	}
			// });
			for(var i = 0;i < letters.length;i++){
				if(letters[i].textContent !== letters[i].textContent.toUpperCase()){
					letters[i].textContent = letters[i].textContent.toUpperCase();
				}else{
					letters[i].textContent = letters[i].textContent.toLowerCase();
				}
			}

		}else if(document.querySelector(".active").classList.contains("done")){
			
			var inputs = document.querySelectorAll(".input-block-item");
			if(!document.querySelector(".keyboard").classList.contains("live-keyboard") && !document.querySelector(".keyboard").classList.contains("movie-keyboard")){
					inputs[inputI].classList.remove("active-login");
					inputI++;
					if(inputI === inputs.length-1){
						debugger
						document.querySelector(".keyboard").remove();
						keyboard_exist = false;
						inputI = 0;
						keyboardPos();
						document.querySelector(".login-btn").classList.add("active-login")
						loginBtn.click();	
					}else{
						inputs[inputI].classList.add("active-login");
					}
			}else if(document.querySelector(".keyboard").classList.contains("live-keyboard")){
				// debugger
				document.querySelector(".player-block").style.transform = "translateX(0)";
				document.querySelector(".chanels-search-inputblock").style.transform = "translateX(110%)";
				currentBlock = "tv"
				filteredCat = searchedItems;
			}
		}else if(document.querySelector(".active").classList.contains("numbers-key")){
			// debugger
			var numbersKey = document.querySelectorAll(".numbers-key");
			for(var i = 0;i < numbersKey.length;i++){
				var numbersKey_item = numbersKey[i];
				if(numbersKey_item.textContent == "123"){
					var parent = document.querySelector(".keyboard").parentElement;
					if(currentPage === "movies"){
						document.querySelector(".keyboard").remove();
						parent.append(print_keyboard(numbersKeyboard,document.querySelector(".movie-search-input"))) 
						document.querySelector(".keyboard").classList.add("movie-keyboard")
						addRemLogin();
					}else if(currentPage === "tv"){
						document.querySelector(".keyboard").remove();
						parent.append(print_keyboard(numbersKeyboard,document.querySelector(".chanels-search-input"))) 
						document.querySelector(".keyboard").classList.add("live-keyboard")
						addRemLogin();
					}else if(currentPage === "login"){
						document.querySelector(".keyboard").remove();
						parent.append(print_keyboard(numbersKeyboard,document.querySelector(".active-login"))); 
						addRemLogin();
					}
				}else if(numbersKey_item.textContent == "Eng"){
					var parent = document.querySelector(".keyboard").parentElement;
					if(currentPage === "movies"){
						document.querySelector(".keyboard").remove();
						parent.append(print_keyboard(vartersKeyboard,document.querySelector(".movie-search-input")));
						document.querySelector(".keyboard").classList.add("movie-keyboard");;
						addRemLogin();
					
					}else if(currentPage === "tv"){
						document.querySelector(".keyboard").remove();
						parent.append(print_keyboard(lettersKeyboard,document.querySelector(".chanels-search-input")));
						document.querySelector(".keyboard").classList.add("live-keyboard");
						addRemLogin();
					}else if(currentPage === "login"){
						document.querySelector(".keyboard").remove();
						parent.append(print_keyboard(lettersKeyboard,document.querySelector(".active-login"))) ;
						addRemLogin();
					}
				}
			}

		}else if((document.querySelector(".active").classList.contains("clean"))){
			currentInput.value = "";
		}else if((document.querySelector(".active").classList.contains("space"))){
			currentInput.value += " ";
		}
		if(currentInput === document.querySelector(".chanels-search-input")){

			// chanels.forEach(chanel => {
			// 	var chanelName = chanel.name.split(" ").join("").toLowerCase();
			// 	if(chanelName.includes(input.value.split(" ").join("").toLowerCase())){
			// 		searchedItems.push(chanel)
			// 		document.querySelector(".chanels-inner").innerHTML = "";
			// 		// addRemTvChanel();
			// 	}
			// })
			for (var j = 0;j < chanels.length;j++){
				var chanel = chanels[j];
				var chanelName = chanel.name.split(" ").join("").toLowerCase();
				if(chanelName.includes(input.value.split(" ").join("").toLowerCase())){
					searchedItems.push(chanel)
					document.querySelector(".chanels-inner").innerHTML = "";
					// addRemTvChanel();
				}
			}
			document.querySelector(".chanels-inner").innerHTML = "";
			printChanelsList(searchedItems)
			addRemTvChanel();
			if(document.querySelector(".chanel-item-active")) document.querySelector(".chanel-item-active").click();
		}else if(currentInput === document.querySelector(".movie-search-input")){
			console.log();
			document.querySelector(".searched-movies-row").innerHTML = "";
			if(currentSearch === "movies"){
				// movies.forEach(movie => {
							
				// })
				for(var a = 0;a < movies.length;a++){
					var movie = movies[a];
					var movieName = movie.name.split(" ").join("").toLowerCase()
					if(movieName.includes(input.value.split(" ").join("").toLowerCase())){
						searchedItems.push(movie);
						document.querySelector(".not-found-block").style.display = "none";
						document.querySelector(".searched-movies-row").style.display = "flex";
						if(document.querySelector(".searched-movies-row").querySelectorAll(".movies-item").length < 5){
							document.querySelector(".searched-movies-row").append(build_movie_items(movie)); 
						}
					}		
				}
			}else if(currentSearch === "series"){
				// series.forEach(movie => {
				// 	var movieName = movie.name.split(" ").join("").toLowerCase()
				// 	if(movieName.includes(input.value.split(" ").join("").toLowerCase())){
				// 		searchedItems.push(movie);
				// 		document.querySelector(".not-found-block").style.display = "none";
				// 		document.querySelector(".searched-movies-row").style.display = "flex";
				// 		if(document.querySelector(".searched-movies-row").querySelectorAll(".movies-item").length < 5){
				// 			document.querySelector(".searched-movies-row").append(build_movie_items(movie)); 
				// 		}
				// 	}				
				// })
				for(var b = 0;b < series.length;b++){
					var seri = series[b];
					var movieName = seri.name.split(" ").join("").toLowerCase()
					if(movieName.includes(input.value.split(" ").join("").toLowerCase())){
						searchedItems.push(seri);
						document.querySelector(".not-found-block").style.display = "none";
						document.querySelector(".searched-movies-row").style.display = "flex";
						if(document.querySelector(".searched-movies-row").querySelectorAll(".movies-item").length < 5){
							document.querySelector(".searched-movies-row").append(build_movie_items(seri)); 
						}
					}	
				}
			}
			console.log(searchedItems);
		}
}









function addRemLogin(){
	if(document.querySelector(".active")){
		document.querySelector(".active").classList.remove("active");
	}
	if(document.querySelectorAll(".row")[rowIndex].querySelectorAll(".key")[keyIndex]){
		document.querySelectorAll(".row")[rowIndex].querySelectorAll(".key")[keyIndex].classList.add("active")
	}
}

function addRemRows(){
	if(document.querySelector(".active")){
		document.querySelector(".active").classList.remove("active");
	}
	document.querySelectorAll(".row")[rowIndex].querySelectorAll(".key")[keyIndex].classList.add("active")
}