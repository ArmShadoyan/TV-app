import { pages } from "./remote/pages";
import { controls } from "./remote/controls";
console.log(pages,controls);
import "../css/index.css";
import "../css/login.css";


window.onload = function () {
	pages.set_current("login");
	controls.set_current("loginInputs");
	controls.loginInputs.move();
}