<?php
// Clase View para manejar la respuesta en formato JSON
class View {
    // Método estático para renderizar la respuesta
    public static function render($data) {
        header("Content-Type: application/json; charset=UTF-8"); // Establecer tipo de contenido a JSON
        echo $data; // Imprimir los datos JSON
    }
}
?>