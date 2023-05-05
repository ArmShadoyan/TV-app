var lastIndex = null;
var seriesCategory = [];
var series = [];
var seriesObj;
var seriesI = 0;
var seriesR = 0;
var seriesTransform = 0;
function addRemSeries() {
  if (document.querySelector(".movie-item-active")) {
    document.querySelector(".movie-item-active").classList.remove("movie-item-active");
  }
  document.querySelectorAll(".series-row")[seriesR].querySelectorAll(".series-i")[seriesI].classList.add("movie-item-active");
}
function episodeControls(e) {
  var currentRow = document.querySelectorAll(".series-row")[seriesR];
  var items = currentRow.querySelectorAll(".series-i");
  if (e.key === "ArrowRight") {
    // debugger

    if (seriesI > 2 && seriesI < items.length - 4) {
      if (seriesR === 1) {
        seriesTransform -= 13.8;
        document.querySelector(".episode-block").style.transform = "translate(".concat(seriesTransform, "rem)");
        seriesI++;
        addRemSeries();
      }
    } else if (seriesI < items.length - 1) {
      seriesI++;
      addRemSeries();
    }
  } else if (e.key === "ArrowLeft") {
    if (seriesI < items.length - 3 && seriesI > 3) {
      if (seriesR === 1) {
        seriesTransform += 13.8;
        document.querySelector(".episode-block").style.transform = "translate(".concat(seriesTransform, "rem)");
        seriesI--;
        addRemSeries();
      }
    } else if (seriesI > 0) {
      seriesI--;
      addRemSeries();
    } else {
      currentBlock = "movie-info";
      addRemInfo();
    }
  } else if (e.key === "ArrowDown") {
    // debugger
    if (seriesR < document.querySelectorAll(".series-row").length - 1) {
      seriesR++;
      seriesI = lastIndex;
      addRemSeries();
    }
  } else if (e.key === "ArrowUp") {
    // debugger
    if (seriesR > 0) {
      // debugger
      lastIndex = seriesI;
      seriesR--;
      if (document.querySelectorAll(".series-row")[seriesR].querySelectorAll(".series-i").length < seriesI) {
        seriesI = document.querySelectorAll(".series-row")[seriesR].querySelectorAll(".series-i").length - 1;
      }
      addRemSeries();
    }
  } else if (e.key === "Enter") {
    document.querySelector(".movie-item-active").click();
  }
}