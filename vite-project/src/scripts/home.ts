// import {
//   getSneakerBrands,
//   getSneakers,
// } from "../../apis/services/sneaker.service";
import { getUser } from "../../apis/services/user.service";
import { errorHandler } from "../libs/error-handler";
// import debounce from "lodash.debounce";
// import { removeSessionToken } from "../libs/session-manager";

// const productsEl = document.getElementById("products");
// const productBrands = document.getElementById("products-brand");
const username = document.getElementById("username") as HTMLHeadingElement;
const greeting = document.getElementById("greeting") as HTMLSpanElement;
// const pages = document.getElementById("page");
// const searchInput = document.getElementById("searchInput");
// const paginations = document.getElementById("paginations");
// const bottomEls = document.getElementById("bottomEls");
// const theMost = document.getElementById("theMost");
// const notFoundEl = document.getElementById("notFoundEl");
// const scrollBar = document.querySelector(".scrollBar");
// const logOut = document.getElementById("logOut");
let totalPages: number;
// let curPage = 1;
let selectedBrand: null = null;
let currentSearchValue: string = "";

async function get(): Promise<void> {
  try {
    const user: IGetUser = await getUser();
    // console.log(user);
    username.innerText = user.username;
  } catch (error) {
    errorHandler(error);
  }
}
get();

function updateGreeting(): void {
  const hour: number = new Date().getHours();

  let greetingTxt: string;

  if (hour >= 6 && hour < 12) {
    greetingTxt = "Good Morning 👋";
  } else if (hour >= 12 && hour < 17) {
    greetingTxt = "Good Afternoon 👋";
  } else if (hour >= 17 && hour < 20) {
    greetingTxt = "Good Evening 👋";
  } else {
    greetingTxt = "Good Night 👋";
  }
  greeting.innerText = greetingTxt;
}
updateGreeting();

interface IGetSneaker {
  brand: null;
  page: number;
  search: string;
  brand?: string;
}

async function getProducts(
  brand: null = selectedBrand,
  page: number = 1,
  search: string = currentSearchValue
) {
  try {
    const params = { page, limit: 10, search };
    if (brand) {
      params.brands = brand;
    }

    const sneakersResponse = await getSneakers(params);
    const sneakers = sneakersResponse.data;
    console.log(sneakers);

    totalPages = sneakersResponse.totalPages;

    productsEl.innerHTML = "";

    if (sneakers.length === 0) {
      notFoundSneaker(search);
    } else {
      sneakers.forEach((sneaker) => {
        const product = document.createElement("div");
        product.innerHTML = renderSneakers(sneaker);
        product.addEventListener("click", () => {
          window.location.href = `/sneakerItem.html?id=${sneaker.id}`;
        });
        productsEl.append(product);
      });
      pagination(page, totalPages);
      elementStyles(true);
    }
  } catch (error) {
    errorHandler(error);
  }
}

getProducts();
