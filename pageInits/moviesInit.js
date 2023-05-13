function moviesInit () {

    currentSearch = "movies"

    getRequest(baseUrl,urlParams.loginUrl,urlParams.movieCategorys)
    .then(categorys => {

        categorys = categorys.json();
        return categorys

    }).then(categorys => {

        movieCategorys = categorys
        return movieCategorys;

    })
    .then(movieCategorys => {
        getRequest(baseUrl,urlParams.loginUrl,urlParams.movies)
        .then(data => {

            data = data.json()
            return data

        }).then(data => {

            movies = data;
            return movies;

        }).then(data => {

            moviesObj = {};

            movieCategorys.forEach((cat,index) => {
                moviesObj[cat.category_id] = {category:cat.category_name,movies:[],index:index};	
            })
            movies.forEach(movie => {
                // 
                if(moviesObj[movie.category_id])moviesObj[movie.category_id].movies.push(movie)

            })
            for(item in moviesObj){
                if(moviesObj[item].movies.length === 0){
                    console.log(moviesObj[item]);
                    delete moviesObj[item]
                }
            }

        }).then(data => {
            moviesRender(movieCategorys,movies,moviesObj,"movies");
            controls.set_current("movies");
            controls.movies.move();
        })
    })
}