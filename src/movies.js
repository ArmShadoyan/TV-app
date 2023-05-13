let categoryArr = [];


var movieCategorys = [];
var movies = [];
var moviesObj;
var movieScroll = 0;
// var movieScrollCount = 55;
var mRowTranslate = 0
var movieCount = 5;


// var nextMovie=1
// var prevMovie = 1;
let nextMovie = 1;
let prevMovie = 1;

var previousPage;
var previousBlock;
var currentSearch;

var catIndex = null;

var episodes = [];


function build_movies_header(){
    var moviesHeader = document.createElement("div");
    var backToMenuBtn = document.createElement("div");
    var searchBlock = document.createElement("div");
    
    moviesHeader.classList.add("movies-header","m-row");
    backToMenuBtn.classList.add("movies-back-to-menu","m-i","search-back-ctrl");
    searchBlock.classList.add("movies-search-block","m-i");

    moviesHeader.setAttribute("index",0)
    searchBlock.textContent = "Search";

    moviesHeader.append(backToMenuBtn,searchBlock);

    backToMenuBtn.addEventListener("click",() => {

        pages.set_current("menu");

    })
    searchBlock.addEventListener("click",() => {

        searchedItems = [];

        if(document.querySelector(".movie-search-container")){
            document.querySelector(".movie-search-container").remove();
        }
            if(pages.current == "movies"){
                pages.set_current("moviesSearch");
                controls.set_current("keyboard");
                controls.keyboard.rowIndex = 0;
                controls.keyboard.index = 0;
                controls.keyboard.move();
            }else if(pages.current == "series"){
                pages.set_current("seriesSearch");
                controls.set_current("keyboard");
                controls.keyboard.rowIndex = 0;
                controls.keyboard.index = 0;
                controls.keyboard.move();
            }
            
            document.querySelector(".movie-search-container").style.display = "block"
            document.querySelector(".searched-movies-row").style.display = "none";
            document.querySelector(".not-found-block").style.display = "flex"
            
            // currentInput = document.querySelector(".movie-search-input");
            // currentInput.value = "";
    });
    
    return moviesHeader;
}

function build_category_blocks(movieCategorys,movies,obj){
    categoryArr = [];

    var selectCategorysBlock = document.createElement("div");
    var selectCategorysRow = document.createElement("div");
    selectCategorysBlock.classList.add("movie-select-categorys-block");
    selectCategorysRow.classList.add("movie-select-categorys-row","m-row","movies-row");

    selectCategorysBlock.append(selectCategorysRow);

    var moviesContainerInner = document.createElement("div");
    var moviesContainer = document.createElement("div");
    moviesContainerInner.classList.add("movies-containerinner");
    moviesContainer.classList.add("movies-container");
    moviesContainer.setAttribute("translate",0)
    
    moviesContainerInner.append(selectCategorysBlock);

    movieCategorys.forEach((item,index) => {
        selectCategorysRow.append(build_movie_category_item(item,obj,index));

        var categoryBlock = document.createElement("div");
        var categoryTitle = document.createElement("div");

        var moviesRow = document.createElement("div");
        moviesRow.setAttribute("index",item.category_id);
        moviesRow.setAttribute("position",0);
        if(obj[item.category_id]){
            for (var i = 0; i < obj[item.category_id].movies.length; i++) {
                if(i < 5){
                   if(moviesRow){
                       moviesRow.append(build_movie_items(obj[item.category_id].movies[i],i));
                   }
               }
             }
        }

        moviesRow.classList.add("movies-row","m-row");
        categoryBlock.classList.add("movie-category-block");
        categoryTitle.classList.add("movie-category-title");
        categoryTitle.textContent = `${item.category_name}`
        if(obj[item.category_id]){
            if(obj[item.category_id].movies.length > 0){
                // moviesRow.setAttribute("catIndex",index);
                categoryArr.push(movieCount);
                categoryBlock.append(categoryTitle,moviesRow);
                moviesContainerInner.append(categoryBlock);
            };
        }
    });
    
    moviesContainer.append(build_movies_header(),moviesContainerInner);

    return moviesContainer;
};
    
function build_movie_items(movie,index){
     var movieItem = document.createElement("div");
     var movieImgBlock = document.createElement("div");
     var movieTitleBlock = document.createElement("div");
     var movieTitle = document.createElement("div");

    movieItem.classList.add("movies-item","m-i");
    movieItem.setAttribute("index",index)
    var img = new Image()
    // debugger
    img.onload = () =>{
        requestAnimationFrame(() =>{
        movieImgBlock.style.backgroundImage = `url(${img.src})`
        })
    }

    img.onerror = () =>{
            requestAnimationFrame(() =>{
            movieImgBlock.style.backgroundImage = `url(imgs/logo-large.png)`;
            movieImgBlock.style.backgroundSize = "contain";
        })
    }

    movieImgBlock.classList.add("movie-img-block");
    img.src = movie.stream_icon?movie.stream_icon:movie.cover
    movieTitleBlock.classList.add("movie-title-block");
    movieTitle.classList.add("movie-title");
    movieTitle.textContent = `${movie.name}`

    movieItem.append(movieImgBlock,movieTitleBlock);
    movieTitleBlock.append(movieTitle);
    
    movieItem.addEventListener("click",() => {

        if(pages.current === "movies" || pages.current === "moviesSearch"){
            // debugger
            pages.set_current("movieInfo",movie);

        }else if(pages.current === "series" || pages.current === "seriesSearch"){

            pages.set_current("seriesInfo",movie);

        }

    })

    return movieItem
}

function build_movie_category_item(item,obj,index){
    var selectCategory = document.createElement("div");
    var selectCategoryTitle = document.createElement("div");

    
    selectCategory.classList.add("movie-select-category","m-i");
    selectCategory.setAttribute("index",index)
    selectCategoryTitle.classList.add("select-category-title");  
    
    selectCategoryTitle.textContent = `${item.category_name}`

    selectCategory.append(selectCategoryTitle);

    selectCategory.addEventListener("click",(e) => {
        
        blockScroll(document.querySelector(".movies-container"),1,"rem",65,"Y",index)
        controls.movies.index = 0;
        controls.movies.rowIndex = index + 2;
        controls.movies.move();      
        console.log(index);
        document.querySelector(".movie-select-categorys-row").setAttribute("index",index)
    })
    return selectCategory;
}

function moviesRender(categorys,movies,obj,page){
    
    root.append(build_category_blocks(categorys,movies,obj));
    document.querySelector(".movie-select-categorys-row").style.transform = "translateY(0rem)";
    document.querySelector(".movies-container").addEventListener("wheel",(e) => {
        let container = document.querySelector(".movies-container");
        if(e.deltaY > 0){
      
            blockScroll(container,e.deltaY);
            
        };
        if(e.deltaY < 0){

            blockScroll(container,e.deltaY);
          
        };
    });
};

function movieInfoRender(data,previousPage,block){

    var container = document.createElement("div");
    var backToMovieBlock = document.createElement("div");
    var backToMovieBtn = document.createElement("div");
    var containerInner = document.createElement("div");
    var imgBlock = document.createElement("div");
    var imgDiv = document.createElement("div");
    var playBtnDiv = document.createElement("div");
    var playBtn = document.createElement("div");

    var infoBlock = document.createElement("div");
    var infoName = document.createElement("div");
    var infoDesc = document.createElement("div");
    var infoCast = document.createElement("div");
    var infoGenres = document.createElement("div");
    var infoRateTimeBlock = document.createElement("div");
    var infoRate = document.createElement("div");
    var infoTime = document.createElement("div");

    var seasonSection = document.createElement("div");
    var seasonBlock = document.createElement("div");
    var episodeBlock = document.createElement("div");

    container.classList.add("movie-info-container");
    backToMovieBlock.classList.add("movie-info-back-block");
    backToMovieBtn.classList.add("movie-info-back-btn","info-ctrl");
    containerInner.classList.add("movie-info-containerinner");
    imgBlock.classList.add("movie-info-img-block");
    imgDiv.classList.add("movie-info-img-div");
    playBtnDiv.classList.add("movie-info-playbtn-div");
    playBtn.classList.add("movie-info-playbtn","info-ctrl");
    playBtn.textContent = "Play";

    seasonBlock.classList.add("season-block","episode-row");
    episodeBlock.classList.add("episode-block","episode-row");
    seasonSection.classList.add("season-section");
    
    if(currentSearch === "movies"){
        // debugger
        seriesInfo = 0;
        var img = new Image()

        img.onload = () =>{
            imgDiv.style.backgroundImage = `url(${img.src})`
        }

        img.onerror = () =>{
            imgDiv.style.backgroundImage = `url(imgs/logo-large.png)`;
        }

        img.src = data.info.cover_big?data.info.cover_big:data.info.movie_image
        // console.log(moviesObj[data.movie_data.category_id]);
        infoBlock.classList.add("movie-info-block");
        infoName.classList.add("movie-info-name");
        // debugger
        infoName.textContent = `${data.info.name?data.info.name:data.movie_data.name}`
        infoDesc.classList.add("movie-info-desc");
        infoDesc.textContent = `${data.info.description? data.info.description : data.info.plot? data.info.plot : ""}`;
        infoCast.classList.add("movie-info-cast");
        infoCast.textContent = `${data.info.cast? data.info.cast : ""}`;
        infoGenres.classList.add("movie-info-genres");
        infoGenres.textContent = `${data.info.genre? data.info.genre : ""}`
        infoRateTimeBlock.classList.add("movie-info-rate-div");
        infoRate.classList.add("movie-info-rate");
        infoRate.textContent = `${data.info.rating? data.info.rating : ""}`
        infoTime.classList.add("movie-info-time");
        infoTime.textContent = `${data.info.duration? data.info.duration : ""}`

        backToMovieBlock.append(backToMovieBtn);
        imgBlock.append(imgDiv,playBtnDiv);
        playBtnDiv.append(playBtn);
        infoBlock.append(infoName,infoDesc,infoCast,infoGenres,infoRateTimeBlock);
        infoRateTimeBlock.append(infoRate,infoTime);
        containerInner.append(imgBlock,infoBlock);
        container.append(backToMovieBlock,containerInner);
        root.append(container);
        
    }else if(currentSearch === "series"){
        seriesInfo = 0;
        var img = new Image()

        img.onload = () =>{
            imgDiv.style.backgroundImage = `url(${img.src})`
        }

        img.onerror = () =>{
            imgDiv.style.backgroundImage = `url(imgs/logo-large.png)`;
        }

        img.src = data?.info.cover
        infoBlock.classList.add("movie-info-block");
        infoName.classList.add("movie-info-name");
        infoName.textContent = `${data.info.name? data.info.name : ""}`
        infoDesc.classList.add("movie-info-desc");
        infoDesc.textContent = `${data.info.plot? data.info.plot : ""}`;
        infoCast.classList.add("movie-info-cast");
        infoCast.textContent = `${data.info.cast? data.info.cast : ""}`;
        infoGenres.classList.add("movie-info-genres");
        infoGenres.textContent = `${data.info.genre? data.info.genre : ""}`
        infoRateTimeBlock.classList.add("movie-info-rate-div");
        infoRate.classList.add("movie-info-rate");
        infoRate.textContent = `${data.info.rating? data.info.rating : ""}`
        infoTime.classList.add("movie-info-time");
        infoTime.textContent = `00:${data.info.episode_run_time? data.info.episode_run_time : ""}:00`

        console.log(data);
        backToMovieBlock.append(backToMovieBtn);
        imgBlock.append(imgDiv,playBtnDiv);
        playBtnDiv.append(playBtn);
        infoBlock.append(infoName,infoDesc,infoCast,infoGenres,infoRateTimeBlock,seasonSection);
        
        episodes = [];
        var seasonsObj = {};

        if(!Array.isArray(data.episodes)){
                for(item in data.episodes){
                    episodes.push(data.episodes[item])
                }
        }else{
            episodes = data.episodes;    
        }

        if(data.seasons.length > 0){
            data.seasons.forEach(season => {
                episodes.forEach(episode => {
                    if(season.season_number === episode[0].season){
                        console.log(season,episode);
                        seasonsObj[season.season_number] = {season:season,episodes:episode}
                    }
                })
            })
            console.log(seasonsObj);

            seasonSection.append(seasonBlock,episodeBlock)
            infoRateTimeBlock.append(infoRate,infoTime);
            containerInner.append(imgBlock,infoBlock);
            container.append(backToMovieBlock,containerInner);
            root.append(container);
            
            var seasonIndex = 0;
            for(item in seasonsObj){
                var season = document.createElement("div");
                season.classList.add("season","episode-ctrl"); 
                season.setAttribute("season",item);
                seasonBlock.append(season);
                season.textContent = `season${item}`
                // debugger
                var defaultEpisodes 
                // debugger
                if(episodes[Object.keys(seasonsObj)]){
                     defaultEpisodes = episodes[Object.keys(seasonsObj)[0]].episodes;
                }else{
                     defaultEpisodes = episodes[0]
                }
                // document.querySelector(".episode-block").innerHTML = "";

                
                season.addEventListener("click",(e) => {
                    e.stopPropagation();
                    var currentEpisodes = seasonsObj[e.target.getAttribute("season")].episodes
                    console.log(currentEpisodes);
                    document.querySelector(".episode-block").innerHTML = "";
                    document.querySelector(".episode-block").style.transform = "translate(0rem)"
                    seriesTransform = 0;
                    seriesI = 0;
                    lastIndex = 0;
                    currentEpisodes.forEach(item => {
                        createEpisode(item,data)
                    })
                })
            }
            
                defaultEpisodes.forEach(ep => {
                    console.log(ep.season);
                    createEpisode(ep,data)
                })
        }else{
            // debugger
            seasonSection.append(seasonBlock,episodeBlock)
            infoRateTimeBlock.append(infoRate,infoTime);
            containerInner.append(imgBlock,infoBlock);
            container.append(backToMovieBlock,containerInner);
            root.append(container);
            episodes.forEach((ep,index) => {
                var season = document.createElement("div");
                season.classList.add("season","episode-ctrl");
                season.setAttribute("season",index);
                seasonBlock.append(season);
                season.textContent = `season${index+1}`
                
                season.addEventListener("click",(e) => {
                    // debugger
                    e.stopPropagation();
                    var currentEpisodes = episodes[+(e.target.getAttribute("season"))]
                    console.log(currentEpisodes);
                    document.querySelector(".episode-block").innerHTML = "";
                    currentEpisodes.forEach(item => {
                        createEpisode(item,data)
                    })
                })
            })
                    var defaultEpisodes = episodes[0];
                    
                    defaultEpisodes.forEach(ep => {
                        console.log(ep.season);
                        createEpisode(ep,data)
                    })
        }
    }

    backToMovieBtn.addEventListener("click",(e) => {
        e.stopPropagation();
        container.remove();
        pages.current = pages.previous;
        controls.set_current("movies");
        controls.movies.move();
    })

    playBtn.addEventListener("click",(e) => {
        e.stopPropagation();
        debugger
        playerBlockRender(data);
        console.log(data);
    })
}

function createEpisode(item,data){
    var episode = document.createElement("div");
    var episodeImgBlock = document.createElement("div");
    var episodeNameBlock = document.createElement("div");
    
    var img = new Image()

    img.onload = () =>{
            requestAnimationFrame(() =>{
            episodeImgBlock.style.backgroundImage = `url(${img.src})`
            })
        }
    
            img.onerror = () =>{
                requestAnimationFrame(() =>{
                episodeImgBlock.style.backgroundImage = `url(imgs/logo-large.png)`;
                episodeImgBlock.style.backgroundSize = "contain";
            })
        }
    
    img.src = item.info.movie_image?item.info.movie_image:data.info.cover;
    episode.classList.add("episode","episode-ctrl");
    episodeImgBlock.classList.add("episode-img-block");
    episodeNameBlock.classList.add("episode-name-block");
    episodeNameBlock.textContent = `S${item.season} E${item.episode_num}`
   
    episode.append(episodeImgBlock,episodeNameBlock)
    document.querySelector(".episode-block").append(episode);
}

function movieSearchRender (){
    searchedItems = [];
    isNextMovie = 1;
    movieCount = 5;
    var movieSearchContainer = document.createElement("div");
    var backToMovieBlock = document.createElement("div");
    var backToMovieBtn = document.createElement("div");
    var currentPageTitle = document.createElement("div");
    var searchedMoviesBlock = document.createElement("div");
    var searchedMoviesRow = document.createElement("div");
    var notFoundBlock = document.createElement("div");
    var notFoundImg = document.createElement("img");
    var notFoundText = document.createElement("div");
    var inputBlock = document.createElement("div");
    var inputIcon = document.createElement("div");
    var input = document.createElement("input");
    
    movieSearchContainer.classList.add("movie-search-container","movies-container");
    backToMovieBlock.classList.add("movies-header","search-row","movie-search-row");
    backToMovieBtn.classList.add("movies-back-to-menu","m-i");
    currentPageTitle.classList.add("movies-search-page-title");
    currentPageTitle.textContent = "Search";
    searchedMoviesBlock.classList.add("searched-movies-block");
    searchedMoviesRow.classList.add("movies-row","search-row","searched-movies-row","movie-search-row");
    searchedMoviesRow.style.display = "none";
    notFoundBlock.classList.add("not-found-block");
    notFoundImg.classList.add("not-found-img");
    notFoundImg.src = "/imgs/movies/empty.svg";
    notFoundText.classList.add("not-found-text");
    notFoundText.textContent = "Not found";
    inputBlock.classList.add("movie-search-input-block");
    inputIcon.classList.add("movie-input-icon");
    input.classList.add("movie-search-input");

    
    root.append(movieSearchContainer);
    movieSearchContainer.append(backToMovieBlock,searchedMoviesBlock,inputBlock,print_keyboard(lettersKeyboard,input));
    notFoundBlock.append(notFoundImg,notFoundText);
    inputBlock.append(inputIcon,input);
    searchedMoviesBlock.append(notFoundBlock,searchedMoviesRow);
    backToMovieBlock.append(backToMovieBtn,currentPageTitle);

    movieSearchContainer.style.display = "none"

    document.querySelector(".keyboard").classList.add("movie-keyboard");

    backToMovieBtn.addEventListener("click",(e) => {
        e.stopPropagation();
        // debugger
        movieSearchContainer.style.display = "none";
        
        // pages.set_previous();
        if(pages.current === "seriesSearch"){
            pages.current = "series"
            controls.movies.rowindex = 0;
            controls.movies.index = 1;
        }else if(pages.current === "moviesSearch"){
            pages.current = "movies"
            controls.movies.rowindex = 0;
            controls.movies.index = 1;
        }
        
        controls.set_current("movies");
        controls.movies.move();

    });
};

function movieItemsRender(side){
    
    var row;
    if(pages.current === "movies" || pages.current === "series"){
        row = document.querySelector(".active").parentNode;
    }else if(pages.current === "moviesSearch" || pages.current === "seriesSearch"){
        row = document.querySelector(".searched-movies-row .active").parentNode
    }
            // debugger
            var items = row.querySelectorAll(".movies-item")
            if(side === "right"){
                movieCount++;
            }else if(side === "left"){
                movieCount--;
            }
            if(pages.current === "movies"){
                nextMovie = moviesObj[+row.getAttribute("index")].movies[movieCount-1];
                prevMovie = moviesObj[+row.getAttribute("index")].movies[movieCount-5];
            }else if(pages.current === "series"){
                nextMovie = seriesObj[+row.getAttribute("index")].movies[movieCount-1];
                prevMovie = seriesObj[+row.getAttribute("index")].movies[movieCount-5];
            }else if(pages.current === "moviesSearch" || pages.current === "seriesSearch"){
                nextMovie = searchedItems[movieCount-1];
                prevMovie = searchedItems[movieCount-5];
            }
            // else if(pages.current === "series"){
            //     for(item in seriesObj){
            //         if(seriesObj[item].index === +row.getAttribute("index")){
            //             nextMovie = seriesObj[item].movies[movieCount];
            //             prevMovie = seriesObj[item].movies[movieCount-8];
            //         }
            //     }
            // }

            // else if(pages.current === "movies-search"){
            //     nextMovie = searchedItems[movieCount]
            //     prevMovie = searchedItems[movieCount-6]
            // }
            // debugger
            
            if(nextMovie && side === "right"){
                items[0].remove();
                row.append(build_movie_items(nextMovie))
                // movieCount++;
            }else if(prevMovie && side === "left"){
                items[items.length-1].remove();
                row.prepend(build_movie_items(prevMovie))
                // movieCount--;
            }


            // if(pages.current === "movies"){
            //     for(item in moviesObj){
            //         if(moviesObj[item].index === +row.getAttribute("index")){
            //             nextMovie = moviesObj[item].movies[movieCount];
            //             prevMovie = moviesObj[item].movies[movieCount-8];
            //         }
            //     }
            // }else if(pages.current === "series"){
            //     for(item in seriesObj){
            //         if(seriesObj[item].index === +row.getAttribute("index")){
            //             nextMovie = seriesObj[item].movies[movieCount];
            //             prevMovie = seriesObj[item].movies[movieCount-8];
            //         }
            //     }           
            //  }else if(pages.current === "movies-search"){
            //     isNextMovie = searchedItems[movieCount]
            //     isPrevMovie = searchedItems[movieCount-8]
            // }
}




