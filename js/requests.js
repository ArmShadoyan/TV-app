
let userName = 4;
let password = 4;
let url = "http://79.143.180.88:25461/player_api.php?username=4&password=4";
let chanelsUrl = "http://79.143.180.88:25461/player_api.php?username=4&password=4&action=get_live_streams";
let categoryUrl = "http://79.143.180.88:25461/player_api.php?username=4&password=4&action=get_live_categories";

let auth = 0;

async function loginRequest(userName,password){
	url = `http://79.143.180.88:25461/player_api.php?username=${userName}&password=${password}`;

	await fetch(url)
	.then(data => {
		data = data.json();
		return data;
	}).then(data => {
		if(data.user_info.auth){
		
		}
	}).catch(error => {
		console.log(error);
	});
}
root.innerHTML = "";
createMenuElements();
addRemMenu();
currentBlock = "menu";
menuOnClick();

function getRequest(url){
	return fetch(url);
}

function epgRequest(streamId){
	return fetch(`http://79.143.180.88:25461/player_api.php?username=4&password=4&action=get_simple_data_table&stream_id=${streamId}`);
}





fetch("http://79.143.180.88:25461/player_api.php?username=4&password=4&action=get_live_categories")
.then(data => {
data = data.json();
    
	return data
}).then(data => {
	console.log(data);
})

