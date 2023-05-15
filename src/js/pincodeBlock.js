
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
	pin1.classList.add("pin_1","pin_input","pin-ctrl");
	pin2.classList.add("pin_2","pin_input","pin-ctrl");
	pin3.classList.add("pin_3","pin_input","pin-ctrl");
	pin4.classList.add("pin_4","pin_input","pin-ctrl");
	errorPin.classList.add("error_pin");
	errorPin.textContent = "Wrong Pin";
	errorPin.style.display = "none";
	successPin.classList.add("success_pin");

	backToMenuDiv.classList.add("back-to-menu-div");
	backToMenuBtn.classList.add("back-to-menu-btn","pin-ctrl");
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
		pinKey.classList.add("pin_key", "pin-key-ctrl");
		pinKey.textContent = key;

		pinKeyBlock.append(pinKey);
		pinKeyboardRow.append(pinKeyBlock);		
	});
	pinKeyboardBlock.append(pinKeyboardRow);
	pinBlock.append(pinInputBlock,pinKeyboardBlock);
	root.append(backToMenuDiv,pinBlock);
	pinKeyboardRow.style.display = "none";

	backToMenuBtn.addEventListener("click",function() {
		pages.set_current("settings");
		controls.set_current("settings");
		controls.settings.move();
	})
}

function parentalCodeRender(){
	// debugger
	root.innerHTML = "";
	ChangeParentalCodeElements();
	controls.set_current("parentalCode");
	controls.parentalCode.index = 1;
	
	
	controls.parentalCode.move();
}

function lockCategoriesRender(){
	// debugger
	root.innerHTML = "";
	ChangeParentalCodeElements();
	document.querySelector(".pin_title").textContent = "Enter Pin";
	controls.set_current("parentalCode");
	controls.parentalCode.index = 1;
	controls.parentalCode.move();
}

function parentalCodeOnclick(){
	var keyboardRow = document.querySelector(".pin_keyboard_row");
	var parentalInputs = document.querySelectorAll(".pin_input");
	console.log(parentalInputs);
	parentalInputs.forEach(item => {
		item.addEventListener("click",() => {
			keyboardRow.style.display = "flex";
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
		});
	});
}