<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");

// Clase para manejar usuarios
class Usuario {
    private $conn; // Conexión a la base de datos
    private $table = "usuarios"; // Nombre de la tabla

    public $idUsuarios; // ID del usuario
    public $nombreUsuario; // Nombre del usuario
    public $mail; // Correo electrónico del usuario
    public $clave; // Contraseña del usuario
    public $idgrupo; // ID del grupo del usuario

    // Constructor que recibe la conexión a la base de datos
    public function __construct($db) {
        $this->conn = $db; // Asignar conexión a la propiedad
    }

    // Obtener todos los usuarios
    public function getAll() {
        // Consulta para seleccionar todos los usuarios con su grupo
        $query = "SELECT u.*, g.descripcion as grupoDescripcion 
                  FROM " . $this->table . " u 
                  JOIN gruposusuarios g ON u.idgrupo = g.idgrupo";
        $stmt = $this->conn->prepare($query); // Preparar consulta
        $stmt->execute(); // Ejecutar consulta
        return $stmt; // Retornar el resultado
    }

    // Obtener un solo usuario por ID
    public function getById($id) {
        // Consulta para seleccionar un usuario específico por ID
        $query = "SELECT * FROM " . $this->table . " WHERE idUsuarios = :idUsuarios";
        $stmt = $this->conn->prepare($query); // Preparar consulta
        $stmt->bindParam(":idUsuarios", $id); // Asignar valor al parámetro
        $stmt->execute(); // Ejecutar consulta
        return $stmt->fetch(PDO::FETCH_ASSOC); // Retornar el resultado
    }

    // Crear un usuario nuevo
    public function create() {
        // Consulta para insertar un nuevo usuario
        $query = "INSERT INTO " . $this->table . " (nombreUsuario, mail, clave, idgrupo) VALUES (:nombreUsuario, :mail, :clave, :idgrupo)";
        $stmt = $this->conn->prepare($query); // Preparar consulta
        // Asignar valores a los parámetros
        $stmt->bindParam(':nombreUsuario', $this->nombreUsuario);
        $stmt->bindParam(':mail', $this->mail);
        $stmt->bindParam(':clave', $this->clave);
        $stmt->bindParam(':idgrupo', $this->idgrupo);
        return $stmt->execute(); // Ejecutar consulta y retornar el resultado
    }

    // Actualizar un usuario
    public function update($id) {
        // Consulta para actualizar un usuario específico
        $query = "UPDATE " . $this->table . " SET nombreUsuario = :nombreUsuario, mail = :mail, clave = :clave, idgrupo = :idgrupo WHERE idUsuarios = :idUsuarios";       
        $stmt = $this->conn->prepare($query); // Preparar consulta
        // Asignar valores a los parámetros
        $stmt->bindParam(':idUsuarios', $id);
        $stmt->bindParam(':nombreUsuario', $this->nombreUsuario);
        $stmt->bindParam(':mail', $this->mail);
        $stmt->bindParam(':clave', $this->clave);
        $stmt->bindParam(':idgrupo', $this->idgrupo);
        return $stmt->execute(); // Ejecutar consulta y retornar el resultado
    }

    // Eliminar un usuario
    public function delete($id) {
        // Consulta para eliminar un usuario específico
        $query = "DELETE FROM " . $this->table . " WHERE idUsuarios = :idUsuarios";
        $stmt = $this->conn->prepare($query); // Preparar consulta
        $stmt->bindParam(':idUsuarios', $id); // Asignar valor al parámetro
        return $stmt->execute(); // Ejecutar consulta y retornar el resultado
    }

    // Obtener un usuario por mail
    public function getByMail($mail) {
        // Consulta para seleccionar un usuario específico por correo
        $query = "SELECT * FROM " . $this->table . " WHERE mail = :mail LIMIT 0,1";
        $stmt = $this->conn->prepare($query); // Preparar consulta
        $stmt->bindParam(':mail', $mail); // Asignar valor al parámetro
        $stmt->execute(); // Ejecutar consulta
        return $stmt->fetch(PDO::FETCH_ASSOC); // Retornar el resultado
    }
}
?>
