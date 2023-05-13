function movie_info_init(movie){
    
    
    getRequest(baseUrl,urlParams.loginUrl,urlParams.movieInfo,movie.stream_id)
            .then(data => {
                data = data.json();
                return data
            }).then(data =>{
               
                if(document.querySelector(".movie-info-container"))document.querySelector(".movie-info-container").remove();
                movieInfoRender(data,previousBlock)
                if(document.querySelector(".loader-parent"))document.querySelector(".loader-parent").remove();
                controls.set_current("movieInfo");
                controls.movieInfo.move();
            })  
}

function series_info_init(movie){
    getRequest(baseUrl,urlParams.loginUrl,urlParams.seriesInfo,movie.series_id)
    .then(data => {
        data = data.json();
        return data
    }).then(data => {
        movieInfoRender(data,previousBlock)
        
        if(document.querySelector(".loader-parent"))document.querySelector(".loader-parent").remove();
        controls.set_current("movieInfo");
        controls.movieInfo.move();
    })
}