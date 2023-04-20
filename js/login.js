const root = document.querySelector(".root");

const loginBlock = document.createElement("div");
const logoBlock = document.createElement("div");
const logoImg =document.createElement("img");
const inputsBlock = document.createElement("div");
const loginInput = document.createElement("input");
const passwordInput = document.createElement("input");
const loginBtn = document.createElement("div");


const errorMessage = document.createElement("p");
const keyboardBlock = document.createElement("div");


const popUp = document.createElement("div");
const popUpInner = document.createElement("div");
const popUpAnswer = document.createElement("div");
const popUpButtonsDiv = document.createElement("div");
const cancleBtn = document.createElement("button");
const exitBtn = document.createElement("button");


// keyboard.style.display = "none";
errorMessage.style.display = "none";
loginBlock.style.top = "12%";


root.classList.add("root");
loginBlock.classList.add("login-block");
logoBlock.classList.add("logo-block");
logoImg.classList.add("logo-bmg");
logoImg.src = "/imgs/logo-large.png";
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



const lettersKeyboard = [
	["q","w","e","r","t","y","u","i","o","p","/","\\","back"],
	["a","s","d","f","g","h","j","k","l",".",":","Done"],
	["up","z","x","c","v","b","n","m",",","?","clean","up"],
	["123"," ","123"]
];

const numbersKeyboard = [
	["`","1","2","3","4","5","6","7","8","9","0","|","back"],
	["@", "#", "$", "_", "&", "-", "+", "(", ")", "/", "*", "Done"],
	["up",'"',"'",":",";","!",".","<",">","=","clean","up"],
	["Eng"," ","Eng"]
];


let currentBlock = "login";
let currentPage = "login"
let currentInput = null;
let keyIndex = 0;
let rowIndex = 0;
let i = 0;
let inputI = 0
let popUpi = 0;
let keyboard_exist = false;

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

	root.append(loginBlock,keyboardBlock,popUp);
	loginBlock.append(logoBlock,inputsBlock);
	logoBlock.append(logoImg);
	inputsBlock.append(loginInput,passwordInput,loginBtn,errorMessage);
	// keyboardBlock.append(keyboard);
	popUp.append(popUpInner);
	popUpInner.append(popUpAnswer,popUpButtonsDiv);
	popUpButtonsDiv.append(cancleBtn,exitBtn);
	
	currentInput = document.querySelector(".active-login")

	loginInput.addEventListener("click", () => {
		keyboardBlock.innerHTML = "";
		currentInput = loginInput;
		keyboardBlock.append(print_keyboard(lettersKeyboard,currentInput)) ;
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
console.log(loginBtn);
	loginBtn.addEventListener("click",() => {
		loginRequest(loginInput.value,passwordInput.value)
					.then(() => {
						if(!auth){
							errorMessage.style.display = "block";
							setTimeout(() => {
								errorMessage.style.display = "none";
							}, 3000);
						}
					});		
	})
}

function print_keyboard(keyboardKeys,currentInput){
	const keyboard = document.createElement("div");
	keyboard.classList.add("keyboard");

	rowIndex = 0;
	keyIndex = 0;
	
	keyboardKeys.forEach((row,rowI) => {
		const rowLine = document.createElement("div");
		rowLine.classList.add("row");
		keyboard.append(rowLine);

		row.forEach((key,keyI) => {
			const symbol = document.createElement("div");
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

			let input = currentInput;
			symbol.addEventListener("click",()=> {
				keyboardClick(input,symbol)
				currentBlock = "login";
			})
		});
	});
	return keyboard;
}

function keyboardControls(e){
	let rowkeys;
	let rows;
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
			}else if(!keyboard_exist && document.querySelector(".active-login")){
				document.querySelector(".active-login").click()
			}
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
				rowIndex++;
				if(rowIndex > rows.length-1){
					rowIndex = 0;
				}
				if(rowIndex > 2){
					keyIndex = 0;
				}
				addRemLogin()
			}
			else if(e.key === "ArrowUp"){
				rowIndex--;
				if(rowIndex < 0){
					// debugger
					if(currentPage === "login"){
						rowIndex = rows.length-1;
						keyIndex = 0;
					}else if(currentPage === "movies-search"){
						 document.querySelector(".active").classList.remove("active");
						 currentBlock = "movies";
						 if(searchedItems.length === 0){
							mCol = 0;
						 }else{
							mCol = 1;
						 }
						 addRemMovie();
					}
				}
				
				if(currentBlock === "login")addRemLogin();
			}
		}else if(!keyboard_exist && !document.querySelector(".keyboard")){
			const inputs = document.querySelectorAll(".input-block-item");
			if(e.key === "ArrowDown"){
				document.querySelector(".active-login").classList.remove("active-login")
				inputI++;
				if(inputI > inputs.length-1)inputI = 0;
				inputs[inputI].classList.add("active-login")
			}else if(e.key === "ArrowUp"){
				document.querySelector(".active-login").classList.remove("active-login")
				inputI--;
				if(inputI < 0)inputI = inputs.length-1;
				inputs[inputI].classList.add("active-login")

			}
		}
    }
}

build_Login_BLock();
popUpActive();


function popUpActive(){
	const popUpBtns = popUp.querySelectorAll("button");
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
