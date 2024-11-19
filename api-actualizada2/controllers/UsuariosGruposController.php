<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
// Permitir métodos HTTP específicos
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
// Permitir cabeceras específicas en las solicitudes
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");

// Incluir los modelos necesarios
include_once '../models/usuarios.php';
include_once '../models/grupoUsuario.php';
include_once '../models/funcion.php';
include_once '../models/gruposFunciones.php';
include_once '../core/Database.php';

class UsuariosGruposController {

    private $db; // Conexión a la base de datos
    private $usuarios; // Modelo de usuario
    private $grupoUsuario; // Modelo de grupo de usuario
    private $funcion; // Modelo de función
    private $gruposFunciones; // Modelo de grupos de funciones

    // Constructor de la clase
    public function __construct() {
        $database = new Database(); // Crear una nueva instancia de la base de datos
        $this->db = $database->getConnection(); // Obtener la conexión a la base de datos
        // Inicializar los modelos correspondientes
        $this->usuarios = new Usuario($this->db);
        $this->grupoUsuario = new GrupoUsuario($this->db);
        $this->funcion = new Funcion($this->db);
        $this->gruposFunciones = new GruposFunciones($this->db);
    }

    // Métodos para Usuarios

    // Obtener todos los usuarios
    public function getAllUsuarios() {
        $stmt = $this->usuarios->getAll(); // Obtener todos los usuarios
        $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC); // Obtener resultados como un arreglo asociativo
        echo json_encode($usuarios); // Retornar los usuarios en formato JSON
        exit(); // Asegúrate de que no haya más salida
    }

    // Obtener un usuario por ID
    public function getUsuarioById($id) {
        $usuarios = $this->usuarios->getById($id); // Obtener usuario por ID
        echo json_encode($usuarios); // Retornar el usuario en formato JSON
        exit(); // Asegúrate de que no haya más salida
    }

    // Crear un nuevo usuario
    public function createUsuario($data) {
        // Asignar propiedades del usuario a partir de los datos recibidos
        $this->usuarios->nombreUsuario = $data->nombreUsuario;
        $this->usuarios->mail = $data->mail;
        $this->usuarios->clave = $data->clave;
        $this->usuarios->idgrupo = $data->idgrupo;

        // Intentar crear el usuario y retornar el resultado
        if ($this->usuarios->create()) {
            echo json_encode(["message" => "Usuario creado con éxito"]);
        } else {
            echo json_encode(["message" => "Error al crear el usuario"]); // Mensaje de error
        }
        exit(); // Asegúrate de que no haya más salida
    }

    // Actualizar un usuario existente
    public function updateUsuario($id, $data) {
        // Asignar propiedades del usuario a partir de los datos recibidos
        $this->usuarios->nombreUsuario = $data->nombreUsuario;
        $this->usuarios->mail = $data->mail;
        $this->usuarios->clave = $data->clave;
        $this->usuarios->idgrupo = $data->idgrupo;

        // Intentar actualizar el usuario y retornar el resultado
        if ($this->usuarios->update($id)) {
            echo json_encode(["message" => "Usuario actualizado con éxito"]);
        } else {
            echo json_encode(["message" => "Error al actualizar el usuario"]); // Mensaje de error
        }
        exit(); // Asegúrate de que no haya más salida
    }

    // Eliminar un usuario
    public function deleteUsuario($id) {
        // Intentar eliminar el usuario y retornar el resultado
        if ($this->usuarios->delete($id)) {
            echo json_encode(["message" => "Usuario eliminado con éxito"]);
        } else {
            echo json_encode(["message" => "Error al eliminar el usuario"]); // Mensaje de error
        }
        exit(); // Asegúrate de que no haya más salida
    }

    // Métodos para Grupos de Usuarios

    // Obtener todos los grupos de usuarios
    public function getAllGrupos() {
        $stmt = $this->grupoUsuario->getAll(); // Obtener todos los grupos
        $gruposUsuario = $stmt->fetchAll(PDO::FETCH_ASSOC); // Obtener resultados como un arreglo asociativo
        echo json_encode($gruposUsuario); // Retornar grupos en formato JSON
        exit(); // Asegúrate de que no haya más salida
    }

    // Obtener un grupo por ID
    public function getGrupoById($id) {
        $grupoUsuario = $this->grupoUsuario->getById($id); // Obtener grupo por ID
        echo json_encode($grupoUsuario); // Retornar el grupo en formato JSON
        exit(); // Asegúrate de que no haya más salida
    }

    // Crear un nuevo grupo de usuarios
    public function createGrupo($data) {
        $this->grupoUsuario->descripcion = $data->descripcion; // Asignar la descripción del grupo

        // Intentar crear el grupo y retornar el resultado
        if ($this->grupoUsuario->create()) {
            echo json_encode(["message" => "Grupo de usuarios creado con éxito"]);
        } else {
            echo json_encode(["message" => "Error al crear el grupo de usuarios"]); // Mensaje de error
        }
        exit(); // Asegúrate de que no haya más salida
    }

    // Actualizar un grupo existente
    public function updateGrupo($id, $data) {
        if (isset($data->descripcion)) {
            $this->grupoUsuario->descripcion = $data->descripcion; // Asignar nueva descripción
        } else {
            echo json_encode(["error" => "La propiedad 'descripcion' es requerida"]); // Mensaje de error
            exit(); // Asegúrate de que no haya más salida
        }

        // Intentar actualizar el grupo y retornar el resultado
        if ($this->grupoUsuario->update($id)) {
            echo json_encode(["message" => "Grupo de usuarios actualizado con éxito"]);
        } else {
            echo json_encode(["message" => "Error al actualizar el grupo de usuarios"]); // Mensaje de error
        }
        exit(); // Asegúrate de que no haya más salida
    }

    // Eliminar un grupo
    public function deleteGrupo($id) {
        // Intentar eliminar el grupo y retornar el resultado
        if ($this->grupoUsuario->delete($id)) {
            echo json_encode(["message" => "Grupo de usuarios eliminado con éxito"]);
        } else {
            echo json_encode(["message" => "Error al eliminar el grupo de usuarios"]); // Mensaje de error
        }
        exit(); // Asegúrate de que no haya más salida
    }

    // Métodos para Funciones

    // Obtener todas las funciones
    public function getAllFunciones() {
        $stmt = $this->funcion->getAll(); // Obtener todas las funciones
        $funciones = $stmt->fetchAll(PDO::FETCH_ASSOC); // Obtener resultados como un arreglo asociativo
        echo json_encode($funciones); // Retornar funciones en formato JSON
        exit(); // Asegúrate de que no haya más salida
    }

    // Obtener una función por ID
    public function getFuncionById($id) {
        $funcion = $this->funcion->getById($id); // Obtener función por ID
        echo json_encode($funcion); // Retornar la función en formato JSON
        exit(); // Asegúrate de que no haya más salida
    }

    // Crear una nueva función
    public function createFuncion($data) {
        $this->funcion->descripcion = $data->descripcion; // Asignar descripción de la función

        // Intentar crear la función y retornar el resultado
        if ($this->funcion->create()) {
            echo json_encode(["message" => "Función creada con éxito"]);
        } else {
            echo json_encode(["message" => "Error al crear la función"]); // Mensaje de error
        }
        exit(); // Asegúrate de que no haya más salida
    }

    // Actualizar una función existente
    public function updateFuncion($id, $data) {
        $this->funcion->descripcion = $data->descripcion; // Asignar nueva descripción

        // Intentar actualizar la función y retornar el resultado
        if ($this->funcion->update($id)) {
            echo json_encode(["message" => "Función actualizada con éxito"]);
        } else {
            echo json_encode(["message" => "Error al actualizar la función"]); // Mensaje de error
        }
        exit(); // Asegúrate de que no haya más salida
    }

    // Eliminar una función
    public function deleteFuncion($id) {
        // Intentar eliminar la función y retornar el resultado
        if ($this->funcion->delete($id)) {
            echo json_encode(["message" => "Función eliminada con éxito"]);
        } else {
            echo json_encode(["message" => "Error al eliminar la función"]); // Mensaje de error
        }
        exit(); // Asegúrate de que no haya más salida
    }

    // Métodos para Grupos de Funciones

    // Obtener todos los grupos de funciones
    public function getAllgrupoFunciones() {
        $stmt = $this->gruposFunciones->getAll(); // Obtener todos los grupos de funciones
        $gruposFunciones = $stmt->fetchAll(PDO::FETCH_ASSOC); // Obtener resultados como un arreglo asociativo
        echo json_encode($gruposFunciones); // Retornar grupos de funciones en formato JSON
        exit(); // Asegúrate de que no haya más salida
    }

    // Obtener un grupo de funciones por ID
    public function getgrupoFuncionesById($id) {
        $gruposFunciones = $this->gruposFunciones->getById($id); // Obtener grupo de funciones por ID
        echo json_encode($gruposFunciones); // Retornar el grupo de funciones en formato JSON
        exit(); // Asegúrate de que no haya más salida
    }

    // Crear una nueva relación grupo-funciones
    public function creategrupoFunciones($data) {
        // Asignar propiedades de la relación a partir de los datos recibidos
        $this->gruposFunciones->idGrupo = $data->idGrupo;
        $this->gruposFunciones->idFunciones = $data->idFunciones;
        $this->gruposFunciones->ver = $data->ver;
        $this->gruposFunciones->insertar = $data->insertar;
        $this->gruposFunciones->modificar = $data->modificar;
        $this->gruposFunciones->borrar = $data->borrar;

        // Intentar crear la relación y retornar el resultado
        if ($this->gruposFunciones->create()) {
            echo json_encode(["message" => "Relación grupo-funciones creada con éxito"]);
        } else {
            echo json_encode(["message" => "Error al crear la relación grupo-funciones"]); // Mensaje de error
        }
        exit(); // Asegúrate de que no haya más salida
    }

    // Actualizar una relación grupo-funciones existente
    public function updategrupoFunciones($id, $data) {
        // Asignar campos requeridos
        if (isset($data->idGrupo)) {
            $this->gruposFunciones->idGrupo = $data->idGrupo;
        } else {
            echo json_encode(["error" => "El campo idGrupo es requerido"]); // Mensaje de error
            exit(); // Asegúrate de que no haya más salida
        }

        if (isset($data->idFunciones)) {
            $this->gruposFunciones->idFunciones = $data->idFunciones;
        } else {
            echo json_encode(["error" => "El campo idFunciones es requerido"]); // Mensaje de error
            exit(); // Asegúrate de que no haya más salida
        }

        // Asignar otros campos, si están definidos, o asignar 0 si no lo están
        $this->gruposFunciones->ver = isset($data->ver) ? $data->ver : 0;
        $this->gruposFunciones->insertar = isset($data->insertar) ? $data->insertar : 0;
        $this->gruposFunciones->modificar = isset($data->modificar) ? $data->modificar : 0;
        $this->gruposFunciones->borrar = isset($data->borrar) ? $data->borrar : 0;

        // Intentar actualizar la relación y retornar el resultado
        if ($this->gruposFunciones->update($id)) {
            echo json_encode(["message" => "Relación grupo-funciones actualizada con éxito"]);
        } else {
            echo json_encode(["message" => "Error al actualizar la relación grupo-funciones"]); // Mensaje de error
        }
        exit(); // Asegúrate de que no haya más salida
    }

    // Eliminar una relación grupo-funciones
    public function deletegrupoFunciones($id) {
        // Intentar eliminar la relación y retornar el resultado
        if ($this->gruposFunciones->delete($id)) {
            echo json_encode(["message" => "Relación grupo-funciones eliminada con éxito"]);
        } else {
            echo json_encode(["message" => "Error al eliminar la relación grupo-funciones"]); // Mensaje de error
        }
        exit(); // Asegúrate de que no haya más salida
    }
}