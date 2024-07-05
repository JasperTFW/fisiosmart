"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const express_1 = require("express");
const { validarJWT } = require('../middlewares/validar-jwt_owners');
const { check } = require('express-validator');

const { esAdminRole, tieneRole} = require('../middlewares/validar-roles');

const Contenedores = require("../controllers/owners");
const { validarCampos } = require("../middlewares/validar-campos");



const router = express_1.Router();






router.get('/',validarJWT, Contenedores.getUsuario);//Este GET es para obtener exclusivamente el usuario loggeado
router.get('/admin', validarJWT,esAdminRole,Contenedores.getUsuarios); //Este GET es para obtener TODOS el usuario loggeado
router.get('/admin/:id',validarJWT, esAdminRole,Contenedores.getUsuarioAdmin);//Este GET es para Obtener exclusivamente el usuario por ID
router.put('/', validarJWT,Contenedores.putUsuario); //Este PUT es para editar exclusivamente el usuario loggeado
router.post('/pass',[
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('password','El password debe tener más de 8 caracteres').isLength({min:8}),
    check('newPassword', 'La nueva contraseña es obligatoria').not().isEmpty(),
    check('newPassword','La contraseña debe tener más de 8 caracteres').isLength({min:8}),
    check('confirmPassword', 'La confirmación es obligatoria').not().isEmpty(),
    check('confirmPassword','El password debe tener más de 8 caracteres').isLength({min:8}),
validarCampos],
validarJWT,Contenedores.putUsuarioPass); //Este PUT es para editar exclusivamente el Password del usuario loggeado
router.put('/pass/admin/:id',validarJWT,Contenedores.putUsuarioPassAdmin); //Este PUT es para editar exclusivamente el Password del usuario loggeado
router.put('/admin/:id', validarJWT,esAdminRole,Contenedores.putUsuarioAdmin);//Este PUT es para editar los datos de TODOS los usuarios
router.delete('/admin/:id', validarJWT, esAdminRole,Contenedores.deleteUsuario);//Este DELETE es para eliminar el usuario por ID


exports.default = router;
//# sourceMappingURL=usuario.js.map