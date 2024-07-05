"use strict";

const { body } = require("express-validator");
const { default: owners } = require("../models/owners");

const bcryptjs = require('bcryptjs');

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const ownersAdmin = __importDefault(require("../models/owners"));
const ownersVerified = __importDefault(require("../models/owners_verified"));
const ownersUnVerified = __importDefault(require("../models/owners_unverified"));
const owners_passChange = __importDefault(require("../models/owners_passChange"));

const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const owners = yield ownersAdmin.default.findAll();
    res.json({ owners });
});
exports.getUsuarios = getUsuarios;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
function parseJwt(token){

    var base64Url =token.split('.')[1];
    var base64 = base64Url.replace('-','+').replace('-','/');
    return JSON.parse(atob(base64));

}

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGRsb3BlejMiLCJpZCI6MiwiaWF0IjoxNjk3NDE1NDU3fQ.54qz4mM4KwRYZxCyMy8D9oghZHl-HVbMtDccMXtl0P4";

*/

const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {

    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el Usuario sin validar el token primero'
        });
    }

    const { id } = req.usuario;
    const post = yield ownersAdmin.default.findByPk(id);
    
    
    if (post) {
        res.json({
            id: post.id,
            avatar: post.avatar,
            username: post.username,
            // password: post.password,
            Nombre_Ap: post.Nombre_Ap,
            status:post.status,
            phone:post.phone,
            email:post.email,
            ci: post.ci,
            ci_front: post.ci_front,
            ci_back: post.ci_back,
            licencia: post.licencia,
            licencia_front: post.licencia_front,
            licencia_back: post.licencia_back,
            owner: post.owner,
        });
       
    }

    else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${username}`
        });
    }
});
exports.getUsuario = getUsuario;

//////////////////////////////////////////////////////////////////////////////////////////////////////////

const getUsuarioAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {

    const { id } = req.params;
    const usuario = yield ownersAdmin.default.findByPk(id);

  
    
    if (usuario) {
        res.json({
           id: contenedores.id,
                           avatar: contenedores.avatar,
                           username: contenedores.username,
                           // password: contenedores.password,
                           Nombre_Ap: contenedores.Nombre_Ap,
                           status:contenedores.status,
                           phone:contenedores.phone,
                           email:contenedores.email,
                           ci: contenedores.ci,
                           ci_front: contenedores.ci_front,
                           ci_back: contenedores.ci_back,
                           licencia: contenedores.licencia,
                           licencia_front: contenedores.licencia_front,
                           licencia_back: contenedores.licencia_back,
                           owner: contenedores.owner,}
        );
        
       // res.json(usuario.user);
    }
    else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
});
exports.getUsuarioAdmin = getUsuarioAdmin;

//////////////////////////////////////////////////////////////////////////////////////////////////////////

const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
  
        const contenedores = new ownersAdmin.default(body);
        yield contenedores.save();
        res.json(contenedores);
       
    
});
exports.postUsuario = postUsuario;



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el Usuario sin validar el token primero'
        });
    }
    const { id } = req.usuario;
    const { body } = req;
    try {

        
        const contenedores = yield ownersAdmin.default.findByPk(id);
        if (!contenedores) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }

      
        
           switch (contenedores.status){

            case 0:
                const unverified = yield ownersUnVerified.default.findByPk(id);
                contenedores.status = 0;
                yield unverified.update(body);
                res.json( {id: contenedores.id,
                           avatar: contenedores.avatar,
                           username: contenedores.username,
                           // password: contenedores.password,
                           Nombre_Ap: contenedores.Nombre_Ap,
                           status:contenedores.status,
                           phone:contenedores.phone,
                           email:contenedores.email,
                           ci: contenedores.ci,
                           ci_front: contenedores.ci_front,
                           ci_back: contenedores.ci_back,
                           licencia: contenedores.licencia,
                           licencia_front: contenedores.licencia_front,
                           licencia_back: contenedores.licencia_back,
                           owner: contenedores.owner,
                           cambios:body});
            break;
           
            case 1:
                const unverifyed = yield ownersUnVerified.default.findByPk(id);
             body.status = 0;

                yield unverifyed.update(body);
                
                res.json( {id: contenedores.id,
                           avatar: contenedores.avatar,
                           username: contenedores.username,
                           // password: contenedores.password,
                           Nombre_Ap: contenedores.Nombre_Ap,
                           status:contenedores.status,
                           phone:contenedores.phone,
                           email:contenedores.email,
                           ci: contenedores.ci,
                           ci_front: contenedores.ci_front,
                           ci_back: contenedores.ci_back,
                           licencia: contenedores.licencia,
                           licencia_front: contenedores.licencia_front,
                           licencia_back: contenedores.licencia_back,
                           owner: contenedores.owner,
                           cambios:body});
            
            break;
            
            case 2:
                const verified = yield ownersVerified.default.findByPk(id);
                yield verified.update(body);
                res.json(
                    {id: contenedores.id,
                        avatar: contenedores.avatar,
                        username: contenedores.username,
                        // password: contenedores.password,
                        Nombre_Ap: contenedores.Nombre_Ap,
                        status:contenedores.status,
                        phone:contenedores.phone,
                        email:contenedores.email,
                        ci: contenedores.ci,
                        ci_front: contenedores.ci_front,
                        ci_back: contenedores.ci_back,
                        licencia: contenedores.licencia,
                        licencia_front: contenedores.licencia_front,
                        licencia_back: contenedores.licencia_back,
                        owner: contenedores.owner,
                        cambios:body
                    }
                    
                );
            
            
            break;
            default: res.status(500).json({
                msg: 'Se me olvido hacer esto!!',
                statusUser:contenedores.status
            });






           
            



        }

      /*  yield contenedores.update(body);
        res.json(contenedores);*/
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ups!! El servidor tiene un Error.... Por favor...Hable con el administrador'
        });
    }
});
exports.putUsuario = putUsuario;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const putUsuarioAdmin= (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const contenedores = yield ownersAdmin.default.findByPk(id);
        if (!contenedores) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }
        if(body.status>=3){
            body.status=2;
        }
        yield contenedores.update(body);
        res.json( {id: contenedores.id,
            avatar: contenedores.avatar,
            username: contenedores.username,
            // password: contenedores.password,
            Nombre_Ap: contenedores.Nombre_Ap,
            status:contenedores.status,
            phone:contenedores.phone,
            email:contenedores.email,
            ci: contenedores.ci,
            ci_front: contenedores.ci_front,
            ci_back: contenedores.ci_back,
            licencia: contenedores.licencia,
            licencia_front: contenedores.licencia_front,
            licencia_back: contenedores.licencia_back,
            owner: contenedores.owner,
            cambios:body
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ups!! El servidor tiene un Error.... Por favor...Hable con el administrador'
        });
    }
});
exports.putUsuarioAdmin = putUsuarioAdmin;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const putUsuarioPass= (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.usuario;
    const { body } = req;
    try {
        const contenedores = yield ownersAdmin.default.findByPk(id);
        if (!contenedores) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }


        
const validate = yield bcryptjs.compare(body.password,contenedores.password);
if(!validate){
    return res.status(403).json({msg:"La Contraseña Actual es Incorrecta"});
}


if(body.newPassword == body.password)
{
    return res.status(403).json({msg:"La Nueva Contraseña no puede ser la Misma que la Actual"});
}

if(body.newPassword != body.confirmPassword)
{
    return res.status(403).json({msg:"La Verificación es Incorrecta"});
}

body.password = body.newPassword;
console.log(body.password);

        const salt =bcryptjs.genSaltSync();
        const value =bcryptjs.hashSync( body.password, salt);
        body.password=value;
       
        contenedores.update(body);
        res.json({msg:contenedores.password});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ups!! El servidor tiene un Error.... Por favor...Hable con el administrador'
        });
    }
});
exports.putUsuarioPass = putUsuarioPass;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



const putUsuarioPassAdmin= (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const contenedores = yield ownersAdmin.default.findByPk(id);
        if (!contenedores) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }


        
const validate = yield bcryptjs.compare(body.password,contenedores.password);
if(validate){
    return res.status(403).json({msg:"Contraseña no puede ser Igual a la Contraseña Actual"});
}

        const salt =bcryptjs.genSaltSync();
        const value =bcryptjs.hashSync( body.password, salt);
        body.password=value;
       
         contenedores.update(body);
        res.json({msg:body.password});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ups!! El servidor tiene un Error.... Por favor...Hable con el administrador'
        });
    }
});
exports.putUsuarioPassAdmin = putUsuarioPassAdmin;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield ownersAdmin.default.findByPk(id);
    if (!usuario) {
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        });
    }
    yield usuario.destroy({ estado: false });
    // await usuario.destroy();
    res.json(usuario);
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.js.map