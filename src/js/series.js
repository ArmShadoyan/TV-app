import { getSeries } from "../requests/requests";
import { moviesRender } from "./movies";
import { removeLoader } from "../remote/utils";
import { controls } from "../remote/controls";

let seriesCategories = [];
export let series = [];
let seriesObj = {};
let seriesTransform = 0;


export async function seriesInit () {
    Promise.all([getSeries(),getSeries()])
    .then(res => {
        series = res[0];
        seriesCategories = res[1];

        seriesObj = series_data_build(seriesCategories,series);
        console.log(seriesObj);
        // debugger
        moviesRender(seriesCategories,series,seriesObj,"series");
        removeLoader();
        controls.set_current("movies");
        controls.movies.move();
    })
}
 
export function series_data_build (seriesCategories,series) {
    // debugger
    seriesCategories.forEach((cat,index) => {
        seriesObj[cat.category_id] = {category:cat.name,movies:[],index:index}
    })
    series.forEach(item => {
        if(seriesObj[item.category_id])seriesObj[item.category_id].movies.push(item);
    })

    return seriesObj;
}