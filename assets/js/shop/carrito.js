var carritoVisible = true;

// Esperamos a que todos los elementos de la página carguen para ejecutar el script
document.addEventListener('DOMContentLoaded', ready);

function ready() {
  // Agregamos funcionalidad a los botones eliminar del carrito
  var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
  for (var i = 0; i < botonesEliminarItem.length; i++) {
    var button = botonesEliminarItem[i];
    button.addEventListener('click', eliminarItemCarrito);
  }

  // Agregamos funcionalidad al botón sumar cantidad
  var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
  for (var i = 0; i < botonesSumarCantidad.length; i++) {
    var button = botonesSumarCantidad[i];
    button.addEventListener('click', sumarCantidad);
  }

  // Agregamos funcionalidad al botón restar cantidad
  var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
  for (var i = 0; i < botonesRestarCantidad.length; i++) {
    var button = botonesRestarCantidad[i];
    button.addEventListener('click', restarCantidad);
  }

  // Agregamos funcionalidad al botón Agregar al carrito
  var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
  for (var i = 0; i < botonesAgregarAlCarrito.length; i++) {
    var button = botonesAgregarAlCarrito[i];
    button.addEventListener('click', agregarAlCarritoClicked);
  }

  //document.getElementsByClassName('btn-pagar')[0].addEventListener('click', validateForm);
  document.getElementsByClassName('btn-cancelar')[0].addEventListener('click', pagarClicked);
}

// Función que controla el botón clickeado de agregar al carrito
function agregarAlCarritoClicked(event) {
  var button = event.target;
  var item = button.parentElement;
  var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
  var precio = item.getElementsByClassName('precio-item')[0].innerText;
  var imagenSrc = item.getElementsByClassName('img-item')[0].src;

  const idProducto = button.dataset.id;


  agregarItemAlCarrito(idProducto, titulo, precio, imagenSrc);
}

document.querySelector("#compra").onclick = () => {
  hacerVisibleCarrito();
};

// Función que hace visible el carrito
function hacerVisibleCarrito() {
  var carrito = document.querySelector('.carrito');
  if (carrito.style.display === "block") {
    carrito.style.display = "none";
  } else {
    carrito.style.display = "block";
  }
}

// Función que agrega un item al carrito
function agregarItemAlCarrito(idProducto, titulo, precio, imagenSrc) {
  var item = document.createElement('div');
  item.classList.add('item');
  item.setAttribute('data-id', idProducto);
  var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

  // Controlamos que el item que intenta ingresar no se encuentre en el carrito
  var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
  for (var i = 0; i < nombresItemsCarrito.length; i++) {
    if (nombresItemsCarrito[i].innerText === titulo) {
      return;
    }
  }

  var itemCarritoContenido = `
    <div class="container_carrito_items">
        <div class="carrito-item" data-id="${idProducto}">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    </div>
  `;

  item.innerHTML = itemCarritoContenido;

  itemsCarrito.append(item);

  // Agregamos la funcionalidad eliminar al nuevo item
  item.querySelector('.btn-eliminar').addEventListener('click', eliminarItemCarrito);

  // Agregamos la funcionalidad restar cantidad del nuevo item
  var botonRestarCantidad = item.querySelector('.restar-cantidad');
  botonRestarCantidad.addEventListener('click', restarCantidad);

  // Agregamos la funcionalidad sumar cantidad del nuevo item
  var botonSumarCantidad = item.querySelector('.sumar-cantidad');
  botonSumarCantidad.addEventListener('click', sumarCantidad);


  // Actualizamos el total
  actualizarTotalCarrito();
}


// Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadElement = selector.getElementsByClassName('carrito-item-cantidad')[0];
    var cantidadActual = parseInt(cantidadElement.value);
    cantidadActual++;
    cantidadElement.value = cantidadActual;
  
    // Obtén el ID del producto
    var idProducto = selector.parentElement.dataset.id;
  
    // Calculamos el subtotal del producto
    var precioElemento = selector.parentElement.querySelector('.carrito-item-precio');
    var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
    var subtotal = precio * cantidadActual;

  
    actualizarTotalCarrito();
  }
  
  function restarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadElement = selector.getElementsByClassName('carrito-item-cantidad')[0];
    var cantidadActual = parseInt(cantidadElement.value);
    cantidadActual--;
    if (cantidadActual >= 1) {
      cantidadElement.value = cantidadActual;
  
      // Obtén el ID del producto
      var idProducto = selector.parentElement.dataset.id;
  
      // Calculamos el subtotal del producto
      var precioElemento = selector.parentElement.querySelector('.carrito-item-precio');
      var precio = parseFloat(precioElemento.innerText.replace('$', '').replace('.', ''));
      var subtotal = precio * cantidadActual;

      actualizarTotalCarrito();
    }
  }
  

function pagarClicked() {
  var carritoItems = document.getElementsByClassName('carrito-items')[0];
  while (carritoItems.hasChildNodes()) {
    carritoItems.removeChild(carritoItems.firstChild);
  }
  actualizarTotalCarrito();
}

// Elimino el item seleccionado del carrito
function eliminarItemCarrito(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  // Actualizamos el total del carrito
  actualizarTotalCarrito();
}

/*
function validateForm() {
  var divExists = document.querySelector(".container_carrito_items");
  if (divExists) {
    checkCheckbox();
  } else {
    alert("No hay elementos en el carrito.");
  }
}

function resetForm() {
  var div = document.querySelectorAll(".container_carrito_items");
  div.textContent = "";
}

var checkbox = document.getElementById("myCheckbox");

function checkCheckbox() {
  if (checkbox.checked) {
    alert("Gracias por tu compra.");
    pagarClicked();
  } else {
    alert("Por favor, selecciona el checkbox.");
  }
}*/

// Actualiza el precio total teniendo en cuenta los items del carrito
// Actualizamos el total de Carrito
var total = 0;
function actualizarTotalCarrito() {
    // Seleccionamos el contenedor carrito
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    // Recorremos cada elemento del carrito para actualizar el total
    for (var i = 0; i < carritoItems.length; i++) {
      var item = carritoItems[i];
  
      var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
      // Quitamos el símbolo peso y el punto de miles
      var precio = parseFloat(precioElemento.innerText.replace('$', '').replace('.', ''));
      var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
      console.log('ID del producto: ' + item.dataset.id);
      console.log('La cantidad del producto: ' + (cantidadItem.value));
      console.log('Subtotal del producto: ' + (precio * cantidadItem.value));
  
      var cantidad = cantidadItem.value;
      total = total + precio * cantidad;
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString('es') + ',00';
  
    console.log('Total del carrito: ' + total);
    console.log('----------------------');

  }

  function enviarFormulario() {
    var checkbox = document.getElementById("myCheckbox");
    var itemsCarrito = document.getElementsByClassName("carrito-items")[0];
  
    if (!itemsCarrito.hasChildNodes()) {
      alert("El carrito está vacío. Agrega productos antes de continuar.");
      return;
    }
  
    if (checkbox.checked) {
      var valor = total;
      document.getElementById("valor").value = valor;
      document.getElementById("myForm").submit();
    } else {
      alert("Debes aceptar los términos y condiciones para continuar con la compra.");
    }
  }


  
  
