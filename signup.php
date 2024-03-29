<?php 
    require 'database.php';
    $message = "";
    if (!empty($_POST['nombre']) && !empty($_POST['usuario']) && !empty($_POST['email']) && !empty($_POST['password'])) {
        try {
            $sql = "INSERT INTO usuario (`user`, `nombre`, `email`, `password`) VALUES (:usuario,:nombre, :email, :password)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':nombre', $_POST['nombre']);
            $stmt->bindParam(':usuario', $_POST['usuario']);
            $stmt->bindParam(':email', $_POST['email']);
            $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
            $stmt->bindParam(':password', $password);
            if ($stmt->execute()) {
                $message = 'Usuario creado correctamente';
                header("Location: login.php");
                exit; 
            } else {
                $message = 'Usuario no se ha creado correctamente';
            }
        } catch (PDOException $e) {
            if ($e->errorInfo[1] == 1062) {
                $message = 'El usuario ya está en uso';
            } else {
                $message = 'Error al crear el usuario: ' . $e->getMessage();
            }
        }
    }
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro</title>
    <link rel="stylesheet" href="assets/styles/inicio_sesion.css?t=<?php echo time(); ?>">

    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300&display=swap" rel="stylesheet">
    <link rel="icon" type="image/jpg" href="img/sushi.ico"/>
</head>

<body>
    <main>
        <section>
            <div class="registro">
                <div class="regis">
                    <div class="icono">
                        <i class='bx bxs-sushi'></i> SUSHI
                    </div>
                    <h2>Registro</h2>

                    <div id="mensaje" class="mensaje">
                        <?php echo $message; ?>
                    </div>

                    <form action="signup.php" method="post" id="SignUp">
                        <div class="entrada">
                            <input type="text" name="nombre" id="nombre">
                            <label for="">Nombre</label>
                        </div>
                        <div class="entrada">
                            <input type="text" name="usuario" id="usuario">
                            <label for="">Usuario</label>
                        </div>
                        <div class="entrada">
                            <ion-icon name="mail-outline"></ion-icon>
                            <input type="email" name="email" id="email">
                            <label for="">Email</label>
                        </div>
                        <div class="entrada">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                            <input type="password" name="password" id="password">
                            <label for="">Contraseña</label>
                        </div>
                        <div class="entrada">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                            <input type="password" name="contra" id="password2">
                            <label for="">Confirmar contraseña</label>
                        </div>

                        <button type="submit">
                            Continuar
                        </button>
                    </form>
                </div>
            </div>
        </section>
        <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
    </main>
</body>

</html>