"use strict";
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
const Usuarios = __importDefault(require("../models/usuario"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientes = yield Usuarios.default.findAll();
    res.json({ clientes });
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
    const post = yield Usuarios.default.findByPk(id);
    if (post) {
        res.json({
            id: post.id,
            username: post.username,
            Nombre_Ap: post.Nombre_Ap,
            status:post.status,
            phone:post.phone,
            email:post.email,
            ci: post.ci,
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
    const usuario = yield Usuarios.default.findByPk(id);
    if (usuario) {
        res.json({
            id: usuario.id,
            username: usuario.username,
            Nombre_Ap: usuario.Nombre_Ap,
            role:usuario.role,
            status:usuario.status,
            phone:usuario.phone,
            email:usuario.email,
            ci: usuario.ci,
        }
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
  
        const contenedores = new Usuarios.default(body);
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
        const contenedores = yield Usuarios.default.findByPk(id);
        if (!contenedores) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }
        yield contenedores.update(body);
        res.json(contenedores);
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
        const contenedores = yield Usuarios.default.findByPk(id);
        if (!contenedores) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }
        yield contenedores.update(body);
        res.json(contenedores);
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
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield Usuarios.default.findByPk(id);
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