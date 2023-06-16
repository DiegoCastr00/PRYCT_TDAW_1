<?php 
require '../database.php';
$idventa = $_GET['idventa'];

// Obtener los datos de la venta desde la base de datos
$query = "SELECT * FROM venta WHERE idventa = ?";
$stmt = $conn->prepare($query);
$stmt->execute([$idventa]);
$venta = $stmt->fetch();

// Verificar si se encontró la venta
if ($venta) {
    $user_id = $venta['user_id'];
    $fecha_actual = $venta['fecha'];
    $valor = $venta['total'];

    // Imprimir los valores en la página
    echo "ID Venta: $idventa<br>";
    echo "User ID: $user_id<br>";
    echo "Fecha: $fecha_actual<br>";
    echo "Valor: " . htmlspecialchars($valor) . "<br>";
    echo "Total: " . htmlspecialchars($valor) . "<br>";
} else {
    echo "No se encontró la venta en la base de datos.";
}

?>