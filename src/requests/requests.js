
import { pages } from "../remote/pages";
import { loader } from "../remote/utils";

import { baseUrl, urlParams } from "./parametrs";


export async function loginRequest(baseUrl,userName,password){
	let url = `${baseUrl}username=${userName}&password=${password}`;
	// url = `https://xtream-ie.com/player_api.php?username=${userName}&password=${password}`
	await fetch(url)
	.then(data => {
		data = data.json();
		return data;
	}).then(data => {
		if(data.user_info.auth){
			loader();
			document.querySelector(".login-input").value = "";
			document.querySelector(".password-input").value = "";
			pages.set_current("menu");
		}
	}).catch(error => {
		if(document.querySelector(".error-message")){
			document.querySelector(".error-message").style.display = "block";
			setTimeout(() => {
				document.querySelector(".error-message").style.display = "none";
			}, 3000);
		}

		console.log(error);
	});
}

// pages.set_current("menu");
// playerBlockRender();

export function getRequest(baseUrl,param_1,param_2,param_3 = ""){
	// loader();
	var url = `${baseUrl + param_1 + param_2 + param_3}`
	return fetch(url);
}



export async function getMoviecategorys () {
	let categorys;

	await getRequest(baseUrl,urlParams.loginUrl,urlParams.movieCategorys)
    .then(data => {
        data = data.json();
        return data;
    }).then(data => {
		categorys = data;
    })
	return categorys;
}

export async function getMovies () {
	let movies = [];

	await getRequest(baseUrl,urlParams.loginUrl,urlParams.movies)
	.then(data => {
		data = data.json();
		return data;
	}).then(data => {
		movies = data;
	})
	return movies;
}

export async function getSeriesCategories () {
	let seriesCategories = [];

	await getRequest(baseUrl,urlParams.loginUrl,urlParams.seriesCategorys)
	.then(data => {
		data = data.json();
		return data;
	}).then(data => {
		seriesCategories = data;
	})
	return seriesCategories;
}

export async function getSeries () {
	let series = [];

	await getRequest(baseUrl,urlParams.loginUrl,urlParams.series)
	.then(data => {
		data = data.json();
		return data;
	}).then(data => {
		series = data;
	})
	return series;
}

export async function getLiveCategories () {
	let categories = [];

	await getRequest(baseUrl,urlParams.loginUrl,urlParams.liveCategorys)
	.then(data => {
		data = data.json();
		return data;
	}).then(data => {
		categories = data
	})
	return categories;
}

export async function getLiveChanels () {
	let chanels = [];

	await getRequest(baseUrl,urlParams.loginUrl,urlParams.liveChanels)
	.then(data => {
		// debugger
		console.log(1111111111);
		data = data.json();
		return data;
	}).then(data => {
		chanels = data;
	})
	return chanels;
}