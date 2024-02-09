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

// initial value for storage

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

// connections

const closeBtn = document.querySelector("#close");
const saveBtn = document.querySelector("#save");
saveBtn.addEventListener("click", createProduct);
const titleInp = document.querySelector("#title");
const priceInp = document.querySelector("#price");
const imageInp = document.querySelector("#image");
const editBtn = document.querySelector("#edit");
const triggerAdd = document.querySelector("#add");
const modalTitle = document.querySelector(".modal-title");
const searchInp = document.querySelector("#search-inp");

triggerAdd.addEventListener("click", () => {
  titleInp.value = "";
  priceInp.value = "";
  imageInp.value = "";
  editBtn.style.display = "none";
  saveBtn.style.display = "block";
  modalTitle.innerText = "Add product";
});

// create

function createProduct() {
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
// read

function render(data = getProductsFromLocalStorage()) {
  const container = document.querySelector(".container");
  container.innerHTML = "";
  data.forEach((item, index) => {
    container.innerHTML += `
        <div class="card" style="width: 18rem;" id=${index}>
  <img src=${item.image} class="card-img-top h-50 object-fit-contain" alt="...">
  <div class="card-body">
    <h5 class="card-title">${item.title}</h5>
    <p class="card-text"><b>Price:</b> ${item.price}$</p>
    <a  id=${index} class="btn btn-danger delete-btn">Delete</a>
     <a id=${index}  class="btn btn-success edit-btn" data-bs-toggle="modal"
          data-bs-target="#exampleModal">Edit</a>
  </div>
</div>
    `;
  });
}
render();

// update

let id = null;

function getOneProductById(id) {
  const productObj = getProductsFromLocalStorage()[id];
  return productObj;
}

document.addEventListener("click", (e) => {
  if (e.target.className.includes("edit-btn")) {
    const foundObj = getOneProductById(e.target.id);
    console.log(foundObj);
    titleInp.value = foundObj.title;
    priceInp.value = foundObj.price;
    imageInp.value = foundObj.image;
    id = e.target.id;
    saveBtn.style.display = "none";
    editBtn.style.display = "block";
    modalTitle.innerText = "Edit product";
  }
});

editBtn.addEventListener("click", () => {
  const editedObj = {
    title: titleInp.value,
    price: priceInp.value,
    image: imageInp.value,
  };
  const products = getProductsFromLocalStorage();
  products.splice(id, 1, editedObj);
  setProductsToLocalStorage(products);
  render();
  closeBtn.click();
});

// delete
document.addEventListener("click", (e) => {
  if (e.target.className.includes("delete-btn")) {
    let conf = confirm("Are you sure?");
    if (conf) {
      const products = getProductsFromLocalStorage();
      products.splice(e.target.id, 1);
      setProductsToLocalStorage(products);
      render();
    } else {
      closeBtn.click();
    }
  }
});

let arr = ["Jack", "John", "Jessica"];
// console.log(arr.findIndex((item) => item === "Jessica"));
console.log(arr.indexOf("Jessica"));

// search
searchInp.addEventListener("input", (e) => {
  let products = getProductsFromLocalStorage();
  products = products.filter(
    (item) =>
      item.title.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
  );
  render(products);
});
