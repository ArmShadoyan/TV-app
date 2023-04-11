
// let userName = 4;
// let password = 4;

let auth = 0;
let url = "http://79.143.180.88:25461/player_api.php?username=4&password=4";

let chanelsUrl = "http://79.143.180.88:25461/player_api.php?username=4&password=4&action=get_live_streams";
let categoryUrl = "http://79.143.180.88:25461/player_api.php?username=4&password=4&action=get_live_categories";

let moviesUrl = "http://79.143.180.88:25461/player_api.php?username=4&password=4&action=get_vod_streams";
let moviesCategoryUrl = "http://79.143.180.88:25461/player_api.php?username=4&password=4&action=get_vod_categories";

// http://79.143.180.88:25461/player_api.php?username=${userName}&password=${password}

// let url = "http://vikingotv.club:8080/player_api.php?username=user806606&password=345645644";
// let chanelsUrl = "http://vikingotv.club:8080/player_api.php?username=user806606&password=345645644&action=get_live_streams";
// let categoryUrl = "http://vikingotv.club:8080/player_api.php?username=user806606&password=345645644&action=get_live_categories";

// http://vikingotv.club:8080/get.php?username=user806606&password=345645644&type=m3u_plus&output=ts

async function loginRequest(userName,password){
	url = `http://79.143.180.88:25461/player_api.php?username=${userName}&password=${password}`;
	// url = `http://vikingotv.club:8080/player_api.php?username=${userName}&password=${password}`
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


keyboard.innerHTML = "";
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
	// return fetch(`http://79.143.180.88:25461/player_api.php?username=user806606&password=345645644&action=get_simple_data_table&stream_id=${streamId}`);
}





// let url = "http://79.143.180.88:25461/player_api.php?username=4&password=4";
// let chanelsUrl = "http://vikingotv.club:8080/player_api.php?username=user806606&password=345645644&action=get_live_streams";
// let categoryUrl = "http://vikingotv.club:8080/player_api.php?username=user806606&password=345645644&action=get_live_categories";
// // http://vikingotv.club:8080/player_api.php??username=user806606&password=345645644&type=m3u_plus&output=ts





