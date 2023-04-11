
let movieCategorys = [];
let movies = [];
let movieScroll = 0;

mRow = 0;
mCol = 1;
const moviesContainer = document.createElement("div");

const moviesHeader = document.createElement("div")
const backToMenuBtn = document.createElement("div");
const searchBlock = document.createElement("div");
const moviesContainerInner = document.createElement("div");


moviesContainer.classList.add("movies-container");

moviesHeader.classList.add("movies-header","m-row");
backToMenuBtn.classList.add("movies-back-to-menu","m-i");
searchBlock.classList.add("movies-search-block","m-i");
searchBlock.textContent = "Search";
moviesContainerInner.classList.add("movies-containerinner");



function build_movies_header(){
    moviesHeader.append(backToMenuBtn,searchBlock);

    return moviesHeader;
}


function build_select_categorys_block(movieCategorys){
       console.log(movieCategorys);
       const selectCategorysBlock = document.createElement("div");
       const selectCategorysRow = document.createElement("div");

        movieCategorys.forEach(item => {
        const selectCategory = document.createElement("div");
        const selectCategoryTitle = document.createElement("div");
    
        selectCategorysBlock.classList.add("movie-select-categorys-block");
        selectCategorysRow.classList.add("movie-select-categorys-row","m-row");
        selectCategory.classList.add("movie-select-category","m-i");
        selectCategoryTitle.classList.add("select-category-title");  

        selectCategoryTitle.textContent = `${item.category_name}`
        
        selectCategory.append(selectCategoryTitle);
        selectCategorysRow.append(selectCategory);
    })

    selectCategorysBlock.append(selectCategorysRow);

    return selectCategorysBlock;
}


function build_movies_category_blocks(movieCategorys,movies){
    console.log(movieCategorys,movies);
    movieCategorys.forEach(item => {
        const categoryBlock = document.createElement("div");
        const categoryTitle = document.createElement("div");

        const moviesRow = document.createElement("div");

            movies.forEach(movie => {
                if(movie.category_id === item.category_id){
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
                    moviesRow.append(movieItem);
                }
            })

        moviesRow.classList.add("movies-row","m-row");
        categoryBlock.classList.add("movie-category-block");
        categoryTitle.classList.add("movie-category-title");
        categoryTitle.textContent = `${item.category_name}`
        
        categoryBlock.append(categoryTitle,moviesRow);
        moviesContainerInner.append(categoryBlock)
    })

    // categoryBlock.append(categoryTitle,moviesRow);   
    
    

    // return categoryBlock;
}







function moviesRender(movieCategorys,movies){
    currentBlock = "movies";
    root.innerHTML = "";
    root.append(moviesContainer);
    moviesContainer.append(build_movies_header(),moviesContainerInner);
    moviesContainerInner.append(build_select_categorys_block(movieCategorys));
    build_movies_category_blocks(movieCategorys,movies);
    addRemMovie();
    moviesContainer.addEventListener("wheel", (e) => {
        if(e.deltaY > 0)movieScrollFunc(1);
        if(e.deltaY < 0)movieScrollFunc(-1);
    })
}

function addRemMovie(){
    if(document.querySelector(".movie-item-active")){
        document.querySelector(".movie-item-active").classList.remove("movie-item-active");
    }
    document.querySelectorAll(".m-row")[mCol].querySelectorAll(".m-i")[mRow].classList.add("movie-item-active")
}

function movieScrollFunc(deltaY){
    // debugger
    if(deltaY > 0 && movieScroll > -111){
        console.log(1);
        movieScroll -= 55.5
        moviesContainer.style.transform = `translateY(${movieScroll}%)`
    }else if(deltaY < 0 && movieScroll < 0){
        movieScroll += 55.5;
        moviesContainer.style.transform = `translateY(${movieScroll}%)`
    }
}