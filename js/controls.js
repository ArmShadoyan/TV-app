let searchedItems = [];


document.addEventListener("keydown",(e) => {
	let items = document.querySelectorAll(".menu-item");
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
			}
		}else if(currentBlock === "settings") {
			createSettingsControls(e);
		}else if(currentBlock === "parental code"){
			parentalCodeControls(e);
		}else if(currentBlock === "tv"){
			tvControls(e)
		}else if(currentBlock === "filter-menu"){
			filterMenuControls(e)
		}else if(currentBlock === "movies"){
			
			let cols = document.querySelectorAll(".m-row");
			let rows = cols[mCol].querySelectorAll(".m-i");

			if(e.key === "ArrowRight"){
				// debugger
				if(mRow > 1 && isNextMovie){
					movieItemsRender("right");
					addRemMovie();

					// mRowTranslate -= 35;
					// cols[mCol].style.transform = `translate(${mRowTranslate}rem)`
				}
				else if(mRow < rows.length-1){
					mRow++;
					addRemMovie();
				}
			}else if(e.key === "ArrowLeft"){
				// debugger
				if(mRow < rows.length-2 && isPrevMovie){
					movieItemsRender("left");
					addRemMovie();
					// mRowTranslate += 35;
					// cols[mCol].style.transform = `translate(${mRowTranslate}rem)`
				}
				else if(mRow > 0){
					mRow--;
					addRemMovie();
				}
			}else if(e.key === "ArrowDown"){
				// debugger
				if(mCol < cols.length-1 && currentPage === "movies"){
					if(mCol > 1)movieScrollFunc(1);
					mRow = 0;
					mCol++;
					addRemMovie();
				}else if(currentPage === "movies-search"){
					if(mCol === 0){
						if(searchedItems.length === 0){
							document.querySelector(".movie-item-active").classList.remove("movie-item-active")
							currentBlock = "login";
							rowIndex = 0;
							keyIndex = 0;
							addRemLogin();
						}else {
							mCol++;
							addRemMovie()
						}
					}
					else if(mCol === 1){
							document.querySelector(".movie-item-active").classList.remove("movie-item-active")
							currentBlock = "login";
							rowIndex = 0;
							keyIndex = 0;
							addRemLogin();
					}
				}
			}else if(e.key === "ArrowUp"){
				
				if(mCol > 0){
					if(mCol < cols.length)movieScrollFunc(-1);
					mRow = 0;
					mCol--;
					addRemMovie();
				}
			}else if(e.key === "Enter"){
				document.querySelector(".movie-item-active").click();
			}
		}else if(currentBlock === "movie-info"){
			if(e. key === "ArrowRight" || e.key === "ArrowDown"){
				if(infoI < document.querySelectorAll(".info-i").length-1)
				infoI++;
				addRemInfo();
			}else if(e.key === "ArrowLeft" || e.key == "ArrowUp"){
				if(infoI > 0){
					infoI--;
					addRemInfo();
				}
			}else if(e.key === "Enter"){
				document.querySelector(".movie-item-active").click();
			}
		}
	});	


function keyboardClick(currentInput,key){
	
	input = currentInput
	searchedItems = [];
	if(document.querySelector(".active"))document.querySelector(".active").classList.remove("active");
	key.classList.add("active")
	let activeText = document.querySelector(".active").innerText
		if(activeText !== "shift" && activeText !== "Done" && activeText !== "clean" && activeText !== "backspace" && activeText !== "123" && activeText !== "Eng" && activeText !== "" && keyboard_exist){
			input.value += activeText;
	
		}else if(document.querySelector(".back").classList.contains("active")){
			input.value = input.value.split("").slice(0,-1).join("")
	
		}else if(document.querySelector(".active").classList.contains("shift")){
			const letters = document.querySelectorAll(".letter");
			letters.forEach(item => {
				if(item.textContent !== item.textContent.toUpperCase()){
				item.textContent = item.textContent.toUpperCase();
				}else{
					item.textContent = item.textContent.toLowerCase();
				}
			});

		}else if(document.querySelector(".active").classList.contains("done")){
			
			let inputs = document.querySelectorAll(".input-block-item");
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
				document.querySelector(".player-block").style.transform = "translateX(0)";
				document.querySelector(".chanels-search-inputblock").style.transform = "translateX(110%)";
				currentBlock = "tv"
			}
			

		}
		else if(document.querySelector(".active").classList.contains("numbers-key")){
			// debugger
			document.querySelectorAll(".numbers-key").forEach(item => {
				if(item.textContent == "123"){
					const parent = document.querySelector(".keyboard").parentElement;
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
						parent.append(print_keyboard(numbersKeyboard,document.querySelector(".active-login"))) 
						addRemLogin();
					}
				}else if(item.textContent == "Eng"){
					const parent = document.querySelector(".keyboard").parentElement;
					if(currentPage === "movies"){
						document.querySelector(".keyboard").remove();
						parent.append(print_keyboard(lettersKeyboard,document.querySelector(".movie-search-input"))) 
						document.querySelector(".keyboard").classList.add("movie-keyboard")
						addRemLogin();
					
					}	else if(currentPage === "tv"){
						document.querySelector(".keyboard").remove();
						parent.append(print_keyboard(lettersKeyboard,document.querySelector(".chanels-search-input"))) 
						document.querySelector(".keyboard").classList.add("live-keyboard")
						addRemLogin();
					}else if(currentPage === "login"){
						document.querySelector(".keyboard").remove();
						parent.append(print_keyboard(lettersKeyboard,document.querySelector(".active-login"))) 
						addRemLogin();
					}
				}
			})
		}else if((document.querySelector(".active").classList.contains("clean"))){
			currentInput.value = "";
		}else if((document.querySelector(".active").classList.contains("space"))){
			currentInput.value += " ";
		}
		if(currentInput === document.querySelector(".chanels-search-input")){

			chanels.forEach(chanel => {
				let chanelName = chanel.name.split(" ").join("").toLowerCase();
				if(chanelName.includes(input.value.split(" ").join("").toLowerCase())){
					searchedItems.push(chanel)
					document.querySelector(".chanels-inner").innerHTML = "";
					// addRemTvChanel();
				}
				
			})
			document.querySelector(".chanels-inner").innerHTML = "";
			printChanelsList(searchedItems)
			addRemTvChanel();
			if(document.querySelector(".chanel-item-active")) document.querySelector(".chanel-item-active").click();
		}else if(currentInput === document.querySelector(".movie-search-input")){
			document.querySelector(".searched-movies-row").innerHTML = "";
			movies.forEach(movie => {
				let movieName = movie.name.split(" ").join("").toLowerCase()
				if(movieName.includes(input.value.split(" ").join("").toLowerCase())){
					searchedItems.push(movie);
					document.querySelector(".not-found-block").style.display = "none";
					document.querySelector(".searched-movies-row").style.display = "flex";
					if(document.querySelector(".searched-movies-row").querySelectorAll(".movies-item").length < 5){
						document.querySelector(".searched-movies-row").append(build_movie_items(movie)); 
					}
				}				
			})
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