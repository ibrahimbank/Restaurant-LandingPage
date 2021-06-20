const header = document.querySelector(".header");
const navItems = document.querySelector(".nav_item");
const navLinks = document.querySelector(".nav_links");
const logo = document.querySelector(".logo");
const nav = document.querySelector(".nav");
const headerTitle = document.querySelector(".header_title");
const headerHeader = document.querySelector(".header_header");
const hamburger = document.querySelector(".hamburger");
const hamBtn = document.querySelector(".hamburger__btn");

let show = false;

const toggle = function () {
  if (!show) {
    hamBtn.classList.add("open");
    navLinks.classList.add("active");

    show = true;
  } else {
    hamBtn.classList.remove("open");
    navLinks.classList.remove("active");

    show = false;
  }
};

hamburger.addEventListener("click", toggle);

const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("fixed");
  else nav.classList.remove("fixed");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

const slider = function () {
  const slides = document.querySelectorAll(".testimony");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;
  //FUNCTIONS
  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  //next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);

    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
      goToSlide(curSlide);

      activateDot(curSlide);
    }
  };

  //INITIALIZING THE FUNCTIONS
  const init = function () {
    createDots();

    goToSlide(0);

    activateDot(curSlide);
  };

  init();

  //EVENT HANDLERS
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    console.log(e);
    e.key === "ArrowLeft" && prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      console.log("not");
      const { slide } = e.target.dataset;
      goToSlide(slide);

      activateDot(slide);
    }
  });
};
slider();
