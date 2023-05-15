function liveInit () {

    var filterMenu = ["Favorites","All","Search"];
	
	getRequest(baseUrl,urlParams.loginUrl,urlParams.liveCategorys)
		.then(data => {

			data = data.json();
			return data;

		}).then(data => {

			categorys = data;
			liveObj = {};	

			categorys.forEach(item => {
				liveObj[item.category_id] = {category:item.category_name,chanels:[]}
				filterMenu.push(item.category_name);
			})
			return filterMenu

		}).then(data => {
			getRequest(baseUrl,urlParams.loginUrl,urlParams.liveChanels)
			.then(data => {

				data = data.json();
				return data;

			}).then(data => {

				chanels = data;
				chanels.forEach(item => {
					if(liveObj[item.category_id]){
						liveObj[item.category_id].chanels.push(item);
					}
				})
				
				console.log(liveObj);
			}).then(data => {

				if(document.querySelector(".loader-parent"))document.querySelector(".loader-parent").remove();
				tvRender(chanels,filterMenu)
				chanelsOnClick();

				controls.set_current("tvChanelBlock");
				controls.tvChanelBlock.move();
			})
		})
}