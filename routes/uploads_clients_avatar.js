const { Router } = require('express');
const { check } = require('express-validator');

const { esAdminRole, tieneRole} = require('../middlewares/validar-roles');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarArchivoSubir } = require('../middlewares/validar-archivo');

const { validarJWT } = require('../middlewares/validar-jwt_clients');
const { cargarArchivo, actualizarImagen, mostrarImagen } = require('../controllers/uploads_clients_avatar');
//const { coleccionesPermitidas } = require('../helpers');


const router = Router();


//router.post( '/',cargarArchivo );
router.put('/',validarJWT,validarCampos,validarArchivoSubir,actualizarImagen);
router.get('/',validarJWT,mostrarImagen);





module.exports = router;