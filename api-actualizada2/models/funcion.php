<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
// Permitir métodos HTTP específicos
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
// Permitir cabeceras específicas en las solicitudes
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");

// app/models/Funcion.php
class Funcion {
    private $conn; // Conexión a la base de datos
    private $table = "funciones"; // Nombre de la tabla

    // Propiedades de la clase
    public $idFuncion;
    public $descripcion;

    // Constructor de la clase
    public function __construct($db) {
        $this->conn = $db; // Asignar la conexión a la propiedad
    }

    // Obtener todas las funciones
    public function getAll() {
        // Consulta SQL para seleccionar todas las funciones
        $query = "SELECT * FROM " . $this->table; 
        $stmt = $this->conn->prepare($query); // Preparar la consulta
        $stmt->execute(); // Ejecutar la consulta
        return $stmt; // Retornar el resultado de la consulta
    }

    // Obtener una función por ID
    public function getById($id) {
        // Consulta SQL para seleccionar una función específica por ID
        $query = "SELECT * FROM " . $this->table . " WHERE idFuncion = :idFuncion"; 
        $stmt = $this->conn->prepare($query); // Preparar la consulta
        $stmt->bindParam(":idFuncion", $id); // Vincular el parámetro
        $stmt->execute(); // Ejecutar la consulta
        return $stmt->fetch(PDO::FETCH_ASSOC); // Retornar el resultado como un arreglo asociativo
    }

    // Crear una nueva función
    public function create() {
        // Consulta SQL para insertar una nueva función
        $query = "INSERT INTO " . $this->table . " (descripcion) VALUES (:descripcion)"; 
        $stmt = $this->conn->prepare($query); // Preparar la consulta
        $stmt->bindParam(':descripcion', $this->descripcion); // Vincular el parámetro
        
        // Ejecutar la consulta y retornar el resultado
        if ($stmt->execute()) {
            return ['success' => true, 'message' => 'Función creada con éxito.']; // Mensaje de éxito
        } else {
            return ['success' => false, 'message' => 'Error al crear la función.']; // Mensaje de error
        }
    }

    // Actualizar una función
    public function update($id) {
        // Consulta SQL para actualizar una función existente
        $query = "UPDATE " . $this->table . " SET descripcion = :descripcion WHERE idFuncion = :idFuncion"; 
        $stmt = $this->conn->prepare($query); // Preparar la consulta
        // Vincular los parámetros
        $stmt->bindParam(':idFuncion', $id);
        $stmt->bindParam(':descripcion', $this->descripcion);
        
        // Ejecutar la consulta y retornar el resultado
        if ($stmt->execute()) {
            return ['success' => true, 'message' => 'Función actualizada con éxito.']; // Mensaje de éxito
        } else {
            return ['success' => false, 'message' => 'Error al actualizar la función.']; // Mensaje de error
        }
    }

    // Eliminar una función
    public function delete($id) {
        // Consulta SQL para eliminar una función por ID
        $query = "DELETE FROM " . $this->table . " WHERE idFuncion = :idFuncion"; 
        $stmt = $this->conn->prepare($query); // Preparar la consulta
        $stmt->bindParam(':idFuncion', $id); // Vincular el parámetro
        
        // Ejecutar la consulta y retornar el resultado
        if ($stmt->execute()) {
            return ['success' => true, 'message' => 'Función eliminada con éxito.']; // Mensaje de éxito
        } else {
            return ['success' => false, 'message' => 'Error al eliminar la función.']; // Mensaje de error
        }
    }
}
?>
