
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
				else if(menuMovieItem.classList.contains("menu-active")){
					document.querySelector(".menu-tv-item").click();
				}
				else if(menuMoviesitem.classList.contains("menu-active")){
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

			if(e.key == "ArrowRight"){
				if(mRow < rows.length-1){
					mRow++;
					addRemMovie();
				}
			}else if(e.key == "ArrowLeft"){
				if(mRow > 0){
					mRow--;
					addRemMovie();
				}
			}else if(e.key == "ArrowDown"){
				if(mCol < cols.length-1){
					if(mCol > 1)movieScrollFunc(1);
					mRow = 0;
					mCol++;
					addRemMovie();
				}
			}else if(e.key == "ArrowUp"){
				
				if(mCol > 0){
					if(mCol < cols.length)movieScrollFunc(-1);
					mRow = 0;
					mCol--;
					addRemMovie();
				}
			}
		}
	});	


function keyboardClick(currentInput,key){
	
	input = currentInput
	let searchedItems = [];
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
			if(!document.querySelector(".keyboard").classList.contains("live-keyboard")){
						inputs[inputI].classList.remove("active-login");
					inputI++;
					if(inputI === inputs.length-1){
						document.querySelector(".keyboard").innerHTML = "";
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
			
			document.querySelectorAll(".numbers-key").forEach(item => {
				if(item.textContent == "123"){
					document.querySelector(".keyboard").innerHTML = ""
					print_keyboard(numbersKeyboard,currentInput)
					addRemLogin()
					console.log(1);
				}else if(item.textContent == "Eng"){
					document.querySelector(".keyboard").innerHTML = ""
					print_keyboard(lettersKeyboard,currentInput)
					console.log(1);
					addRemLogin()
				}
			})
		}else if((document.querySelector(".active").classList.contains("clean"))){
			currentInput.value = "";
		}else if((document.querySelector(".active").classList.contains("space"))){
			currentInput.value += " ";
		}
		if(currentInput !== document.querySelector(".login-input") && currentInput !== document.querySelector(".password-input") ){

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