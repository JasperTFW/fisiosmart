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
const Contenedores_1 = __importDefault(require("../models/trucks"));
const uuid = require('uuid');
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trucks = yield Contenedores_1.default.findAll();
    res.json({ trucks });
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.usuario;
    const { username } = req.usuario;
    const post = yield Contenedores_1.default.findByPk(id);
    if (post) {
        res.json(post);
       
    }
    else {
        res.status(404).json({
            msg: `No existe un Camión identificado bajo el ID de ${username}`
        });
    }
});
exports.getUsuario = getUsuario;

//////////////////////////////////////////////////////////////////////////////////////////////////////////

const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.usuario;
    const { body } = req;
  
    
    const truckID = uuid.v4();

        const trucks = new Contenedores_1.default(body);
        console.log(id);
        trucks.id=truckID;
        trucks.uuid = id;
        yield trucks.save();
        res.json(trucks);
       
    
});
exports.postUsuario = postUsuario;



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const contenedores = yield Contenedores_1.default.findByPk(id);
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
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield Contenedores_1.default.findByPk(id);
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