// ? localStorage
// localStorage.setItem("name", "Egor");
// // localStorage.setItem("lunch", "sandwich");

// localStorage.setItem("users", "[{name: 'Andrey', age: 15}]");

// // console.log(localStorage.getItem("users"));

// const users = [{ name: "Egor", age: 15 }];

// localStorage.setItem("users", JSON.stringify(users));
// // localStorage.removeItem("users");
// // localStorage.clear();
// const test = JSON.parse(localStorage.getItem("users"));

//? mini-project

function initStorage() {
  if (!localStorage.getItem("products-data")) {
    localStorage.setItem("products-data", "[]");
  }
}

initStorage();

function getProductsFromLocalStorage() {
  const products = JSON.parse(localStorage.getItem("products-data"));
  return products;
}

function setProductsToLocalStorage(products) {
  localStorage.setItem("products-data", JSON.stringify(products));
}

const res = getProductsFromLocalStorage();
console.log(res);

const closeBtn = document.querySelector("#close");
const saveBtn = document.querySelector("#save");
saveBtn.addEventListener("click", createProduct);

function createProduct() {
  const titleInp = document.querySelector("#title");
  const priceInp = document.querySelector("#price");
  const imageInp = document.querySelector("#image");

  if (
    !titleInp.value.trim() ||
    !priceInp.value.trim() ||
    !imageInp.value.trim()
  ) {
    alert("some inputs are empty!");
    return;
  }

  const productObj = {
    title: titleInp.value,
    price: priceInp.value,
    image: imageInp.value,
  };

  let products = getProductsFromLocalStorage();
  products.push(productObj);
  setProductsToLocalStorage(products);

  titleInp.value = "";
  priceInp.value = "";
  imageInp.value = "";

  render();

  closeBtn.click();
}

function render(data = getProductsFromLocalStorage()) {
  const container = document.querySelector(".container");
  container.innerHTML = "";
  data.forEach((item, index) => {
    container.innerHTML += `
        <div class="card" style="width: 18rem;" id=${index}>
  <img src=${item.image} class="card-img-top h-50" alt="...">
  <div class="card-body">
    <h5 class="card-title">${item.title}</h5>
    <p class="card-text"><b>Price:</b> ${item.price}</p>
    <a href="#" class="btn btn-danger">Delete</a>
     <a id=${index} href="#" class="btn btn-success edit-btn" data-bs-toggle="modal"
          data-bs-target="#exampleModal">Edit</a>
  </div>
</div>
    `;
  });
}
render();

function getOneProductById(id) {
  const productObj = getProductsFromLocalStorage()[id];
  return productObj;
}

document.addEventListener("click", (e) => {
  console.log(e.target);
});
