<?php

// app/controllers/MensajesController.php

// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
// Permitir métodos HTTP específicos
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
// Permitir cabeceras específicas en las solicitudes
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");

// Incluir los modelos necesarios
require_once '../models/BandejaEntrada.php';
require_once '../models/BandejaSalida.php';
require_once '../models/Favoritos.php';
require_once '../models/Papelera.php';
require_once '../models/EnviarMensaje.php';
require_once '../models/mensajes.php';
require_once '../models/borrador.php';
include_once '../core/Database.php';

class MensajesController {
    private $db; // Conexión a la base de datos
    private $secret_key = 'clave_secreta'; // Usar una clave secreta fuerte y segura
    private $bandejaEntrada;
    private $bandejaSalida;
    private $favoritos;
    private $papelera;
    private $enviarMensaje;
    private $mensajes;
    private $borrador;


    // Constructor de la clase
    public function __construct($db) {
            $database = new Database(); // Crear una nueva instancia de la base de datos
            $this->db = $database->getConnection(); // Obtener la conexión a la base de datos
        // Inicializar los modelos correspondientes
        $this->bandejaEntrada = new BandejaEntrada($db);
        $this->bandejaSalida = new BandejaSalida($db);
        $this->favoritos = new Favoritos($db);
        $this->papelera = new Papelera($db);
        $this->enviarMensaje = new EnviarMensaje($db);
        $this->mensajes = new Mensajes($db); // Inicializar el modelo Mensajes
        $this->borrador = new Borrador($db); // Inicializar el modelo Borrador
    }

    // Obtener el ID del usuario a partir del token
    private function getUsuarioIdFromToken() {
        $headers = apache_request_headers(); // Obtener las cabeceras de la solicitud
        // Extraer el token de las cabeceras
        $token = isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : null; 
        if ($token) {
            $decodedToken = $this->verifyJWT($token); // Verificar el token
            if ($decodedToken) {
                return $decodedToken['sub']; // Retornar el ID del usuario
            }
        }
        return false; // Retornar falso si el token es inválido
    }

    // Verificar y decodificar el JWT
    private function verifyJWT($jwt) {
        $parts = explode('.', $jwt); // Separar el JWT en sus partes
        if (count($parts) === 3) { // Verificar que el JWT tiene tres partes
            $header = base64_decode($parts[0]); // Decodificar el encabezado
            $payload = base64_decode($parts[1]); // Decodificar el payload
            $signature_provided = $parts[2]; // Obtener la firma proporcionada
            // Validar la firma del JWT
            $signature_valid = $this->base64UrlEncode(hash_hmac('sha256', "$parts[0].$parts[1]", $this->secret_key, true));
            if ($signature_valid === $signature_provided) {
                $payload_data = json_decode($payload, true); // Decodificar el payload como un arreglo asociativo
                if ($payload_data['exp'] > time()) { // Verificar si el token no ha expirado
                    return $payload_data; // Retornar los datos del payload
                }
            }
        }
        return false; // Retornar falso si la verificación falla
    }

    // Método para codificar en base64 URL
    private function base64UrlEncode($data) {
        // Codifica los datos en base64 y reemplaza caracteres según el estándar URL
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    // Método para manejar la bandeja de entrada
    public function getBandejaEntrada() {
        $idUsuario = $this->getUsuarioIdFromToken(); // Obtener el ID del usuario
        if ($idUsuario) {
            $stmt = $this->bandejaEntrada->getMensajesByReceptor($idUsuario); // Obtener mensajes de la bandeja de entrada
            $mensajes = $stmt->fetchAll(PDO::FETCH_ASSOC); // Obtener todos los mensajes como un arreglo asociativo
            echo json_encode($mensajes); // Retornar los mensajes en formato JSON
            exit(); // Asegura que no haya mas salidas que provoquen el "null" al final del array
        } else {
            echo json_encode(["message" => "Token inválido o expirado"]); // Mensaje de error si el token es inválido
            exit();
        }
    }

    // Método para manejar la bandeja de salida
    public function getBandejaSalida() {
        $idUsuario = $this->getUsuarioIdFromToken(); // Obtener el ID del usuario
        if ($idUsuario) {
            $stmt = $this->bandejaSalida->getMensajesByEmisor($idUsuario); // Obtener mensajes de la bandeja de salida
            $mensajes = $stmt->fetchAll(PDO::FETCH_ASSOC); // Obtener todos los mensajes como un arreglo asociativo
            echo json_encode($mensajes); // Retornar los mensajes en formato JSON
            exit();
        } else {
            echo json_encode(["message" => "Token inválido o expirado"]); // Mensaje de error si el token es inválido
            exit();
        }
    }

    // Método para manejar los borradores
    public function getBorradores() {
        $idUsuario = $this->getUsuarioIdFromToken(); // Obtener el ID del usuario
        if ($idUsuario) {
            $stmt = $this->borrador->getMensajesByEmisor($idUsuario); // Obtener mensajes borradores
            $mensajes = $stmt->fetchAll(PDO::FETCH_ASSOC); // Obtener todos los mensajes como un arreglo asociativo
            echo json_encode($mensajes); // Retornar los mensajes en formato JSON
            exit();
        } else {
            echo json_encode(["message" => "Token inválido o expirado"]); // Mensaje de error si el token es inválido
            exit();
        }
    } 

    // Método para obtener mensajes favoritos
    public function getFavoritos() {
        $idUsuario = $this->getUsuarioIdFromToken(); // Obtener el ID del usuario
        if ($idUsuario) {
            $stmt = $this->favoritos->getFavoritos($idUsuario); // Obtener mensajes favoritos
            $mensajes = $stmt->fetchAll(PDO::FETCH_ASSOC); // Obtener todos los mensajes como un arreglo asociativo
            echo json_encode($mensajes); // Retornar los mensajes en formato JSON
            exit();
        } else {
            echo json_encode(["message" => "Token inválido o expirado"]); // Mensaje de error si el token es inválido
            exit();
        }
    }

    // Método para obtener mensajes en la papelera
    public function getPapelera() {

        $idUsuario = $this->getUsuarioIdFromToken(); // Obtener el ID del usuario
        
        if ($idUsuario) {
            $stmt = $this->papelera->getPapelera($idUsuario); // Obtener mensajes en la papelera
            $mensajes = $stmt->fetchAll(PDO::FETCH_ASSOC); // Obtener todos los mensajes como un arreglo asociativo
            echo json_encode($mensajes); // Retornar los mensajes en formato JSON
            exit();
        } else {
            echo json_encode(["message" => "Token inválido o expirado"]); // Mensaje de error si el token es inválido
            exit();
        }
    }

    // Método para enviar un mensaje
    public function enviarMensaje() {
        $idUsuario = $this->getUsuarioIdFromToken(); // Obtener el ID del usuario
        if ($idUsuario) {
            // Obtener los datos del cuerpo de la solicitud
            $data = json_decode(file_get_contents("php://input")); // Decodificar el JSON de la solicitud
            $receptormail = $data->receptormail; // Obtener el correo del receptor
            $mensaje = $data->mensaje; // Obtener el contenido del mensaje
            $esBorrador = $data->esBorrador; // Obtener el estado de borrador
            // Llamar al método de enviar mensaje del modelo
            echo $this->enviarMensaje->createMensaje($idUsuario, $receptormail, $mensaje, $esBorrador); // Retornar el resultado de la operación
            exit();
        } else {
            echo json_encode(["message" => "Token inválido o expirado"]); // Mensaje de error si el token es inválido
            exit();
        }
    }
// Método para borrar un mensaje por ID
public function deleteMensaje() {
    $idUsuario = $this->getUsuarioIdFromToken(); 
    if ($idUsuario) {
        $idMensaje = $_GET['id'] ?? null;
        if ($idMensaje) {
            try {
                $resultado = $this->mensajes->deleteMensaje($idMensaje);
                if ($resultado) {
                    echo json_encode(["message" => "Mensaje eliminado correctamente"]);
                } else {
                    echo json_encode(["message" => "Error al eliminar el mensaje"]);
                }
            } catch (Exception $e) {
                echo json_encode(["message" => "Error interno del servidor: " . $e->getMessage()]);
                http_response_code(500);
            }
        } else {
            echo json_encode(["message" => "ID de mensaje no proporcionado"]);
            http_response_code(400); // Bad Request
        }
    } else {
        echo json_encode(["message" => "Token inválido o expirado"]);
        http_response_code(401); // Unauthorized
    }
}


// Método para editar un mensaje por ID
public function updateMensaje() {
    $idUsuario = $this->getUsuarioIdFromToken(); // Obtener el ID del usuario
    if ($idUsuario) {
        // Obtener el ID del mensaje desde la solicitud
        $idMensaje = $_GET['id'] ?? null;
        // Obtener el contenido del mensaje y otros datos de la solicitud
        $data = json_decode(file_get_contents("php://input"));
        $contenido = $data->mensaje ?? null; // Obtener el contenido del mensaje
        $favoritoEmisor = $data->favoritoEmisor ?? null; // Obtener favoritoEmisor
        $favoritoReceptor = $data->favoritoReceptor ?? null; // Obtener favoritoReceptor
        $papeleraEmisor = $data->papeleraEmisor ?? null; // Obtener papeleraEmisor
        $papeleraReceptor = $data->papeleraReceptor ?? null; // Obtener papeleraReceptor

        // Verificar que todos los datos requeridos estén presentes
        if ($idMensaje && $contenido !== null && $favoritoEmisor !== null && $favoritoReceptor !== null && $papeleraEmisor !== null && $papeleraReceptor !== null) {
            // Llamar a la función de actualización de mensaje en el modelo Mensajes
            $resultado = $this->mensajes->updateMensaje($idMensaje, $contenido, $favoritoEmisor, $favoritoReceptor, $papeleraEmisor, $papeleraReceptor);
            if ($resultado) {
                echo json_encode(["message" => "Mensaje actualizado correctamente"]); // Confirmación de actualización
                exit();
            } else {
                echo json_encode(["message" => "Error al actualizar el mensaje"]); // Mensaje de error en actualización
                exit();
            }
        } else {
            echo json_encode(["message" => "Datos incompletos para actualizar el mensaje"]); // Error si faltan datos
            exit();
        }
    } else {
        echo json_encode(["message" => "Token inválido o expirado"]); // Mensaje de error si el token es inválido
        exit();
    }
}




}
