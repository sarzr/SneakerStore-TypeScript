import {
  // getSneakerBrands,
  getSneakers,
} from "../../apis/services/sneaker.service";
import { getUser } from "../../apis/services/user.service";
import { errorHandler } from "../libs/error-handler";
import debounce from "lodash.debounce";
// import { removeSessionToken } from "../libs/session-manager";
import {
  IErrorHandler,
  IGetSneaker,
  IGetUser,
  ISneakerList,
  ISneakerResponse,
} from "../types/main";

const productsEl: HTMLDivElement = document.getElementById(
  "products"
) as HTMLDivElement;
const productBrands = document.getElementById(
  "products-brand"
) as HTMLDivElement;
const username = document.getElementById("username") as HTMLHeadingElement;
const greeting = document.getElementById("greeting") as HTMLSpanElement;
const pages = document.getElementById("page") as HTMLSpanElement;
const searchInput = document.getElementById("searchInput") as HTMLInputElement;
const paginations = document.getElementById("paginations") as HTMLDivElement;
const bottomEls = document.getElementById("bottomEls") as HTMLDivElement;
const theMost = document.getElementById("theMost") as HTMLDivElement;
const notFoundEl = document.getElementById("notFoundEl") as HTMLDivElement;
const scrollBar = document.querySelector(".scrollBar") as HTMLDivElement;
// const logOut = document.getElementById("logOut");
let totalPages: number;
let curPage = 1;
let selectedBrand: null = null;
let currentSearchValue: string = "";

async function get(): Promise<void> {
  try {
    const user: IGetUser = await getUser();
    // console.log(user);
    username.innerText = user.username;
  } catch (error) {
    errorHandler(error as IErrorHandler);
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

async function getProducts(
  brand: string | null = selectedBrand,
  page: number = 1,
  search: string = currentSearchValue
) {
  try {
    const params: IGetSneaker = { page, limit: 10, search };
    if (brand) {
      params.brands = brand;
    }

    const sneakersResponse: ISneakerResponse = await getSneakers(params);
    const sneakers: ISneakerList[] = sneakersResponse.data;
    // console.log(sneakers);

    totalPages = sneakersResponse.totalPages;

    productsEl.innerHTML = "";

    if (sneakers.length === 0) {
      notFoundSneaker(search);
    } else {
      sneakers.forEach((sneaker: ISneakerList) => {
        const product: HTMLDivElement = document.createElement("div");
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
    errorHandler(error as IErrorHandler);
  }
}

getProducts();

function renderSneakers(sneaker: ISneakerList) {
  return `
    <img class="bg-[#F3F3F3] w-[182px] h-[182px] rounded-3xl" 
         src="${sneaker.imageURL}" 
         alt="${sneaker.name}" />
    <div class="mt-3">
      <h3 class="text-[20px] font-bold text-[#152536] font-Inter truncate">
        ${sneaker.name}
      </h3>
      <p class="text-[16px] font-semibold text-[#152536] font-Inter">
        $ ${sneaker.price}
      </p>
    </div>
  `;
}

function notFoundSneaker(searchValue: string) {
  const notFound: HTMLDivElement = document.createElement("div");
  notFound.innerHTML = `
    <div class="flex justify-between items-baseline mt-6">
      <h2 class="font-bold text-[20px]">Results for "${searchValue}"</h2>
      <span class="font-bold text-[16px]">0 found</span>
    </div>
    <div class="flex flex-col items-center text-center font-Inter mt-12">
      <img src="./public/assets/images/1.png" alt="" />
      <h1 class="font-bold text-[25px] mt-2">Not Found</h1>
      <p class="text-[18px] mt-4">
        Sorry, the keyword you entered cannot be found, please check again or
        search with another keyword.
      </p>
    </div>
  `;
  notFoundEl.innerHTML = "";
  notFoundEl.append(notFound);
  elementStyles(false);
}

function elementStyles(show: boolean) {
  const display: string = show ? "flex" : "none";
  paginations.style.display = display;
  bottomEls.style.display = display;
  productsEl.style.display = show ? "grid" : "none";
  productBrands.style.display = display;
  theMost.style.display = display;
  scrollBar.style.display = show ? "block" : "none";
  notFoundEl.style.display = show ? "none" : "block";
}

function searching(searchValue: string) {
  curPage = 1;
  getProducts(selectedBrand, curPage, searchValue);
  pagination(curPage, totalPages);
}

searchInput.addEventListener(
  "keyup",
  debounce((event) => {
    const searchValue: string = event.target.value.trim();
    currentSearchValue = searchValue;
    searching(searchValue);
  }, 3000)
);

function pagination(page: number, totalPages: number) {
  pages.innerHTML = "";

  const startPage: number = 1;

  for (let i = startPage; i <= totalPages; i++) {
    const pageSpan: HTMLSpanElement = document.createElement("span");
    pageSpan.innerText = i.toString();
    pageSpan.className = `px-3 py-1 rounded-md ${
      i === page ? "bg-black text-white active" : "bg-gray-200"
    }`;
    pageSpan.addEventListener("click", () => changePage(i));
    pages.append(pageSpan);
  }
}
function changePage(page: number) {
  curPage = page;
  getProducts(selectedBrand, curPage, currentSearchValue);
}
