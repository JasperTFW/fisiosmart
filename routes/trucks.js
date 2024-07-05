"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const express_1 = require("express");
const { validarJWT } = require('../middlewares/validar-jwt_owners');
const { check } = require('express-validator');


const { esAdminRole, tieneRole} = require('../middlewares/validar-roles');

const Contenedores = require("../controllers/trucks");
const { validarCampos } = require("../middlewares/validar-campos");



const router = express_1.Router();




router.get('/admin', validarJWT,esAdminRole, Contenedores.getUsuarios);
router.get('/admin/:id', validarJWT,esAdminRole, Contenedores.getUsuarios);
router.get('/', validarJWT,Contenedores.getUsuario);
router.post('/',validarJWT, Contenedores.postUsuario);
router.put('/:id', Contenedores.putUsuario);
router.delete('/:id', Contenedores.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuario.js.map