var parentalI = 0;
var pinkeyI = 0;

function ChangeParentalCodeElements(){
	var backToMenuDiv = document.createElement("div");
	var backToMenuBtn = document.createElement("div");

	var pinBlock = document.createElement("div");
	var pinInputBlock = document.createElement("div");
	var pinTitle = document.createElement("div");
	var pinRow = document.createElement("div");
	var pin1 = document.createElement("div");
	var pin2 = document.createElement("div");
	var pin3 = document.createElement("div");
	var pin4 = document.createElement("div");
	var errorPin = document.createElement("div");
	var successPin = document.createElement("div");

	var pinKeyboardBlock = document.createElement("div");
	var pinKeyboardRow = document.createElement("div");

	pinInputBlock.classList.add("pin_input_block");
	pinTitle.classList.add("pin_title");
	pinTitle.textContent = "Enter Old Pin";
	pinRow.classList.add("pin_row");
	pin1.classList.add("pin_1","pin_input");
	pin2.classList.add("pin_2","pin_input");
	pin3.classList.add("pin_3","pin_input");
	pin4.classList.add("pin_4","pin_input");
	errorPin.classList.add("error_pin");
	errorPin.textContent = "Wrong Pin";
	errorPin.style.display = "none";
	successPin.classList.add("success_pin");

	backToMenuDiv.classList.add("back-to-menu-div");
	backToMenuBtn.classList.add("back-to-menu-btn");
	pinKeyboardBlock.classList.add("pin_keyboard_block");
	pinKeyboardRow.classList.add("pin_keyboard_row");
	pinBlock.classList.add("pin_block");
	backToMenuDiv.append(backToMenuBtn);
	pinInputBlock.append(pinTitle,pinRow,errorPin,successPin);
	pinRow.append(pin1,pin2,pin3,pin4);

	pinKeys.forEach(key => {
		var pinKeyBlock = document.createElement("div");
		var pinKey = document.createElement("div");
		pinKeyBlock.classList.add("pin_key_block");
		pinKey.classList.add("pin_key");
		pinKey.textContent = key;

		pinKeyBlock.append(pinKey);
		pinKeyboardRow.append(pinKeyBlock);		
	});
	pinKeyboardBlock.append(pinKeyboardRow);
	pinBlock.append(pinInputBlock,pinKeyboardBlock);
	root.append(backToMenuDiv,pinBlock);
	pinKeyboardRow.style.display = "none";
}


function parentalCodeControls(e){
	var backBtn = document.querySelector(".back-to-menu-btn");
	var pinInputs = document.querySelectorAll(".pin_input");
	if(e.key === "ArrowRight"  && document.querySelector(".pin_keyboard_row").style.display === "none"){

		if(backBtn.classList.contains("active-settings-back")){

			backBtn.classList.remove("active-settings-back");
			pinInputs[parentalI].classList.add("active_pin_input");
		}else{
			parentalI++;
			if(parentalI == pinInputs.length)parentalI = 0;
			addRemParental();
		}
		

	}else if(e.key === "ArrowLeft" && document.querySelector(".pin_keyboard_row").style.display === "none"){
		if(parentalI === 0){
			backBtn.classList.add("active-settings-back");
			pinInputs[parentalI].classList.remove("active_pin_input");
		}else{
			parentalI--;
			addRemParental();
		}		
	}
	
	// 		PIN BLOCK KEYBOARD CONTROLS
	
	else if(e.key === "Enter" && document.querySelector(".active_pin_input") && document.querySelector(".pin_keyboard_row").style.display === "none"){
		document.querySelector(".pin_keyboard_row").style.display = "flex";
		addRemParentalKeys();
	}else if(e.key === "Enter"  && !document.querySelector(".active_pin_input") && document.querySelector(".pin_keyboard_row").style.display === "none"){
		if(backBtn.classList.contains("active-settings-back")){
			backBtn.classList.remove("active-settings-back");
			settingsRender();
		}
	}else if(document.querySelector(".pin_keyboard_row").style.display === "flex"){
		var pinKeys = document.querySelectorAll(".pin_key");
		if(e.key === "ArrowRight"){
			pinkeyI++;
			if(pinkeyI == pinKeys.length)pinkeyI = 0;
			addRemParentalKeys();
		}else if(e.key === "ArrowLeft"){
			pinkeyI--;
			if(pinkeyI < 0)pinkeyI = pinKeys.length-1;
			addRemParentalKeys();
		}else if(e.key === "ArrowUp"){
			document.querySelector(".pin_keyboard_row").style.display = "none";
		}else if(e.key === "Enter" ){
			document.querySelector(".active_pin_input").style.cssText = `
				background-image: url("/imgs/settingsmenu/asterisk.png");
			`;
			parentalI++;
			if(parentalI == pinInputs.length){
				parentalI = 0;
				document.querySelectorAll(".pin_input").forEach(item => {
					item.style.cssText = `
					background-image: none;
				`;
				document.querySelector(".error_pin").style.display = "block";
				setTimeout(() => {
					document.querySelector(".error_pin").style.display = "none";
				}, 2000);
				});
			}
			addRemParental();
		}
	}


}


function addRemParental(){
	if(document.querySelector(".active_pin_input")){
		document.querySelector(".active_pin_input").classList.remove("active_pin_input");
	}
	document.querySelectorAll(".pin_input")[parentalI].classList.add("active_pin_input");
}

function addRemParentalKeys(){
	if(document.querySelector(".active_pin_key")){
		document.querySelector(".active_pin_key").classList.remove("active_pin_key");
	}
	document.querySelectorAll(".pin_key")[pinkeyI].classList.add("active_pin_key");
}

function parentalCodeRender(){
	root.innerHTML = "";
	currentBlock = "parental code";
	ChangeParentalCodeElements();
	addRemParental();
}
function lockCategoriesRender(){
	root.innerHTML = "";
	currentBlock = "parental code";
	ChangeParentalCodeElements();
	addRemParental();
	document.querySelector(".pin_title").textContent = "Enter Pin";
}

function parentalCodeOnclick(){
	var keyboardRow = document.querySelector(".pin_keyboard_row");
	var parentalInputs = document.querySelectorAll(".pin_input");
	console.log(parentalInputs);
	parentalInputs.forEach(item => {
		item.addEventListener("click",() => {
			keyboardRow.style.display = "flex";
			addRemParentalKeys();
		});
	});

	var pinKeys = document.querySelectorAll(".pin_key");
	var pinInputs = document.querySelectorAll(".pin_input");

	pinKeys.forEach(item => {
		item.addEventListener("click",() => {
			document.querySelector(".active_pin_key").classList.remove("active_pin_key");
			item.classList.add("active_pin_key");
			document.querySelector(".active_pin_input").style.cssText = `
			background-image: url("/imgs/settingsmenu/asterisk.png");
		`;
		parentalI++;
		if(parentalI == pinInputs.length){
			parentalI = 0;
			document.querySelectorAll(".pin_input").forEach(item => {
				item.style.cssText = `
				background-image: none;
			`;
			document.querySelector(".error_pin").style.display = "block";
			setTimeout(() => {
				document.querySelector(".error_pin").style.display = "none";
			}, 2000);
			});
		}
		addRemParental();
		});
	});
}