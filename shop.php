<?php 
    session_start();
    require 'database.php';
    
    if (isset($_SESSION['user_id'])) {
        $records = $conn->prepare('SELECT user, nombre, email, password FROM usuario WHERE user = :id');
        $records->bindParam(':id', $_SESSION['user_id']);
        $records->execute();
        $results = $records->fetch(PDO::FETCH_ASSOC);
        $user = null;
        if (count($results) > 0) {
            $user = $results;
        }
    }
?>

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
            <?php if (!empty($user)) : ?>
            <li><p class="mensaje" >Hola <?= $_SESSION['user_id'] ?></p></li>

            <li><a href="logout.php" class="action_btn">Cerrar sesión</a></li>
            <?php else : ?>
                <li><a href="login.php" class="action_btn">Iniciar sesión</a></li>
            <?php endif; ?>
        </ul>
        <style>
            .mensaje{
            color: white;
        }
        </style>
        <div class="header-icons">
            <a href="#"><i class='bx bx-shopping-bag' id="compra"></i></a>
            <div class="bx bx-menu" id="menu-icon"></div>
        </div>
    </header>

    <section class="contenido">
        <div class="carrito" id="carrito">
            <form id="myForm" action="view/procesar_venta.php" method="POST">
            <div class="header-carrito">
                    <h2>Tu Carrito</h2>
                </div>

                <div class="carrito-items">
                    
                </div>

                <div class="carrito-total">
                    <div class="fila">
                        <p>Tu Total</p>
                        <span id="caja_valor" class="carrito-precio-total">$0,00</span>
                        <input type="hidden" name="valor" id="valor" value="">
                    </div>
                    <div class="rec">
                        <label>Acepto términos y condiciones</label>
                        <input type="checkbox" name="accept" id="myCheckbox">
                    </div>
                    <button type="button" id="btn-pagar" class="btn-pagar" onclick="enviarFormulario()">Continuar compra</button>
                    <button type="button" class="btn-cancelar">Cancelar</button>
                    </div>
            </form>
        </div>
        <section class="contenedor">



            <div class="contenedor-items" id="container">


            <?php
                $consulta = "SELECT id_producto, nombre, precio, imagen FROM producto";
                $resultado = $conn->query($consulta);

                while ($fila = $resultado->fetch(PDO::FETCH_ASSOC)) {
                    echo '<div class="item">';

                    echo '<span class="titulo-item">' . $fila['nombre'] . '</span>';
                    echo '<img class="img-item" src="data:image/jpeg;base64,' . base64_encode($fila['imagen']) . '" alt="Imagen">';
                    echo '<span class="precio-item">$' . $fila['precio'] . '</span>';
                    echo '<button class="bx bx-cart-add boton-item" data-id="' . $fila['id_producto'] . '"></button>';
                    echo '</div>';
                }

                $resultado->closeCursor();
            ?>

        

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
<?php if (!empty($user)) : ?>
<script>
    console.log("ID de usuario: <?= $_SESSION['user_id'] ?>");
</script>
<?php endif; ?>

</html>