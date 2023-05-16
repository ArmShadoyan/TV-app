// var userName = 4;
// var password = 4;

export let auth = 0;

// var baseUrl = "http://79.143.180.88:25461/player_api.php?";
// var baseUrl = "https://xtream-ie.com/player_api.php?";
export const baseUrl = "http://kingtop10.net:7070/player_api.php?";

export const urlParams = {
	// playerBase:"https://xtream-ie.com",
	// loginUrl:"username=MYOWN1&password=Meins321",
	// loginUrl:"username=4&password=4",
	loginUrl:"username=QATeamTest&password=jby2jccj",
	// loginUrl:"username=LiberoLiberov&password=gGTXsze5D3gD",
	liveChanels:"&action=get_live_streams",
	liveCategorys:"&action=get_live_categories",
	movies:"&action=get_vod_streams",
	movieCategorys:"&action=get_vod_categories",
	series:"&action=get_series",
	seriesCategorys:"&action=get_series_categories",
	epg:`&action=get_simple_data_table&stream_id=`,
	movieInfo:`&action=get_vod_info&vod_id=`,
	seriesInfo:`&action=get_series_info&series_id=`
}

