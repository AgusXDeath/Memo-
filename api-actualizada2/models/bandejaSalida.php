<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");

// Clase para manejar la bandeja de salida
class BandejaSalida {
    private $conn; // Conexión a la base de datos
    private $table = "mensajes"; // Nombre de la tabla

    // Constructor que recibe la conexión a la base de datos
    public function __construct($db) {
        $this->conn = $db; // Asignar conexión a la propiedad
    }

    // Método para obtener mensajes enviados por un emisor específico
    public function getMensajesByEmisor($idUsuario) {
        // Consulta para seleccionar mensajes donde el emisor es igual al ID de usuario y no esté en la papelera
        $query = "SELECT m.*, 
                         ue.mail as emisorMail, 
                         ur.mail as receptorMail 
                  FROM " . $this->table . " m
                  JOIN usuarios ue ON m.emisor = ue.idUsuarios
                  JOIN usuarios ur ON m.receptor = ur.idUsuarios WHERE emisor = :emisor AND papeleraEmisor = 0 AND estadoEnviado = 1";
        $stmt = $this->conn->prepare($query); // Preparar consulta
        $stmt->bindParam(':emisor', $idUsuario); // Asignar valor al parámetro
        $stmt->execute(); // Ejecutar consulta
        return $stmt; // Retornar el resultado
    }
}
?>
