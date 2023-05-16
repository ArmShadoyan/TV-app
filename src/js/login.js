import "../../css/login.css"
import "../../css/index.css"
import { pages } from "../remote/pages";
import { controls } from "../remote/controls";
import { print_keyboard } from "../remote/utils";
import { loginRequest } from "../requests/requests";
import { baseUrl,auth} from "../requests/parametrs";



const root = document.querySelector(".root");
// root.style.backgroundImage = "url(../imgs/bg.png)"



window.onload = function () {
	pages.set_current("login");
	controls.set_current("loginInputs");
	controls.loginInputs.move();
}

function keyboardPos(){
	if(!document.querySelector(".keyboard")){
		document.querySelector(".login-block").style.top = "12%";
	}else{
		document.querySelector(".login-block").style.top = "0%";
	}
}


function build_Login_BLock(){

	var loginBlock = document.createElement("div");
	var logoBlock = document.createElement("div");
	var logoImg = document.createElement("img");
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

	document.querySelector(".root").classList.add("root");
	loginBlock.classList.add("login-block");
	logoBlock.classList.add("logo-block");
	logoImg.classList.add("logo-img");
	logoImg.src = require("../imgs/other/logo-large.png");
	logoImg.alt = "logo image";
	inputsBlock.classList.add("inputs-block");
	loginInput.classList.add("login-input","input-block-item","input","login-ctrl");
	passwordInput.classList.add("password-input","input-block-item","input","login-ctrl");
	loginInput.placeholder = "Username";
	loginInput.readOnly = true;
	passwordInput.placeholder = "Password";
	passwordInput.type = "password";
	passwordInput.readOnly = true;
	loginBtn.classList.add("login-btn","input-block-item","login-ctrl");
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
	
	errorMessage.style.display = "none";
	loginBlock.style.top = "12%";

	// currentInput = document.querySelector(".active-login");

	loginInput.addEventListener("click", () => {
		keyboardBlock.innerHTML = "";
		keyboardBlock.append(print_keyboard(lettersKeyboard,loginInput));
		keyboardPos()

		controls.loginInputs.index = 0;
		controls.loginInputs.move();

		controls.set_current("keyboard");
		controls.keyboard.move();
	})

	passwordInput.addEventListener("click", () => {
		keyboardBlock.innerHTML = "";
		keyboardBlock.append(print_keyboard(lettersKeyboard,passwordInput)) ;
		keyboardPos()

		controls.loginInputs.index = 1;
		controls.loginInputs.move();

		controls.set_current("keyboard");
		controls.keyboard.move();
	})

	loginBtn.addEventListener("click",() => {
		controls.loginInputs.index = 2;
		controls.loginInputs.move();
		// loginRequest(baseUrl,loginInput.value,passwordInput.value)
		loginRequest(baseUrl,"QATeamTest","jby2jccj")
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

export function loginRender() {
	build_Login_BLock();
	controls.set_current("login");
	controls.loginInputs.move();
}



// function popUpActive(){
// 	var popUpBtns = popUp.querySelectorAll("button");
// 	// popUpBtns[popUpi].classList.add("popup-active");
// 	document.addEventListener("keydown",(e) => {
// 		if(currentBlock === "login"){
// 			if(e.key === "ArrowRight" && popUp.style.display === "block"){

// 				popUpBtns[popUpi].classList.remove("popup-active");
// 				popUpi++;
// 				if(popUpi == popUpBtns.length)popUpi = 0;
// 				popUpBtns[popUpi].classList.add("popup-active");	
// 			}else if(e.key === "ArrowLeft" && popUp.style.display === "block"){

// 				popUpBtns[popUpi].classList.remove("popup-active");
// 				if(popUpi == 0)popUpi = popUpBtns.length;		
// 				popUpi--;
// 				popUpBtns[popUpi].classList.add("popup-active");
// 			}
// 		}
// 	});
// }

// popUpActive();




