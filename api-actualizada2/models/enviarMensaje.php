<?php

// app/models/EnviarMensaje.php

class EnviarMensaje {
    private $conn; // Conexión a la base de datos
    private $table = 'mensajes'; // Nombre de la tabla

    // Constructor de la clase
    public function __construct($db) {
        $this->conn = $db; // Asignar la conexión a la propiedad
    }

    // Método para crear un nuevo mensaje
    public function createMensaje($emisor, $receptormail, $mensaje, $esBorrador) {
        // Validar si el receptor existe en la base de datos usando el correo electrónico
        $queryUsuario = "SELECT idUsuarios FROM usuarios WHERE mail = :mail"; // Cambiar a buscar por correo
        $stmtUsuario = $this->conn->prepare($queryUsuario); // Preparar consulta
        $stmtUsuario->bindParam(':mail', $receptormail); // Asignar valor al parámetro
        $stmtUsuario->execute(); // Ejecutar consulta

        // Comprobar si el receptor fue encontrado
        if ($stmtUsuario->rowCount() === 0) {
            return json_encode(["message" => "Receptor no encontrado"]); // Retornar mensaje de error
        }

        // Obtener el ID del receptor
        $receptorData = $stmtUsuario->fetch(PDO::FETCH_ASSOC);
        $receptorId = $receptorData['idUsuarios']; // Obtener ID del receptor

        // Determinar el estadoEnviado basado en si es un borrador o no
        $estadoEnviado = $esBorrador ? 0 : 1;

        // Crear el mensaje si el receptor es válido
        $query = "INSERT INTO " . $this->table . " (emisor, receptor, mensaje, estadoLeido, estadoEnviado, estadoFavorito, estadoPapelera, estadoRecibido)
        VALUES (:emisor, :receptor, :mensaje, 0, :estadoEnviado, 0, 0, 0)";
        $stmt = $this->conn->prepare($query); // Preparar consulta
        // Asignar valores a los parámetros
        $stmt->bindParam(':emisor', $emisor);
        $stmt->bindParam(':receptor', $receptorId); // Usar ID del receptor en lugar de email
        $stmt->bindParam(':mensaje', $mensaje);
        $stmt->bindParam(':estadoEnviado', $estadoEnviado);

        // Intentar ejecutar la consulta
        try {
            if ($stmt->execute()) {
                return json_encode(["message" => $esBorrador ? "Mensaje guardado como borrador" : "Mensaje enviado con éxito"]); // Mensaje de éxito
            } else {
                return json_encode(["message" => "Error al enviar el mensaje"]); // Mensaje de error
            }
        } catch (PDOException $e) {
            return json_encode(["message" => "Error: " . $e->getMessage()]); // Retornar el mensaje de error detallado
        }
    }
}
