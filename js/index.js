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
keyboard.style.display = "none";
errorMessage.style.display = "none";



root.classList.add("root");
loginBlock.classList.add("login-block");
logoBlock.classList.add("logo-block");
logoImg.classList.add("logo-bmg");
logoImg.src = "/imgs/logo-large.png";
inputsBlock.classList.add("inputs-block");
loginInput.classList.add("login-input","active-login","input-block-item");
passwordInput.classList.add("password-input","input-block-item");
loginInput.placeholder = "Username";
passwordInput.placeholder = "Password";
loginBtn.classList.add("login-btn","input-block-item");
loginBtn.textContent = "Log In";
errorMessage.textContent = "invalid login or password";
errorMessage.classList.add("error-message");
keyboardBlock.classList.add("keyboard-block");
keyboard.classList.add("keyboard");


root.append(loginBlock,keyboardBlock);
loginBlock.append(logoBlock,inputsBlock);
logoBlock.append(logoImg);
inputsBlock.append(loginInput,passwordInput,loginBtn,errorMessage);
keyboardBlock.append(keyboard);
// keyboard.append(row);
// row.append(key);



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




function printKeyboard(keyboardKeys){
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
			if(key === "Done" || key === "clean"){
				symbol.classList.add("bigKeys");
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
				symbol.innerHTML = `
				<span class="material-symbols-outlined back-space">
						backspace
				</span>		
				`;
			}


			rowLine.append(symbol);

		});

	});
}

function activeKey(){
	const keys = document.querySelectorAll(".key");
	const rows = document.querySelectorAll(".row");
	
	let keyIndex = 0;
	let rowindex = 0;

	rows[0].querySelectorAll(".key")[0].classList.add("active");
	const activeKey = document.querySelector(".active");

	document.addEventListener("keydown",(e) => {
		// let rowkeys = rows[c].querySelectorAll(".key");
		let rowkeys = rows[rowindex].querySelectorAll(".key");

		if(e.key === "ArrowRight" ){

			if(keyIndex === rowkeys.length-1){
				keyIndex = -1;
				if(document.querySelector(".active"))document.querySelector(".active").classList.remove("active");
			}

			keyIndex++;
			rowkeys[keyIndex].classList.add("active");
			if(rowkeys[keyIndex-1]){
				rowkeys[keyIndex-1].classList.remove("active");
			}
		 }else if(e.key === "ArrowLeft"){
			if(keyIndex === 0){
				keyIndex = rowkeys.length;
				if(document.querySelector(".active"))document.querySelector(".active").classList.remove("active");
			}

			keyIndex--;
			rowkeys[keyIndex].classList.add("active");
			if(rowkeys[keyIndex+1])rowkeys[keyIndex+1].classList.remove("active");
		 }
		 
		 if(e.key === "ArrowDown" && rowindex < 3){

			rowkeys[keyIndex].classList.remove("active");
			rowindex++;	
			rowkeys = rows[rowindex].querySelectorAll(".key");

			if(keyIndex > rowkeys.length-1)keyIndex = rowkeys.length-1;
			

			rowkeys[keyIndex].classList.add("active");	

		 }else if(e.key === "ArrowUp" && rowindex > 0){
			rowkeys[keyIndex].classList.remove("active");
			rowindex --;
			rowkeys = rows[rowindex].querySelectorAll(".key");
			if(rowindex === 2){
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

	});

}

function activeInputs(){
	const inputs = document.querySelectorAll(".input-block-item");
	let i = 0;
document.addEventListener("keydown",(e) => {
	if(e.key === "Enter" && !loginBtn.classList.contains("active-login")){
		keyboard.style.display = "flex";
	}else if(e.key === "Backspace"){
		keyboard.style.display = "none";
	}

	if(e.key === "Enter" && loginBtn.classList.contains("active-login")){
		errorMessage.style.display = "block";
		setTimeout(() => {
			errorMessage.style.display = "none";
		}, 3000);
	}


	if(e.key === "ArrowDown" && keyboard.style.display === "none"){
		inputs[i].classList.remove("active-login");
		i++;
		if(i > 2)i = 0;
		inputs[i].classList.add("active-login");
	}else if(e.key === "ArrowUp" && keyboard.style.display === "none"){
		inputs[i].classList.remove("active-login");
		if(i === 0)i = inputs.length;
		i--;
		inputs[i].classList.add("active-login");
	}
});
}

function createNumbersKeyboard(){
	document.addEventListener("keydown",(e) => {
		if(e.key === "Enter"){
			if(document.querySelectorAll(".numbers-key")[0].classList.contains("active") || 
			document.querySelectorAll(".numbers-key")[1].classList.contains("active")){
						if(document.querySelectorAll(".numbers-key")[0].textContent === "123"){
							keyboard.innerHTML = "";
							printKeyboard(numbersKeyboard);				
						}else{
							keyboard.innerHTML = "";
							printKeyboard(lettersKeyboard);				
						}
						activeKey();
			}
		}
	});
}

function upLow(){
	document.addEventListener("keydown",(e) => {
		const shift = document.querySelectorAll(".shift");
		const letters = document.querySelectorAll(".letter");
		if(e.key === "Enter"){
			if(shift[0].classList.contains("active") || shift[1].classList.contains("active")){
				console.log(1);
				letters.forEach(item => {
					if(item.textContent !== item.textContent.toUpperCase()){
					item.textContent = item.textContent.toUpperCase();
					}else{
						item.textContent = item.textContent.toLowerCase();
					}
					
				});
			}
		}
	});
}

printKeyboard(lettersKeyboard);
upLow();
createNumbersKeyboard();
activeKey();
activeInputs();

