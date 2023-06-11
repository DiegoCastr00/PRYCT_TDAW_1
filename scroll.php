<?php
session_start();
require 'database.php';

if (isset($_SESSION['user_id'])) {
    $records = $conn->prepare('SELECT user, nombre,email, password FROM usuario WHERE user = :id');
    $records->bindParam(':id', $_SESSION['user_id']);
    $records->execute();
    $results = $records->fetch(PDO::FETCH_ASSOC);
    $user = null;
    if (count($results) > 0) {
        $user = $results;
        echo '<input type="hidden" id="user-data" value="' . htmlspecialchars(json_encode($user)) . '">';
    }
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/jpg" href="img/sushi.ico" />
    <link rel="stylesheet" href="assets/styles/scroll.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <script src="https://unpkg.com/axios/dist/axios.min.js" defer></script>
    <script src="assets/js/scroll/scroll.js" defer></script>
    <title>Scroll</title>

</head>
<header>
    <div class="header_left">
        <i class='bx bxs-sushi'></i>
        <span> SUSHI </span>
    </div>
    <div class="header_rigth">
        <a href="shop.html" class="shop"> <i class='bx bx-shopping-bag' ></i></a>
        <a href="#" class="nav_user"><img src="assets/img/userP.jpg" alt=""> </a>
    </div>
</header>

<body>
    <div id="container">
    </div>

    <section id="popup" class="popup">
        <div class="popup_contenido">
            <div class="close"><i class='bx bx-x'></i></div>
            <div class="contenedortext">
                <div>
                    <h2>Compartir </h2>
                    <p class="redes">
                    <ul>
                        <li> <a href="https://es-la.facebook.com/"><i class='bx bxl-facebook-circle'></i></a> </li>
                        <li> <a href="https://www.instagram.com/"><i class='bx bxl-instagram'></i></a> </li>
                        <li> <a
                                href="https://www.tiktok.com/login?redirect_url=https%3A%2F%2Fwww.tiktok.com%2Fupload%3Flang%3Des&lang=es"><i
                                    class='bx bxl-tiktok'></i></a> </li>
                        <li> <a
                                href="https://twitter.com/i/flow/login?input_flow_data=%7B%22requested_variant%22%3A%22eyJsYW5nIjoiZXMifQ%3D%3D%22%7D"><i
                                    class='bx bxl-twitter'></i></a></li>
                    </ul>
                    </p>
                </div>
            </div>
        </div>
    </section>

    <section class="comentario">
        <div class="comentario_contenido">
            <h3>Comentarios</h3>
        <div class="comentario-input">
            <textarea name="" id="" cols="25" rows="5" maxlength="40" placeholder="Escribe un comentario"></textarea>
        </div>
        <div class="comentario-button">
            <button>Comentar</button>
        </div>
        </div>

    </section>
</body>

</html>