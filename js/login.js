var root = document.querySelector(".root");



var loginBlock = document.createElement("div");
var logoBlock = document.createElement("div");
var logoImg =document.createElement("img");
var inputsBlock = document.createElement("div");
var loginInput = document.createElement("input");
var passwordInput = document.createElement("input");
var loginBtn = document.createElement("div");

var errorMessage = document.createElement("p");
var keyboardBlock = document.createElement("div");

var popUp = document.createElement("div");
var popUpInner = document.createElement("div");
var popUpAnswer = document.createElement("div");
var popUpButtonsDiv = document.createElement("div");
var cancleBtn = document.createElement("button");
var exitBtn = document.createElement("button");

errorMessage.style.display = "none";
loginBlock.style.top = "12%";



function loader(){
	var loader = document.createElement("div");
	var loaderParent = document.createElement("div");
	var loaderText = document.createElement("div");
	loaderText.classList.add("loader-text");
	loaderText.textContent = "Loading...";
	loaderParent.classList.add("loader-parent");
	loader.classList.add("loader");
	if(!document.querySelector(".loader-parent")){
		root.append(loaderParent);
		loaderParent.append(loader,loaderText)
	}
}

var lettersKeyboard = [
	["q","w","e","r","t","y","u","i","o","p","/","\\","back"],
	["a","s","d","f","g","h","j","k","l",".",":","Done"],
	["up","z","x","c","v","b","n","m",",","?","clean","up"],
	["123"," ","123"]
];

var numbersKeyboard = [
	["`","1","2","3","4","5","6","7","8","9","0","|","back"],
	["@", "#", "$", "_", "&", "-", "+", "(", ")", "/", "*", "Done"],
	["up",'"',"'",":",";","!",".","<",">","=","clean","up"],
	["Eng"," ","Eng"]
];


 var currentBlock = "login";
 var currentPage = "login"
 var currentInput = null;
 var keyIndex = 0;
 var rowIndex = 0;
 var i = 0;
 var inputI = 0;
 var test = 0;
 var popUpi = 0;
 var keyboard_exist = false;

function keyboardPos(){
	if(keyboard_exist){
		loginBlock.style.top = "0";
	}else{
		loginBlock.style.top = "12%";
	}
}
keyboardPos()


 function build_Login_BLock(){
	currentPage = "login";

	
root.classList.add("root");
loginBlock.classList.add("login-block");
logoBlock.classList.add("logo-block");
logoImg.classList.add("logo-bmg");
logoImg.src = ("./imgs/logo-large.png");
logoImg.alt = "logo image";
inputsBlock.classList.add("inputs-block");
loginInput.classList.add("login-input","active-login","input-block-item","input");
passwordInput.classList.add("password-input","input-block-item","input");
loginInput.placeholder = "Username";
loginInput.readOnly = true;
passwordInput.placeholder = "Password";
passwordInput.type = "password";
passwordInput.readOnly = true;
loginBtn.classList.add("login-btn","input-block-item");
loginBtn.textContent = "Log In";
errorMessage.textContent = "invalid login or password";
errorMessage.classList.add("error-message");
keyboardBlock.classList.add("keyboard-block");

popUp.style.display = "none";
popUp.classList.add("pop-up");
popUpInner.classList.add("popup-inner");
popUpAnswer.classList.add("popUp-answer");
popUpAnswer.textContent = "Are you sure,you want to exit?";
popUpButtonsDiv.classList.add("popUp-buttons-div");
cancleBtn.classList.add("cancle-btn");
cancleBtn.textContent = "Cancle";
exitBtn.classList.add("exit-btn");
exitBtn.textContent = "Exit";

	root.append(loginBlock,keyboardBlock,popUp);
	loginBlock.append(logoBlock,inputsBlock);
	logoBlock.append(logoImg);
	inputsBlock.append(loginInput,passwordInput,loginBtn,errorMessage);
	popUp.append(popUpInner);
	popUpInner.append(popUpAnswer,popUpButtonsDiv);
	popUpButtonsDiv.append(cancleBtn,exitBtn);
	
	currentInput = document.querySelector(".active-login");

	loginInput.addEventListener("click", () => {
		keyboardBlock.innerHTML = "";
		currentInput = loginInput;
		keyboardBlock.append(print_keyboard(lettersKeyboard,currentInput));
		keyboard_exist = true;
		addRemLogin();
		document.querySelector(".active-login").classList.remove("active-login");
		loginInput.classList.add("active-login");
		keyboardPos()
	})

	passwordInput.addEventListener("click", () => {
		keyboardBlock.innerHTML = "";
		currentInput = passwordInput;
		keyboardBlock.append(print_keyboard(lettersKeyboard,currentInput)) ;
		keyboard_exist = true;
		addRemLogin();
		document.querySelector(".active-login").classList.remove("active-login");
		passwordInput.classList.add("active-login");
		keyboardPos()
	})

	loginBtn.addEventListener("click",() => {
		loginRequest(baseUrl,loginInput.value,passwordInput.value)
		.then(() => {
			if(!auth){
				errorMessage.style.display = "block";
				setTimeout(() => {
					errorMessage.style.display = "none";
				}, 3000);
			}
		});		
	});
};

function print_keyboard(keyboardKeys,currentInput){
	var keyboard = document.createElement("div");
	keyboard.classList.add("keyboard");

	rowIndex = 0;
	keyIndex = 0;
	
	keyboardKeys.forEach((row,rowI) => {
		var rowLine = document.createElement("div");
		rowLine.classList.add("row");
		keyboard.append(rowLine);

		row.forEach((key,keyI) => {
			var symbol = document.createElement("div");
			symbol.classList.add("key");	
			if(key.toUpperCase() != key.toLowerCase() && key.length === 1){
				symbol.classList.add("letter");
			}
			if(key === "Done"){
				symbol.classList.add("bigKeys","done");
			}else if( key === "clean"){
				symbol.classList.add("bigKeys","clean");
			}else if(key === " "){
				symbol.classList.add("space");
			}else if( key === "123" || key === "Eng"){
				symbol.classList.add("numbers-key");
			}
			if(key === "up"){
				symbol.innerHTML = `
				<span class="material-symbols-outlined">
						shift
				</span>
				`;
				symbol.classList.add("shift");
			}else{
				symbol.textContent = key;
			}
			if(key === "back"){
				symbol.classList.add("back");
				symbol.innerHTML = `
				<span class="material-symbols-outlined back-space">
						backspace
				</span>		
				`;
			}
			rowLine.append(symbol);
			var input = currentInput;
			symbol.addEventListener("click",()=> {
			keyboardClick(input, symbol);
				// currentBlock = "login";
			})
		});
	});
	return keyboard;
};

  function keyboardControls(e){
	var rowkeys;
	var rows;
    if(currentBlock === "login"){
		if(keyboard_exist){
			rows = document.querySelectorAll(".row");
			rowkeys = rows[rowIndex].querySelectorAll(".key");
		}
        if(e.key === "Backspace" && document.querySelector(".keyboard").classList.contains("live-keyboard")){
            document.querySelector(".player-block").style.transform = "translateX(0)";
			document.querySelector(".chanels-search-inputblock").style.transform = "translateX(110%)";
			currentBlock = "tv";
			keyboard_exist = false;
        }else if(e.key === "Enter"){
			
			if(currentInput && keyboard_exist){
				if(document.querySelector(".active"))document.querySelector(".active").click();
				else if(document.querySelector(".keyboard").classList.contains("live-keyboard")){
					document.querySelector(".player-block").style.transform = "translateX(0)";
					document.querySelector(".chanels-search-inputblock").style.transform = "translateX(110%)";
					currentBlock = "tv"
					filteredCat = searchedItems;
				}
			}else if(!keyboard_exist && document.querySelector(".active-login")){
				document.querySelector(".active-login").click()
			}




			var inputs = document.querySelectorAll(".input-block-item");
			
		}
		if(keyboard_exist){
			if(e.key === "ArrowRight"){
				keyIndex++;
				if(keyIndex > rowkeys.length-1)keyIndex = 0;
				addRemLogin();
			}else if(e.key === "ArrowLeft"){
				keyIndex--;
				if(keyIndex < 0)keyIndex = rowkeys.length-1;
				addRemLogin();
			}else if(e.key === "ArrowDown"){
				if(rowIndex < rows.length-1){
					rowIndex++;
					if(rowIndex === 3){
						if(keyIndex === 0 || keyIndex === 1){
							keyIndex = 0;
						}else if(keyIndex > 9){
							keyIndex = 2
						}else{
							keyIndex = 1;
						}
					}
				}
				if(keyIndex > rows[rowIndex].querySelectorAll(".key").length-1){
					keyIndex = rows[rowIndex].querySelectorAll(".key").length-1
				}

				
				addRemLogin()
			}
			else if(e.key === "ArrowUp"){
				if(currentPage === "login" || currentPage === "tv"){
					if(rowIndex > 0){
						rowIndex--;
					}
				}else{
					rowIndex--;
				}
				if(rowIndex < 0){
					if(currentPage === "movies-search"){
						if(searchedItems.length > 0){
							document.querySelector(".active").classList.remove("active");
							currentBlock = "movie-search";
							mRow = 0;
							searchI = 1;
							addRemSearch();
						}else{
							document.querySelector(".active").classList.remove("active");
							currentBlock = "movie-search";
							searchI = 0;
							addRemSearch();
						}
					}
				}
				
				if(currentBlock === "login")addRemLogin();
			}
			// && document.querySelector(".active").classList.contains("done")
		}else if(!keyboard_exist && !document.querySelector(".keyboard") ){
			var inputs = document.querySelectorAll(".input-block-item");
			if(e.key === "ArrowDown"){
				document.querySelector(".active-login").classList.remove("active-login")
				inputI++;
				if(inputI > inputs.length-1)inputI = 0;
				inputs[inputI].classList.add("active-login")
			}
			else if(e.key === "ArrowUp"){
				document.querySelector(".active-login").classList.remove("active-login")
				inputI--;
				if(inputI < 0) inputI = inputs.length-1;
				inputs[inputI].classList.add("active-login")
			}else if(e.key === "Enter"){
			
			}
		}
    }
}

build_Login_BLock();
popUpActive();


function popUpActive(){
	var popUpBtns = popUp.querySelectorAll("button");
	popUpBtns[popUpi].classList.add("popup-active");
	document.addEventListener("keydown",(e) => {
		if(currentBlock === "login"){
			if(e.key === "ArrowRight" && popUp.style.display === "block"){

				popUpBtns[popUpi].classList.remove("popup-active");
				popUpi++;
				if(popUpi == popUpBtns.length)popUpi = 0;
				popUpBtns[popUpi].classList.add("popup-active");	
			}else if(e.key === "ArrowLeft" && popUp.style.display === "block"){

				popUpBtns[popUpi].classList.remove("popup-active");
				if(popUpi == 0)popUpi = popUpBtns.length;		
				popUpi--;
				popUpBtns[popUpi].classList.add("popup-active");
			}
		}
	});
}


 function donee(){
	if(!document.querySelector(".keyboard").classList.contains("live-keyboard") && !document.querySelector(".keyboard").classList.contains("movie-keyboard")){
		inputs[inputI].classList.remove("active-login");
		console.log(inputI, 'inputI')
		inputI++;
		if(inputI === inputs.length-1){
			document.querySelector(".keyboard").remove();
			keyboard_exist = false;
			inputI = 0;
			keyboardPos();
			document.querySelector(".login-btn").classList.add("active-login")
			loginBtn.click();	
		}else{
			inputs[inputI].classList.add("active-login");
		}
	}
}