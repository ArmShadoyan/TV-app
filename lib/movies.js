var movieCategorys = [];
var movies = [];
var moviesObj;
var movieScroll = 0;
// var movieScrollCount = 55;
var mRowTranslate = 0;
var movieCount = 7;
var nextMovie = 1;
var prevMovie = 1;
var isNextMovie = 1;
var isPrevMovie = 1;
var previousPage;
var previousBlock;
var currentSearch;
var mRow = 0;
var mCol = 1;
var infoI = 0;
var searchI = 0;
var catIndex = null;
var episodes = [];
function build_movies_header() {
  var moviesHeader = document.createElement("div");
  var backToMenuBtn = document.createElement("div");
  var searchBlock = document.createElement("div");
  moviesHeader.classList.add("movies-header", "m-row");
  backToMenuBtn.classList.add("movies-back-to-menu", "m-i");
  searchBlock.classList.add("movies-search-block", "m-i");
  searchBlock.textContent = "Search";
  moviesHeader.append(backToMenuBtn, searchBlock);
  backToMenuBtn.addEventListener("click", function () {
    menuRender();
  });
  searchBlock.addEventListener("click", function () {
    if (document.querySelector(".search-active")) {
      document.querySelector(".search-active").classList.remove("search-active");
    }
    searchedItems = [];
    if (document.querySelector(".movie-search-container")) {
      document.querySelector(".movie-search-container").remove();
    }
    movieSearchRender();
    document.querySelector(".movie-search-container").style.display = "block";
    document.querySelector(".searched-movies-row").style.display = "none";
    document.querySelector(".not-found-block").style.display = "flex";
    currentInput = document.querySelector(".movie-search-input");
    currentInput.value = "";
  });
  return moviesHeader;
}
function build_category_blocks(movieCategorys, movies, obj) {
  // console.log(movieCategorys,movies);
  var selectCategorysBlock = document.createElement("div");
  var selectCategorysRow = document.createElement("div");
  selectCategorysBlock.classList.add("movie-select-categorys-block");
  selectCategorysRow.classList.add("movie-select-categorys-row", "m-row", "movies-row");
  selectCategorysBlock.append(selectCategorysRow);
  var moviesContainerInner = document.createElement("div");
  var moviesContainer = document.createElement("div");
  moviesContainerInner.classList.add("movies-containerinner");
  moviesContainer.classList.add("movies-container");
  moviesContainerInner.append(selectCategorysBlock);
  var _a = movieCategorys;
  var _f = function (item, index) {
    selectCategorysRow.append(build_movie_category_item(item, obj, index));
    var categoryBlock = document.createElement("div");
    var categoryTitle = document.createElement("div");
    var moviesRow = document.createElement("div");
    moviesRow.setAttribute("index", index);
    moviesRow.setAttribute("position", 0);
    if (obj[item.category_id]) {
      for (var i = 0; i < obj[item.category_id].movies.length; i++) {
        if (i < 7) {
          if (moviesRow) {
            moviesRow.append(build_movie_items(obj[item.category_id].movies[i]));
          }
        }
      }
    }
    moviesRow.classList.add("movies-row", "m-row");
    categoryBlock.classList.add("movie-category-block");
    categoryTitle.classList.add("movie-category-title");
    categoryTitle.textContent = "".concat(item.category_name);
    if (obj[item.category_id]) {
      if (obj[item.category_id].movies.length > 0) {
        // moviesRow.setAttribute("catIndex",index);
        categoryBlock.append(categoryTitle, moviesRow);
        moviesContainerInner.append(categoryBlock);
      }
      ;
    }
  };
  for (var _i = 0; _i < _a.length; _i++) {
    _f(_a[_i], _i, _a);
  }
  undefined;
  moviesContainer.append(build_movies_header(), moviesContainerInner);
  return moviesContainer;
}
;
function build_movie_items(movie) {
  var movieItem = document.createElement("div");
  var movieImgBlock = document.createElement("div");
  var movieTitleBlock = document.createElement("div");
  var movieTitle = document.createElement("div");
  movieItem.classList.add("movies-item", "m-i");
  var img = new Image();
  // debugger
  img.onload = function () {
    requestAnimationFrame(function () {
      movieImgBlock.style.backgroundImage = "url(".concat(img.src, ")");
    });
  };
  img.onerror = function () {
    requestAnimationFrame(function () {
      movieImgBlock.style.backgroundImage = "url(imgs/logo-large.png)";
      movieImgBlock.style.backgroundSize = "contain";
    });
  };
  movieImgBlock.classList.add("movie-img-block");
  img.src = movie.stream_icon ? movie.stream_icon : movie.cover;
  // movieImgBlock.style.cssText = `background-image:url(${movie.stream_icon?movie.stream_icon:movie.cover})`;
  movieTitleBlock.classList.add("movie-title-block");
  movieTitle.classList.add("movie-title");
  movieTitle.textContent = "".concat(movie.name);
  movieItem.append(movieImgBlock, movieTitleBlock);
  movieTitleBlock.append(movieTitle);
  movieItem.addEventListener("click", function () {
    // debugger     
    if (currentPage === "movies" || currentPage === "movies-search" && currentSearch === "movies") {
      getRequest(baseUrl, urlParams.loginUrl, urlParams.movieInfo, movie.stream_id).then(function (data) {
        data = data.json();
        return data;
      }).then(function (data) {
        previousPage = currentPage;
        previousBlock = currentBlock;
        if (document.querySelector(".movie-info-container")) {
          document.querySelector(".movie-info-container").remove();
        }
        movieInfoRender(data, currentPage, previousBlock);
        if (document.querySelector(".loader-parent")) {
          document.querySelector(".loader-parent").remove();
        }
      });
    } else if (currentPage === "series" || currentPage === "movies-search" && currentSearch === "series") {
      getRequest(baseUrl, urlParams.loginUrl, urlParams.seriesInfo, movie.series_id).then(function (data) {
        data = data.json();
        return data;
      }).then(function (data) {
        previousPage = currentPage;
        previousBlock = currentBlock;
        movieInfoRender(data, currentPage, previousBlock);
        if (document.querySelector(".loader-parent")) {
          document.querySelector(".loader-parent").remove();
        }
      });
    }
  });
  return movieItem;
}
function build_movie_category_item(item, obj, index) {
  var selectCategory = document.createElement("div");
  var selectCategoryTitle = document.createElement("div");
  selectCategory.classList.add("movie-select-category", "m-i");
  selectCategory.setAttribute("index", index);
  selectCategoryTitle.classList.add("select-category-title");
  selectCategoryTitle.textContent = "".concat(item.category_name);

  // if(obj[item.category_id].movies.length > 0){
  //     // selectCategorysRow.append(selectCategory);
  // }
  selectCategory.append(selectCategoryTitle);
  selectCategory.addEventListener("click", function () {
    // debugger
    movieScrollFunc(1, index);
    document.querySelector(".movie-item-active").classList.remove("movie-item-active");
    selectCategory.classList.add("movie-item-active");
    mCol = index + 2;
    catIndex = mRow;
    mRow = 0;
    addRemMovie();
  });
  return selectCategory;
}
function moviesRender(categorys, movies, obj, page) {
  root.innerHTML = "";
  currentBlock = "movies";
  currentPage = page;
  root.append(build_category_blocks(categorys, movies, obj));
  console.log(document.querySelectorAll(".movies-row"));
  mRow = 0;
  mCol = 1;
  addRemMovie();
  document.querySelector(".movie-select-categorys-row").style.transform = "translateY(0rem)";
  mRowTranslate = 0;
  document.querySelector(".movies-container").addEventListener("wheel", function (e) {
    // console.log(e.deltaY);
    // debugger
    if (e.deltaY > 0) {
      if (mCol < 2) {
        mCol++;
        addRemMovie();
      } else if (mCol < document.querySelectorAll(".m-row").length - 1) {
        mCol++;
        addRemMovie();
        movieScrollFunc(1);
      }
    }
    ;
    if (e.deltaY < 0) {
      movieScrollFunc(-1);
      if (mCol > 1) {
        mCol--;
        addRemMovie();
      }
      ;
    }
    ;
  });
}
;
function movieInfoRender(data, previousPage, block) {
  currentPage = "movie-info";
  currentBlock = "movie-info";
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
  backToMovieBtn.classList.add("movie-info-back-btn", "info-i");
  containerInner.classList.add("movie-info-containerinner");
  imgBlock.classList.add("movie-info-img-block");
  imgDiv.classList.add("movie-info-img-div");
  playBtnDiv.classList.add("movie-info-playbtn-div");
  playBtn.classList.add("movie-info-playbtn", "info-i");
  playBtn.textContent = "Play";
  seasonBlock.classList.add("season-block", "series-row");
  episodeBlock.classList.add("episode-block", "series-row");
  seasonSection.classList.add("season-section");
  if (currentSearch === "movies") {
    // debugger
    console.log(moviesObj[data.movie_data.category_id]);
    imgDiv.style.cssText = "background-image: url(".concat(data.info.cover_big ? data.info.cover_big : data.info.movie_image, ")");
    infoBlock.classList.add("movie-info-block");
    infoName.classList.add("movie-info-name");
    infoName.textContent = "".concat(data.info.name ? data.info.name : data.movie_data.name);
    infoDesc.classList.add("movie-info-desc");
    infoDesc.textContent = "".concat(data.info.description ? data.info.description : data.info.plot);
    infoCast.classList.add("movie-info-cast");
    infoCast.textContent = "".concat(data.info.cast);
    infoGenres.classList.add("movie-info-genres");
    infoGenres.textContent = "".concat(data.info.genre);
    infoRateTimeBlock.classList.add("movie-info-rate-div");
    infoRate.classList.add("movie-info-rate");
    infoRate.textContent = "".concat(data.info.rating);
    infoTime.classList.add("movie-info-time");
    infoTime.textContent = "".concat(data.info.duration);
    backToMovieBlock.append(backToMovieBtn);
    imgBlock.append(imgDiv, playBtnDiv);
    playBtnDiv.append(playBtn);
    infoBlock.append(infoName, infoDesc, infoCast, infoGenres, infoRateTimeBlock);
    infoRateTimeBlock.append(infoRate, infoTime);
    containerInner.append(imgBlock, infoBlock);
    container.append(backToMovieBlock, containerInner);
    root.append(container);
  } else if (currentSearch === "series") {
    seriesI = 0;
    seriesR = 0;
    seriesInfo = 0;
    var img = new Image();
    img.onload = function () {
      imgDiv.style.backgroundImage = "url(".concat(img.src, ")");
    };
    img.onerror = function () {
      imgDiv.style.backgroundImage = "url(imgs/logo-large.png)";
    };
    img.src = data?.info.cover;
    infoBlock.classList.add("movie-info-block");
    infoName.classList.add("movie-info-name");
    infoName.textContent = "".concat(data.info.name);
    infoDesc.classList.add("movie-info-desc");
    infoDesc.textContent = "".concat(data.info.plot);
    infoCast.classList.add("movie-info-cast");
    infoCast.textContent = "".concat(data.info.cast);
    infoGenres.classList.add("movie-info-genres");
    infoGenres.textContent = "".concat(data.info.genre);
    infoRateTimeBlock.classList.add("movie-info-rate-div");
    infoRate.classList.add("movie-info-rate");
    infoRate.textContent = "".concat(data.info.rating);
    infoTime.classList.add("movie-info-time");
    infoTime.textContent = "00:".concat(data.info.episode_run_time, ":00");
    console.log(data);
    backToMovieBlock.append(backToMovieBtn);
    imgBlock.append(imgDiv, playBtnDiv);
    playBtnDiv.append(playBtn);
    infoBlock.append(infoName, infoDesc, infoCast, infoGenres, infoRateTimeBlock, seasonSection);
    episodes = [];
    var seasonsObj = {};
    if (!Array.isArray(data.episodes)) {
      for (item in data.episodes) {
        episodes.push(data.episodes[item]);
      }
    } else {
      episodes = data.episodes;
    }
    if (data.seasons.length > 0) {
      var _a2 = data.seasons;
      var _f2 = function (season) {
        var _a5 = episodes;
        var _f5 = function (episode) {
          if (season.season_number === episode[0].season) {
            console.log(season, episode);
            seasonsObj[season.season_number] = {
              season: season,
              episodes: episode
            };
          }
        };
        for (var _i5 = 0; _i5 < _a5.length; _i5++) {
          _f5(_a5[_i5], _i5, _a5);
        }
        undefined;
      };
      for (var _i2 = 0; _i2 < _a2.length; _i2++) {
        _f2(_a2[_i2], _i2, _a2);
      }
      undefined;
      console.log(seasonsObj);
      seasonSection.append(seasonBlock, episodeBlock);
      infoRateTimeBlock.append(infoRate, infoTime);
      containerInner.append(imgBlock, infoBlock);
      container.append(backToMovieBlock, containerInner);
      root.append(container);
      var seasonIndex = 0;
      for (item in seasonsObj) {
        var season = document.createElement("div");
        season.classList.add("season", "series-i");
        season.setAttribute("season", item);
        seasonBlock.append(season);
        season.textContent = "season".concat(item);
        // debugger
        var defaultEpisodes;
        // debugger
        if (episodes[Object.keys(seasonsObj)]) {
          defaultEpisodes = episodes[Object.keys(seasonsObj)[0]].episodes;
        } else {
          defaultEpisodes = episodes[0];
        }
        // document.querySelector(".episode-block").innerHTML = "";

        season.addEventListener("click", function (e) {
          e.stopPropagation();
          var currentEpisodes = seasonsObj[e.target.getAttribute("season")].episodes;
          console.log(currentEpisodes);
          document.querySelector(".episode-block").innerHTML = "";
          document.querySelector(".episode-block").style.transform = "translate(0rem)";
          seriesTransform = 0;
          seriesI = 0;
          lastIndex = 0;
          // addRemSeries();
          var _a3 = currentEpisodes;
          var _f3 = function (item) {
            createEpisode(item, data);
          };
          for (var _i3 = 0; _i3 < _a3.length; _i3++) {
            _f3(_a3[_i3], _i3, _a3);
          }
          undefined;
        });
      }
      var _a4 = defaultEpisodes;
      var _f4 = function (ep) {
        console.log(ep.season);
        createEpisode(ep, data);
      };
      for (var _i4 = 0; _i4 < _a4.length; _i4++) {
        _f4(_a4[_i4], _i4, _a4);
      }
      undefined;
    } else {
      // debugger
      seasonSection.append(seasonBlock, episodeBlock);
      infoRateTimeBlock.append(infoRate, infoTime);
      containerInner.append(imgBlock, infoBlock);
      container.append(backToMovieBlock, containerInner);
      root.append(container);
      var _a6 = episodes;
      var _f6 = function (ep, index) {
        var season = document.createElement("div");
        season.classList.add("season", "season-i");
        season.setAttribute("season", index);
        seasonBlock.append(season);
        season.textContent = "season".concat(index + 1);
        season.addEventListener("click", function (e) {
          // debugger
          e.stopPropagation();
          var currentEpisodes = episodes[+e.target.getAttribute("season")];
          console.log(currentEpisodes);
          document.querySelector(".episode-block").innerHTML = "";
          var _a8 = currentEpisodes;
          var _f8 = function (item) {
            createEpisode(item, data);
          };
          for (var _i8 = 0; _i8 < _a8.length; _i8++) {
            _f8(_a8[_i8], _i8, _a8);
          }
          undefined;
        });
      };
      for (var _i6 = 0; _i6 < _a6.length; _i6++) {
        _f6(_a6[_i6], _i6, _a6);
      }
      undefined;
      var defaultEpisodes = episodes[0];
      var _a7 = defaultEpisodes;
      var _f7 = function (ep) {
        console.log(ep.season);
        createEpisode(ep, data);
      };
      for (var _i7 = 0; _i7 < _a7.length; _i7++) {
        _f7(_a7[_i7], _i7, _a7);
      }
      undefined;
    }
  }
  document.querySelector(".movies-container").style.display = "none";
  container.style.display = "block";
  addRemInfo();

  // debugger
  backToMovieBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    container.remove();
    document.querySelector(".movies-container").style.display = "block";
    currentBlock = "movies";
    currentPage = previousPage;
    if (block) {
      currentBlock = block;
    }
    addRemMovie();
  });
  playBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    debugger;
    playerBlockRender(data);
    console.log(data);
  });
}
function addRemMovie() {
  if (document.querySelector(".movie-item-active")) {
    document.querySelector(".movie-item-active").classList.remove("movie-item-active");
  }
  if (document.querySelectorAll(".m-row")[mCol].querySelectorAll(".m-i")[mRow]) {
    document.querySelectorAll(".m-row")[mCol].querySelectorAll(".m-i")[mRow].classList.add("movie-item-active");
  }
}
function createEpisode(item, data) {
  var episode = document.createElement("div");
  var episodeImgBlock = document.createElement("div");
  var episodeNameBlock = document.createElement("div");
  var img = new Image();
  img.onload = function () {
    requestAnimationFrame(function () {
      episodeImgBlock.style.backgroundImage = "url(".concat(img.src, ")");
    });
  };
  img.onerror = function () {
    requestAnimationFrame(function () {
      episodeImgBlock.style.backgroundImage = "url(imgs/logo-large.png)";
      episodeImgBlock.style.backgroundSize = "contain";
    });
  };
  img.src = item.info.movie_image ? item.info.movie_image : data.info.cover;
  // episodeImgBlock.style.backgroundImage = `url(${item.info.movie_image?item.info.movie_image:data.info.cover})`
  episode.classList.add("episode", "series-i");
  episodeImgBlock.classList.add("episode-img-block");
  episodeNameBlock.classList.add("episode-name-block");
  episodeNameBlock.textContent = "S".concat(item.season, " E").concat(item.episode_num);
  episode.append(episodeImgBlock, episodeNameBlock);
  document.querySelector(".episode-block").append(episode);
}
function movieSearchRender() {
  previousPage = currentPage;
  currentPage = "movies-search";
  searchedItems = [];
  isNextMovie = 1;
  movieCount = 5;
  mRow = 0;
  mCol = 0;
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
  movieSearchContainer.classList.add("movie-search-container", "movies-container");
  backToMovieBlock.classList.add("movies-header", "search-row");
  backToMovieBtn.classList.add("movies-back-to-menu", "m-i");
  currentPageTitle.classList.add("movies-search-page-title");
  currentPageTitle.textContent = "Search";
  searchedMoviesBlock.classList.add("searched-movies-block");
  searchedMoviesRow.classList.add("movies-row", "search-row", "searched-movies-row");
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
  movieSearchContainer.append(backToMovieBlock, searchedMoviesBlock, inputBlock, print_keyboard(lettersKeyboard, input));
  notFoundBlock.append(notFoundImg, notFoundText);
  inputBlock.append(inputIcon, input);
  searchedMoviesBlock.append(notFoundBlock, searchedMoviesRow);
  backToMovieBlock.append(backToMovieBtn, currentPageTitle);
  movieSearchContainer.style.display = "none";
  document.querySelector(".keyboard").classList.add("movie-keyboard");
  currentBlock = "login";
  keyboard_exist = true;
  addRemLogin();
  backToMovieBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    movieSearchContainer.style.display = "none";
    currentPage = currentSearch;
    currentBlock = "movies";
    addRemMovie();
  });
}
;
function movieItemsRender(side) {
  var row;
  // debugger
  if (currentPage === "movies" || currentPage === "series") {
    row = document.querySelector(".movies-row .movie-item-active").parentNode;
  } else if (currentPage === "movies-search") {
    row = document.querySelector(".searched-movies-row .search-active").parentNode;
  }
  var items = row.querySelectorAll(".movies-item");
  if (currentPage === "movies") {
    for (item in moviesObj) {
      if (moviesObj[item].index === +row.getAttribute("index")) {
        // debugger
        nextMovie = moviesObj[item].movies[movieCount];
        prevMovie = moviesObj[item].movies[movieCount - 6];
      }
    }
  } else if (currentPage === "series") {
    for (item in seriesObj) {
      if (seriesObj[item].index === +row.getAttribute("index")) {
        nextMovie = seriesObj[item].movies[movieCount];
        prevMovie = seriesObj[item].movies[movieCount - 8];
      }
    }
  } else if (currentPage === "movies-search") {
    nextMovie = searchedItems[movieCount];
    prevMovie = searchedItems[movieCount - 6];
  }
  if (nextMovie && side === "right") {
    items[0].remove();
    row.append(build_movie_items(nextMovie));
    movieCount++;
  } else if (prevMovie && side === "left") {
    items[items.length - 1].remove();
    row.prepend(build_movie_items(prevMovie));
    movieCount--;
  }
  if (currentPage === "movies") {
    for (item in moviesObj) {
      if (moviesObj[item].index === +row.getAttribute("index")) {
        nextMovie = moviesObj[item].movies[movieCount];
        prevMovie = moviesObj[item].movies[movieCount - 8];
      }
    }
  } else if (currentPage === "series") {
    for (item in seriesObj) {
      if (seriesObj[item].index === +row.getAttribute("index")) {
        nextMovie = seriesObj[item].movies[movieCount];
        prevMovie = seriesObj[item].movies[movieCount - 8];
      }
    }
  } else if (currentPage === "movies-search") {
    isNextMovie = searchedItems[movieCount];
    isPrevMovie = searchedItems[movieCount - 8];
  }
}
function movieControls(e) {
  var cols = document.querySelectorAll(".m-row");
  var rows = cols[mCol].querySelectorAll(".m-i");
  if (e.key === "ArrowRight") {
    // debugger
    console.log(mCol);
    if (mRow > 1 && nextMovie && mCol > 1) {
      movieItemsRender("right");
      addRemMovie();
    } else if (mCol === 1) {
      // debugger
      if (mRow > 1 && mRow < rows.length - 3) {
        mRowTranslate -= 35;
        cols[mCol].style.transform = "translate(".concat(mRowTranslate, "rem)");
        mRow++;
        addRemMovie();
      } else if (mRow < rows.length - 1) {
        mRow++;
        addRemMovie();
      }
    } else if (mRow < rows.length - 3 && mCol > 1) {
      mRow++;
      addRemMovie();
    } else if (mCol === 0 && mRow < rows.length - 1) {
      mRow++;
      addRemMovie();
    }
  } else if (e.key === "ArrowLeft") {
    // debugger
    if (mRow < rows.length - 4 && prevMovie && mCol > 1) {
      movieItemsRender("left");
      addRemMovie();
    } else if (mCol > 1 && mRow > 0) {
      mRow--;
      addRemMovie();
    }
    if (mCol === 1) {
      // debugger
      if (mRow > 2 && mRow < rows.length - 2) {
        mRowTranslate += 35;
        cols[mCol].style.transform = "translate(".concat(mRowTranslate, "rem)");
        mRow--;
        addRemMovie();
      } else if (mRow > 0) {
        mRow--;
        addRemMovie();
      }
    } else if (mRow > 0 && mCol === 1) {
      mRow--;
      addRemMovie();
    } else if (mCol === 0 && mRow > 0) {
      mRow--;
      addRemMovie();
    }
  } else if (e.key === "ArrowDown") {
    if (mCol < cols.length - 1) {
      if (currentPage === "movies" || currentPage === "series") {
        if (mCol > 1) {
          movieScrollFunc(1);
        }
        if (mCol === 1) {
          catIndex = mRow;
        }
        if (mCol === 0) {
          mRow = catIndex;
        }
        mCol++;
        if (mRow > cols[mCol].querySelectorAll(".m-i").length - 1) {
          mRow = 0;
        }
        addRemMovie();
      }
    }
    if (currentPage === "movies-search") {
      if (mCol === 0) {
        if (searchedItems.length === 0) {
          document.querySelector(".movie-item-active").classList.remove("movie-item-active");
          currentBlock = "login";
          rowIndex = 0;
          keyIndex = 0;
          addRemLogin();
        } else {
          mCol++;
          addRemMovie();
        }
      } else if (mCol === 1) {
        document.querySelector(".movie-item-active").classList.remove("movie-item-active");
        currentBlock = "login";
        rowIndex = 0;
        keyIndex = 0;
        addRemLogin();
      }
    }
  } else if (e.key === "ArrowUp") {
    // debugger
    if (mCol === 2) {
      mRow = catIndex;
      addRemMovie();
    }
    if (mCol > 0) {
      if (mCol < cols.length) {
        movieScrollFunc(-1);
      }
      if (mCol === 1) {
        catIndex = mRow;
      }
      mCol--;
      if (mRow > cols[mCol].querySelectorAll(".m-i").length - 1) {
        console.log(mRow);
        mRow = 0;
      }
      addRemMovie();
    }
    if (mCol < 0) {
      searchI = 0;
      addRemSearch();
    }
  } else if (e.key === "Enter") {
    document.querySelector(".movie-item-active").click();
  }
}
function movieInfoControls(e) {
  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
    if (infoI < document.querySelectorAll(".info-i").length - 1) {
      infoI++;
      addRemInfo();
    } else if (e.key === "ArrowRight") {
      seriesR = 1;
      addRemSeries();
      currentBlock = "series";
    }
  } else if (e.key === "ArrowLeft" || e.key == "ArrowUp") {
    if (infoI > 0) {
      infoI--;
      addRemInfo();
    }
  } else if (e.key === "Enter") {
    document.querySelector(".movie-item-active").click();
  }
}
function movieSearchControls(e) {
  var rows = document.querySelector(".searched-movies-row").querySelectorAll(".m-i");
  //
  if (e.key === "ArrowDown") {
    //
    searchI++;
    if (searchI > 0 && searchedItems.length === 0) {
      document.querySelector(".search-active").classList.remove("search-active");
      currentBlock = "login";
      rowIndex = 0;
      keyIndex = 0;
      addRemLogin();
    }
    if (searchI <= document.querySelectorAll(".search-row").length - 1) {
      mRow = 0;
      addRemSearch();
    } else {
      document.querySelector(".search-active").classList.remove("search-active");
      currentBlock = "login";
      rowIndex = 0;
      keyIndex = 0;
      addRemLogin();
    }
    // addRemSearch();
  } else if (e.key === "ArrowUp") {
    //
    searchI--;
    if (searchI >= 0) {
      mRow = 0;
      addRemSearch();
    }
  } else if (e.key === "ArrowRight") {
    //
    if (mRow > 1 && isNextMovie) {
      movieItemsRender("right");
      addRemSearch();
    } else if (mRow < rows.length - 1) {
      mRow++;
      addRemSearch();
    }
  } else if (e.key === "ArrowLeft") {
    //
    if (mRow < rows.length - 2 && isPrevMovie) {
      movieItemsRender("left");
      addRemSearch();
    } else if (mRow > 0) {
      mRow--;
      addRemSearch();
    }
  } else if (e.key === "Enter") {
    document.querySelector(".search-active").click();
    // currentBlock = "movies";
  }
}

function addRemInfo() {
  // 
  if (document.querySelector(".movie-item-active")) {
    document.querySelector(".movie-item-active").classList.remove("movie-item-active");
  }
  document.querySelectorAll(".info-i")[infoI].classList.add("movie-item-active");
}
function addRemSearch() {
  if (document.querySelector(".search-active")) {
    document.querySelector(".search-active").classList.remove("search-active");
  }
  if (document.querySelectorAll(".search-row")[searchI].querySelectorAll(".m-i")[mRow]) {
    document.querySelectorAll(".search-row")[searchI].querySelectorAll(".m-i")[mRow].classList.add("search-active");
  }
}
function movieScrollFunc(deltaY, movieScrollCount = 1) {
  //
  if (deltaY > 0 && movieScroll > -((document.querySelectorAll(".movie-category-block").length - 1) * 65)) {
    movieScroll -= 65 * movieScrollCount;
    document.querySelector(".movies-container").style.transform = "translateY(".concat(movieScroll, "%)");
  } else if (deltaY < 0 && movieScroll < 0) {
    movieScroll += 65 * movieScrollCount;
    document.querySelector(".movies-container").style.transform = "translateY(".concat(movieScroll, "%)");
  }
}