<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/styles/shop.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet">
    <link rel="icon" type="image/jpg" href="img/sushi.ico" />
    <script src="assets/js/shop/links.js" defer></script>
    <script src="assets/js/shop/poductslist.js" defer></script>
    <script src="assets/js/shop/shop.js" defer></script>
    <script src="assets/js/shop/carrito.js" defer></script>
   <!-- <script src="assets/js/shop/popup.js" defer></script> -->
    <link rel="stylesheet" href="https://unpkg.com/boxicons@latest/css/boxicons.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
        integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
        crossorigin="anonymous">
    <title>Shop</title>
</head>

<body>
    <!----header--->
    <header>
        <a href="" class="logo">SUSHI</a>

        <ul class="navlist">
            <li><a href="index.html">Home</a></li>
            <li><a href="scroll.html">Scroll</a></li>
        </ul>

        <div class="header-icons">
            <a href="#"><i class='bx bx-shopping-bag' id="compra"></i></a>
            <div class="bx bx-menu" id="menu-icon"></div>
        </div>
    </header>

    <section class="contenido">

        <div class="carrito" id="carrito">
            <form id="myForm" method="get">
                <div class="header-carrito">
                    <h2>Tu Carrito</h2>
                </div>

                <div class="carrito-items">
                </div>
                <div class="carrito-total">
                    <div class="fila">
                        <P>Tu Total</P>
                        <span class="carrito-precio-total">
                            $0,00
                        </span>
                    </div>
                    <div class="rec">
                        <label>Acepto terminos y condiciones</label>
                        <input type="checkbox" name="accept" id="myCheckbox">
                    </div>
                    <button type="submit" class="btn-pagar">Continuar compra<i class="fa-solid fa-bag-shopping"></i> </button>
                    <button type="submit" class="btn-cancelar">Cancelar<i class="fa-solid fa-bag-shopping"></i> </button>
                </div>
            </form>
        </div>
        <section class="contenedor">

            <div class="contenedor-items" id="container"></div>
        </section>


    </section>

    <div class="popup">
        <div class="popup-content">
            <div class="date-clock">
                <div class="date">
                    <span id="current-date"></span>
                </div>
                <div class="countdown-clock">
                    <div class="countdown-text">
                        La oferta se acaba en:
                    </div>
                    <div class="countdown-timer">
                        <span id="countdown-hours"></span> :
                        <span id="countdown-minutes"></span> :
                        <span id="countdown-seconds"></span>
                    </div>
                </div>
            </div>
            <div class="close">X</div>
        </div>
    </div>

    <!----scroll top--->
    <a href="#" class="top"><i class='bx bx-up-arrow-alt'></i></a>
</body>

</html>