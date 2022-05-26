//import "core-js/stable";
window.onload = function () {
  // Navigation
  var navBar = document.querySelector(".nav");
  var navBarUnderline = document.querySelectorAll(".nav__underline");
  var navCurrentPage = document.querySelector("#currentPage");
  var ipadNavBar = document.querySelector(".nav__hamburger-container");
  var ipadMenu = document.querySelector(".nav__bar");
  var ipadNavBarHam = document.querySelector(".nav__hamburger");
  var ipadNavBackground = document.querySelector(".nav__phone-background");
  var navNotAtTop = false;

  // Header image animation
  var header = document.querySelector(".header__background");
  var windowScroll;
  var moveHeaderImage = true;

  // Align section vertically when scrolled into view
  var align = "center";

  // Scroll delay after link is clicked in navigation bar
  var scrollDelay = 0;

  // Scroll behavior depending on screen width
  var scrollBehavior = function () {
    if (window.innerWidth <= 1400) {
      scrollDelay = 550;
    } else {
      scrollDelay = 0;
      align = "center";
    }

    if (window.innerWidth <= 810) {
      moveHeaderImage = false;
      align = "start";
      scrollDelay = 550;
    }
  };
  scrollBehavior();

  window.addEventListener("resize", function () {
    requestAnimationFrame(scrollBehavior);
  });

  var navOpenClose = function () {
    ipadNavBar.classList.toggle("nav__hamburger-container--active");
    ipadNavBarHam.classList.toggle("nav__hamburger--active");
    ipadMenu.classList.toggle("nav__bar--active");
    ipadNavBackground.classList.toggle("nav__phone-background--active");
    document.body.classList.remove("overflow-hidden");
  };

  document.addEventListener("scroll", function (e) {
    windowScroll = window.scrollY;
    if (windowScroll < 3 * header.offsetHeight && moveHeaderImage) {
      // Move heading background image
      header.style.top = -windowScroll / 2 + "px";
    }
    if (!navNotAtTop && windowScroll > 0) {
      navBar.classList.add("nav--scrolled");
      navNotAtTop = true;
    }

    if (windowScroll <= 0) {
      navBar.classList.remove("nav--scrolled");
      navNotAtTop = false;
    }

    if (windowScroll > 500) {
      navBar.classList.add("nav--hide");
    } else {
      navBar.classList.remove("nav--hide");
    }
  });

  // first loaded
  navBarUnderline[navCurrentPage.firstElementChild.dataset.menu].classList.add(
    "show"
  );

  ipadNavBar.addEventListener("click", function () {
    navOpenClose();
  });

  // Mouse over navigation menu
  navBar.addEventListener("mouseover", function (e) {
    var currentMenu = e.target.closest("li");

    if (!currentMenu || currentMenu.firstElementChild.dataset.menu === "Logo")
      return;
    navBarUnderline.forEach((el) => el.classList.remove("show"));
    currentMenu.lastElementChild.classList.add("show");
  });

  // Mouse leave navigtion menu or move over anthor page link
  navBar.addEventListener("mouseleave", function (e) {
    navBarUnderline.forEach((el) => el.classList.remove("show"));
    navBarUnderline[
      navCurrentPage.firstElementChild.dataset.menu
    ].classList.add("show");
  });

  // Scoll to the page section link on in the navigation bar
  navBar.addEventListener("click", function (e) {
    e.preventDefault();

    var currentMenu = e.target;
    currentMenu = currentMenu.closest("a");

    if (
      !currentMenu ||
      currentMenu.parentElement.firstElementChild.dataset.menu === "Logo"
    )
      return;

    var scrollToSection = document.querySelector(
      currentMenu.getAttribute("href")
    );

    // If there is a scollDelay of 550, then it is in phone mode so
    // The navigation menu must be closed first
    if (scrollDelay === 550) navOpenClose();
    setTimeout(function () {
      scrollToSection.scrollIntoView({ behavior: "smooth", block: align });
    }, scrollDelay);
  });
};
