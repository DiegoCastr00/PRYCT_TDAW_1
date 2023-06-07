<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="js/principal/IndxIni.js" defer></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
        integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="assets/styles/pagina_inicio.css">
    <link rel="icon" type="image/jpg" href="img/sushi.ico"/>
    <title>SUSHI - Inicio</title>

</head>

<body>
    <header>
        <div class="navbar">
            <div class="logo">
                <i class='bx bxs-sushi'></i>
                <a href="#">SUSHI</a>
            </div>
            <ul class="links">
                <li><a href="signup.php">Registrarse</a></li>
                <li><a href="scroll.html">Scroll</a></li>
                <li><a href="shop.html">Tienda</a></li>
            </ul>
            <a href="login.php" class="action_btn">Iniciar sesión</a>
            <div class="toggle_btn">
                <i class="fa-solid fa-bars"></i>
            </div>
        </div>

        <div class="dropdown_menu">
            <li><a href="inicio_sesion.html" class="action_btn">Iniciar sesión</a></li>
            <li><a href="registro.html">Registrarse</a></li>
            <li><a href="scroll.html">Scroll</a></li>
            <li><a href="shop.html">Tienda</a></li>
        </div>
    </header>

    <main>
        <section id="hero">
            <h1>Busca una idea</h1>
            <p>
                ¿Qué es lo siguiente que quieres<br>
                probar? Piensa en algo que te<br>
                interese, como "ropa de otoño"<br>
                y a ver qué descubres.<br>
            </p>
        </section>
    </main>
    <section class="popup">
        <div class="contenido">
            <div class="close"><img src="img/cierre.png" alt=""></div>
            <div class="contenidoTex">
                <div>
                    <h3>Esta pagina web usa cookies</h3>
                    <p>Empleamos cookies para mejorar tu experiencia en nuestra pagina web, si quiere conocer mas
                        <a href="https://policies.google.com/technologies/cookies?hl=es">Leer mas</a>
                    </p>

                    <button id="boton">Aceptar</button>
                </div>
            </div>
        </div>
    </section>
</body>

</html>