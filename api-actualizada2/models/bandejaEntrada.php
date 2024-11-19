<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");

// Clase para manejar la bandeja de entrada
class BandejaEntrada {
    private $conn; // Conexión a la base de datos
    private $table = "mensajes"; // Nombre de la tabla

    // Constructor que recibe la conexión a la base de datos
    public function __construct($db) {
        $this->conn = $db; // Asignar conexión a la propiedad
    }

    // Método para obtener mensajes de un receptor específico
    public function getMensajesByReceptor($idUsuario) {
        // Consulta para seleccionar mensajes donde el receptor es igual al ID de usuario y no esté en la papelera
        $query = "SELECT m.*, 
                         ue.mail as emisorMail, 
                         ur.mail as receptorMail 
                  FROM " . $this->table . " m
                  JOIN usuarios ue ON m.emisor = ue.idUsuarios
                  JOIN usuarios ur ON m.receptor = ur.idUsuarios
                  WHERE m.receptor = :receptor AND papeleraReceptor = 0";
        $stmt = $this->conn->prepare($query); // Preparar consulta
        $stmt->bindParam(':receptor', $idUsuario); // Asignar valor al parámetro
        $stmt->execute(); // Ejecutar consulta
        return $stmt; // Retornar el resultado
    }
}
?>
