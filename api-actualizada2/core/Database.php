<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");

class Database {
    private $host;
    private $db_name;
    private $username;
    private $password;
    private $conn;

    public function __construct() {
        // Cargar las credenciales desde variables de entorno o configuraciones
        $this->host = getenv('DB_HOST') ?: "172.16.20.30";
        $this->db_name = getenv('DB_NAME') ?: "GestionMemo";
        $this->username = getenv('DB_USERNAME') ?: "desarrollo";
        $this->password = getenv('DB_PASSWORD') ?: "fisca1234";
    }

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            // Registrar el error en lugar de imprimirlo
            error_log("Error de conexión: " . $exception->getMessage());
            throw new Exception("Error al conectar a la base de datos."); // Lanza una excepción para el manejo en otro lugar
        }

        return $this->conn;
    }

    // Método para cerrar la conexión si es necesario
    public function closeConnection() {
        $this->conn = null;
    }
}
?>
