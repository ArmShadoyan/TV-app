
var menutTranslate = 0;
let episodeArr = [0,0];

var searchedItems = [];


//  function keyboardClick(currentInput,key){

// 	var input = currentInput
// 	searchedItems = [];

// 	if(document.querySelector(".active"))document.querySelector(".active").classList.remove("active");
// 	key.classList.add("active");
// 	var activeText = document.querySelector(".active").innerText;
// 		if(activeText !== "shift" && activeText !== "Done" && activeText !== "clean" && activeText !== "backspace" && activeText !== "123" && activeText !== "Eng" && activeText !== "" && keyboard_exist){
// 			input.value += activeText;
	
// 		}else if(document.querySelector(".back").classList.contains("active")){
// 			input.value = input.value.split("").slice(0,-1).join("")
	
// 		}else if(document.querySelector(".active").classList.contains("shift")){
// 			for(var i = 0;i < letters.length;i++){
// 				if(letters[i].textContent !== letters[i].textContent.toUpperCase()){
// 					letters[i].textContent = letters[i].textContent.toUpperCase();
// 				}else{
// 					letters[i].textContent = letters[i].textContent.toLowerCase();
// 				}
// 			}

// 		}else if(document.querySelector(".active").classList.contains("done")){
			
// 			var inputs = document.querySelectorAll(".input-block-item");
// 			if(!document.querySelector(".keyboard").classList.contains("live-keyboard") && !document.querySelector(".keyboard").classList.contains("movie-keyboard")){
// 					inputs[inputI].classList.remove("active-login");
// 					inputI++;
// 					if(inputI === inputs.length-1){
// 						document.querySelector(".keyboard").remove();
// 						keyboard_exist = false;
// 						inputI = 0;
// 						keyboardPos();
// 						document.querySelector(".login-btn").classList.add("active-login")
// 						loginBtn.click();	
// 					}else{
// 						inputs[inputI].classList.add("active-login");
// 					}
// 			}else if(document.querySelector(".keyboard").classList.contains("live-keyboard")){
// 				document.querySelector(".player-block").style.transform = "translateX(0)";
// 				document.querySelector(".chanels-search-inputblock").style.transform = "translateX(110%)";
// 				currentBlock = "tv"
// 				filteredCat = searchedItems;
// 			}
// 		}else if(document.querySelector(".active").classList.contains("numbers-key")){
// 			var numbersKey = document.querySelectorAll(".numbers-key");
// 			for(var i = 0;i < numbersKey.length;i++){
// 				var numbersKey_item = numbersKey[i];
// 				if(numbersKey_item.textContent == "123"){
// 					var parent = document.querySelector(".keyboard").parentElement;
// 					if(currentPage === "movies"){
// 						document.querySelector(".keyboard").remove();
// 						parent.append(print_keyboard(numbersKeyboard,document.querySelector(".movie-search-input"))) 
// 						document.querySelector(".keyboard").classList.add("movie-keyboard")
// 					}else if(currentPage === "tv"){
// 						document.querySelector(".keyboard").remove();
// 						parent.append(print_keyboard(numbersKeyboard,document.querySelector(".chanels-search-input"))) 
// 						document.querySelector(".keyboard").classList.add("live-keyboard")
// 					}else if(currentPage === "login"){
// 						document.querySelector(".keyboard").remove();
// 						parent.append(print_keyboard(numbersKeyboard,document.querySelector(".active-login"))); 
// 					}
// 				}else if(numbersKey_item.textContent == "Eng"){
// 					var parent = document.querySelector(".keyboard").parentElement;
// 					if(currentPage === "movies"){
// 						document.querySelector(".keyboard").remove();
// 						parent.append(print_keyboard(vartersKeyboard,document.querySelector(".movie-search-input")));
// 						document.querySelector(".keyboard").classList.add("movie-keyboard");;
					
// 					}else if(currentPage === "tv"){
// 						document.querySelector(".keyboard").remove();
// 						parent.append(print_keyboard(lettersKeyboard,document.querySelector(".chanels-search-input")));
// 						document.querySelector(".keyboard").classList.add("live-keyboard");
// 					}else if(currentPage === "login"){
// 						document.querySelector(".keyboard").remove();
// 						parent.append(print_keyboard(lettersKeyboard,document.querySelector(".active-login"))) ;
// 					}
// 				}
// 			}

// 		}else if((document.querySelector(".active").classList.contains("clean"))){
// 			currentInput.value = "";
// 		}else if((document.querySelector(".active").classList.contains("space"))){
// 			currentInput.value += " ";
// 		}
// 		if(currentInput === document.querySelector(".chanels-search-input")){

// 			for (var j = 0;j < chanels.length;j++){
// 				var chanel = chanels[j];
// 				var chanelName = chanel.name.split(" ").join("").toLowerCase();
// 				if(chanelName.includes(input.value.split(" ").join("").toLowerCase())){
// 					searchedItems.push(chanel)
// 					document.querySelector(".chanels-inner").innerHTML = "";
// 				}
// 			}
// 			document.querySelector(".chanels-inner").innerHTML = "";
// 			printChanelsList(searchedItems)
// 			if(document.querySelector(".chanel-item-active")) document.querySelector(".chanel-item-active").click();
// 		}else if(currentInput === document.querySelector(".movie-search-input")){
// 			console.log();
// 			document.querySelector(".searched-movies-row").innerHTML = "";
// 			if(currentSearch === "movies"){
// 				// movies.forEach(movie => {
							
// 				// })
// 				for(var a = 0;a < movies.length;a++){
// 					var movie = movies[a];
// 					var movieName = movie.name.split(" ").join("").toLowerCase()
// 					if(movieName.includes(input.value.split(" ").join("").toLowerCase())){
// 						searchedItems.push(movie);
// 						document.querySelector(".not-found-block").style.display = "none";
// 						document.querySelector(".searched-movies-row").style.display = "flex";
// 						if(document.querySelector(".searched-movies-row").querySelectorAll(".movies-item").length < 5){
// 							document.querySelector(".searched-movies-row").append(build_movie_items(movie)); 
// 						}
// 					}		
// 				}
// 			}else if(currentSearch === "series"){
// 				series.forEach(movie => {
// 					var movieName = movie.name.split(" ").join("").toLowerCase()
// 					if(movieName.includes(input.value.split(" ").join("").toLowerCase())){
// 						searchedItems.push(movie);
// 						document.querySelector(".not-found-block").style.display = "none";
// 						document.querySelector(".searched-movies-row").style.display = "flex";
// 						if(document.querySelector(".searched-movies-row").querySelectorAll(".movies-item").length < 5){
// 							document.querySelector(".searched-movies-row").append(build_movie_items(movie)); 
// 						}
// 					}				
// 				})
// 			}
// 			console.log(searchedItems);
// 		}
// }



var controls = {
	current: "",
	previous: "",
	
	set_current: function (current) {
		if (this.current == current) return;
		
		if (["sidebar"].indexOf(current) == -1) {
			this.previous = this.current;
		}
	
		this.current = current;
	},
	
	set_previous:function () {
	this.set_current(this.previous);
	keydown({ keyName: "move" });
	},

	loginInputs:{
		
		index: 0,
		items: document.getElementsByClassName("login-ctrl"),

		move:function() {
			remove_active_login();

			this.items[this.index].classList.add("active-login");
		},

		down:function () {
			if(this.index < this.items.length-1){
				this.index++;
				this.move();
			}
		},

		up:function () {
			if(this.index > 0){
				this.index--;
				this.move();
			}
		},

		ok:function () {
			this.items[this.index].click();
		}
	},

	keyboard:{
		index:0,
		rowIndex:0,
		items: [],
		rows:[],
		
		move:function () {
			remove_active();
			this.items = document.getElementsByClassName("keyboard-row-ctrl")[this.rowIndex].getElementsByClassName("key-ctrl");
			this.rows = document.getElementsByClassName("keyboard-row-ctrl");

			this.items[this.index].classList.add("active");
		},

		right:function () {
			if(this.index < this.items.length-1){
				this.index++;
				this.move();
			}else{
				this.index = 0;
				this.move();
			}
		},

		left:function () {
			if(this.index > 0){
				this.index--;
				this.move();
			}else{
				this.index = this.items.length-1;
				this.move();
			}
		},

		down:function () {
			if(this.rowIndex < this.rows.length-1){
				this.rowIndex++;
				let nextRowItems = this.rows[this.rowIndex].getElementsByClassName("key-ctrl");
				if(this.rowIndex === 1){
					if(!nextRowItems[this.index]){
						this.index = nextRowItems.length-1;
					}
				}else if(this.rowIndex === 3){
					if(this.index == 0 || this.index == 1){
						this.index = 0;
					}else if(this.index > this.items.length - 2){
						this.index = 2;
					}else{
						this.index = 1;
					}
				}
				this.move();
			}else{
				this.rowIndex = 0;
				this.move();
			}
		},

		up:function () {
			if(this.rowIndex > 0){
				this.rowIndex--;
				this.move();
			}else if(pages.current == "moviesSearch" || pages.current == "seriesSearch"){
				// debugger
				controls.set_current("movies");
				controls.movies.index = 0;
				controls.movies.rowIndex = 1;
				if(pages.current == "moviesSearch" || pages.current == "seriesSearch"){
					if(searchedItems.length == 0){
						controls.movies.rowIndex = 0;
					}
				}
				controls.movies.move();
			}
		},

		ok:function () {
			this.items[this.index].click();
		},

		back:function () {
			if(pages.current == "login"){
				document.querySelector(".keyboard-block").innerHTML = "";
				controls.set_current("loginInputs");
				controls.loginInputs.move();
				keyboardPos();
			}else if(pages.current == "liveTv"){
				document.querySelector(".chanel-menu-title-block").click();
			}
		}
	},

	menu: {

	index: 0,
	items: document.getElementsByClassName("menu-ctrl"),

	move: function() {
		remove_active();

		this.items[this.index].classList.add("active");
	},

	right: function () {
		if(this.index < this.items.length - 1) {
			this.index++;
			this.move()
		}
	},

	left:function () {
		if(this.index > 0){
			this.index--;
			this.move();
		}
	},

	ok: function () {
		this.items[this.index].click()
	}
	},

	settings:{
	index:1,
	items:document.getElementsByClassName("settings-ctrl"),

	move: function () {
		
		remove_active();

		this.items[this.index].classList.add("active");
	},

	down: function () {
		if(this.index < this.items.length-1){
			this.index++;
			this.move();
		}
	},

	up:function () {
		if(this.index > 0){
			this.index--;
			this.move();
		}
	},

	left:function () {
		this.index = 0;
		this.move();
	},

	ok:function () {
		this.items[this.index].click();
	},

	back:function () {
		this.items[0].click();
	}
	},

	parentalCode:{
		index:1,
		items:document.getElementsByClassName("pin-ctrl"),
		
		move: function() {
		remove_active();

		this.items[this.index].classList.add("active");
	},

	right: function () {
		if(this.index < this.items.length-1){
			remove_active();
			this.index++;
			this.move();
		}
	},

	left: function () {
		if(this.index > 0){
			remove_active();
			this.index--;
			this.move();
		}
	},

	ok: function () {
		this.items[this.index].click();
		if(this.index !== 0){
			controls.set_current("pinKeyboard");
			controls.pinKeyboard.move();
		}
	}
	},

	pinKeyboard:{
	index:1,
	items:document.getElementsByClassName("pin-key-ctrl"),

	move: function() {
		remove_active();

		this.items[this.index].classList.add("active");
	},

	right: function () {
		
		if(this.index < this.items.length-1){
			remove_active();
			this.index++;
			this.move();
		}
	},

	left: function () {
		
		if(this.index > 0){
			remove_active();
			this.index--;
			this.move();
		}
	},

	up: function () {
		document.querySelector(".pin_keyboard_row").style.display = "none";
		controls.set_current("parentalCode");
		controls.parentalCode.move();
	}
	},

	tvChanelBlock:{
	index:0,
	// chanelIndex:0,
	items:document.getElementsByClassName("chanel-ctrl"),

	move: function() {
		remove_active();

		this.items[this.index].classList.add("active");
	},

	down: function () {
		// debugger
		if(this.index > 1 && this.index < this.items.length-1 && nextChanel){
			chanelItemsRender("bottom");
			this.move();
		}else if(this.index < this.items.length-1){
			this.index++;
			this.move();
		}
		// if(this.chanelIndex < filteredCat.length - 1) this.chanelIndex++;
	},

	up: function () {
		// debugger
		if(this.index < this.items.length-3 && this.index > 1 && prevChanel){
			chanelItemsRender("top");
			this.move();
		}else if(this.index > 0){
			this.index--;
			this.move();
		}
		// if(this.chanelIndex > 0) this.chanelIndex--;
	},

	back: function () {
		document.querySelector(".filter-menu-title").click();
	},

	ok:function () {
		this.items[this.index].click();
	}
	},

	tvCategoryBlock:{
		index:0,
		items:document.getElementsByClassName("tv-category-ctrl"),

		move: function() {
			remove_active();

			this.items[this.index].classList.add("active");
		},

		down:function () {
			if(this.index > 1 && this.index < this.items.length-4){
				menutTranslate -= 15.6;
				document.querySelector(".filter-menu").style.transform = `translateY(${menutTranslate}rem)`
				remove_active();
				this.index++;
				this.move();
			}else if(this.index < this.items.length-1){
				remove_active();
				this.index++;
				this.move();
			}
		},

		up:function () {
			if(this.index > 2 && this.index < this.items.length-3){
				menutTranslate += 15.6;
				document.querySelector(".filter-menu").style.transform = `translateY(${menutTranslate}rem)`
				remove_active();
				this.index--;
				this.move();
			}else if(this.index > 0){
				remove_active();
				this.index--;
				this.move();
			}
		},

		ok:function () {
			this.items[this.index].click();
			controls.tvChanelBlock.index = 0;
			controls.tvChanelBlock.chanelIndex = 0;
		},

		right:function () {
			document.querySelector(".filter-menu-title").click();
		},

		back:function () {
			document.querySelector(".root").innerHTML = "";
			menuRender();
		}
	},

	movies:{
		index:0,
		rowIndex:0,
		items: [],
		rows:[],
		
		move:function () {
			remove_active();
			
			this.items = document.getElementsByClassName("m-row")[this.rowIndex].getElementsByClassName("m-i");
			this.rows = document.getElementsByClassName("m-row");
			if(pages.current == "moviesSearch" || pages.current == "seriesSearch"){
				this.items = document.getElementsByClassName("movie-search-row")[this.rowIndex].getElementsByClassName("m-i");
				this.rows = document.getElementsByClassName("movie-search-row");
			}

			this.items[this.index].classList.add("active");
		},

		down:function () {
			// debugger
			if(this.rowIndex === 1 && pages.current == "movies" || pages.current == "series"){
				document.querySelector(".movie-select-categorys-row").setAttribute("index",this.index)
				this.index = 0;
			}
			if(this.rowIndex === 0 && pages.current == "movies" || pages.current == "series"){
				this.index = +(document.querySelector(".movie-select-categorys-row").getAttribute("index"))
			}
			if(this.rowIndex < this.rows.length-1){
				remove_active();
				categoryArr[this.rowIndex] = movieCount;
				this.rowIndex++;
				movieCount = categoryArr[this.rowIndex];
				if(pages.current == "moviesSearch" || pages.current == "seriesSearch"){
					if(this.rowIndex == 1){
						if(searchedItems.length == 0){
							controls.set_current("keyboard");
							controls.keyboard.move();
						}else{
							this.move();
						}
					}
				}else{
					this.move();
				}
			}else if((pages.current == "moviesSearch" || pages.current == "seriesSearch")){
				controls.set_current("keyboard");
				controls.keyboard.move();
			}
			// debugger
			if(this.rowIndex > 2 && this.rowIndex < this.rows.length-1){
				blockScroll(document.querySelector(".movies-container"),1)
			}
		},

		up:function () {
			// debugger
			
			if(this.rowIndex === 2){
				this.index = +(document.querySelector(".movie-select-categorys-row").getAttribute("index"))
			}else if(this.rowIndex === 1){
				document.querySelector(".movie-select-categorys-row").setAttribute("index",this.index)
				this.index = +(document.querySelector(".movies-header").getAttribute("index"))
			}
			if(this.rowIndex > 0){
				remove_active();
				categoryArr[this.rowIndex] = movieCount;
				this.rowIndex--;
				movieCount = categoryArr[this.rowIndex];
				
				this.move();
			}
			if(this.rowIndex < this.rows.length-1 && this.rowIndex > 1){
				blockScroll(document.querySelector(".movies-container"),-1)
			}	
		},

		right:function () {
			// debugger
			if(this.rowIndex === 1 && this.index < this.items.length-1 && pages.current !== "moviesSearch" && pages.current !== "seriesSearch"){
				if(this.index > 1 && this.index < this.items.length-3){
					blockScroll(document.querySelector(".movie-select-categorys-row"),1,"rem",35,"X");
				}
					this.index++;
					this.move();

			}else if(this.index > 1 && this.items.length > 4 && nextMovie){
				movieItemsRender("right")
				this.move();
			}else if(this.index < this.items.length-1){
				this.index++;
				this.move();
			}
		},

		left:function () {
			// debugger
			if(this.rowIndex === 1 && this.index > 0 && pages.current !== "moviesSearch" && pages.current !== "seriesSearch"){
				if(this.index > 2 && this.index < this.items.length-2){
					blockScroll(document.querySelector(".movie-select-categorys-row"),-1,"rem",35,"X");
				}
					this.index--;
					this.move();
			}else if(this.index > 1  && movieCount > 4 && prevMovie && this.index < this.items.length - 2){
				movieItemsRender("left")
				this.move();
			}else if(this.index > 0){
				this.index--;
				this.move();
			}
		},

		ok:function () {
			this.items[this.index].click();
			episodeArr = [0,0]
		}
	},

	movieInfo:{
		index:0,
		items:document.getElementsByClassName("info-ctrl"),

		move:function () {
		
			remove_active();

			this.items[this.index].classList.add("active");
		},

		right:function () {
			// debugger
			if(this.index < this.items.length-1){
				this.index++;
				this.move();
			}else{
				controls.set_current("infoEpisodes")
				controls.infoEpisodes.move();
			}
		},

		left:function () {
			if(this.index > 0){
				this.index--;
				this.move();
			}
		},

		ok:function () {
			this.items[this.index].click();
		}
	},

	infoEpisodes:{
		index:0,
		rowIndex:1,
		items: [],
		rows:[],
		
		move:function () {
			remove_active();
			this.items = document.getElementsByClassName("episode-row")[this.rowIndex].getElementsByClassName("episode-ctrl");
			this.rows = document.getElementsByClassName("episode-row");

			this.items[this.index].classList.add("active");
		},

		right:function () {
			// debugger
			if(this.index < this.items.length-1){
				if(this.rowIndex === 1){
					if(this.index > 2 && this.index < this.items.length - 4){
						blockScroll(document.querySelector(".episode-block"),1,"rem",13.8,"X");
					}
				}
				this.index++;
				this.move();
			}
		},

		left:function () {
			if(this.index > 0){
				if(this.rowIndex === 1){
					if(this.index < this.items.length - 3 && this.index > 3){
						blockScroll(document.querySelector(".episode-block"),-1,"rem",13.8,"X");
					}
				}
				this.index--;
				this.move();
			}else{
				controls.set_current("movieInfo");
				controls.movieInfo.move();
			}
		},

		up:function () {
			// debugger
			if(this.rowIndex > 0){
				episodeArr[this.rowIndex] = this.index;
				this.rowIndex--;
				this.index = episodeArr[this.rowIndex]
				this.move();
			}
		},

		down:function () {
			if(this.rowIndex < this.rows.length-1){
				episodeArr[this.rowIndex] = this.index;
				this.rowIndex++;
				this.index = episodeArr[this.rowIndex]
				this.move();
			}
		}
	},

	moviesSearch:{
		index:0,
		rowIndex:0,
		move:function () {
			remove_active();
			this.items = document.getElementsByClassName("movie-search-row")[this.rowIndex].getElementsByClassName("m-i");
			// this.rows = document.getElementsByClassName("episode-row");

			this.items[this.index].classList.add("active");
		},
	}
}


