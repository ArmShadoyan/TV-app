// var userName = 4;
// var password = 4;

var auth = 0;

// var baseUrl = "http://79.143.180.88:25461/player_api.php?";
// var baseUrl = "https://xtream-ie.com/player_api.php?";
var baseUrl = "http://kingtop10.net:7070/player_api.php?";
var urlParams = {
  // playerBase:"https://xtream-ie.com",
  // loginUrl:"username=MYOWN1&password=Meins321",
  // loginUrl:"username=4&password=4",
  loginUrl: "username=QATeamTest&password=jby2jccj",
  // loginUrl:"username=LiberoLiberov&password=gGTXsze5D3gD",
  liveChanels: "&action=get_live_streams",
  liveCategorys: "&action=get_live_categories",
  movies: "&action=get_vod_streams",
  movieCategorys: "&action=get_vod_categories",
  series: "&action=get_series",
  seriesCategorys: "&action=get_series_categories",
  epg: "&action=get_simple_data_table&stream_id=",
  movieInfo: "&action=get_vod_info&vod_id=",
  seriesInfo: "&action=get_series_info&series_id="
};
async function loginRequest(baseUrl, userName, password) {
  url = "".concat(baseUrl, "username=").concat(userName, "&password=").concat(password);
  // url = `https://xtream-ie.com/player_api.php?username=${userName}&password=${password}`
  await fetch(url).then(function (data) {
    data = data.json();
    return data;
  }).then(function (data) {
    if (data.user_info.auth) {
      document.querySelector(".login-input").value = "";
      document.querySelector(".password-input").value = "";
      if (document.querySelector(".login-btn").classList.contains("active-login")) {
        document.querySelector(".login-btn").classList.remove("active-login");
      }
    }
  }).catch(function (error) {
    console.log(error);
  });
}
root.innerHTML = "";
createMenuElements();
addRemMenu();
currentBlock = "menu";
menuOnClick();
// playerBlockRender();

function getRequest(baseUrl, param_1, param_2, param_3 = "") {
  loader();
  // debugger
  var url = "".concat(baseUrl + param_1 + param_2 + param_3);
  return fetch("".concat(url));
}

// http://79.143.180.88:25461/player_api.php?username=${userName}&password=${password}
// var url = "http://vikingotv.club:8080/player_api.php?username=user806606&password=345645644";
// var chanelsUrl = "http://vikingotv.club:8080/player_api.php?username=user806606&password=345645644&action=get_live_streams";
// var categoryUrl = "http://vikingotv.club:8080/player_api.php?username=user806606&password=345645644&action=get_live_categories";
// http://vikingotv.club:8080/get.php?username=user806606&password=345645644&type=m3u_plus&output=ts
// var url = "http://79.143.180.88:25461/player_api.php?username=4&password=4";
// var chanelsUrl = "http://vikingotv.club:8080/player_api.php?username=user806606&password=345645644&action=get_live_streams";
// var categoryUrl = "http://vikingotv.club:8080/player_api.php?username=user806606&password=345645644&action=get_live_categories";
// // http://vikingotv.club:8080/player_api.php??username=user806606&password=345645644&type=m3u_plus&output=ts