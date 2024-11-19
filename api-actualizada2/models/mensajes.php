<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");
// app/models/Mensaje.php

class Mensajes {
    private $conn;
    private $table = "mensajes";

    public $idMensajes;
    public $emisor;
    public $receptor;
    public $mensaje;
    public $estadoLeido;
    public $estadoEnviado;
    public $estadoFavorito;
    public $estadoPapelera;
    public $estadoRecibido;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Obtener todas las relaciones grupo-funciones
    public function getAll() {
        $query = "SELECT * FROM " . $this->table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Obtener una relación por ID
    public function getById($id) {
        $query = "SELECT * FROM " . $this->table . " WHERE idMensajes = :idMensajes";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":idMensajes", $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Eliminar un mensaje por ID
    public function deleteMensaje($id) {
        $query = "DELETE FROM " . $this->table . " WHERE idMensajes = :idMensajes";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":idMensajes", $id);
        return $stmt->execute();
    }

    
 // Editar un mensaje por ID
public function updateMensaje($id, $contenido, $favoritoEmisor, $favoritoReceptor, $papeleraEmisor, $papeleraReceptor) {
    $query = "UPDATE " . $this->table . " 
              SET mensaje = :mensaje, 
                  favoritoEmisor = :favoritoEmisor, 
                  favoritoReceptor = :favoritoReceptor, 
                  papeleraEmisor = :papeleraEmisor, 
                  papeleraReceptor = :papeleraReceptor 
              WHERE idMensajes = :idMensajes";
              
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(":mensaje", $contenido);
    $stmt->bindParam(":favoritoEmisor", $favoritoEmisor, PDO::PARAM_INT);
    $stmt->bindParam(":favoritoReceptor", $favoritoReceptor, PDO::PARAM_INT);
    $stmt->bindParam(":papeleraEmisor", $papeleraEmisor, PDO::PARAM_INT);
    $stmt->bindParam(":papeleraReceptor", $papeleraReceptor, PDO::PARAM_INT);
    $stmt->bindParam(":idMensajes", $id);
    
    return $stmt->execute();
}


}
?>
