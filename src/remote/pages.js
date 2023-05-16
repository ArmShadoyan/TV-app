import { loginRender } from "../js/login";
import { menuRender } from "../js/menu";
import { movie_info_init } from "../pageInits/info";
import { moviesInit, movieSearchRender } from "../js/movies";
import { liveInit } from "../js/liveTv";
import { seriesInit } from "../js/series";
import { series_info_init } from "../pageInits/info";
import { settingsRender } from "../js/settings";

export let pages = {
    current: "",
    previous: "",
    pageVisited: false,

    set_current: function (current, data = {}) {
        // debugger
        if(current !== "movieInfo" && current !== "seriesInfo" && current !== "moviesSearch" && current !== "seriesSearch"){
            document.querySelector(".root").innerHTML = "";
        }

        if (current != this.current) {
        this.previous = this.current;
            if (this[this.previous]) {
                this[this.previous].hide();
            }
        }
        
        this.current = current;

        this[current].show(data);
    },

    set_previous: function () {
        this.set_current(this.previous);
    },

    login:{
        show:function () {
            loginRender();
        },
    
        hide:function () {
            // 
        }
    },

    menu:{
        show:function () {
            menuRender();
        },

        hide:function () {
            // 
        }
    },

    liveTv:{
        show:function () {
            liveInit();
        },

        hide: function () {
            // 
        }
    },

    movies:{
        show:function () {
            moviesInit();
        },

        hide: function () {
            // 
        }
    },

    series:{
        show:function () {
            seriesInit();
        },

        hide:function () {
            // 
        }
    },

    settings:{
        show:function () {
            settingsRender();
        },

        hide:function () {

        }
    },

    movieInfo:{
        show:function (data) {
            movie_info_init(data);
        },

        hide:function () {

        }
    },

    seriesInfo:{
        show:function (data) {
            series_info_init(data);
        },

        hide:function () {

        }
    },

    moviesSearch:{
        show:function () {
            movieSearchRender();
        },

        hide:function () {
            
        }
    },

    seriesSearch:{
        show:function () {
            movieSearchRender();
        },

        hide:function () {

        }
    }
}