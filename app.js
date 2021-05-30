const navBtn = document.querySelector(".menu");
const navBar = document.querySelector(".nav-bar");
const headerElement = document.querySelector(".header-row-1");
const heroSection = document.querySelector("header");
const heroBtns = document.querySelectorAll(".hero-btn");
const topBtn = document.querySelector(".top");
const logo = document.querySelector(".logo img");
const logoHeight = logo.style.height;
const navFn = () => {
  navBar.classList.toggle("open");
  if (navBar.classList.contains("open")) {
    navBtn.style.position = "fixed";
    navBtn.style.right = "25px";
    navBtn.name = "close-outline";
  } else {
    navBtn.style.position = "static";
    navBtn.style.right = "25px";
    navBtn.name = "reorder-three-outline";
  }
};

navBtn.addEventListener("click", () => {
  navFn();
});

navBar.addEventListener("click", (e) => {
  e.preventDefault();
  const clicked = e.target;
  const targetId = clicked.getAttribute("href");
  const targetEle = document.querySelector(targetId);
  const targetCoords = targetEle?.getBoundingClientRect();

  if (targetCoords) {
    window.scroll({
      top: targetCoords?.top + window.pageYOffset - headerElement.clientHeight,
      left: targetCoords?.left + window.pageXOffset,
      behavior: "smooth",
    });
  }
  navFn();
});

heroBtns.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(ele.getAttribute("href"));
    const targetCoords = target?.getBoundingClientRect();
    window.scroll({
      top: targetCoords?.top + window.pageYOffset - headerElement.clientHeight,
      left: targetCoords?.left + window.pageXOffset,
      behavior: "smooth",
    });
  });
});

topBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
});

const obsFn = (entries) => {
  entries.forEach((ele) => {
    if (!ele.isIntersecting) {
      headerElement.style.position = "fixed";
      headerElement.style.zIndex = "500";
      headerElement.style.width = "100%";
      headerElement.style.background = "#222";
      logo.style.width = "45px";
      if (heroSection.clientWidth <= 768) {
        headerElement.style.padding = "0.35% 5%";
        heroSection.style.paddingTop = "0";
      }
    } else {
      headerElement.style.position = "static";
      headerElement.style.background = "none";
      logo.style.width = logoHeight;
      if (heroSection.clientWidth <= 768) {
        headerElement.style.padding = "1% 5%";
        heroSection.style.paddingTop = "3%";
      }
    }
  });
};
const obsOption = {
  root: null,
  threshold: 0.2,
};

const observer = new IntersectionObserver(obsFn, obsOption);
observer.observe(heroSection);

const sliderSec = () => {
  const btnLeft = document.querySelector(".slider-btn-left");
  const btnRight = document.querySelector(".slider-btn-right");
  const sliderImages = document.querySelectorAll(".slider-img");
  const slide = document.querySelector(".slide");
  let counter = 1;
  let imgWidth = sliderImages[0].clientWidth;

  const slideFn = (transitionSec, counterNum) => {
    slide.style.transition = transitionSec;
    slide.style.transform = `translateX(${-imgWidth * counterNum}px)`;
  };

  slide.style.transform = `translateX(${-imgWidth * counter}px)`;

  btnRight.addEventListener("click", () => {
    if (counter >= sliderImages.length - 1) return;
    counter++;
    slideFn("0.5s", counter);
  });

  btnLeft.addEventListener("click", () => {
    if (counter <= 0) return;
    counter--;
    slideFn("0.5s", counter);
  });

  slide.addEventListener("transitionend", () => {
    if (sliderImages[counter].id === "last-clone") {
      counter = sliderImages.length - 2;
      slideFn("none", counter);
    }
    if (sliderImages[counter].id === "first-clone") {
      counter = 1;
      slideFn("none", counter);
    }
  });
};
sliderSec();
window.onresize = () => {
  sliderSec();
  if (heroSection.clientWidth >= 768) {
    headerElement.style.padding = "0.35% 5%";
    heroSection.style.paddingTop = "0";
  }
};
