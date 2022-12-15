// aquí va el código
const formProducts = document.getElementById("form-products");
const productsContainerEl = document.getElementById("products-container");
const productName = document.getElementById("Name");
const productQuantity = document.getElementById("Number");
const totalProductosEl = document.getElementById("productos-total");
const totalPrecioEl = document.getElementById("precio-total");
const resumenEl = document.getElementById("resumen");
const alertEl = document.getElementById("alertado");
let id = 0;
let totalProductos = 0;
let totalPrecio = 0;
console.log(formProducts);

const generarPrecio = function (cantidad) {
  const precio = Math.random() * 100;
  return precio.toFixed(2) * cantidad;
};

const renderProduct = function (nombre, cantidad, precio) {
  const markupProduct = `
<tr>
  <th scope="row">${id}</th>
  <td>${nombre}</td>
  <td>${cantidad}</td>
  <td>${precio}</td>
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

formProducts.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!productName.value) return;
  if (!productQuantity.value) return;
  validarCantidad(productQuantity.value);
  validarProducto(productName.value);
  const nombre = productName.value;
  const cantidad = +productQuantity.value;
  const precio = generarPrecio(cantidad);
  id++;
  totalProductos += cantidad;
  totalPrecio += precio;
  renderProduct(nombre, cantidad, precio);
  changeValues(totalProductos, totalPrecio);
  resumenEl.textContent = totalProductos;
});
