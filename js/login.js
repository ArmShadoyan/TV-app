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
const keyboard = document.createElement("div");

const popUp = document.createElement("div");
const popUpInner = document.createElement("div");
const popUpAnswer = document.createElement("div");
const popUpButtonsDiv = document.createElement("div");
const cancleBtn = document.createElement("button");
const exitBtn = document.createElement("button");

keyboard.style.display = "none";
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
keyboard.classList.add("keyboard");

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
keyboardBlock.append(keyboard);
popUp.append(popUpInner);
popUpInner.append(popUpAnswer,popUpButtonsDiv);
popUpButtonsDiv.append(cancleBtn,exitBtn);

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
let keyIndex = 0;
let rowIndex = 0;
let i = 0;
let popUpi = 0;


function loginBlockStyle(){
	if(keyboard.style.display === "none"){
		loginBlock.style.top = "12%";
	}else{
		loginBlock.style.top = "0";
	}
}

function printKeyboard(keyboardKeys){
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
		});

	});
	return keyboard;
}


document.addEventListener("keydown",(e) => {
	if(currentBlock === "login"){
	
		const rows = document.querySelectorAll(".row");
		let rowkeys = rows[rowIndex].querySelectorAll(".key");

		if(e.key === "ArrowRight" && keyboard.style.display === "flex"){
			
			if(keyIndex === rowkeys.length-1){
				keyIndex = -1;
				if(document.querySelector(".active"))document.querySelector(".active").classList.remove("active");
			}
			
			keyIndex++;
			rowkeys[keyIndex].classList.add("active");
			if(rowkeys[keyIndex-1]){
				rowkeys[keyIndex-1].classList.remove("active");
			}

		 }else if(e.key === "ArrowLeft" && keyboard.style.display === "flex"){
			if(keyIndex === 0){
				keyIndex = rowkeys.length;
				if(document.querySelector(".active"))document.querySelector(".active").classList.remove("active");
			}

			keyIndex--;
			rowkeys[keyIndex].classList.add("active");
			if(rowkeys[keyIndex+1])rowkeys[keyIndex+1].classList.remove("active");
		 }
		 
		 if(e.key === "ArrowDown" && rowIndex < 3 && keyboard.style.display === "flex"){

			rowkeys[keyIndex].classList.remove("active");
			rowIndex++;	
			rowkeys = rows[rowIndex].querySelectorAll(".key");

			if(keyIndex > rowkeys.length-1)keyIndex = rowkeys.length-1;
			

			rowkeys[keyIndex].classList.add("active");	

		 }else if(e.key === "ArrowUp" && rowIndex > 0 && keyboard.style.display === "flex"){
			rowkeys[keyIndex].classList.remove("active");
			rowIndex --;
			rowkeys = rows[rowIndex].querySelectorAll(".key");
			if(rowIndex === 2){
				if(keyIndex === 2){
					keyIndex = rowkeys.length-1;
				}else if (keyIndex === 0){
					keyIndex = 0;
				}else{
					keyIndex = 6;
				}
			};
			rowkeys[keyIndex].classList.add("active");
		 }
	}
});


function activeInputs(){
	const inputs = document.querySelectorAll(".input-block-item");
	printOnClick();
	
	document.addEventListener("keydown",(e) => {
		if(currentBlock === "login"){
			
			if(e.key === "Enter" && !loginBtn.classList.contains("active-login") && popUp.style.display === "none"){
				keyboard.style.display = "flex";
				loginBlockStyle();
				print(e);
			}else if(e.key === "Enter" && cancleBtn.classList.contains("popup-active") && keyboard.style.display === "none"){
				popUp.style.display = "none";
			}else if(e.key === "Backspace" && keyboard.style.display === "flex"){
				keyboard.style.display = "none";
				loginBlockStyle();
				keyIndex = 0;
				rowIndex = 0;
				if(document.querySelector(".active")){
					document.querySelector(".active").classList.remove("active");
				}
				keyboard.innerHTML = "";
				printKeyboard(lettersKeyboard);
				printOnClick();

			}else if(e.key === "Backspace" && keyboard.style.display === "none"){
				popUp.style.display = "block";
			}

			if(e.key === "Enter" && loginBtn.classList.contains("active-login")){
			
				loginRequest(loginInput.value,passwordInput.value)
				.then(() => {
					if(!auth){
						errorMessage.style.display = "block";
						setTimeout(() => {
							errorMessage.style.display = "none";
						}, 3000);
					}
				});		
			}

			if(e.key === "ArrowDown" && keyboard.style.display === "none"){
				inputs[i].classList.remove("active-login");
				i++;
				if(i > 2)i = 0;
				if(loginBtn.classList.contains("active-login")){
					loginBtn.classList.remove("active-login");
					i = 0;
				}
				inputs[i].classList.add("active-login");
			}else if(e.key === "ArrowUp" && keyboard.style.display === "none"){
				loginBtn.classList.remove("active-login-btn");
				inputs[i].classList.remove("active-login");
				if(i === 0)i = inputs.length;
				i--;
				if(loginBtn.classList.contains("active-login")){
					loginBtn.classList.remove("active-login");
					i = 1;
				}
				inputs[i].classList.add("active-login");
			}
		}
	});
}

function createNumbersKeyboard(){
	document.addEventListener("keydown",(e) => {
		if(currentBlock === "login"){
			if(e.key === "Enter"){
				if(document.querySelectorAll(".numbers-key")[0].classList.contains("active") || 
				document.querySelectorAll(".numbers-key")[1].classList.contains("active")){
					if(document.querySelectorAll(".numbers-key")[0].textContent === "123"){
						keyboard.innerHTML = "";
						printKeyboard(numbersKeyboard);	
						keyIndex = 0;
						rowIndex = 0;
					}else{
						keyboard.innerHTML = "";
						printKeyboard(lettersKeyboard);	
						keyIndex = 0;
						rowIndex = 0;
					}
				}
			}
		}
	});
}

function upLow(){
	document.addEventListener("keydown",(e) => {
		if(currentBlock === "login"){
			const shift = document.querySelectorAll(".shift");
			const letters = document.querySelectorAll(".letter");
			if(e.key === "Enter"){
				if(shift[0].classList.contains("active") || shift[1].classList.contains("active")){
					letters.forEach(item => {
						if(item.textContent !== item.textContent.toUpperCase()){
						item.textContent = item.textContent.toUpperCase();
						}else{
							item.textContent = item.textContent.toLowerCase();
						}
						
					});
				}
			}
		}
	});
}

function activeInputOnclick(){
	const inputs = document.querySelectorAll(".input");
	inputs.forEach((item,index) => {
		item.addEventListener("click",() => {
			if(loginBtn.classList.contains("active-login-btn")){
				loginBtn.classList.remove("active-login-btn");
			}

			if(index === 0){
				loginBtn.classList.remove("active-login");
				item.classList.add("active-login");
				if(inputs[1].classList.contains("active-login")){
					inputs[1].classList.remove("active-login");
				}
			}else if(index === 1){
				loginBtn.classList.remove("active-login");
				item.classList.add("active-login");
				if(inputs[0].classList.contains("active-login")){
					inputs[0].classList.remove("active-login");
				}
			}

			keyboard.style.display = "flex";
			loginBlockStyle();
			
		});
	});

	loginBtn.addEventListener("click",() => {
		inputs.forEach(item => {
			item.classList.remove("active-login");
		});

		loginRequest(loginInput.value,passwordInput.value)
				.then(() => {
					if(!auth){
						errorMessage.style.display = "block";
						setTimeout(() => {
						errorMessage.style.display = "none";
					}, 3000);
					console.log(auth);
					}
				});

		loginBtn.classList.add("active-login-btn");

		
		keyIndex = 0;
		rowIndex = 0;
		if(document.querySelector(".active"))document.querySelector(".active").classList.remove("active");
	});	
}

function print(e){
		
		const activeInput = document.querySelector(".active-login");
		const pressedKey = document.querySelector(".active");
		if(e.key === "Enter"){		
			if(pressedKey){
				if(!pressedKey.classList.contains("shift") && !pressedKey.classList.contains("back")
				&& pressedKey.textContent.length === 1){

				activeInput.value += pressedKey.textContent;

				}
			}
			
		}
		if(!document.querySelector(".active")){
			document.querySelectorAll(".row")[0].querySelectorAll(".key")[0].classList.add("active");
		}
	
}

function deleteeOnKey(){
	document.addEventListener("keydown",(e) => {
			if(currentBlock === "login"){
				const activeInput = document.querySelector(".active-login");
				const backBtn = document.querySelector(".back");
				const cleanBtn = document.querySelector(".clean");
				const doneBtn = document.querySelector(".done");
				if(e.key === "Enter" && backBtn.classList.contains("active")){
					activeInput.value = activeInput.value.split("").slice(0,-1).join("");
			}else if(e.key === "Enter" && cleanBtn.classList.contains("active")){
				activeInput.value = "";
			}else if(e.key === "Enter" && doneBtn.classList.contains("active")){
				const inputItems = document.querySelectorAll(".input-block-item");
				if(i < inputItems.length-1){
					inputItems[i].classList.remove("active-login");
					inputItems[i + 1].classList.add("active-login");
					i++;
				}else{
					keyboard.style.display = "none";
					loginBlockStyle();
					document.querySelector(".active").classList.remove("active");
					keyIndex = 0;
					rowIndex = 0;
				}
			}
		}
	});
}

function printOnClick(){
	const keys = document.querySelectorAll(".key");

	if(document.querySelector(".active")){
		document.querySelector(".active").classList.remove("active");
	}

	keys.forEach((item,index) => {

		if(!item.classList.contains("shift") &&
		   !item.classList.contains("back") &&
		   !item.classList.contains("numbers-key") &&
		   !item.classList.contains("done")&&
		   !item.classList.contains("clean")){

			item.addEventListener("click",(e) => {
				console.log(1);
				const activeInput = document.querySelector(".active-login");

				if(document.querySelector(".active")){
					document.querySelector(".active").classList.remove("active");
				}
				item.classList.add("active");

				const rows = document.querySelectorAll(".row");
				rows.forEach((item,rIndex) => {
					
					item.querySelectorAll(".key").forEach((key,kIndex) => {
						if(key.classList.contains("active")){
							
							keyIndex = kIndex;
							rowIndex = rIndex;
						}

					});
				});

				if(activeInput)activeInput.value += item.textContent;
			});
		   } else if(item.classList.contains("shift")){
				item.addEventListener("click",() => {
					const letters = document.querySelectorAll(".letter");
					letters.forEach(item => {
						if(item.textContent !== item.textContent.toUpperCase()){
						item.textContent = item.textContent.toUpperCase();
						}else{
							item.textContent = item.textContent.toLowerCase();
						}
					});
				});
		   }
		   else if(item.classList.contains("back")){
			item.addEventListener("click",() => {
				const activeInput = document.querySelector(".active-login");
				activeInput.value = activeInput.value.split("").slice(0,-1).join("");
			});
		   }
		   else if(item.classList.contains("clean")){
			item.addEventListener("click", () => {
				const activeInput = document.querySelector(".active-login");
				activeInput.value = "";
			});
		   }
		   else if(item.classList.contains("done")){
			item.addEventListener("click",() => {
				const inputItems = document.querySelectorAll(".input-block-item");
				inputItems.forEach((item,index) =>{
					if(item.classList.contains("active-login")){
						i = index;
					}
				});
				if(i !== inputItems.length-1){
					inputItems[i].classList.remove("active-login");
					inputItems[i + 1].classList.add("active-login");
					i++;
				}
				else{
					keyIndex = 0;
					rowIndex = 0;
					keyboard.style.display = "none";
					loginBlockStyle();
				}
			});
				
		   }
		   else if(item.classList.contains("numbers-key")){
			if(item.textContent === "123"){
				item.addEventListener("click",() => {
					keyboard.innerHTML = "";
					printKeyboard(numbersKeyboard);	
					printOnClick();
					keyIndex = 0;
					rowIndex = 0;
				});
			}else{
				item.addEventListener("click",() => {
							keyboard.innerHTML = "";
							printKeyboard(lettersKeyboard);	
							printOnClick();
							keyIndex = 0;
							rowIndex = 0;
				});
							
			}
		   }
		
		   
	});
	if(document.querySelector(".active")){
	document.querySelector(".active").classList.remove("active");
	}

}

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

printKeyboard(lettersKeyboard);
upLow();
createNumbersKeyboard();
activeInputs();
activeInputOnclick();
deleteeOnKey();
popUpActive();
