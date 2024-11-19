<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");

// Clase para manejar grupos de usuarios
class GrupoUsuario {
    private $conn; // Conexión a la base de datos
    private $table = "gruposusuarios"; // Nombre de la tabla

    public $idGrupo; // ID del grupo
    public $descripcion; // Descripción del grupo

    // Constructor que recibe la conexión a la base de datos
    public function __construct($db) {
        $this->conn = $db; // Asignar conexión a la propiedad
    }

    // Obtener todos los grupos de usuarios
    public function getAll() {
        // Consulta para seleccionar todos los grupos con el conteo de usuarios
        $query = "SELECT g.*, COUNT(u.idUsuarios) as totalUsuarios 
                  FROM " . $this->table . " g 
                  LEFT JOIN usuarios u ON g.idGrupo = u.idgrupo 
                  GROUP BY g.idGrupo";
        $stmt = $this->conn->prepare($query); // Preparar consulta
        $stmt->execute(); // Ejecutar consulta
        return $stmt; // Retornar el resultado
    }

    // Obtener un grupo de usuarios por ID
    public function getById($id) {
        // Consulta para seleccionar un grupo específico por ID
        $query = "SELECT * FROM " . $this->table . " WHERE idGrupo = :idGrupo";
        $stmt = $this->conn->prepare($query); // Preparar consulta
        $stmt->bindParam(":idGrupo", $id); // Asignar valor al parámetro
        $stmt->execute(); // Ejecutar consulta
        return $stmt->fetch(PDO::FETCH_ASSOC); // Retornar el resultado
    }

    // Crear un nuevo grupo de usuarios
    public function create() {
        // Consulta para insertar un nuevo grupo
        $query = "INSERT INTO " . $this->table . " (descripcion) VALUES (:descripcion)";
        $stmt = $this->conn->prepare($query); // Preparar consulta
        $stmt->bindParam(':descripcion', $this->descripcion); // Asignar valor al parámetro
        return $stmt->execute(); // Ejecutar consulta y retornar el resultado
    }

    // Actualizar un grupo de usuarios
    public function update($id) {
        // Consulta para actualizar un grupo específico
        $query = "UPDATE " . $this->table . " SET descripcion = :descripcion WHERE idGrupo = :idGrupo";       
        $stmt = $this->conn->prepare($query); // Preparar consulta
        $stmt->bindParam(':idGrupo', $id); // Asignar valor al parámetro
        $stmt->bindParam(':descripcion', $this->descripcion); // Asignar valor al parámetro
        return $stmt->execute(); // Ejecutar consulta y retornar el resultado
    }

    // Eliminar un grupo de usuarios
    public function delete($id) {
        // Consulta para eliminar un grupo específico
        $query = "DELETE FROM " . $this->table . " WHERE idGrupo = :idGrupo";
        $stmt = $this->conn->prepare($query); // Preparar consulta
        $stmt->bindParam(':idGrupo', $id); // Asignar valor al parámetro
        return $stmt->execute(); // Ejecutar consulta y retornar el resultado
    }
}
?>
