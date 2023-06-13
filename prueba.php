<?php
session_start();
require '../database.php';
if (!isset($_SESSION['user_id'])) {
    header("Location: ../login.php");
    exit;
}

$user_id = $_SESSION['user_id'];

$fecha_actual = date("Y-m-d H:i:s");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['valor'])) {
        $valor = $_POST['valor'];

        $query = "INSERT INTO venta (user_id, fecha, total) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->execute([$user_id, $fecha_actual, $valor]);

        if ($stmt) {
            header("Location: confirmacion.php");
            exit;
        } else {
            header("Location: error.php");
            exit;
        }
    } else {
        $message = 'El valor no se ha recibido correctamente';
    }
}
?>