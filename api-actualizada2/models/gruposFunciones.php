<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
// Permitir métodos HTTP específicos
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
// Permitir cabeceras específicas en las solicitudes
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");

// app/models/GrupoFunciones.php
class GruposFunciones {
    private $conn; // Conexión a la base de datos
    private $table = "gruposfunciones"; // Nombre de la tabla

    // Propiedades de la clase
    public $idGruposFunciones;
    public $idGrupo;
    public $idFunciones;
    public $ver;
    public $insertar;
    public $modificar;
    public $borrar;

    // Constructor de la clase
    public function __construct($db) {
        $this->conn = $db; // Asignar la conexión a la propiedad
    }

    // Obtener todas las relaciones grupo-funciones
    public function getAll() {
        // Consulta SQL para seleccionar todas las relaciones
        $query = "SELECT * FROM " . $this->table; 
        $stmt = $this->conn->prepare($query); // Preparar la consulta
        $stmt->execute(); // Ejecutar la consulta
        return $stmt; // Retornar el resultado de la consulta
    }

    // Obtener una relación por ID
    public function getById($id) {
        // Consulta SQL para seleccionar una relación específica por ID
        $query = "SELECT * FROM " . $this->table . " WHERE idGruposFunciones = :idGruposFunciones"; 
        $stmt = $this->conn->prepare($query); // Preparar la consulta
        $stmt->bindParam(":idGruposFunciones", $id); // Vincular el parámetro
        $stmt->execute(); // Ejecutar la consulta
        return $stmt->fetch(PDO::FETCH_ASSOC); // Retornar el resultado como un arreglo asociativo
    }

    // Crear una nueva relación grupo-funciones
    public function create() {
        // Consulta SQL para insertar una nueva relación
        $query = "INSERT INTO " . $this->table . " (idGrupo, idFunciones, ver, insertar, modificar, borrar)
                  VALUES (:idGrupo, :idFunciones, :ver, :insertar, :modificar, :borrar)"; 
        $stmt = $this->conn->prepare($query); // Preparar la consulta
        // Vincular parámetros a la consulta
        $stmt->bindParam(':idGrupo', $this->idGrupo);
        $stmt->bindParam(':idFunciones', $this->idFunciones);
        $stmt->bindParam(':ver', $this->ver);
        $stmt->bindParam(':insertar', $this->insertar);
        $stmt->bindParam(':modificar', $this->modificar);
        $stmt->bindParam(':borrar', $this->borrar);
        
        // Ejecutar la consulta y retornar el resultado
        if ($stmt->execute()) {
            return ['success' => true, 'message' => 'Relación creada con éxito.']; // Mensaje de éxito
        } else {
            return ['success' => false, 'message' => 'Error al crear la relación.']; // Mensaje de error
        }
    }

    // Actualizar una relación grupo-funciones
    public function update($id) {
        // Consulta SQL para actualizar una relación existente
        $query = "UPDATE " . $this->table . " 
                  SET idGrupo = :idGrupo, idFunciones = :idFunciones, ver = :ver, insertar = :insertar, modificar = :modificar, borrar = :borrar
                  WHERE idGruposFunciones = :idGruposFunciones"; 
        $stmt = $this->conn->prepare($query); // Preparar la consulta
        // Vincular los parámetros
        $stmt->bindParam(':idGruposFunciones', $id);
        $stmt->bindParam(':idGrupo', $this->idGrupo);
        $stmt->bindParam(':idFunciones', $this->idFunciones);
        $stmt->bindParam(':ver', $this->ver);
        $stmt->bindParam(':insertar', $this->insertar);
        $stmt->bindParam(':modificar', $this->modificar);
        $stmt->bindParam(':borrar', $this->borrar);
        
        // Ejecutar la consulta y retornar el resultado
        if ($stmt->execute()) {
            return ['success' => true, 'message' => 'Relación actualizada con éxito.']; // Mensaje de éxito
        } else {
            return ['success' => false, 'message' => 'Error al actualizar la relación.']; // Mensaje de error
        }
    }

    // Eliminar una relación grupo-funciones
    public function delete($id) {
        // Consulta SQL para eliminar una relación por ID
        $query = "DELETE FROM " . $this->table . " WHERE idGruposFunciones = :idGruposFunciones"; 
        $stmt = $this->conn->prepare($query); // Preparar la consulta
        $stmt->bindParam(':idGruposFunciones', $id); // Vincular el parámetro
        // Ejecutar la consulta y retornar el resultado
        if ($stmt->execute()) {
            return ['success' => true, 'message' => 'Relación eliminada con éxito.']; // Mensaje de éxito
        } else {
            return ['success' => false, 'message' => 'Error al eliminar la relación.']; // Mensaje de error
        }
    }
}
?>
