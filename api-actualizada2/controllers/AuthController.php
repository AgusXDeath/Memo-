<?php
// app/controllers/AuthController.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");

// Incluir el modelo de Usuarios
require_once '../models/Usuarios.php';

class AuthController {
    private $db; // Conexión a la base de datos
    private $usuarios; // Modelo de Usuarios
    private $secret_key = 'clave_secreta'; // Reemplazar con una clave secreta segura

    // Constructor de la clase
    public function __construct($db) {
        $this->db = $db; // Inicializar la conexión a la base de datos
        $this->usuarios = new Usuario($db); // Inicializar el modelo de Usuarios
    }

    // Método para inicio de sesión
    public function login() {
        // Obtener los datos de entrada
        $data = json_decode(file_get_contents("php://input")); 

        // Comprobar que se han proporcionado email y clave
        if (!empty($data->mail) && !empty($data->clave)) {
            // Obtener usuario por correo
            $usuario = $this->usuarios->getByMail($data->mail); 

            // Validar las credenciales del usuario
            if ($usuario && $usuario['clave'] === $data->clave) {
                // Generar token JWT
                $token = $this->generateJWT($usuario['idUsuarios'], $usuario['idGrupo']); 
                echo json_encode([
                    'status' => 'success',
                    'message' => 'Inicio de sesión exitoso',
                    'token' => $token
                ]);
            } else {
                // Mensaje de error para credenciales inválidas
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Credenciales inválidas'
                ]);
            }
        } else {
            // Mensaje si faltan credenciales
            echo json_encode([
                'status' => 'error',
                'message' => 'Datos incompletos'
            ]);
        }
        exit();
    }

    // Método privado para generar el token JWT
    private function generateJWT($idUsuario, $idGrupo) {
        // Cabecera del JWT
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']); 
        // Carga útil del JWT
        $payload = json_encode([
            'iss' => 'localhost', // Emisor del token
            'iat' => time(), // Fecha de emisión
            'exp' => time() + (2 * 60 * 60), // Expira en 2 horas
            'sub' => $idUsuario, // Sujeto (ID del usuario)
            'rol' => $idGrupo // Rol del usuario (ID del grupo)
        ]);

        // Codificar en base64
        $base64UrlHeader = $this->base64UrlEncode($header);
        $base64UrlPayload = $this->base64UrlEncode($payload);
        // Crear la firma
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $this->secret_key, true);
        $base64UrlSignature = $this->base64UrlEncode($signature);

        // Retornar el JWT
        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature; 
    }

    // Método privado para codificar en base64 URL-safe
    private function base64UrlEncode($data) {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '='); // Reemplazar caracteres y quitar relleno
    }

    // Método para verificar un token JWT
    public function verifyJWT($jwt) {
        $parts = explode('.', $jwt); // Separar el JWT en partes
        if (count($parts) === 3) {
            // Decodificar cabecera y carga útil
            $header = base64_decode($parts[0]); 
            $payload = base64_decode($parts[1]); 
            $signature_provided = $parts[2]; 

            // Validar la firma
            $signature_valid = $this->base64UrlEncode(hash_hmac('sha256', "$parts[0].$parts[1]", $this->secret_key, true));

            // Verificar si la firma es válida y si el token no ha expirado
            if ($signature_valid === $signature_provided) {
                $payload_data = json_decode($payload, true); // Obtener datos de la carga útil
                if ($payload_data['exp'] > time()) { // Verificar expiración
                    return $payload_data; // Retornar los datos del payload
                }
            }
        }
        return false; // Retornar falso si la validación falla
    }

    // Método para obtener el usuario actual desde el token JWT
    public function getUsuarioActual() {
        $headers = apache_request_headers(); // Obtener las cabeceras
        // Obtener el token
        $token = isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : null; 

        if ($token) {
            $decodedToken = $this->verifyJWT($token); // Verificar el token
            if ($decodedToken) {
                return $decodedToken['sub']; // Retornar el ID del usuario
            } else {
                // Mensaje de error para token inválido
                echo json_encode(["message" => "Token inválido o expirado"]); 
            }
        } else {
            // Mensaje de error si no se proporciona el token
            echo json_encode(["message" => "Token no proporcionado"]); 
        }
        return null; // Retornar nulo si no se encuentra el usuario
    }
}

