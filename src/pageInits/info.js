import { getRequest } from "../requests/requests";
import { baseUrl, urlParams } from "../requests/parametrs";
import { movieInfoRender } from "../js/movies";
import { removeLoader } from "../remote/utils";
import { controls } from "../remote/controls";



export function movie_info_init(movie){
    getRequest(baseUrl,urlParams.loginUrl,urlParams.movieInfo,movie.stream_id)
        .then(data => {
            data = data.json();
            return data
        }).then(data =>{
            removeLoader();
            movieInfoRender(data);
            removeLoader();
            controls.set_current("movieInfo");
            controls.movieInfo.move();
        })  
}

export function series_info_init(movie){
    getRequest(baseUrl,urlParams.loginUrl,urlParams.seriesInfo,movie.series_id)
    .then(data => {
        data = data.json();
        return data
    }).then(data => {
        movieInfoRender(data)
        removeLoader();
        controls.set_current("movieInfo");
        controls.movieInfo.move();
    })
}