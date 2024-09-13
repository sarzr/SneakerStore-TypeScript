import Swiper, { Swiper as SwiperInstance } from "swiper";

import { Pagination } from "swiper/modules";

Swiper.use([Pagination]);

const swiper: SwiperInstance = new Swiper(".swiper", {
  direction: "horizontal",
  loop: false,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const nextBtn: HTMLAnchorElement = document.getElementById("Next") as HTMLAnchorElement;

const updateBtnText = (): void => {
  if (swiper.isEnd) {
    nextBtn.innerText = "Get Started";
    nextBtn.href = "./login";
  } else {
    nextBtn.innerText = "Next";
    nextBtn.href = "#";
  }
};

swiper.on("slideChange", updateBtnText);

const btnClicked = (): void => {
  if (swiper.isEnd) {
    window.location.href = nextBtn.href;
  } else {
    swiper.slideNext();
  }
};

nextBtn.addEventListener("click", btnClicked);

updateBtnText();
