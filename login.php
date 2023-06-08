<?php 
    session_start();

    if (isset($_SESSION['user_id'])) {
        header("Location: index.php");
    }

    require 'database.php';
    $message = "";
    if (!empty($_POST['email']) && !empty($_POST['contra'])){
        $records = $conn->prepare('SELECT user, nombre, email, password FROM usuario WHERE email=:email');
        $records->bindParam(':email', $_POST['email']);
        $records->execute();
        $results = $records->fetch(PDO::FETCH_ASSOC);

       if ($results && password_verify($_POST['contra'], $results['password'])){
            $_SESSION['user_id'] = $results['user'];
            $message = 'Inicio de sesión exitoso';
            header("Location: index.php");
        } else {
            $message = 'Usuario o contraseña incorrectos';
        }
    }
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesion</title>
    <link rel="stylesheet" href="assets/styles/inicio_sesion.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="preconnect" href="https://fonts.googleapis.com">


    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300&display=swap" rel="stylesheet">
    <link rel="icon" type="image/jpg" href="img/sushi.ico"/>
</head>

<body>
    <section >
        <div class="registro">
            <div class="ingresoUsu">
                <div class="icono">
                    <i class='bx bxs-sushi'> </i>SUSHI 
                </div>
                <?php if(!empty($message)): ?>
                    <p><?= $message ?></p>
                    <?php endif; ?>


                <form action="login.php" method="post">
                    <h2>
                        Ingresos
                    </h2>
                    <div class="entrada">
                        <ion-icon name="mail-outline"></ion-icon>
                        <input type="email" name="email" id="email" >
                        <label id="eml">Email</label>
                    </div>
                    <div class="entrada">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input type="password" name="contra" id="password">
                        <label for="">Contraseña</label>
                    </div>
                    <div class="perdida">
                        <a href="#"> Recuperar contraseña</a>
                    </div>
                    
                    <div class="boton" id>
                        <button type="submit">
                                Iniciar sesión
                        </button>
                        </a>
                    </div>

                    <div class="registrarse">
                        <p>Crear una cuenta <a href="registro.html">Ingresa aqui</a> </p>
                    </div>
                </form>
            </div>
        </div>
    </section>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
</body>

</html>