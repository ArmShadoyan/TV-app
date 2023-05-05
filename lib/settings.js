var settingsI = 0;
var timezoneRem = 0;
var settingsMenuOptions = [{
  id: 1,
  name: "Use Xtream Code EPG",
  icon: "/imgs/settingsmenu/format.svg",
  class: "xtream-item",
  label: "1"
}, {
  id: 2,
  name: "Use TMDB API",
  icon: "/imgs/settingsmenu/tmdb.png",
  class: "tmdb-item",
  label: "1"
}, {
  id: 3,
  name: "Remove subtitle background",
  icon: "/imgs/settingsmenu/subtitles.png",
  class: "remove-item",
  label: "1"
}, {
  id: 4,
  name: "Change Language",
  icon: "/imgs/settingsmenu/globus.png",
  class: "change-language-item"
}, {
  id: 5,
  name: "Change Timezone",
  icon: "/imgs/settingsmenu/time.png",
  class: "change-timezone-item"
}, {
  id: 6,
  name: "Change Parental Code",
  icon: "/imgs/settingsmenu/parentalicon.png",
  class: "change-parental-item"
}, {
  id: 7,
  name: "Lock Categories",
  icon: "/imgs/settingsmenu/padlock.png",
  class: "lock-item"
}, {
  id: 8,
  name: "Log out",
  icon: "/imgs/settingsmenu/logout.png",
  class: "logout-item"
}];
var languageOptions = [{
  id: 1,
  name: "English",
  icon: "/imgs/settingsmenu/checked.svg",
  class: "english",
  img: "/imgs/settingsmenu/us.png"
}, {
  id: 2,
  name: "Portugues Brazil",
  icon: "",
  class: "port-braz",
  img: "/imgs/settingsmenu/br.png"
}, {
  id: 3,
  name: "Spanish",
  icon: "",
  class: "spanish",
  img: "/imgs/settingsmenu/es.png"
}];
var timeZoneOptions = ["-12", "-11", "-10", "-9", "-8", "-7", "-6", "-5", "-4", "-3", "-2", "-1", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
var pinKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
function createSettingsElemnts(options) {
  var settingsMenu = document.createElement("div");
  var settingsBlock = document.createElement("div");
  var settingsBlockInner = document.createElement("div");
  var backToMenuDiv = document.createElement("div");
  var backToMenuBtn = document.createElement("div");
  var settingsTitle = document.createElement("div");
  settingsBlock.classList.add("settings-block");
  settingsBlockInner.classList.add("settings-block-inner");
  backToMenuDiv.classList.add("back-to-menu-div");
  backToMenuBtn.classList.add("back-to-menu-btn");
  settingsTitle.classList.add("settings-title");
  settingsMenu.classList.add("settings-menu");
  settingsTitle.textContent = "Settings";
  root.classList.add("settings-root");
  root.append(backToMenuDiv, settingsBlock);
  settingsBlockInner.append(settingsMenu);
  settingsBlock.append(settingsTitle, settingsBlockInner);
  backToMenuDiv.append(backToMenuBtn);
  var _a = options;
  var _f = function (item) {
    var settingsItem = document.createElement("div");
    var icon = document.createElement("div");
    var title = document.createElement("div");
    if (options == settingsMenuOptions || options == languageOptions) {
      settingsItem.classList.add("".concat(item.class));
      settingsItem.classList.add("settings-item");
      icon.classList.add("".concat(item.class, "-icon"), "item-icon");
      title.classList.add("".concat(item.class, "-title"), "item-title");
      title.textContent = "".concat(item.name);
      icon.style.cssText = "\n\t\t\tbackground-image: url(".concat(item.icon, ");\n\t\t\t");
    } else if (options = timeZoneOptions) {
      settingsItem.classList.add("settings-item", "timezone-settings-item");
      title.classList.add("item-title", "timezone-item-title");
      title.textContent = item;
    }
    settingsItem.append(icon, title);
    if (item.label) {
      var label = document.createElement("label");
      var input = document.createElement("input");
      var span = document.createElement("span");
      var childSpan = document.createElement("span");
      childSpan.classList.add("settings-child-span");
      settingsItem.classList.add("label");
      input.type = "checkbox";
      span.append(childSpan);
      label.append(input, span);
      settingsItem.append(label);
      settingsItem.addEventListener("click", function () {
        if (!childSpan.classList.contains("active-check")) {
          childSpan.classList.add("active-check");
        } else {
          childSpan.classList.remove("active-check");
        }
      });
    } else if (item.img) {
      var flag = document.createElement("img");
      flag.src = item.img;
      flag.classList.add("language-flag-img");
      settingsItem.append(flag);
    }
    settingsMenu.append(settingsItem);
  };
  for (var _i = 0; _i < _a.length; _i++) {
    _f(_a[_i], _i, _a);
  }
  undefined;
}
function createSettingsControls(e) {
  var settingsItems = document.querySelectorAll(".settings-item");
  var backBtn = document.querySelector(".back-to-menu-btn");
  if (e.key === "ArrowDown") {
    if (backBtn.classList.contains("active-settings-back")) {
      backBtn.classList.remove("active-settings-back");
      settingsItems[settingsI].classList.add("active-settings-item");
    } else {
      settingsI++;
      if (settingsI > settingsItems.length - 1) {
        settingsI = 0;
        document.querySelector(".settings-menu").style.transform = "translateY(0)";
        timezoneRem = 0;
      }
      addRemSettings();
    }
    if (document.querySelector(".settings-title").textContent === "Select Timezone") {
      var timeZoneItems = document.querySelectorAll(".timezone-settings-item");
      if (settingsI >= 4 && settingsI < timeZoneItems.length - 5) {
        timezoneRem -= 10;
        document.querySelector(".settings-menu").style.transform = "translateY(".concat(timezoneRem, "rem)");
      }
    }
  } else if (e.key === "ArrowUp") {
    if (settingsI === 0) {
      backBtn.classList.add("active-settings-back");
      settingsItems[settingsI].classList.remove("active-settings-item");
    } else {
      settingsI--;
      addRemSettings();
    }
    if (document.querySelector(".settings-title").textContent === "Select Timezone") {
      var timeZoneItems = document.querySelectorAll(".timezone-settings-item");
      if (settingsI >= 3 && settingsI < timeZoneItems.length - 5) {
        console.log(settingsI);
        timezoneRem += 10;
        document.querySelector(".settings-menu").style.transform = "translateY(".concat(timezoneRem, "rem)");
      }
    }
  } else if (e.key === "ArrowLeft" && !backBtn.classList.contains("active-settings-back")) {
    backBtn.classList.add("active-settings-back");
    settingsItems[settingsI].classList.remove("active-settings-item");
    settingsI = 0;
  } else if (e.key === "Enter") {
    var activeItem = document.querySelector(".active-settings-item");
    if (document.querySelector(".active-settings-item")) {
      if (document.querySelector(".active-settings-item").querySelector(".settings-child-span")) {
        var checkspan = document.querySelector(".active-settings-item").querySelector(".settings-child-span");
        if (checkspan) {
          if (!checkspan.classList.contains("active-check")) {
            checkspan.classList.add("active-check");
          } else {
            checkspan.classList.remove("active-check");
          }
        }
      }
    }
    if (backBtn.classList.contains("active-settings-back")) {
      if (document.querySelector(".settings-title").textContent === "Settings") {
        backBtn.classList.remove("active-settings-back");
        menuRender();
        root.classList.remove("settings-root");
      } else if (document.querySelector(".settings-title").textContent === "Languages") {
        backBtn.classList.remove("active-settings-back");
        settingsRender();
      } else if (document.querySelector(".settings-title").textContent === "Select Timezone") {
        backBtn.classList.remove("active-settings-back");
        settingsRender();
      }
    } else if (activeItem.lastElementChild.textContent === "Change Language") {
      languageRender();
    } else if (activeItem.lastElementChild.textContent === "Change Timezone") {
      timeZoneRender();
    } else if (activeItem.lastElementChild.textContent === "Change Parental Code") {
      parentalCodeRender();
    } else if (activeItem.lastElementChild.textContent === "Lock Categories") {
      lockCategoriesRender();
    } else if (activeItem.lastElementChild.textContent === "Log out") {
      root.innerHTML = "";
      build_Login_BLock();
      currentPage = "login";
      currentBlock = "login";
    }
  }
}
function settingsOnclick() {
  var backBtn = document.querySelector(".back-to-menu-btn");
  backBtn.addEventListener("click", function () {
    menuRender();
  });
  var settingsItem = document.querySelectorAll(".settings-item");
  var _a2 = settingsItem;
  var _f2 = function (item) {
    if (!item.classList.contains("label")) {
      item.addEventListener("click", function () {
        if (item.textContent === "Change Language") {
          languageRender();
          backToSettings();
        } else if (item.textContent === "Change Timezone") {
          timeZoneRender();
          backToSettings();
        } else if (item.textContent === "Change Parental Code") {
          parentalCodeRender();
          parentalCodeOnclick();
          backToSettings();
        } else if (item.textContent === "Lock Categories") {
          lockCategoriesRender();
          parentalCodeOnclick();
          backToSettings();
        } else if (item.textContent === "Log out") {
          root.innerHTML = "";
          build_Login_BLock();
          currentPage = "login";
          currentBlock = "login";
        }
      });
    }
  };
  for (var _i2 = 0; _i2 < _a2.length; _i2++) {
    _f2(_a2[_i2], _i2, _a2);
  }
  undefined;
}
function backToSettings() {
  var backBtn = document.querySelector(".back-to-menu-btn");
  backBtn.addEventListener("click", function () {
    settingsRender();
  });
}
function addRemSettings() {
  if (document.querySelector(".active-settings-item")) {
    document.querySelector(".active-settings-item").classList.remove("active-settings-item");
  }
  document.querySelectorAll(".settings-item")[settingsI].classList.add("active-settings-item");
}
function settingsRender() {
  root.innerHTML = "";
  currentBlock = "settings";
  createSettingsElemnts(settingsMenuOptions);
  addRemSettings();
  settingsOnclick();
}
function languageRender() {
  root.innerHTML = "";
  createSettingsElemnts(languageOptions);
  document.querySelector(".settings-title").textContent = "Languages";
  settingsI = 0;
  addRemSettings();
}
function timeZoneRender() {
  root.innerHTML = "";
  createSettingsElemnts(timeZoneOptions);
  document.querySelector(".settings-title").textContent = "Select Timezone";
  settingsI = 0;
  addRemSettings();
}