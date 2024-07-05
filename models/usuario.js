"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Usuario = connection_1.default.define('fsdb_users', {
   
   
    avatar: {
        type: sequelize_1.DataTypes.STRING
    },
    user_nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    user_contraseña: {
        type: sequelize_1.DataTypes.STRING
    },
    
    user_correo: {
        type: sequelize_1.DataTypes.STRING
    },
   
    user_telefono: {
        type: sequelize_1.DataTypes.STRING
    },
    user_role: {
        type: sequelize_1.DataTypes.STRING
    },
    user_puntos: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    
    status: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    
});

exports.default = Usuario;
//# sourceMappingURL=usuario.js.map