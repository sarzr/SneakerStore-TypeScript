import { getSneakerItems } from "../../apis/services/sneaker.service";
import { errorHandler } from "../libs/error-handler";
import { IErrorHandler, ISneakerList } from "../types/main";

const sneakerName = document.getElementById(
  "sneaker-name"
) as HTMLHeadingElement;
const image = document.getElementById("image") as HTMLDivElement;
const sneakerPrice = document.getElementById(
  "sneaker-price"
) as HTMLHeadingElement;
const sneakerColors = document.getElementById(
  "sneaker-colors"
) as HTMLDivElement;
const sneakerSizes = document.getElementById("sneaker-sizes") as HTMLDivElement;
const count = document.getElementById("count") as HTMLSpanElement;
const add = document.querySelector(".fa-plus") as HTMLElement;
const remove = document.querySelector(".fa-minus") as HTMLElement;
let sneakerCount: number = 0;
let basePrice: number = 0;

// view more and less text
const text = document.getElementById("text") as HTMLParagraphElement;
const toggle = document.getElementById("toggle") as HTMLParagraphElement;
const allText: string = text.innerText;
const partOfText: string = allText.slice(0, 30);

text.innerText = partOfText;

toggle.addEventListener("click", () => {
  if (toggle.innerText === "view more") {
    text.innerText = allText;
    toggle.innerText = "view less";
  } else {
    text.innerText = partOfText;
    toggle.innerText = "view more";
  }
});

//add sneaker and calculate the price
add.addEventListener("click", () => {
  sneakerCount++;
  count.innerText = sneakerCount.toString();
  updatePrice();
});
remove.addEventListener("click", () => {
  if (sneakerCount > 0) {
    sneakerCount--;
    count.innerText = sneakerCount.toString();
    updatePrice();
  }
});

function updatePrice(): void {
  const totalPrice: number = basePrice * sneakerCount;
  sneakerPrice.innerText = `$${totalPrice}.00`;
}

async function getSneaker(sneakerId: string): Promise<void> {
  try {
    const sneaker: ISneakerList = await getSneakerItems(sneakerId);

    if (sneaker && sneaker.id === parseInt(sneakerId)) {
      sneakerName.innerText = sneaker.name;
      image.innerHTML = `<img src="${sneaker.imageURL}" alt="sneaker-image" />`;
      sneakerPrice.innerText = `$${sneaker.price}.00`;

      basePrice = sneaker.price;

      const colors: string[] = sneaker.colors.split("|");

      sneakerColors.innerHTML = colors
        .map(
          (color: string) => `
        <div class="sneaker-color py-[11px] px-[16px] rounded-full w-[40px] h-[40px] flex justify-center items-center bg-[${color}]"></div>
      `
        )
        .join("");

      const colorEl: NodeListOf<HTMLDivElement> =
        document.querySelectorAll(".sneaker-color");

      colorEl.forEach((color: HTMLDivElement) => {
        color.addEventListener("click", () => {
          colorEl.forEach((el: HTMLDivElement) => {
            el.innerHTML = "";
          });

          const whiteBack: boolean = color.classList.contains("bg-[white]");

          const colorChange: string = whiteBack ? "black" : "white";
          color.innerHTML = `<i class="fa-solid fa-check text-[${colorChange}]"></i>`;
        });
      });

      const sizes: string[] = sneaker.sizes.split("|");
      sneakerSizes.innerHTML = sizes
        .map(
          (size: string) => `
        <div class="sneaker-size border-2 border-[#717171] px-[12px] py-[9px] rounded-full">${size}</div>
      `
        )
        .join("");
      const sizeEl: NodeListOf<HTMLDivElement> = document.querySelectorAll(".sneaker-size");

      sizeEl.forEach((size: HTMLDivElement) => {
        size.addEventListener("click", () => {
          sizeEl.forEach((el: HTMLDivElement) =>
            el.classList.remove("bg-[#3f3f3f]", "text-white")
          );
          size.classList.add("bg-[#3f3f3f]", "text-white", "border-[#3f3f3f]");
        });
      });
    }
  } catch (error) {
    errorHandler(error as IErrorHandler);
  }
}

const urlParams: URLSearchParams = new URLSearchParams(window.location.search);
const sneakerId: string | null = urlParams.get("id");

if (sneakerId) {
  getSneaker(sneakerId);
}
