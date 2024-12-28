// variables
const headerTop = document.querySelector(".header-top");
const toggleMenuLink = headerTop.querySelector(".toggle-menu");
const menuWrapper = document.querySelector(".menu-wrapper");
const headerTopColor = "rgba(0, 47, 77, .3)";
const menuWrapperColor = "rgba(0, 47, 77, .25)";

// toggle menu
toggleMenuLink.addEventListener("click", function () {
  headerTop.classList.toggle("open-menu");
});

// fullpage customization
new fullpage("#fullpage", {
  licenseKey: "gplv3-license",
  sectionsColor: ["#B8AE9C", "#348899", "#F2AE72", "#5C832F", "#B8B89F"],
  sectionSelector: ".vertical-scrolling",
  slideSelector: ".horizontal-scrolling",
  navigation: true,
  slidesNavigation: true,
  scrollOverflow: false,
  credits: {
    enabled: false,
    label: "Made with fullPage.js",
    position: "right",
  },
  controlArrows: false,
  anchors: [
    "firstSection",
    "secondSection",
    "thirdSection",
    "fourthSection",
    "fifthSection",
  ],
  menu: ".menu",

  afterLoad: function (origin, destination, direction, trigger) {
    headerTop.style.background = headerTopColor;
    menuWrapper.style.background = menuWrapperColor;
    if (destination.index == 4) {
      document.getElementById("fp-nav").style.display = "none";
    }
  },

  onLeave: function (origin, destination, direction, trigger) {
    if (origin.index == 4) {
      document.getElementById("fp-nav").style.display = "block";
    }
  },

  afterSlideLoad: function (section, origin, destination, direction, trigger) {
    console.log(origin.index, destination.index);
    if (section.anchor == "fifthSection" && destination.index == 1) {
      fullpage_api.setAllowScrolling(false, "up");
      fullpage_api.setKeyboardScrolling(false, "up");
      headerTop.style.background = "transparent";
      menuWrapper.style.background = "transparent";
      const activeSlide = section.item.querySelector(".fp-slide.active");
      activeSlide.style.background = "#374140";
      activeSlide.querySelector("h2").style.color = "white";
      activeSlide.querySelector("h3").style.color = "white";
      activeSlide.querySelector("p").style.cssText = `
        color: #DC3522;
        opacity: 1;
        transform: translateY(0);
      `;
    }
  },

  onSlideLeave: function (section, origin, destination, direction, trigger) {
    if (section.anchor == "fifthSection" && origin.index == 1) {
      fullpage_api.setAllowScrolling(true, "up");
      fullpage_api.setKeyboardScrolling(true, "up");
      headerTop.style.background = headerTopColor;
      menuWrapper.style.background = menuWrapperColor;
    }
  },
});
