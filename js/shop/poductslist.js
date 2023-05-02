
products.sort(() => Math.random() - 0.5);

const container = document.getElementById('container');

products.forEach(product => {
    const item = document.createElement('div');
    item.className = 'item';

    const title = document.createElement('span');
    title.className = 'titulo-item';
    title.textContent = product.title;

    const img = document.createElement('img');
    img.className = 'img-item';
    img.setAttribute("src", product.url );

    const price = document.createElement('span');
    price.className =  'precio-item';
    price.textContent = "$ "+ product.precio;

    
    const botonAgregar = document.createElement('button');
    botonAgregar.className = 'bx bx-cart-add boton-item';

    item.appendChild(title);
    item.appendChild(img);
    item.appendChild(price);
    item.appendChild(botonAgregar);
    container.appendChild(item);

});