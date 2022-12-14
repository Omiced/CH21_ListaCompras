// aquí va el código
const formProducts = document.getElementById("form-products");
const productsContainerEl = document.getElementById("products-container");
const productName = document.getElementById("Name");
const productQuantity = document.getElementById("Number");
const totalProductosEl = document.getElementById("productos-total");
const totalPrecioEl = document.getElementById("precio-total");
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
formProducts.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!productName.value) return;
  if (!productQuantity.value) return;
  id++;
  const nombre = productName.value;
  const cantidad = +productQuantity.value;
  const precio = generarPrecio(cantidad);
  totalProductos += cantidad;
  totalPrecio += precio;
  renderProduct(nombre, cantidad, precio);
  changeValues(totalProductos, totalPrecio);
});
