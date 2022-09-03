const store = [];

const item = document.getElementById("item");
const price = document.getElementById("price");
const quantity = document.getElementById("quantity");
const total = document.getElementById("total");
const no_of_items = document.getElementById("no._of_items");
const totalPrice = document.getElementById("totalPrice");
const form = document.getElementById("form");
const addTocart = document.querySelector(".add-to-cart");

var total_price = 0;
var count = 0;

const items = document.getElementById("items");

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://54.224.116.121:3000/products")
    .then((data) => {
      console.log(data);
      if (data.data.length != 0) {
        data.data.forEach((item) => {
          const div = document.createElement("div");
          div.innerHTML = `<div class="album album-4" id="album-4">
          <h5>${item.title}</h5>
          <img src="${item.imageUrl}" alt="Album 4">
          <div class="price-cart">
              <p class="price">$${item.price}</p>
  
              <form action="http://54.224.116.121:3000/cart/${item.id}" method="POST">
              
              <button class="add-to-cart"  onclick="notification(${item.id})" type="submit" id="${item.id}"> Add to Cart </button></form>
          </div>
          </div>`;

          items.appendChild(div);
        });
      } else {
        throw new Error(data.response.message);
      }
    })
    .catch((err) => {
      console.log(err, "jjj");
    });

  // axios.get("http://localhost:2000/cart").then((data) => {
  //   data.data.forEach((item) => {
  //     if (item) {
  //       console.log(item.cartItem.quantity, "quantity of product");
  //       const div = document.createElement("div");

  //       const image = document.createElement("img");
  //       image.setAttribute("src", item.imageUrl);

  //       const h3 = document.createElement("h3");
  //       h3.innerHTML = item.title;

  //       const p = document.createElement("p");
  //       p.innerHTML = item.price;

  //       const a = item.price;

  //       total_price += a;
  //       total.innerHTML = `$${total_price}`;
  //       console.log(total_price);

  //       div.appendChild(image);
  //       div.appendChild(h3);
  //       div.appendChild(p);

  //       count++;
  //       no_of_items.innerHTML = count;
  //       form.action = `http://localhost:2000/checkout`;
  //       totalPrice.value = total_price;
  //       quantity.appendChild(div);

  //       call();
  //     } else {
  //       console.log("nth to show");
  //     }
  //   });
  // });
});

function notification(id) {
  const notify = document.getElementById("notification");
  notify.style.setProperty("display", "none");
}

function showCart() {
  const show = document.querySelector(".cart-section");
  show.style.setProperty("display", "block");
}

function closeCart() {
  const show = document.querySelector(".cart-section");
  show.style.setProperty("display", "none");
}

// image-carousel
function call() {
  const carouselImages = document.querySelector(".carousel__images");
  const images = document.querySelectorAll(".carousel__images img");
  const carouselButtons = document.querySelectorAll(".carousel__button");
  const numberOfImages = document.querySelectorAll(
    ".carousel__images img"
  ).length;
  let imageIndex = 1;
  let translateX = 0;

  carouselButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      if (event.target.id === "previous") {
        if (imageIndex !== 1) {
          imageIndex--;
          translateX += 300;
        }
      } else {
        if (imageIndex !== numberOfImages) {
          imageIndex++;
          translateX -= 300;
        }
      }

      carouselImages.style.transform = `translateX(${translateX}px)`;
      images.forEach((image, index) => {
        if (index === imageIndex - 1) {
          image.classList.add("active");
        } else {
          image.classList.remove("active");
        }
      });
    });
  });
}
call();
