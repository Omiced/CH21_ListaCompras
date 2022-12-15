// aquí va el código
const formProducts = document.getElementById("form-products");
const productsContainerEl = document.getElementById("products-container");
const productName = document.getElementById("Name");
const productQuantity = document.getElementById("Number");
const totalProductosEl = document.getElementById("productos-total");
const totalPrecioEl = document.getElementById("precio-total");
const resumenEl = document.getElementById("resumen");
const alertEl = document.getElementById("alertado");
const rmvBtn = document.getElementById("btn-remove-all");
let productosList = [];
let id = 0;
let totalProductos = 0;
let totalPrecio = 0;

const generarPrecio = function () {
  const precio = Math.random() * 100;
  return precio.toFixed(2);
};

const renderProduct = function (nombre, cantidad, precio, numProduct) {
  const markupProduct = `
<tr>
  <th scope="row">${numProduct}</th>
  <td>${nombre}</td>
  <td>${cantidad}</td>
  <td>$ ${precio}</td>
</tr>
`;
  productsContainerEl.insertAdjacentHTML("beforeend", markupProduct);
};

const changeValues = function (productos, precio) {
  totalPrecioEl.textContent = `$ ${precio}`;
  totalProductosEl.textContent = productos;
};
const validarCantidad = function (cantidad) {
  if (cantidad <= 0) {
    alertEl.style.display = "block";
    alertEl.textContent += "Cantidad invalida";
  }
};

const validarProducto = function (producto) {
  if (producto.length < 2) {
    alertEl.style.display = "block";
    alertEl.textContent += "\n Producto invalido";
  }
};

const setLocalRow = function (nombre, cantidad, precio, contador) {
  const row = {
    id: contador,
    nombre: nombre,
    cantidad: cantidad,
    precio: precio,
  };
  productosList.push(row);
  localStorage.setItem("productosList", JSON.stringify(productosList));
};

formProducts.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!productName.value) return;
  if (!productQuantity.value) return;
  validarCantidad(productQuantity.value);
  validarProducto(productName.value);
  const nombre = productName.value;
  const cantidad = +productQuantity.value;
  const precio = +generarPrecio();
  id++;
  totalProductos += cantidad;
  totalPrecio += precio * cantidad;
  localStorage.setItem("productos", id);
  localStorage.setItem("productosTotal", totalProductos);
  localStorage.setItem("precioTotal", totalPrecio);
  renderProduct(nombre, cantidad, precio, id);
  changeValues(totalProductos, totalPrecio.toFixed(2));
  setLocalRow(nombre, cantidad, precio, id);
  resumenEl.textContent = id;
  productName.focus();
  productName.value = "";
  productQuantity.value = "";
});

productName.addEventListener("blur", (e) => {
  e.preventDefault();
  e.target.value = productName.value.trim();
});

window.addEventListener("load", (e) => {
  const tmpCont = localStorage.getItem("productos");
  const tmpTotalp = +localStorage.getItem("productosTotal");
  const tmpTotalpre = parseFloat(localStorage.getItem("precioTotal"));
  productosList = JSON.parse(localStorage.getItem("productosList"));
  if (productosList != []) {
    productosList.forEach((product) =>
      renderProduct(
        product.nombre,
        product.cantidad,
        product.precio,
        product.id
      )
    );
  }
  if (tmpCont != null) {
    id = tmpCont;
    resumenEl.textContent = id;
  }
  if (tmpTotalp != null && tmpTotalpre != null) {
    totalProductos = tmpTotalp;
    totalPrecio = tmpTotalpre;
    changeValues(totalProductos, totalPrecio.toFixed(2));
  }
});

rmvBtn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear();
  id = 0;
  totalProductos = 0;
  totalPrecio = 0;
  changeValues(totalProductos, totalPrecio);
  resumenEl.textContent = id;
  productsContainerEl.innerHTML = "";
});
