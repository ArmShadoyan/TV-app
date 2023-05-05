function playerBlockRender(data){
    var playerContainer = document.createElement("div");
    var playerBlock = document.createElement("div");
    var video = document.createElement("video");
    var progresSection = document.createElement("div")
    var progresBlock = document.createElement("div");
    var time = document.createElement("div");
    var progres = document.createElement("div");
    var progresInner = document.createElement("div");
    var progresBtn = document.createElement("div");
    var duration = document.createElement("div");
    var settingsButton = document.createElement("div");

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