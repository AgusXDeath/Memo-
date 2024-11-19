<?php
// Configurar encabezados CORS
header("Access-Control-Allow-Origin: *"); // Permitir cualquier origen
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Permitir métodos HTTP específicos
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization"); // Permitir encabezados específicos

// Incluir el enrutador
include_once '../core/Router.php';
?>