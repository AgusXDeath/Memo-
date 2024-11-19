<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");

// Clase para manejar la papelera
class Papelera {
    private $conn; // Conexión a la base de datos
    private $table = "mensajes"; // Nombre de la tabla

    // Constructor que recibe la conexión a la base de datos
    public function __construct($db) {
        $this->conn = $db; // Asignar conexión a la propiedad
    }
    public function getPapelera($idUsuario) {
        $query = "SELECT m.*, 
                         ue.mail as emisorMail, 
                         ur.mail as receptorMail 
                  FROM " . $this->table . " m
                  JOIN usuarios ue ON m.emisor = ue.idUsuarios
                  JOIN usuarios ur ON m.receptor = ur.idUsuarios
                  WHERE 
                      (
                          (m.receptor = :receptor AND m.papeleraReceptor = 1) 
                          OR 
                          (m.emisor = :emisor AND m.papeleraEmisor = 1)
                      )";
    
        $stmt = $this->conn->prepare($query); // Preparar la consulta
        $stmt->bindParam(':receptor', $idUsuario);
        $stmt->bindParam(':emisor', $idUsuario);
        $stmt->execute(); // Ejecutar la consulta
        return $stmt; // Retornar el resultado
    }
    

}
?>
