function playerBlockRender(data){
    let playerContainer = document.createElement("div");
    let playerBlock = document.createElement("div");
    let video = document.createElement("video");
    let progresSection = document.createElement("div")
    let progresBlock = document.createElement("div");
    let time = document.createElement("div");
    let progres = document.createElement("div");
    let progresInner = document.createElement("div");
    let progresBtn = document.createElement("div");
    let duration = document.createElement("div");
    let settingsButton = document.createElement("div");

    playerContainer.classList.add("player-container");
    playerBlock.classList.add("player-block");
    video.classList.add("video");
    debugger
    video.src = `https://xtream-ie.com/movie/MYOWN1/Meins321/${data.movie_data.stream_id}.${data.movie_data.container_extension}`
    video.autoplay = "true";
    progresSection.classList.add("player-progres-section")
    progresBlock.classList.add("player-progres-block");
    time.classList.add("player-time");
    time.textContent = "-- : --";
    progres.classList.add("player-progres");
    progresInner.classList.add("player-progres-inner")
    progresBtn.classList.add("player-progres-btn")
    duration.classList.add("player-duration");
    duration.textContent = `${data.info.duration}`
    settingsButton.classList.add("player-settings-button");

    playerContainer.append(playerBlock,settingsButton);
    playerBlock.append(video,progresSection);
    progresSection.append(time,progresBlock,duration)
    progresBlock.append(progres);
    progres.append(progresInner)
    progresInner.append(progresBtn)
    root.append(playerContainer);
}