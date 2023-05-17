import { pages } from "./remote/pages";
import { controls } from "./remote/controls";
console.log(pages,controls);
import "../css/index.css";
import "../css/login.css";
import "../css/menu.css";
import "../css/tv.css";
import "../css/movie.css";
import "../css/series.css";
import "../css/movieInfo.css";
import "../css/movieSearch.css";
import "../css/settings.css";



window.onload = function () {
	pages.set_current("login");
	// debugger
	controls.set_current("loginInputs");
	controls.loginInputs.move();
}