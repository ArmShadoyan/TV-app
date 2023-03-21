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
loginInput.classList.add("login-input","active-login","input-block-item","input");
passwordInput.classList.add("password-input","input-block-item","input");
loginInput.placeholder = "Username";
passwordInput.placeholder = "Password";
passwordInput.type = "password";
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
}
let keyIndex = 0;
let rowIndex = 0;
	
	// document.querySelectorAll(".row")[0][0].classList.add("active");
	
	document.addEventListener("keydown",(e) => {
		const rows = document.querySelectorAll(".row");
		
		
		let rowkeys = rows[rowIndex].querySelectorAll(".key");
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
		 
		 if(e.key === "ArrowDown" && rowIndex < 3){

			rowkeys[keyIndex].classList.remove("active");
			rowIndex++;	
			rowkeys = rows[rowIndex].querySelectorAll(".key");

			if(keyIndex > rowkeys.length-1)keyIndex = rowkeys.length-1;
			

			rowkeys[keyIndex].classList.add("active");	

		 }else if(e.key === "ArrowUp" && rowIndex > 0){
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

	});



function activeInputs(){
	const inputs = document.querySelectorAll(".input-block-item");
	let i = 0;

	document.addEventListener("keydown",(e) => {
	if(e.key === "Enter" && !loginBtn.classList.contains("active-login")){
		keyboard.style.display = "flex";
		
		if(!document.querySelector(".active")){
		document.querySelectorAll(".row")[0].querySelectorAll(".key")[0].classList.add("active");
		}
		
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
		loginBtn.classList.remove("active-login-btn");
		inputs[i].classList.remove("active-login");
		i++;
		if(i > 2)i = 0;
		inputs[i].classList.add("active-login");
	}else if(e.key === "ArrowUp" && keyboard.style.display === "none"){
		loginBtn.classList.remove("active-login-btn");
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
	});
}

function upLow(){
	document.addEventListener("keydown",(e) => {
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
			
		});
	});

	loginBtn.addEventListener("click",() => {
		inputs.forEach(item => {
			item.classList.remove("active-login");
		});

		loginBtn.classList.add("active-login-btn");

		errorMessage.style.display = "block";
		setTimeout(() => {
			errorMessage.style.display = "none";
		}, 3000);
	});	
}

function print(){
	document.addEventListener("keydown",(e)=>{
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
	});
}

function deleteeOnKey(){
	document.addEventListener("keydown",(e) => {
		const activeInput = document.querySelector(".active-login");
		const backBtn = document.querySelector(".back");
		const cleanBtn = document.querySelector(".clean");
		const doneBtn = document.querySelector(".done");
		if(e.key === "Enter" && backBtn.classList.contains("active")){
			activeInput.value = activeInput.value.split("").slice(0,-1).join("");
		}else if(e.key === "Enter" && cleanBtn.classList.contains("active")){
			activeInput.value = "";
		}else if(e.key === "Enter" && doneBtn.classList.contains("active")){
			document.querySelector(".active-login").classList.remove("active-login");
			loginBtn.classList.add("active-login");
			keyboard.style.display = "none";
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
		   }
		   else if(item.classList.contains("shift")){
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
				document.querySelector(".active-login").classList.remove("active-login");
				loginBtn.classList.add("active-login");
				keyboard.style.display = "none";
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


printKeyboard(lettersKeyboard);

upLow();
createNumbersKeyboard();
activeInputs();
activeInputOnclick();
print();
printOnClick();
deleteeOnKey();

