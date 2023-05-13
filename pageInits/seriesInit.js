function seriesInit () {

    getRequest(baseUrl,urlParams.loginUrl,urlParams.seriesCategorys)
    .then(categorys => {

        categorys = categorys.json();
        return categorys;

    }).then(categorys => {

        seriesCategory = categorys;
        return seriesCategory;

    }).then(seriesCategory => {
        getRequest(baseUrl,urlParams.loginUrl,urlParams.series)
        .then(data => {

            data = data.json();
            return data;

        }).then(data => {

            series = data;
            return series;

        }).then(data => {

            seriesObj = {};

            seriesCategory.forEach((cat,index) => {
                seriesObj[cat.category_id] = {category:cat.category_name,movies:[],index:index}
            })
            series.forEach(item => {
                if(seriesObj[item.category_id])seriesObj[item.category_id].movies.push(item);
            })
            moviesRender(seriesCategory,series,seriesObj,"series")
            controls.set_current("movies");
            controls.movies.move();
        })
    })
}