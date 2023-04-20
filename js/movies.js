
let movieCategorys = [];
let movies = [];
let moviesObj;
let movieScroll = 0;
// let movieScrollCount = 55;
let mRowTranslate = 0
let movieCount = 5;


let nextMovie=1
let prevMovie = 1;
let isNextMovie = 1;
let isPrevMovie = 1;

// console.log(isPrevMovie);
mRow = 0;
mCol = 1;

let infoI = 0;


const moviesHeader = document.createElement("div")
const backToMenuBtn = document.createElement("div");
const searchBlock = document.createElement("div");

moviesHeader.classList.add("movies-header","m-row");
backToMenuBtn.classList.add("movies-back-to-menu","m-i");
searchBlock.classList.add("movies-search-block","m-i");
searchBlock.textContent = "Search";


function build_movies_header(){
    moviesHeader.append(backToMenuBtn,searchBlock);

    backToMenuBtn.addEventListener("click",() => {
        menuRender();
    })
    searchBlock.addEventListener("click",() => {
        
        movieSearchRender();
    });

    return moviesHeader;
}


function build_select_categorys_block(movieCategorys){
    //    console.log(movieCategorys);
       const selectCategorysBlock = document.createElement("div");
       const selectCategorysRow = document.createElement("div");

        movieCategorys.forEach((item,index) => {
        const selectCategory = document.createElement("div");
        const selectCategoryTitle = document.createElement("div");
    
        selectCategorysBlock.classList.add("movie-select-categorys-block");
        selectCategorysRow.classList.add("movie-select-categorys-row","m-row");
        selectCategory.classList.add("movie-select-category","m-i");
        selectCategory.setAttribute("index",index)
        selectCategoryTitle.classList.add("select-category-title");  

        selectCategoryTitle.textContent = `${item.category_name}`
        
        selectCategory.append(selectCategoryTitle);
        selectCategorysRow.append(selectCategory);

        selectCategory.addEventListener("click",() => {
            movieScrollFunc(1,index);
            document.querySelector(".movie-item-active").classList.remove("movie-item-active");
            selectCategory.classList.add("movie-item-active");
            mCol = index+2;
            mRow = 0;
            addRemMovie();
        })
    })

    selectCategorysBlock.append(selectCategorysRow);

    return selectCategorysBlock;
}


function build_movies_category_blocks(movieCategorys,movies){
    // console.log(movieCategorys,movies);
    const moviesContainerInner = document.createElement("div");
    const moviesContainer = document.createElement("div");
    moviesContainerInner.classList.add("movies-containerinner");
    moviesContainer.classList.add("movies-container");
    
    moviesContainerInner.append(build_select_categorys_block(movieCategorys))

    movieCategorys.forEach((item,index) => {
        const categoryBlock = document.createElement("div");
        const categoryTitle = document.createElement("div");

        const moviesRow = document.createElement("div");
        moviesRow.setAttribute("index",index);
        moviesRow.setAttribute("position",0);
        for (let i = 0; i < moviesObj[item.category_id].movies.length; i++) {
           if(i < 5){
               if(moviesRow){
                   moviesRow.append(build_movie_items(moviesObj[item.category_id].movies[i]));
               }
           }
       }

        moviesRow.classList.add("movies-row","m-row");
        categoryBlock.classList.add("movie-category-block");
        categoryTitle.classList.add("movie-category-title");
        categoryTitle.textContent = `${item.category_name}`
        
        categoryBlock.append(categoryTitle,moviesRow);
        moviesContainerInner.append(categoryBlock)

    })
    
    moviesContainer.append(build_movies_header(),moviesContainerInner)

    return moviesContainer
}
 
    
    function build_movie_items(movie){
    const movieItem = document.createElement("div");
    const movieImgBlock = document.createElement("div");
    const movieTitleBlock = document.createElement("div");
    const movieTitle = document.createElement("div");

    movieItem.classList.add("movies-item","m-i");
    
    movieImgBlock.classList.add("movie-img-block");
    movieImgBlock.style.cssText = `background-image:url(${movie.stream_icon})`;
    movieTitleBlock.classList.add("movie-title-block");
    movieTitle.classList.add("movie-title");
    movieTitle.textContent = `${movie.name}`

    movieItem.append(movieImgBlock,movieTitleBlock);
    movieTitleBlock.append(movieTitle);
    
    movieItem.addEventListener("click",() => {
        movieInfoRequest(movie.stream_id)
        .then(data => {
            data = data.json();
            return data
        }).then(data =>{
            movieInfoRender(data,currentPage)
        })
    })

    return movieItem
}




function moviesRender(movieCategorys,movies){
    root.innerHTML = "";
    
    currentBlock = "movies";
    currentPage = "movies";
    root.append(build_movies_category_blocks(movieCategorys,movies));
    mRow = 0;
    mCol = 1;
    addRemMovie();

    document.querySelector(".movies-container").addEventListener("wheel",(e) => {
        if(e.deltaY > 0){
            movieScrollFunc(1);
            if(mCol == 0){
                mCol+=2;
                addRemMovie();
            }
            else if(mCol < document.querySelectorAll(".m-row").length-1){
                mCol++;
                addRemMovie();
            }
        };
        if(e.deltaY < 0){
            movieScrollFunc(-1);
            if(mCol > 1){
                mCol--;
                addRemMovie();
            }
        };
    })
}

function movieInfoRender(data,previousPage){
    console.log(previousPage);
    currentPage = "movie-info";
    currentBlock = "movie-info"
    // root.innerHTML = "";
    // console.log(data);

    const container = document.createElement("div");
    const backToMovieBlock = document.createElement("div");
    const backToMovieBtn = document.createElement("div");
    const containerInner = document.createElement("div");
    const imgBlock = document.createElement("div");
    const imgDiv = document.createElement("div");
    const playBtnDiv = document.createElement("div");
    const playBtn = document.createElement("div");

    const infoBlock = document.createElement("div");
    const infoName = document.createElement("div");
    const infoDesc = document.createElement("div");
    const infoCast = document.createElement("div");
    const infoGenres = document.createElement("div");
    const infoRateTimeBlock = document.createElement("div");
    const infoRate = document.createElement("div");
    const infoTime = document.createElement("div");

    container.classList.add("movie-info-container");
    backToMovieBlock.classList.add("movie-info-back-block");
    backToMovieBtn.classList.add("movie-info-back-btn","info-i");
    containerInner.classList.add("movie-info-containerinner");
    imgBlock.classList.add("movie-info-img-block");
    imgDiv.classList.add("movie-info-img-div");
    imgDiv.style.cssText = `background-image: url(${data.info.cover_big})`
    playBtnDiv.classList.add("movie-info-playbtn-div");
    playBtn.classList.add("movie-info-playbtn","info-i");
    playBtn.textContent = "Play";

    infoBlock.classList.add("movie-info-block");
    infoName.classList.add("movie-info-name");
    infoName.textContent = `${data.info.name}`
    infoDesc.classList.add("movie-info-desc");
    infoDesc.textContent = `${data.info.description}`;
    infoCast.classList.add("movie-info-cast");
    infoCast.textContent = `${data.info.cast}`;
    infoGenres.classList.add("movie-info-genres");
    infoGenres.textContent = `${data.info.genre}`
    infoRateTimeBlock.classList.add("movie-info-rate-div");
    infoRate.classList.add("movie-info-rate");
    infoRate.textContent = `${data.info.rating}`
    infoTime.classList.add("movie-info-time");
    infoTime.textContent = `${data.info.duration}`

    backToMovieBlock.append(backToMovieBtn);
    imgBlock.append(imgDiv,playBtnDiv);
    playBtnDiv.append(playBtn);
    infoBlock.append(infoName,infoDesc,infoCast,infoGenres,infoRateTimeBlock);
    infoRateTimeBlock.append(infoRate,infoTime);
    containerInner.append(imgBlock,infoBlock);
    container.append(backToMovieBlock,containerInner);
    root.append(container);

    //qwer
    document.querySelector(".movies-container").style.display = "none";
    container.style.display = "block";
    
    addRemInfo();
    
    backToMovieBtn.addEventListener("click",() => {
        container.remove();
        document.querySelector(".movies-container").style.display = "block";
        currentBlock = "movies";
        currentPage = previousPage;
        addRemMovie();
    })
}

function addRemMovie(){
    // debugger
    if(document.querySelector(".movie-item-active")){
        document.querySelector(".movie-item-active").classList.remove("movie-item-active");
    }
    document.querySelectorAll(".m-row")[mCol].querySelectorAll(".m-i")[mRow].classList.add("movie-item-active")
}

function addRemInfo(){
    // 
    if(document.querySelector(".movie-item-active")){
        document.querySelector(".movie-item-active").classList.remove("movie-item-active");
    }
    document.querySelectorAll(".info-i")[infoI].classList.add("movie-item-active")
}

function movieScrollFunc(deltaY,movieScrollCount = 1){
    // debugger
    if(deltaY > 0 && movieScroll > -((document.querySelectorAll(".movie-category-block").length-1) * 55.5)){
        movieScroll -= movieScrollCount * 55.5;
        document.querySelector(".movies-container").style.transform = `translateY(${movieScroll}%)`
        
        
    }else if(deltaY < 0 && movieScroll < 0){
        movieScroll += 55.5;
        document.querySelector(".movies-container").style.transform = `translateY(${movieScroll}%)`
    }
}

function movieSearchRender (){
    root.innerHTML = "";
    currentPage = "movies-search";
    searchedItems = [];
    isNextMovie = 1;
    movieCount = 5;
    mRow = 0;
    mCol = 0;
    const movieSearchContainer = document.createElement("div");
    const backToMovieBlock = document.createElement("div");
    const backToMovieBtn = document.createElement("div");
    const currentPageTitle = document.createElement("div");
    const searchedMoviesBlock = document.createElement("div");
    const searchedMoviesRow = document.createElement("div");
    const notFoundBlock = document.createElement("div");
    const notFoundImg = document.createElement("img");
    const notFoundText = document.createElement("div");
    const inputBlock = document.createElement("div");
    const inputIcon = document.createElement("div");
    const input = document.createElement("input");

    movieSearchContainer.classList.add("movie-search-container","movies-container");
    backToMovieBlock.classList.add("movies-header","m-row");
    backToMovieBtn.classList.add("movies-back-to-menu","m-i");
    currentPageTitle.classList.add("movies-search-page-title")
    currentPageTitle.textContent = "Search"
    searchedMoviesBlock.classList.add("searched-movies-block");
    searchedMoviesRow.classList.add("movies-row","m-row","searched-movies-row")
    searchedMoviesRow.style.display = "none";
    notFoundBlock.classList.add("not-found-block")
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
    // searchedMoviesBlock.append(searchedMoviesRow);
    // searchedMoviesRow.append(build_movie_items())
    backToMovieBlock.append(backToMovieBtn,currentPageTitle);
    
    document.querySelector(".keyboard").classList.add("movie-keyboard");
    currentBlock = "login";
    keyboard_exist = true;
    addRemLogin();

    backToMovieBtn.addEventListener("click",() => {
        moviesRender(movieCategorys,movies);
    })
}



function movieItemsRender(side){
    // debugger
            let row = document.querySelector(".movies-row .movie-item-active").parentNode;
            let items = row.querySelectorAll(".movies-item")

            if(currentPage === "movies"){
                nextMovie = moviesObj[Object.keys(moviesObj)[row.getAttribute("index")]].movies[movieCount]
                prevMovie = moviesObj[Object.keys(moviesObj)[row.getAttribute("index")]].movies[movieCount-6]
            }else if(currentPage === "movies-search"){
                nextMovie = searchedItems[movieCount]
                prevMovie = searchedItems[movieCount-6]
            }

            
            if(nextMovie && side === "right"){
                items[0].remove();
                row.append(build_movie_items(nextMovie))
                movieCount++;
            }else if(prevMovie && side === "left"){
                items[items.length-1].remove();
                row.prepend(build_movie_items(prevMovie))
                movieCount--;
            }
            
            if(currentPage === "movies"){
                isNextMovie = moviesObj[Object.keys(moviesObj)[row.getAttribute("index")]].movies[movieCount]
                isPrevMovie = moviesObj[Object.keys(moviesObj)[row.getAttribute("index")]].movies[movieCount-6]
            }else if(currentPage === "movies-search"){
                isNextMovie = searchedItems[movieCount]
                isPrevMovie = searchedItems[movieCount-6]
            }
    
 
}


















