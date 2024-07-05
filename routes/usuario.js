"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const express_1 = require("express");
const { validarJWT } = require('../middlewares/validar-jwt_clients');

const { esAdminRole, tieneRole} = require('../middlewares/validar-roles');

const Usuarios = require("../controllers/usuarios");



const router = express_1.Router();






router.get('/',validarJWT, Usuarios.getUsuario);//Este GET es para obtener exclusivamente el usuario loggeado
router.get('/admin', validarJWT,esAdminRole,Usuarios.getUsuarios); //Este GET es para obtener TODOS el usuario loggeado
router.get('/admin/:id',validarJWT, esAdminRole,Usuarios.getUsuarioAdmin);//Este GET es para Obtener exclusivamente el usuario por ID
router.put('/', validarJWT,Usuarios.putUsuario); //Este PUT es para editar exclusivamente el usuario loggeado
router.put('/admin/:id', validarJWT,esAdminRole,Usuarios.putUsuarioAdmin);//Este PUT es para editar los datos de TODOS los usuarios
router.delete('/admin/:id', validarJWT, esAdminRole,Usuarios.deleteUsuario);//Este DELETE es para eliminar el usuario por ID


exports.default = router;
//# sourceMappingURL=usuario.js.map