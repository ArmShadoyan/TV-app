
async function loginRequest(baseUrl,userName,password){
	url = `${baseUrl}username=${userName}&password=${password}`;
	// url = `https://xtream-ie.com/player_api.php?username=${userName}&password=${password}`
	await fetch(url)
	.then(data => {
		data = data.json();
		return data;
	}).then(data => {
		if(data.user_info.auth){
			// loader();
			// pages.set_current("menu");
			// document.querySelector(".login-input").value = "";
			// document.querySelector(".password-input").value = "";
		}
	}).catch(error => {
		document.querySelector(".error-message").style.display = "block";
		setTimeout(() => {
			document.querySelector(".error-message").style.display = "none";
		}, 3000);

		console.log(error);
	});
}

pages.set_current("menu");
// playerBlockRender();

function getRequest(baseUrl,param_1,param_2,param_3 = ""){
	loader();
	// debugger
	var url = `${baseUrl + param_1 + param_2 + param_3}`
	return fetch(`${url}`
	);
}





