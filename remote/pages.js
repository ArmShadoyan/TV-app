window.pages = {
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