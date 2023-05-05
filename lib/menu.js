var menuI = 0;
var menuLogoBlock = document.createElement("div");
var menuBlock = document.createElement("div");
var menuTvItem = document.createElement("div");
var menuMovieItem = document.createElement("div");
var menuSeriesitem = document.createElement("div");
var menuSettingsItem = document.createElement("div");
var menuTvTitle = document.createElement("div");
var menuMovieTitle = document.createElement("div");
var menuSeriesTitle = document.createElement("div");
var menuSettingsTitle = document.createElement("div");
menuLogoBlock.classList.add("menu-logo-block");
menuBlock.classList.add("menu-block");
menuTvItem.classList.add("menu-tv-item", "menu-item");
menuMovieItem.classList.add("menu-movies-item", "menu-item");
menuSeriesitem.classList.add("menu-series-item", "menu-item");
menuSettingsItem.classList.add("menu-settings-item", "menu-item");
menuTvTitle.classList.add("menu-item-title", "menu-tv-title");
menuMovieTitle.classList.add("menu-item-title", "menu-movie-title");
menuSeriesTitle.classList.add("menu-item-title", "menu-series-title");
menuSettingsTitle.classList.add("menu-item-title", "menu-settings-title");
menuTvTitle.textContent = "Live Tv";
menuMovieTitle.textContent = "Movies";
menuSeriesTitle.textContent = "Series";
menuSettingsTitle.textContent = "Settings";
function createMenuElements() {
  root.append(menuLogoBlock, menuBlock);
  menuBlock.append(menuTvItem, menuMovieItem, menuSeriesitem, menuSettingsItem);
  menuTvItem.append(menuTvTitle);
  menuMovieItem.append(menuMovieTitle);
  menuSeriesitem.append(menuSeriesTitle);
  menuSettingsItem.append(menuSettingsTitle);
}
function menuOnClick() {
  var menuItems = menuBlock.querySelectorAll(".menu-item");
  var _a = menuItems;
  var _f = function (item) {
    item.addEventListener("click", function () {
      if (item.firstElementChild.textContent === "Settings") {
        settingsRender();
      } else if (item.firstElementChild.textContent === "Live Tv") {
        root.innerHTML = "";
        var filterMenu = ["Favorites", "All", "Search"];
        currentBlock = "tv";
        getRequest(baseUrl, urlParams.loginUrl, urlParams.liveCategorys).then(function (data) {
          data = data.json();
          return data;
        }).then(function (data) {
          categorys = data;
          // 
          console.log(categorys, chanels);
          liveObj = {};
          var _a2 = categorys;
          var _f2 = function (item) {
            liveObj[item.category_id] = {
              category: item.category_name,
              chanels: []
            };
            filterMenu.push(item.category_name);
          };
          for (var _i2 = 0; _i2 < _a2.length; _i2++) {
            _f2(_a2[_i2], _i2, _a2);
          }
          undefined;
          return filterMenu;
        }).then(function (data) {
          getRequest(baseUrl, urlParams.loginUrl, urlParams.liveChanels).then(function (data) {
            data = data.json();
            return data;
          }).then(function (data) {
            chanels = data;
            var _a3 = chanels;
            var _f3 = function (item) {
              if (liveObj[item.category_id]) {
                liveObj[item.category_id].chanels.push(item);
              }
            };
            for (var _i3 = 0; _i3 < _a3.length; _i3++) {
              _f3(_a3[_i3], _i3, _a3);
            }
            undefined;
            // 
            console.log(liveObj);
          }).then(function (data) {
            if (document.querySelector(".loader-parent")) {
              document.querySelector(".loader-parent").remove();
            }
            tvRender(chanels, filterMenu);
            chanelsOnClick();
          });
        });
      } else if (item.firstElementChild.textContent === "Movies") {
        currentSearch = "movies";
        getRequest(baseUrl, urlParams.loginUrl, urlParams.movieCategorys).then(function (categorys) {
          categorys = categorys.json();
          return categorys;
        }).then(function (categorys) {
          movieCategorys = categorys;
          return movieCategorys;
        }).then(function (movieCategorys) {
          getRequest(baseUrl, urlParams.loginUrl, urlParams.movies).then(function (data) {
            data = data.json();
            return data;
          }).then(function (data) {
            movies = data;
            return movies;
          }).then(function (data) {
            moviesObj = {};
            var _a4 = movieCategorys;
            var _f4 = function (cat, index) {
              moviesObj[cat.category_id] = {
                category: cat.category_name,
                movies: [],
                index: index
              };
            };
            for (var _i4 = 0; _i4 < _a4.length; _i4++) {
              _f4(_a4[_i4], _i4, _a4);
            }
            undefined;
            var _a5 = movies;
            var _f5 = function (movie) {
              // 
              if (moviesObj[movie.category_id]) {
                moviesObj[movie.category_id].movies.push(movie);
              }
            };
            for (var _i5 = 0; _i5 < _a5.length; _i5++) {
              _f5(_a5[_i5], _i5, _a5);
            }
            undefined;
            for (item in moviesObj) {
              if (moviesObj[item].movies.length === 0) {
                console.log(moviesObj[item]);
                delete moviesObj[item];
              }
            }
            console.log(moviesObj);
          }).then(function (data) {
            moviesRender(movieCategorys, movies, moviesObj, "movies");
          });
        });
      } else if (item.firstElementChild.textContent === "Series") {
        currentSearch = "series";
        getRequest(baseUrl, urlParams.loginUrl, urlParams.seriesCategorys).then(function (categorys) {
          categorys = categorys.json();
          return categorys;
        }).then(function (categorys) {
          seriesCategory = categorys;
          return seriesCategory;
        }).then(function (seriesCategory) {
          getRequest(baseUrl, urlParams.loginUrl, urlParams.series).then(function (data) {
            data = data.json();
            return data;
          }).then(function (data) {
            series = data;
            return series;
          }).then(function (data) {
            console.log(series, seriesCategory);
            seriesObj = {};
            var _a6 = seriesCategory;
            var _f6 = function (cat, index) {
              // 
              seriesObj[cat.category_id] = {
                category: cat.category_name,
                movies: [],
                index: index
              };
            };
            for (var _i6 = 0; _i6 < _a6.length; _i6++) {
              _f6(_a6[_i6], _i6, _a6);
            }
            undefined;
            var _a7 = series;
            var _f7 = function (item) {
              if (seriesObj[item.category_id]) {
                seriesObj[item.category_id].movies.push(item);
              }
            };
            for (var _i7 = 0; _i7 < _a7.length; _i7++) {
              _f7(_a7[_i7], _i7, _a7);
            }
            undefined;
            moviesRender(seriesCategory, series, seriesObj, "series");
          });
        });
      }
    });
  };
  for (var _i = 0; _i < _a.length; _i++) {
    _f(_a[_i], _i, _a);
  }
  undefined;
}
function menuRender() {
  currentPage = "menu";
  currentBlock = "menu";
  root.innerHTML = "";
  createMenuElements();
  addRemMenu();
  menuOnClick();
}
function addRemMenu() {
  if (document.querySelector(".menu-active")) {
    document.querySelector(".menu-active").classList.remove("menu-active");
  }
  document.querySelectorAll(".menu-item")[menuI].classList.add("menu-active");
}
function selectedChanel() {
  if (document.querySelector(".chanel-item-selected")) {
    document.querySelector(".chanel-item-selected").classList.remove("chanel-item-selected");
  }
  if (!document.querySelector(".chanel-item-active").classList.contains("chanel-item-selected")) {
    document.querySelector(".chanel-item-active").classList.add("chanel-item-selected");
  }
  var _a8 = chanels;
  var _f8 = function (item) {
    if (item.name === document.querySelector(".chanel-item-selected").querySelector(".chanel-title").textContent) {
      document.querySelector(".video").src = "http://79.143.180.88:25461/4/4/".concat(item.stream_id);
    }
  };
  for (var _i8 = 0; _i8 < _a8.length; _i8++) {
    _f8(_a8[_i8], _i8, _a8);
  }
  undefined;
}

// btoa()
// atob();