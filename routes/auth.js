const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');


const { login,register } = require('../controllers/auth');


const router = Router();


router.post('/login',[
    check('user_nombre', 'El Usuario es Obligatorio').not().isEmail().not().isEmpty(),
    check('user_contraseña', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login );

router.post('/register',[
    check('user_nombre', 'El Usuario es Obligatorio').not().isEmail().not().isEmpty(),
    check('user_contraseña', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],register );



module.exports = router;